import { Navbar } from "@/components/Dashboard Components/Navbar"
import { AddMemberModal } from "@/components/Dashboard Components/TeamMembers/AddMemberModal"
import { TeamMemberCard } from "@/components/Dashboard Components/TeamMembers/TeamMemberCard"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function TeamMembersPage() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            {session?.user &&
                <div>
                    <Navbar />
                    <AddMemberModal session={session} />
                    <TeamMemberCard session={session} />
                </div>
            }
        </>
    )
}