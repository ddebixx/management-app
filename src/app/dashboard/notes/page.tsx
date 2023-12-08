import { Navbar } from "@/components/Dashboard Components/Navbar";
import { AddNoteModal } from "@/components/Dashboard Components/Notes/AddNoteModal";
import { Notes } from "@/components/Dashboard Components/Notes/Notes";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NotesPage() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <Navbar session={session} />
            <AddNoteModal session={session} />
            <Notes session={session} />
        </>
    )
}