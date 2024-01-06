'use client'

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useMutation, useQueryClient } from 'react-query'
import { supabaseAdmin } from '@/libs/admin'
import toast from 'react-hot-toast'
import { useModal } from '@/hooks/useModal'
import { UserAdd } from 'iconsax-react'
import { Modal } from '@/components/Modal'

export const AddMemberModal = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const [contract, setContract] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useModal();

    const addMember = useMutation(
        async ({
            fullname,
            email,
            contract,
            position,
            role,
            id
        }: {
            fullname: string | null;
            email: string | null;
            role: string | null;
            contract: string | null;
            position: string | null;
            manager_id: string | undefined;
            id: string | null;
        }) => {
            await supabase
                .from('subordinates')
                .insert([
                    {
                        id: Math.random().toString(),
                        email: email ?? '',
                        full_name: fullname ?? '',
                        role: role ?? '',
                        contract: contract ?? '',
                        position: position ?? '',
                        manager_id: session?.user?.id,
                    },
                ])
        },
        {
            onSuccess: () => {
                toast.success('Profile updated!')
                queryClient.invalidateQueries(['subordinates', session?.user?.id])
            },
            onError: () => {
                toast.error('Error updating the data!')
            },
        }
    );

    const bodyContent = (
        <div className="form-widget flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
                <input className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="email"
                    type="text"
                    value={email || ''}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
                <input className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    placeholder='Full name'
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <input className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="position"
                    type="text"
                    value={position || ''}
                    placeholder='Position'
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="contract"
                    type="text"
                    value={contract || ''}
                    placeholder='Contract'
                    onChange={(e) => setContract(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <label htmlFor="ProjectManager">Project Manager</label>
                    <input
                        type='radio'
                        id="ProjectManager"
                        name="role"
                        value="Project manager"
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className='flex gap-2'>
                    <label htmlFor="worker">Worker</label>
                    <input
                        type='radio'
                        id="worker"
                        name="role"
                        value="Worker"
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button
                    className="px-4 py-2 rounded-full hover:opacity-90 transition bg-gradient-to-b from-violet-600 to-violet-500 text-white w-full"
                    onClick={async () => {
                        addMember.mutateAsync({
                            fullname,
                            email,
                            role,
                            contract,
                            position,
                            manager_id: session?.user?.id,
                            id: ""
                        })
                        await supabaseAdmin.auth.admin.inviteUserByEmail(email ?? '')
                    }}>
                    ADD MEMBER
                </button>
            </div>
        </div>
    )

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Add member"
                body={bodyContent}
            />
            <button className='fixed bottom-24 right-4 bg-gradient-to-b from-violet-600 to-violet-500 p-2 rounded-full min-[1024px]:w-fit min-[1024px]:flex min-[1024px]:gap-2 min-[1024px]:relative min-[1024px]:top-0 min-[1024px]:right-0 hover:opacity-90 transition'
                onClick={onOpen}>
                <p className='max-[1024px]:hidden text-white'>Add member</p>
                <UserAdd size="24" color="#fff" />
            </button>
        </>
    )
}