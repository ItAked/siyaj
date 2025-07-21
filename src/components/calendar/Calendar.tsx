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
import Badge from "../ui/badge/Badge";

interface Appointment {
  id: string;
  title: string;
  practitioner_name: string;
  lawyer_name: string;
  date: string;
  time: string;
  status: string;
  attachments: string;
}

const Calendar: React.FC = () => {
  const [, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentName, setAppointmentName] = useState("")
  const [appointmentAttachment, setAppointmentAttachment] = useState("")
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
      console.log(response.data);
      
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
      setAppointmentName(appointment.title)
      setAppointmentAttachment(appointment.attachments);
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
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">عنوان الدعوة</label>
                <input type="text" className="input" value={appointmentName} readOnly />
              </div>
            </div>
            <div className="my-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">المحامي</label>
                <input type="text" className="input" value={appointmentLawyer} readOnly />
              </div>
            </div>
            <div className="my-8">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">الممارس الصحي</label>
                <input type="text" className="input" value={appointmentPractitioner} readOnly />
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">حالة الدعوة</label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <Badge color='primary'>{appointmentStatus}</Badge>
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

            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">ملفات الدعوة</label>
              <div className="relative">
                <a href={appointmentAttachment} className="btn btn-link" download={true}>تحميل ملف الدعوة</a>
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
  return (
    <div className={`event-fc-color flex fc-event-main fc-bg-primary`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;