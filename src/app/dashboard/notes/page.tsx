import { Navbar } from "@/components/Dashboard Components/Navbar";
import { Notes } from "@/components/Dashboard Components/Notes/Notes";

export default function NotesPage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full max-[480px]:p-0">
                    <div className="p-8 w-full max-[320px]:p-4">
                        <Notes />
                    </div>
                </div>
            </div>
        </>
    )
}