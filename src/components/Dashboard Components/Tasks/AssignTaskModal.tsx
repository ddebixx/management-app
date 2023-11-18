'use client'

import { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'


type Members = Database["public"]["Tables"]["subordinates"]["Row"]

export default function AssignTasksModal({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(true)
    const [managerName, setManagerName] = useState<string | null>(null)
    const [expiryDate, setExpiryDate] = useState<string | null>(null)
    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskDescription, setTaskDescription] = useState<string | null>(null)
    const [assignmentDate, setAssignmentDate] = useState<string | null>(null)
    const [workerId, setWorkerId] = useState<string | null>(null)
    const [isData, setIsData] = useState<Members[]>([])
    const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
    const [selectedWorkerName, setSelectedWorkerName] = useState<string | null>(null);

    const user = session?.user
    const router = useRouter();

    const getWorker = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("subordinates")
                .select("*")
                .eq("manager_id", user?.id as string);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
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
        managerId = user?.id,
        workerId,
        workerName,
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
                        assigned_manager: managerId ?? '',
                        assigned_worker: workerId ?? '',
                        task_name: taskName ?? '',
                        task_description: taskDescription ?? '',
                        worker_name: workerName ?? ''
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
                        <select
                            value={selectedWorkerId || ''}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                const selectedName = isData.find(member => member.id === selectedId)?.full_name || '';
                                setSelectedWorkerId(selectedId);
                                setSelectedWorkerName(selectedName);
                            }}
                        >
                            {isData.map((member) => (
                                <option key={member.id} value={member.id}>{member.full_name}</option>
                            ))}
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
                                    managerId: user?.id,
                                    workerId: selectedWorkerId,
                                    workerName: selectedWorkerName,
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