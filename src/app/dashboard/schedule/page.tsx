import { Navbar } from "@/components/Dashboard Components/Navbar"
import Schedule from "@/components/Dashboard Components/Schedule/Schedule"

export default async function SchedulePage() {
    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full">
                    <Schedule />
                </div>
            </div>
        </>
    )
}