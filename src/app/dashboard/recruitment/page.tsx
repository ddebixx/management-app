import { Navbar } from "@/components/Dashboard Components/Navbar"
import { AddCandidateModal } from "@/components/Dashboard Components/Recruitment/AddCandidateModal"
import { CandidateCard } from "@/components/Dashboard Components/Recruitment/CandidateCard"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function TasksPage () {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    return (
        <>
            <div>
                <Navbar />
                <AddCandidateModal session={session} />
                <CandidateCard />
            </div>
        </>
    )
}