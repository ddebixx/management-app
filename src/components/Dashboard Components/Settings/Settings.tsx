'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQueryClient } from 'react-query'
import { Modal } from '@/components/Modal'
import { Database } from '@/types/supabase'
import toast from 'react-hot-toast'
import { Setting2 } from 'iconsax-react'
import { useUserContext } from '@/actions/userContextProvider'
import { useSettingsModal } from '@/hooks/useSettingsModal'
import { useRouter } from 'next/navigation'
import { supabaseAdmin } from '@/libs/admin'
import Swal from 'sweetalert2'

export const Settings = () => {
    const supabase = createClientComponentClient<Database>()
    const { userName, userRole, userEmail, userId } = useUserContext();
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const queryClient = useQueryClient();
    const { isSettingsOpen, onSettingsOpen, onSettingsClose } = useSettingsModal();
    const router = useRouter();

    const updateUserMutation = useMutation(
        ['users'],
        async ({
            fullname,
            email,
        }: {
            fullname: string | null;
            email: string | null;
        }) => {
            await supabase
                .from('users')
                .update({
                    full_name: fullname ?? '',
                    email: email ?? '',
                })
                .eq('id', userId)
        },
        {
            onSuccess: () => {
                toast.success('User updated successfully!');
                queryClient.invalidateQueries(["users"])

                onSettingsClose();
            },
        }
    );

    const deleteUserMutation = useMutation(
        ['users'],
        async () => {
            await supabase
                .from('users')
                .delete()
                .eq('id', userId)
        },
        {
            onSuccess: () => {
                toast.success('Account deleted successfully!');
                router.push('/')
            },
        }
    );

    const deleteAccount = async () => {
        await supabaseAdmin.auth.admin.deleteUser(userId)
    }

    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteUserMutation.mutateAsync()
                deleteAccount()
            }
        });
    }

    const bodyContent = (
        <>
            <div className="flex flex-col items-start justify-center gap-8">
                <div className="flex items-center gap-4 max-[1024px]:hidden">
                    <div className="bg-violet-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl uppercase">
                        <p>
                            {userName.split(' ').map(name => name.charAt(0)).join('')}
                        </p>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-violet-600 truncate w-32">{userName}</h1>
                        <p className="text-base font-semibold text-black/70">{userRole}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-base'
                            htmlFor="fullname">Full name</label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-base'
                            htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col justify-start mt-4 gap-4">
                        <button
                            className="px-4 py-2 rounded-full hover:opacity-90 transition bg-gradient-to-b from-violet-600 to-violet-500 text-white"
                            onClick={() => updateUserMutation.mutateAsync({
                                fullname,
                                email
                            })}> Update user </button>
                        <button
                            className="px-4 py-2 rounded-full hover:opacity-90 transition bg-gradient-to-b from-red-600 to-red-500 text-white"
                            onClick={() => {
                                handleDelete()
                            }}> Delete account </button>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            <Modal
                isOpen={isSettingsOpen}
                onClose={onSettingsClose}
                body={bodyContent}
            />
            <button className="max-[1024px]:hidden p-2 transition rounded-full hover:text-white hover:bg-gradient-to-b hover:from-violet-600 hover:to-violet-500 text-[#404040] flex self-end gap-4"
                onClick={onSettingsOpen}>
                <Setting2 size="24" />
                <p className='max-[1024px]:hidden'>Settings</p>
            </button>
        </>
    )
}