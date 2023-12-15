'use client'

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'
import { useUserContext } from '@/actions/userContextProvider'
import { useMutation } from 'react-query'

export default function InvitedUserModal({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
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

    return (
        <>
            {!userRole && (
                <div className="form-widget">
                    <div>
                        <input className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed' id="email" type="text" value={email || ''}
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
                            id="fullName"
                            type="password"
                            value={password || ''}
                            placeholder='Full name'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Founder">Founder</label>
                        <input type='checkbox' id="Founder" value="Founder" onChange={(e) => setRole(e.target.value)} />
                        <label htmlFor="ProjectManager">Project Manager</label>
                        <input type='checkbox' id="ProjectManager" value="Project manager" onChange={(e) => setRole(e.target.value)} />
                        <label htmlFor="worker">Worker</label>
                        <input type='checkbox' id="worker" value="Worker" onChange={(e) => setRole(e.target.value)} />
                    </div>
                    <div>
                        <button
                            className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
                            onClick={async () => {
                                updateProfile.mutateAsync({ fullname, email, role })

                                const { data, error } = await supabase.auth.signUp({
                                    email: email ?? '',
                                    password: password ?? '',
                                })

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
                        }} className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-400 p-4" type="submit">
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}