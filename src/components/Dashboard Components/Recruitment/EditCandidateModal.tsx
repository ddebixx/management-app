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
        <div>
            <div>
                <input className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="email"
                    type="text"
                    value={email || ''}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input
                    className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    placeholder='Full name'
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div>
                <input
                    className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="position"
                    type="text"
                    value={position || ''}
                    placeholder='Position'
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
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
        </div>
    )

    return (
        <>
            <Modal isOpen={isOpen}
                onClose={onClose}
                title="Edit candidate"
                body={bodyContent}
            />
        </>
    )
}