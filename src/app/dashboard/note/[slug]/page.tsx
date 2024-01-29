import { Navbar } from "@/components/Dashboard Components/Navbar";
import { NoteEditor } from "@/components/Dashboard Components/Notes/NoteEditor";

export default function NotePage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full max-[320px]:p-4">
                    <NoteEditor />
                </div>
            </div>
        </>
    )
}
