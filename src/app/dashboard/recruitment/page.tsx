import { Navbar } from "@/components/Dashboard Components/Navbar"
import { CandidateCard } from "@/components/Dashboard Components/Recruitment/CandidateCard"

export default function TasksPage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full max-[320px]:p-4">
                    <CandidateCard />
                </div>
            </div>
        </>
    )
}