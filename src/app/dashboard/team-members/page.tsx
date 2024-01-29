import { Navbar } from "@/components/Dashboard Components/Navbar"
import { TeamMemberCard } from "@/components/Dashboard Components/TeamMembers/TeamMemberCard"

export default function TeamMembersPage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;
    
    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full max-[320px]:p-4">
                    <TeamMemberCard />
                </div>
            </div>
        </>
    )
}