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

interface Appointment {
  id: string;
  case_name: string;
  practitioner_name: string;
  lawyer_name: string;
  date: string;
  time: string;
  status: string;
}

const Calendar: React.FC = () => {
  const [, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentName, setAppointmentName] = useState("")
  const [appointmentLawyer, setAppointmentLawyer] = useState("")
  const [appointmentPractitioner, setAppointmentPractitioner] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  const statusOptions = {
    "ملغي الحجز": "danger",
    "محجوز": "success"
  };

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

  useEffect(() => {
    readAppointments();
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setAppointmentDate(selectInfo.startStr.split("T")[0]);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;

    const appointment = appointments.find(a => a.id.toString() === event.id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setAppointmentName(appointment.case_name)
      setAppointmentLawyer(appointment.lawyer_name)
      setAppointmentPractitioner(appointment.practitioner_name)
      setAppointmentDate(appointment.date);
      setAppointmentTime(appointment.time.split(":").slice(0, 2).join(":")); // Format time to HH:MM
      setAppointmentStatus(appointment.status);
    }
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
          customButtons={{
            addEventButton: {
              text: 'مشاهدة تفاصيل الموعد',
              click: () => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                if (modal && typeof modal.showModal === 'function') {
                  modal.showModal();
                }
              },
            },
          }}
        />
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box dark:bg-gray-900">
          <div className="mt-8">
            <div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">عنوان القضية</label>
                <p>{appointmentName}</p>
              </div>
            </div>
            <div className="my-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">المحامي</label>
                <p>{appointmentLawyer}</p>
              </div>
            </div>
            <div className="my-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">الممارس الصحي</label>
                <p>{appointmentPractitioner}</p>
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">حالة القضية</label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {Object.entries(statusOptions).map(([statusKey, statusValue]) => (
                  <div key={`status-${statusKey}`} className="n-chk">
                    <div className={`form-check form-check-${statusValue} form-check-inline`}>
                      <label className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400" htmlFor={`modal-${statusKey}`}>
                        <span className="relative">
                          <input className="sr-only form-check-input" type="radio" name="appointment-status" value={statusKey} id={`modal-${statusKey}`}
                          checked={appointmentStatus === statusKey} readOnly />
                          <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                            <span className={`h-2 w-2 rounded-full bg-white ${appointmentStatus === statusKey ? "block" : "hidden"}`}></span>
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
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">تاريخ الموعد</label>
              <div className="relative">
                <input id="appointment-date" readOnly type="date" value={appointmentDate} className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border
                border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300
                focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                dark:focus:border-brand-800" />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">وقت الموعد</label>
              <div className="relative">
                <input id="appointment-time" type="time" value={appointmentTime} readOnly className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border
                border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300
                focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                dark:focus:border-brand-800"
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