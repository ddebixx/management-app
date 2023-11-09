// "use client"

// import { useCallback, useEffect, useState } from "react"
// import {
//     SubmitHandler,
//     useForm
// } from "react-hook-form"
// import { Input } from "../Inputs/Input";
// import { useModal } from "@/hooks/useModal";
// import { Modal } from "../Modal";
// import { UserDetails } from "@/hooks/UserDetails/types";

// export const UserDetailsModal = () => {
//     const usePersonalDataModal = useModal();
//     const [isLoading, setIsLoading] = useState(false);

//     const {
//         register,
//         formState: {
//             errors,
//         },
//     } = useForm<UserDetails>({
//         defaultValues: {
//             id: 0,
//             email: "",
//             position: "",
//             full_name: "",
//         },
//     });


//     const bodyContent = (
//         <div className="flex flex-col gap-4">
//             <Input
//                 id="full_name"
//                 label="Full name"
//                 register={register}
//                 disabled={isLoading}
//                 errors={errors}
//                 required
//             />
//             <Input
//                 id="email"
//                 label="Email"
//                 register={register}
//                 errors={errors}
//                 disabled={isLoading}
//                 required
//             />
//             <Input
//                 id="position"
//                 label="Stanowisko"
//                 register={register}
//                 errors={errors}
//                 disabled={isLoading}
//                 required
//             />
//         </div>
//     )

//     return (
//         <>
//             <Modal
//                 isOpen={usePersonalDataModal.isOpen}
//                 title="Dodaj nowego użytkownika"
//                 actionLabel="Dodaj"
//                 onSubmit={() => {}}
//                 body={bodyContent}
//                 disabled={isLoading}
//                 onClose={usePersonalDataModal.onClose}
//             />
//         </>
//     );
// }

'use client'
import { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useRouter } from 'next/navigation'

export default function UserDetailsModal({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const user = session?.user
    const router = useRouter();

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('users')
                .select(`full_name, position, email`)
                .eq('id', user?.id as any)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFullname(data.full_name);
                setPosition(data.position);
                setEmail(data.email);
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
        position,
        fullname,
        email,
    }: {
        position?: string | null | undefined;
        fullname?: string | null | undefined;
        email?: string | null | undefined;
    }) {

        try {
            setLoading(true)

            const { error } = await supabase.from('users').upsert([
                {
                    email: email ?? '',
                    full_name: fullname ?? '',
                    position: position ?? '',
                },
            ]);
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <div>
                <input className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed' id="email" type="text" value={session?.user.email} disabled />
            </div>
            <div>
                <input
                    className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div>
                <input
                    className='peer w-full p-4 font-light bg-white border-[.5px] rounded-2xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
                    id="position"
                    type="text"
                    value={position || ''}
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
                    onClick={() => updateProfile({ fullname, position, email })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-400 p-4" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}