import Schedule from "@/components/Schedule/Schedule"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"
import { useRouter } from "next/navigation"

export default async function SchedulePage() {

    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            {session?.user &&
                <Schedule session={session} />
            }
        </>
    )
}