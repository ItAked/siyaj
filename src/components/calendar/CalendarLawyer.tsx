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
import { getCases } from "../../../services/cases";
import { createAppointment, getAppointments, updateAppointment } from "../../../services/appointmnets";

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: string;
  title: string;
  case_id: number;
}
interface Case {
  value: number;
  label: string;
}

const CalendarLawyer: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentCase, setAppointmentCase] = useState(0);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const statusOptions = {
    "منظورة للشؤون الصحية": "primary",
    "منظورة لدى الدائرة القضائية": "primary",
    "منظورة لمنصة تراضي": "primary"
  };

  const handleTitleChange = (value: string) => {    
    setAppointmentTitle(value);
  };
  async function readCases() {
    try {
      setLoading(true)
      const response = await getCases("", "", 1)
      const p = response.data.map((caseItem: { id: number; case: string; }) => ({value: caseItem.id, label: caseItem.case})) as Case[];
      setCases(p)
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
      setAppointments(response);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    readAppointments();
    readCases()
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
      setAppointmentTitle(appointment.title);
      setAppointmentDate(appointment.date);
      setAppointmentTime(appointment.time.split(":").slice(0, 2).join(":")); // Format time to HH:MM
      setAppointmentStatus(appointment.status);
      setAppointmentCase(appointment.case_id)
    }
  };
  const handleAddOrUpdateAppointment = async () => {
    try {
      if (selectedAppointment) {
        const updatedSelectedAppointment = {
          ...selectedAppointment,
          date: appointmentDate,
          time: appointmentTime + ":00",
          status: appointmentStatus,
          title: appointmentTitle,
          case_id: appointmentCase
        };
        await updateAppointment(updatedSelectedAppointment, Number(selectedAppointment.id));
        setAppointments(prevAppointments => prevAppointments.map(appointment => appointment.id === selectedAppointment.id ? updatedSelectedAppointment : appointment));
      } else {
        const newAppointment: Appointment = {
          id: Date.now().toString(),
          date: appointmentDate,
          time: appointmentTime + ":00",
          status: appointmentStatus,
          title: appointmentTitle,
          case_id: appointmentCase
        };
        const response = await createAppointment(newAppointment);
        setAppointments(prevAppointments => [...prevAppointments, response]);
      }
      readAppointments();
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
  const calendarEvents = appointments.map(appointment => ({
    id: appointment.id,
    start: `${appointment.date}T${appointment.time}`,
    extendedProps: { 
      calendar: statusOptions[appointment.status as keyof typeof statusOptions] || "primary",
      status: appointment.status
    }
  }));

  if (loading) {
    return <div className="text-center py-8">جاري تحميل المواعيد....</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar ref={calendarRef} plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView="dayGridMonth" headerToolbar={{
            left: "prev,next addEventButton", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay"}}
          events={calendarEvents}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {text: selectedAppointment ? "تعديل الموعد" : "إضافة موعد", click: () => {
              const modal = document.getElementById('my_modal_6') as HTMLDialogElement | null;
              if (modal && typeof modal.showModal === 'function') { modal.showModal();}
              }
            }
          }}
        />
      </div>
      <dialog id="my_modal_6" className="modal">
        <div className="modal-box dark:bg-gray-900">
          <div className="mt-8">
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedAppointment ? "تعديل الموعد" : "إضافة موعد"}
            </h5>
            <div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">عنوان الإجتماع</label>
                <input type="text" name="title" className="input w-full dark:bg-gray-800 dark:text-white" value={appointmentTitle || ''}
                onChange={(e) => handleTitleChange(e.target.value)} />
              </div>
            </div>
            <div className={`my-8 ${selectedAppointment ? 'hidden' : 'block'}`}>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">إسم الدعوى</label>
                <select name="case_id" className="select w-full dark:bg-gray-800 dark:text-white" value={appointmentCase}
                onChange={(e) => setAppointmentCase(Number(e.target.value))}>
                  <option value={0}>اختر الدعوى</option>
                  {cases.map((p, index) => (
                    <option key={index} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">حالة الدعوى</label>
              <div className="grid gap-4 sm:gap-5">
                {Object.entries(statusOptions).map(([statusKey, statusValue]) => (
                  <div key={`status-${statusKey}`} className="n-chk">
                    <div className={`form-check form-check-${statusValue} form-check-inline`}>
                      <label className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400" htmlFor={`modal-${statusKey}`}>
                        <span className="relative">
                          <input className="sr-only form-check-input" type="radio" name="appointment-status" value={statusKey} id={`modal-${statusKey}`}
                          checked={appointmentStatus === statusKey} onChange={() => setAppointmentStatus(statusKey)} />
                          <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                            <span className={`h-2 w-2 rounded-full bg-white ${ appointmentStatus === statusKey ? "block" : "hidden"}`}></span>
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
                <input id="appointment-date" type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="dark:bg-dark-900 h-11
                w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs
                placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900
                dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"/>
              </div>
            </div>
            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">وقت الموعد</label>
              <div className="relative">
                <input id="appointment-time" type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="dark:bg-dark-900 h-11 w-full
                appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs
                placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900
                dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"/>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                يرجى إدخال الوقت بالتنسيق التالي: ساعة:دقيقة ثم am (صباحًا) أو pm (مساءًا) (مثال: 2:30 PM)
              </p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn shadow-none">إغلاق</button>
            </form>
            <button onClick={handleAddOrUpdateAppointment} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5
            text-sm font-medium text-white hover:bg-sky-600 sm:w-auto shadow-none">
              {selectedAppointment ? "تحديث البيانات" : "إضافة موعد"}
            </button>
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
      <div className="fc-event-time text-black">{eventInfo.timeText}</div>
      <div className="fc-event-title text-black">{eventInfo.event.title}</div>
    </div>
  );
};

export default CalendarLawyer;