import { Navbar } from "@/components/Dashboard Components/Navbar"
import Schedule from "@/components/Dashboard Components/Schedule/Schedule"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"

export default async function SchedulePage() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    

    return (
        <>
            {session?.user &&
                <div>
                    <Schedule session={session} />
                    <Navbar session={session} />
                </div>
            }
        </>
    )
}