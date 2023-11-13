import UserDetailsModal from "@/components/UserDetailsModal/UserDetailsModal";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Register() {

    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <UserDetailsModal session={session} />
            </div>
        </>
    )
}