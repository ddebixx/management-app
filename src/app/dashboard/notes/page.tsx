import { Navbar } from "@/components/Dashboard Components/Navbar";
import { Notes } from "@/components/Dashboard Components/Notes/Notes";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NotesPage() {

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full">
                    <Notes />
                </div>
            </div>
        </>
    )
}