import { Navbar } from "@/components/Dashboard Components/Navbar";
import { Notes } from "@/components/Dashboard Components/Notes/Notes";

export default function NotesPage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
<<<<<<< HEAD
                <div className="p-8 w-full">
=======
                <div className="p-8 w-full max-[320px]:p-4">
>>>>>>> 95309d9 (Project reupload)
                    <Notes />
                </div>
            </div>
        </>
    )
}