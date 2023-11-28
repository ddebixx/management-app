import { Navbar } from "@/components/Dashboard Components/Navbar";
import { AddNoteModal } from "@/components/Dashboard Components/Notes/Editor";
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

// "use client"

// import CKeditor from "@/components/Dashboard Components/Notes/Editor";
// import { useEffect, useState } from "react";

// export default function NotesPage() {
//     const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
//     const [data, setData] = useState<string>("");

//     useEffect(() => {
//         setEditorLoaded(true);
//     }, []);

//     return (
//         <div>
//             <CKeditor
//                 value={""}
//                 name="description"
//                 onChange={(data: string) => {
//                     setData(data);
//                 }}
//                 editorLoaded={editorLoaded}
//             />
//             <div>{JSON.stringify(data)}</div>
//         </div>
//     );
// }