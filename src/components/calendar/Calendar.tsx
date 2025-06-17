"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { get } from "../../../server/appointments";

interface Appointment {
  id: number;
  case_id: number;
  date: string;
  time: string;
  status: string;
  title: string;
  lawyer_id: number;
  practitioner_id: number;
  created_at: string;
  updated_at: string;
}

const Calendar: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const statusOptions = {
    "ملغي الحجز": "danger",
    "محجوز": "success"
  };

  async function readAppointments() {
    try {
      setLoading(true);
      const response = await get(); // Make sure you have the 'get' function defined or imported
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to fetch appointments");
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    readAppointments();
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setAppointmentDate(selectInfo.startStr.split("T")[0]);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const appointment = appointments.find(a => a.id.toString() === event.id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setAppointmentTitle(event.title);
      setAppointmentDate(appointment.date);
      setAppointmentTime(appointment.time.split(":").slice(0, 2).join(":")); // Format time to HH:MM
      setAppointmentStatus(appointment.status);
      openModal();
    }
  };

  const handleAddOrUpdateAppointment = async () => {
    try {
      // Here you would typically make an API call to save the appointment
      // For now, we'll just update the local state
      if (selectedAppointment) {
        // Update existing appointment
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === selectedAppointment.id
              ? {
                  ...appointment,
                  title: appointmentTitle,
                  date: appointmentDate,
                  time: appointmentTime + ":00", // Add seconds for API format
                  status: appointmentStatus
                }
              : appointment
          )
        );
      } else {
        // Add new appointment
        const newAppointment: Appointment = {
          id: Date.now(), // Temporary ID - in a real app, this would come from the API
          case_id: 0, // You'll need to set this appropriately
          title: appointmentTitle,
          date: appointmentDate,
          time: appointmentTime + ":00", // Add seconds for API format
          status: appointmentStatus,
          lawyer_id: 0, // Set appropriately
          practitioner_id: 0, // Set appropriately
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
      }
      closeModal();
      resetModalFields();
    } catch (err) {
      console.error("Error saving appointment:", err);
      setError("Failed to save appointment");
    }
  };

  const resetModalFields = () => {
    setAppointmentTitle("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentStatus("");
    setSelectedAppointment(null);
  };

  // Convert appointments to FullCalendar events
  const calendarEvents = appointments.map(appointment => ({
    id: appointment.id.toString(),
    title: appointment.title,
    start: `${appointment.date}T${appointment.time}`,
    extendedProps: { 
      calendar: statusOptions[appointment.status as keyof typeof statusOptions] || "primary",
      status: appointment.status
    }
  }));

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={calendarEvents}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "إضافة موعد +",
              click: openModal,
            },
          }}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedAppointment ? "تعديل الموعد" : "إضافة موعد"}
            </h5>
          </div>
          <div className="mt-8">
            <div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  عنوان القضية
                </label>
                <input
                  id="appointment-title"
                  type="text"
                  value={appointmentTitle}
                  onChange={(e) => setAppointmentTitle(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                حالة القضية
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {Object.keys(statusOptions).map((status) => (
                  <div key={status} className="n-chk">
                    <div
                      className={`form-check form-check-${statusOptions[status as keyof typeof statusOptions]} form-check-inline`}
                    >
                      <label
                        className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                        htmlFor={`modal-${status}`}
                      >
                        <span className="relative">
                          <input
                            className="sr-only form-check-input"
                            type="radio"
                            name="appointment-status"
                            value={status}
                            id={`modal-${status}`}
                            checked={appointmentStatus === status}
                            onChange={() => setAppointmentStatus(status)}
                          />
                          <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                            <span
                              className={`h-2 w-2 rounded-full bg-white ${
                                appointmentStatus === status ? "block" : "hidden"
                              }`}  
                            ></span>
                          </span>
                        </span>
                        {status}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                تاريخ الموعد
              </label>
              <div className="relative">
                <input
                  id="appointment-date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                وقت الموعد
              </label>
              <div className="relative">
                <input
                  id="appointment-time"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              إغلاق
            </button>
            <button
              onClick={handleAddOrUpdateAppointment}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto"
            >
              {selectedAppointment ? "تحديث البيانات" : "إضافة موعد"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const status = eventInfo.event.extendedProps.status;
  const colorClass = status === "ملغي الحجز" ? "fc-bg-danger" : "fc-bg-success"
  
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;