import { Navbar } from "@/components/Dashboard Components/Navbar"
import { Schedule } from "@/components/Dashboard Components/Schedule/Schedule"

export default function SchedulePage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full max-[320px]:p-4">
                    <Schedule />
                </div>
            </div>
        </>
    )
}