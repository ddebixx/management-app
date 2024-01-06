'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Database } from '@/types/supabase'
import { Modal } from '@/components/Modal'
import { useSecondModal } from '@/hooks/useSecondModal'
import toast from 'react-hot-toast'


export const EditCandidateModal = ({ candidateId }: { candidateId: number }) => {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useSecondModal();
    const { refetch } = useQuery(['recruitment', candidateId])

    useEffect(() => {
        if (candidateId) {
            onOpen();
        }
    }, [candidateId, onOpen]);

    const updateCandidateMutation = useMutation(
        async ({
            fullname,
            email,
            position,
        }: {
            fullname: string | null;
            email: string | null;
            position: string | null;
        }) => {
            await supabase
                .from("recruitment")
                .update({
                    full_name: fullname ?? "",
                    email: email ?? "",
                    position: position ?? "",
                })
                .eq("id", candidateId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["recruitment"]);
                toast.success("Candidate updated successfully!");

                refetch()
                onClose();
            },
        }
    );

    const bodyContent = (
        <div className="form-widget flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="email">Email</label>
                <input className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="email"
                    type="text"
                    value={email || ''}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="fullName">Full name</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    placeholder='Full name'
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold text-base'
                    htmlFor="position">Position</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="position"
                    type="text"
                    value={position || ''}
                    placeholder='Position'
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>
            <button
                className="px-4 py-2 rounded-full hover:opacity-90 transition bg-gradient-to-b from-violet-600 to-violet-500 text-white w-full"
                onClick={() => updateCandidateMutation.mutateAsync(
                    {
                        fullname,
                        email,
                        position,
                    }
                )}>
                Edit
            </button>
        </div>
    )

    return (
        <>
            <Modal isOpen={isOpen}
                onClose={onClose}
                body={bodyContent}
            />
        </>
    )
}