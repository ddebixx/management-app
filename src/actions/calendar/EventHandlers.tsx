"use client"

import { Database } from "@/types/supabase"
import { EventApi, EventClickArg, EventContentArg } from "@fullcalendar/core"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"



export const handleEvents = (events: EventApi[]) => {
    ({
        currentEvents: events
    })
}

export const renderEventContent = (eventContent: EventContentArg) => {
    return (
        <div className="flex flex-col items-start p-2 text-base min-w-[20px] max-w-[200px] truncate text-[#5498DC]">
            <b className="truncate w-36">{eventContent.event.title}</b>
            <p>{eventContent.event.startStr.split('T')[1].slice(0, -6)}</p>
            <p>{eventContent.event.endStr.split('T')[1].slice(0, -6)}</p>
        </div>
    )
}

export const handleEventClick = async (clickInfo: EventClickArg) => {
    const event: EventApi = clickInfo.event;
    const supabase = createClientComponentClient<Database>();

    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await supabase.from('hours').delete().eq('id', event.id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your hours have been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        } 
    })
};