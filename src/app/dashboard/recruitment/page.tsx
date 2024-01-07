import { Navbar } from "@/components/Dashboard Components/Navbar"
import { CandidateCard } from "@/components/Dashboard Components/Recruitment/CandidateCard"

export default async function TasksPage() {
    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full">
                    <CandidateCard />
                </div>
            </div>
        </>
    )
}