import Schedule from "@/components/Schedule/Schedule"
import { useGetAllHours } from "@/hooks/Schedule/useGetAllHours"
import { Database } from "@/types/supabase"
import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"

export default async function SchedulePage() {

    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <Schedule session={session} />
        </>
    )
}