import { Navbar } from "@/components/Dashboard Components/Navbar"
import { TasksTable } from "@/components/Dashboard Components/Tasks/TasksTable"

export default async function TasksPage() {
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