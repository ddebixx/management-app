import { Navbar } from "@/components/Dashboard Components/Navbar";
import { NoteEditor } from "@/components/Dashboard Components/Notes/NoteEditor";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NotePage() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full">
                    <NoteEditor />
                </div>
            </div>
        </>
    )
}