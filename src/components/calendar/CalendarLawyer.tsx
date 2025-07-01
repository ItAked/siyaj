"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core";
import { getAppointments } from "../../../server/AppointmentsServer/appointments";

interface Appointment {
  id: string;
  case_id: number;
  practitioner_id: number;
  lawyer_id: number;
  date: string;
  time: string;
  status: string;
}

const CalnedarLawyer: React.FC = () => {
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

  // Convert appointments to FullCalendar events
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
          selectable={false}
          eventContent={renderEventContent}
        />
      </div>
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

export default CalnedarLawyer;