'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Modal } from '@/components/Modal'
import { Database } from '@/types/supabase'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useSecondModal } from '@/hooks/useSecondModal'


export default function EditTaskModal({ taskToEdit }: { taskToEdit: number }) {
    const supabase = createClientComponentClient<Database>()
    const [status, setStatus] = useState<string | null>(null)
    const [expiryDate, setExpiryDate] = useState<string | null>(null)
    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskDescription, setTaskDescription] = useState<string | null>(null)
    const { isOpen, onOpen, onClose } = useSecondModal();
    const queryClient = useQueryClient();
    const location = typeof window !== 'undefined' ? window.location : undefined;

    useEffect(() => {
        if (taskToEdit) {
            onOpen();
        }
    }, [taskToEdit, onOpen]);

    const updateTaskMutation = useMutation(
        ["tasks"],
        async ({
            status,
            expiryDate,
            taskName,
            taskDescription,
            taskToEdit,
        }: {
            status: string | null | undefined;
            expiryDate: string | null | undefined;
            taskName: string | null | undefined;
            taskDescription: string | null | undefined;
            taskToEdit: number;
        }) => {
            await supabase
                .from("tasks")
                .update({
                    task_status: status ?? "",
                    expiry_date: expiryDate ?? "",
                    task_name: taskName ?? "",
                    task_description: taskDescription ?? "",
                })
                .eq("id", taskToEdit);
        },
        {
            onSuccess: () => {
                toast.success("Task updated successfully!");
                queryClient.invalidateQueries(["tasks"]);
                onClose();
            },
        }
    );

    const bodyContent = (
        <div className="form-widget">
            <div>
                Status
                <select
                    className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="taskStatus"
                    value={status || ''}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value=""></option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELED">CANCELED</option>
                    <option value="EXPIRED">EXPIRED</option>
                </select>
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
                <button
                    className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
                    onClick={async () => updateTaskMutation.mutateAsync({
                        status,
                        expiryDate,
                        taskName,
                        taskDescription,
                        taskToEdit
                    })
                    }
                >
                    Edit
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Modal isOpen={isOpen}
                onClose={onClose}
                title="Edit task"
                body={bodyContent}
            />
        </>
    );
}