'use client'

import { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'

export default function AssignTasksModal({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(true)
    const [managerName, setManagerName] = useState<string | null>(null)
    const [expiryDate, setExpiryDate] = useState<string | null>(null)
    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskDescription, setTaskDescription] = useState<string | null>(null)
    const [assignmentDate, setAssignmentDate] = useState<string | null>(null)
    const [workerName, setWorkerName] = useState<string | null>(null)
    const [workerId, setWorkerId] = useState<string | null>(null)
    const user = session?.user
    const router = useRouter();

    const getWorker = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('tasks')
                .select(`worker_name, assigned_worker`)
                .eq('assigned_manager', user?.id as string)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setWorkerName(data.worker_name);
                setWorkerId(data.assigned_worker);
            }
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getWorker()

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setAssignmentDate(formattedDate);
    }, [user, getWorker])

    async function updateTask({
        managerName,
        assignmentDate,
        expiryDate,
        workerName,
        managerId = user?.id,
        workerId,
        taskName,
        taskDescription
    }: {
        managerName: string | null | undefined;
        assignmentDate: string | null | undefined;
        expiryDate: string | null | undefined;
        workerName: string | null | undefined;
        managerId: string | null | undefined;
        workerId: string | null | undefined;
        taskName: string | null | undefined;
        taskDescription: string | null | undefined;
    }) {
        if (!session?.user) {
            router.push('/home');
        }

        try {
            setLoading(true)

            const { error } = await supabase 
                .from('tasks')
                .upsert([
                    {
                        manager_name: managerName ?? '',
                        assignment_date: assignmentDate ?? '',
                        expiry_date: expiryDate ?? '',
                        worker_name: workerName ?? '',
                        assigned_manager: managerId ?? '',
                        assigned_worker: workerId ?? '',
                        task_name: taskName ?? '',
                        task_description: taskDescription ?? ''
                    }
                ])
                .eq('id', user?.id as string);
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            {session?.user.role && (
                <div className="form-widget">
                    <div>
                        <input
                            className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                            id="managerName"
                            type="text"
                            placeholder='Manager name'
                            value={managerName || ''}
                            onChange={(e) => setManagerName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                            id="taskName"
                            type="text"
                            value={taskName || ''}
                            placeholder='Task name'
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                            id="taskDescription"
                            type="text"
                            value={taskDescription || ''}
                            placeholder='Task description'
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="expieryDate">Set task expiry date</label>
                        <input
                            className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                            id="expiryDate"
                            type="date"
                            value={expiryDate || ''}
                            placeholder='Task expiry date'
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                    <div>
                    <select>
                        <option value="workerId">{workerName}</option>
                    </select>
                    </div>
                    <div>
                        <button
                            className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
                            onClick={async () => {
                                await updateTask({
                                    managerName,
                                    assignmentDate,
                                    expiryDate,
                                    workerName,
                                    managerId: user?.id,
                                    workerId,
                                    taskName,
                                    taskDescription
                                });
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Loading ...' : 'Update'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}