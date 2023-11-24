"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation"

export const Navbar = ({ session }: { session: Session | null }) => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <>
            <div>
                <div className="flex gap-4">
                    <Link href={"/dashboard/team-members"}>TEAM MEMBERS</Link>
                    <Link href={"/dashboard/schedule"}>SCHEDULE</Link>
                    <Link href={"/dashboard/tasks"}>TASKS</Link>
                    <Link href={"/dashboard/notes"}>NOTES</Link>
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