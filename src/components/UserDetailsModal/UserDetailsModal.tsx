'use client'

import { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'
import { useUserContext } from '@/actions/userContextProvider'
import { useMutation, useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { Modal } from '../Modal'

export default function UserDetailsModal({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const router = useRouter();
    const { userRole } = useUserContext();

    const updateProfile = useMutation(
        async ({
            fullname,
            email,
            role
        }: {
            fullname: string | null | undefined;
            email: string | null | undefined;
            role: string | null | undefined;
        }) => {
            await supabase
                .from('users')
                .upsert([
                    {
                        email: email ?? '',
                        full_name: fullname ?? '',
                        role: role ?? ''
                    },
                ])
        },
        {
            onSuccess: () => {
                alert('Profile updated!')
            },
            onError: () => {
                alert('Error updating the data!')
            },
        }
    );

    const updateSubordinate = useMutation(
        async ({
            fullname,
            email,
            role,
            id
        }: {
            fullname: string | null | undefined;
            email: string | null | undefined;
            role: string | null | undefined;
            id: string | null | undefined;
        }) => {
            await supabase
                .from('subordinates')
                .update({
                    email: email ?? '',
                    full_name: fullname ?? '',
                    role: role ?? '',
                    id: session?.user?.id
                })
                .eq('email', email ?? '')
        },
        {
            onSuccess: () => {
                toast.success('Profile updated!')
            },
            onError: () => {
                toast.error('Error updating the data!')
            },
        }
    );

    const bodyContent = (
        <>
            {!userRole && (
                <div className="form-widget flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-base'
                            htmlFor="email">Email</label>
                        <input className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                            id="email"
                            type="text"
                            value={email || ''}
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
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <label htmlFor="founder">Founder</label>
                            <input
                                type='radio'
                                id="founder"
                                name="role"
                                value="founder"
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
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
                            onClick={() => {
                                updateProfile.mutateAsync({ fullname, email, role })
                                updateSubordinate.mutateAsync({ fullname, email, role, id: session?.user?.id })

                                router.push('/dashboard/schedule')
                            }
                            }
                        >
                            Update profile
                        </button>
                    </div>
                    <div>
                        <button onClick={async () => {
                            await supabase.auth.signOut();
                            router.push('/home')
                        }} className="px-4 py-2 rounded-full hover:opacity-90 transition bg-violet-400 text-white w-full" type="submit">
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </>
    )

    return (
        <>
            <Modal isOpen={true}
                onClose={() => router.push('/home')}
                title='User details'
                body={bodyContent}
            />
        </>
    )
}