import { EventApi, EventClickArg, EventContentArg } from "@fullcalendar/core"

export const handleEvents = (events: EventApi[]) => {
    ({
        currentEvents: events
    })
}

export const renderEventContent = (eventContent: EventContentArg) => {

    console.log('Event Content:', eventContent);

    return (
        <div className="flex flex-col items-start p-2 text-base min-w-[20px] max-w-[200px] truncate text-[#5498DC]">
            <b className="truncate w-36">{eventContent.event.title}</b>
            <p>{eventContent.event.startStr.split('T')[1]}</p>
            <p>{eventContent.event.endStr.split('T')[1]}</p>
        </div>
    )
}

export const handleEventClick = async (clickInfo: EventClickArg) => {
    const event: EventApi = clickInfo.event;
    const id = event.url;
    clickInfo.jsEvent.preventDefault();
};