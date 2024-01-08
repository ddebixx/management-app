'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSecondModal } from '@/hooks/useSecondModal'
import { Modal } from '@/components/Modal'
import toast from 'react-hot-toast'
import { Task } from 'iconsax-react'
import { useUserContext } from '@/actions/userContextProvider'

type Members = Database["public"]["Tables"]["subordinates"]["Row"]

export default function AssignTasksModal() {
    const supabase = createClientComponentClient<Database>()
    const [managerName, setManagerName] = useState<string | null>(null)
    const [expiryDate, setExpiryDate] = useState<string | null>(null)
    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskDescription, setTaskDescription] = useState<string | null>(null)
    const [isData, setIsData] = useState<Members[]>([])
    const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
    const [selectedWorkerName, setSelectedWorkerName] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useSecondModal();
    const { userId } = useUserContext();
    
    const { data: workerData, isLoading, isError } = useQuery(
        ['subordinates', userId],
        async () => {
            const { data, error, status } = await supabase
                .from("subordinates")
                .select("*")
                .eq("manager_id", userId as string);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
                queryClient.invalidateQueries(['subordinates', userId]);
            }
        },
    );

    const updateTaskMutation = useMutation(
        async ({
            managerName,
            assignmentDate,
            expiryDate,
            managerId = userId,
            workerId,
            workerName,
            taskName,
            taskDescription,
            taskStatus,
        }: {
            managerName: string | null;
            assignmentDate: string | null;
            expiryDate: string | null;
            workerName: string | null;
            managerId: string | undefined;
            workerId: string | null;
            taskName: string | null;
            taskDescription: string | null;
            taskStatus: string | null;
        }) => {
            await supabase
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
                        worker_name: workerName ?? '',
                        task_status: taskStatus ?? '',
                    },
                ])
                .eq('id', userId);
        },
        {
            onSuccess: () => {
                toast.success('Task assigned successfully!');
                queryClient.invalidateQueries(['tasks', userId]);
            },
            onError: (error) => {
                throw error;
            },
        }
    );


    const bodyContent = (
        <div className="form-widget flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="managerName">Manager name</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="managerName"
                    type="text"
                    placeholder='Manager name'
                    value={managerName || ''}
                    onChange={(e) => setManagerName(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="taskName">Task name</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="taskName"
                    type="text"
                    value={taskName || ''}
                    placeholder='Task name'
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="taskDescription">Task description</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="taskDescription"
                    type="text"
                    value={taskDescription || ''}
                    placeholder='Task description'
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="exiryDate">Task expiry date</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="expiryDate"
                    type="date"
                    value={expiryDate || ''}
                    placeholder='Task expiry date'
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <select className='border-[1px] p-2 rounded-full'
                    value={selectedWorkerId || ''}
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedName = isData.find(member => member.id === selectedId)?.full_name || '';
                        setSelectedWorkerId(selectedId);
                        setSelectedWorkerName(selectedName);
                    }}
                >
                    <option value="">Select worker</option>
                    {isData.map((member) => (
                        <option key={member.id} value={member.id}>{member.full_name}</option>
                    ))}
                </select>
            </div>
            <button
                className="px-4 py-2 rounded-full hover:opacity-90 transition bg-gradient-to-b from-violet-600 to-violet-500 text-white w-full"
                onClick={async () => {
                    await updateTaskMutation.mutateAsync({
                        managerName,
                        assignmentDate: new Date().toISOString(),
                        expiryDate,
                        managerId: userId,
                        workerId: selectedWorkerId,
                        workerName: selectedWorkerName,
                        taskName,
                        taskDescription,
                        taskStatus: "ACTIVE"
                    });
                }}>
                Update
            </button>
        </div>
    )

    return (
        <>
            <Modal isOpen={isOpen}
                onClose={onClose}
                body={bodyContent}
            />
            <button className='fixed bottom-24 right-4 bg-gradient-to-b from-violet-600 to-violet-500 p-2 rounded-full min-[1024px]:w-fit min-[1024px]:flex min-[1024px]:gap-2 min-[1024px]:relative min-[1024px]:top-0 min-[1024px]:right-0 hover:opacity-90 transition'
                onClick={onOpen}>
                <p className='max-[1024px]:hidden text-white'>Add task</p>
                <Task size="24" color="#fff" />
            </button>
        </>
    );
}