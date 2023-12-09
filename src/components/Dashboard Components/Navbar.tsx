"use client"

import { useUserContext } from "@/actions/userContextProvider";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation"

export const Navbar = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();
    const { userRole } = useUserContext();

    console.log(userRole)

    return (
        <>
            <div>
                <div className="flex gap-4">

                    <Link href={"/dashboard/schedule"}>SCHEDULE</Link>
                    <Link href={"/dashboard/notes"}>NOTES</Link>
                    <Link href={"/dashboard/tasks"}>TASKS</Link>
                    
                    {(userRole === "Founder" || userRole === "Project manager") && (
                        <>
                            <Link href={"/dashboard/recruitment"}>RECRUITMENT</Link>
                            <Link href={"/dashboard/team-members"}>TEAM MEMBERS</Link>
                        </>
                    )}
                </div>
                <button onClick={async () => {
                    await supabase.auth.signOut();
                    router.push('/home')
                }} className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-400 p-4" type="submit">
                    Sign out
                </button>
            </div>
        </>
    )
}