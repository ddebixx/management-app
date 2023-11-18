import { Navbar } from "@/components/Dashboard Components/Navbar"
import AssignTasksModal from "@/components/Dashboard Components/Tasks/AssignTaskModal"
import { TasksTable } from "@/components/Dashboard Components/Tasks/TasksTable"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function TasksPage () {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    return (
        <>
            <div>
                <Navbar session={session} />
                <TasksTable session={session} />
                <AssignTasksModal session={session} />
            </div>
        </>
    )
}