'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { Modal } from '@/components/Modal'
import Swal from 'sweetalert2'


export default function EditTaskModal({ taskToEdit }: { taskToEdit: number }) {
    const supabase = createClientComponentClient<Database>()
    const [status, setStatus] = useState<string | null>(null)
    const [expiryDate, setExpiryDate] = useState<string | null>(null)
    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskDescription, setTaskDescription] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (taskToEdit) {
            setIsOpen(true);
        }
    })

    console.log(taskToEdit);

    async function updateTask({
        status,
        expiryDate,
        taskName,
        taskDescription,
        taskToEdit
    }: {
        status: string | null | undefined;
        expiryDate: string | null | undefined;
        taskName: string | null | undefined;
        taskDescription: string | null | undefined;
        taskToEdit: number;
    }) {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({
                    task_status: status ?? '',
                    expiry_date: expiryDate ?? '',
                    task_name: taskName ?? '',
                    task_description: taskDescription ?? '',
                })
                .eq('id', taskToEdit);
        } catch (error) {
            throw error;
        }
    }

    const bodyContent = (
        <div className="form-widget">
            <div>
                <input
                    className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="taskStatus"
                    type="text"
                    placeholder='Status'
                    value={status || ''}
                    onChange={(e) => setStatus(e.target.value)}
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
                <button
                    className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
                    onClick={async () => {
                        await updateTask({
                            status,
                            expiryDate,
                            taskName,
                            taskDescription,
                            taskToEdit
                        });
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Modal isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Edit task"
                body={bodyContent}
            />
        </>
    );
}