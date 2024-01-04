import { Navbar } from "@/components/Dashboard Components/Navbar"
import { CandidateCard } from "@/components/Dashboard Components/Recruitment/CandidateCard"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";

export default async function TasksPage() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full">
                    <CandidateCard session={session} />
                </div>
            </div>
        </>
    )
}