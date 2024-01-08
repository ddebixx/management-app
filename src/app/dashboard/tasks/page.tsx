import { Navbar } from "@/components/Dashboard Components/Navbar"
import { TasksTable } from "@/components/Dashboard Components/Tasks/TasksTable"

export default function TasksPage() {
    const location = typeof window !== 'undefined' ? window.location : undefined;

    return (
        <>
            <div className="flex gap-16 items-center">
                <Navbar />
                <div className="p-8 w-full">
                    <TasksTable />
                </div>
            </div>
        </>
    )
}