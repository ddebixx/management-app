'use client'

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useMutation, useQueryClient } from 'react-query'


export default function AddMemberModal({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [contract, setContract] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const queryClient = useQueryClient();

    const addMember = useMutation(
        async ({
            fullname,
            email,
            contract,
            position,
            role,
            workStart
        }: {
            fullname: string | null;
            email: string | null;
            role: string | null;
            contract: string | null;
            position: string | null;
            workStart: Date | null;
        }) => {
            await supabase
                .from('subordinates')
                .upsert([
                    {
                        email: email ?? '',
                        full_name: fullname ?? '',
                        role: role ?? '',
                        contract: contract ?? '',
                        position: position ?? '',
                        work_start: workStart ?? '',
                    },
                ])
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['subordinates', session?.user?.id])
                alert('Profile updated!')
            },
            onError: () => {
                alert('Error updating the data!')
            },
        }
    );

    return (
        <>
            {session?.user &&
                <div className="h-screen">
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
                        <input
                            className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                            id="contract"
                            type="text"
                            value={contract || ''}
                            placeholder='Contract'
                            onChange={(e) => setContract(e.target.value)}
                        />
                        <input
                            className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                            id="workStart"
                            type="date"
                            value={startDate ? startDate.toISOString().slice(0, 10) : ''}
                            placeholder='Work start date'
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="Founder">Founder</label>
                        <input type='radio' id="Founder" value="Founder" onChange={(e) => setRole(e.target.value)} />
                        <label htmlFor="ProjectManager">Project Manager</label>
                        <input type='radio' id="ProjectManager" value="Project manager" onChange={(e) => setRole(e.target.value)} />
                        <label htmlFor="worker">Worker</label>
                        <input type='radio' id="worker" value="Worker" onChange={(e) => setRole(e.target.value)} />
                    </div>
                    <div>
                        <button
                            className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
                            onClick={async () => {
                                await addMember.mutateAsync({ fullname, email, role, contract: '', position: '', workStart: new Date() })
                                const { data, error } = await supabase.auth.signInWithOtp({
                                    email: email as string,
                                    options: {
                                        shouldCreateUser: true,
                                        emailRedirectTo: 'https://localhost:3000/register',
                                    },
                                })
                            }
                            }
                        >
                            DUPA
                        </button>
                    </div>
                </div>
            }
        </>
    )
}