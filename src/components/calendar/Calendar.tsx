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
import { getAppointments } from "../../../server/AppointmentsServer/appointments";
import { getCases } from "../../../server/CasesServer/cases";
import { get } from "../../../server/LawyersServer/lawyers";
import { getPractitioners } from "../../../server/PractitionersServer/practitioners";

interface Appointment {
  id: string;
  case_id: number;
  practitioner_id: number;
  lawyer_id: number;
  date: string;
  time: string;
  status: string;
}

const Calendar: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [, setAppointmentTitle] = useState("");
  const [, setAppointmentLawyer] = useState("");
  const [, setAppointmentPractitioner] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const[, setCases] = useState([])
  const[, setLawyers] = useState([])
  const[, setPractitioner] = useState([])

  const statusOptions = {
    "ملغي الحجز": "danger",
    "محجوز": "success"
  };

  async function readCases() {
    try {
      setLoading(true)

      const response = await getCases("", "", 1)
      const c = response.data.map((caseItem: { id: number; case: string; }) => ({
        value: caseItem.id,
        label: caseItem.case
      }));      

      setCases(c)
    } catch (error) {
      setError(String(error));
    } finally {
      setLoading(false)
    }
  }

  async function readAppointments() {
    try {
      setLoading(true);

      const response = await getAppointments();
      setAppointments(response.data);

    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function readLawyers() {
    const response = await get('')
    const l = response.data.data.map((lawyerItem: { id: number; name: string; }) => ({
        value: lawyerItem.id,
        label: lawyerItem.name
    }));

    setLawyers(l)
  }

  async function readPractitioners() {
    const response = await getPractitioners('')
    const p = response.data.data.map((practitionerItem: { id: number; name: string; }) => ({
        value: practitionerItem.id,
        label: practitionerItem.name
    }));

    setPractitioner(p)
  }

  useEffect(() => {
    readAppointments();
    readCases()
    readLawyers()
    readPractitioners()
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setAppointmentDate(selectInfo.startStr.split("T")[0]);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const appointment = appointments.find(a => a.id.toString() === event.id);
    
    if (appointment) {
      setSelectedAppointment(appointment);
      setAppointmentTitle(event.title);
      setAppointmentLawyer(appointment.lawyer_id.toString())
      setAppointmentPractitioner(appointment.practitioner_id.toString())
      setAppointmentDate(appointment.date);
      setAppointmentTime(appointment.time.split(":").slice(0, 2).join(":")); // Format time to HH:MM
      setAppointmentStatus(appointment.status);
    }
  };

  const resetModalFields = () => {
    setAppointmentTitle("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentStatus("");
    setSelectedAppointment(null);
  };

  const calendarEvents = appointments.map(appointment => ({
    id: appointment.id,
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
        />
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box dark:bg-gray-900">
          <div className="mt-8">
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedAppointment ? "تعديل الموعد" : "إضافة موعد"}
            </h5>
            <div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  عنوان القضية
                </label>
                {/* <Select options={cases} /> */}
              </div>
            </div>
            <div className="my-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  المحامي
                </label>
              </div>
            </div>
            <div className="my-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  الممارس الصحي
                </label>
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                حالة القضية
              </label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {Object.entries(statusOptions).map(([statusKey, statusValue]) => (
                  <div key={`status-${statusKey}`} className="n-chk">
                    <div className={`form-check form-check-${statusValue} form-check-inline`}>
                      <label
                        className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                        htmlFor={`modal-${statusKey}`}
                      >
                        <span className="relative">
                          <input
                            className="sr-only form-check-input"
                            type="radio"
                            name="appointment-status"
                            value={statusKey}
                            id={`modal-${statusKey}`}
                            checked={appointmentStatus === statusKey}
                            onChange={() => setAppointmentStatus(statusKey)}
                          />
                          <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                            <span
                              className={`h-2 w-2 rounded-full bg-white ${
                                appointmentStatus === statusKey ? "block" : "hidden"
                              }`}
                            ></span>
                          </span>
                        </span>
                        {statusKey}
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
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">إغلاق</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const status = eventInfo.event.extendedProps.status;
  const colorClass = status === "ملغي الحجز" ? "fc-bg-danger" : "fc-bg-success"
  
  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass}`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;