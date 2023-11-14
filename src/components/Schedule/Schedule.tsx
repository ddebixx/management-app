"use client"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DateSelectArg } from "@fullcalendar/core"
import { renderEventContent, handleEvents, handleEventClick } from "@/actions/calendar/EventHandlers"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { Database } from "@/types/supabase"
import Swal from "sweetalert2"

type Hours = Database["public"]["Tables"]["hours"]["Row"]

export default function Schedule({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Hours[]>([])
    const [loading, setLoading] = useState(true);
    const user = session?.user;

    const getHours = useCallback(async () => {
        try {
          setLoading(true);
    
          const { data, error, status } = await supabase.from("hours").select("*").eq("userId", user?.id as string);
    
          if (error && status !== 406) {
            throw error;
          }
    
          if (data) {
            setIsData(data);
          }
        } catch (error) {
          alert("Error loading user data!");
        } finally {
          setLoading(false);
        }
      }, [user, supabase]);
    
      useEffect(() => {
        getHours();
      }, [getHours, user]);
    
      const handleDateSelect = async (selectInfo: DateSelectArg) => {
        const calendarApi = selectInfo.view.calendar;
    
        const newHours = {
          title: "",
          startTime: selectInfo.startStr,
          endTime: selectInfo.endStr,
          userId: user?.id,
        };
    
        Swal.fire({
          title: "Add new hours",
          text: "",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Add",
          cancelButtonText: "Cancel",
          showLoaderOnConfirm: true,
          input: "text",
          inputValue: newHours.title,
        }).then(async (hours) => {
          if (hours.isConfirmed) {
            newHours.title = hours.value;
    
            calendarApi.addEvent({
              title: newHours.title,
              start: newHours.startTime,
              end: newHours.endTime,
            });
    
            try {
              await supabase.from("hours").upsert(newHours as any);
              Swal.fire({
                title: "Success!",
                text: "Hours added.",
                icon: "success",
                confirmButtonText: "Ok",
              });
            } catch (error) {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          }
        });
      };

    return (
        <>
            <FullCalendar
                height={650}
                plugins={[
                    resourceTimelinePlugin,
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin,
                ]}
                headerToolbar={{
                    right: 'today prev,next',
                    center: 'title',
                    left: 'timeGridDay,timeGridWeek,dayGridMonth',
                }}
                initialView="timeGridWeek"
                navLinks={true}
                forceEventDuration={true}
                defaultAllDayEventDuration={{ hour: 8 }}
                businessHours={
                    {
                        daysOfWeek: [1, 2, 3, 4, 5],
                        startTime: '08:00',
                        endTime: '16:00',
                    }
                }
                eventContent={renderEventContent}
                nowIndicator={false}
                allDaySlot={false}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEventRows={3}
                schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                dayMaxEvents={1}
                events={
                    isData.map((event) => {
                        return {
                            id: event.id.toString(),
                            title: event.title,
                            start: event.startTime?.toString(),
                            end: event.endTime?.toString(),
                        }
                    })
                }
                select={handleDateSelect}
                eventsSet={handleEvents}
                eventClick={handleEventClick}
                eventMaxStack={1}
                locale={"en"}
                buttonText={
                    {
                        today: "Today",
                        month: "Month",
                        week: "Week",
                        day: "Day",
                    }
                }
                slotDuration={"01:00:00"}
                eventBackgroundColor="rgba(84, 152, 220, .15)"
                eventDisplay={"list-item"}
                slotEventOverlap={false}
                eventBorderColor="transparent"
            />
        </>
    )
}