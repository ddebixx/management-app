"use client"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core"
import { renderEventContent, handleEvents } from "@/actions/calendar/EventHandlers"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Database } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "react-query"

type Hours = Database["public"]["Tables"]["hours"]["Row"]

export default function Schedule({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [isData, setIsData] = useState<Hours[]>([])
  const user = session?.user;
  const queryClient = useQueryClient();

  const { data: hoursData, isLoading, isError } = useQuery(
    ['hours', user?.id],
    async () => {
      const { data, error, status } = await supabase
        .from("hours")
        .select("*")
        .eq("userId", user?.id as string);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setIsData(data);
        queryClient.invalidateQueries(['hours', user?.id]);
      }
    },
  );




  const addHoursMutation = useMutation(
    async (newHours: Hours) => {
      await supabase
        .from("hours")
        .upsert(newHours)
        .eq("userId", user?.id as string);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['hours', user?.id]);
      },
    }
  );


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
        addHoursMutation.mutate(newHours as Hours);
      }
    });
  };

  const deleteHoursMutation = useMutation(
    async (eventId: string) => {
      await supabase.from('hours')
      .delete()
      .eq('id', eventId);
    },
    {
      onSuccess: () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your hours have been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries(['hours', user?.id]);
      },
      onError: () => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
        });
      },
    }
  );

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event: EventApi = clickInfo.event;

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteHoursMutation.mutate(event.id.toString());
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