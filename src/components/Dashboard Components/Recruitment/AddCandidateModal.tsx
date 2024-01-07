'use client'

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Modal } from '@/components/Modal'
import { useModal } from '@/hooks/useModal'
import { Database } from '@/types/supabase'
import { supabaseAdmin } from '@/libs/admin'
import toast from 'react-hot-toast'
import { UserAdd } from 'iconsax-react'
import { FileUpload } from '@mui/icons-material'
import { useUserContext } from '@/actions/userContextProvider'


export const AddCandidateModal = () => {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const { userId } = useUserContext();
    const { refetch } = useQuery(['recruitment', userId as string])
    const { isOpen, onOpen, onClose } = useModal();
    
    const { mutateAsync: addCandidate } = useMutation(
        async ({
            fullname,
            email,
            position,
            status,
            file_path,
            manager_id,
        }: {
            fullname: string | null;
            email: string | null;
            position: string | null;
            status: string | null;
            file_path: string | null;
            manager_id: string | null;
        }) => {
            await supabase
                .from('recruitment')
                .upsert([
                    {
                        email: email ?? '',
                        full_name: fullname ?? '',
                        position: position ?? '',
                        status: status ?? '',
                        file_path: file_path ?? '',
                        manager_id: manager_id ?? '',
                    },
                ])
        },
        {
            onSuccess: () => {
                toast.success('Candidate added successfully!');
                queryClient.invalidateQueries()
                refetch()

                onClose();
            },
            onError: () => {
                toast.error('Error updating the data!')
            },
        }
    );

    const uploadFileMutation = useMutation(
        async (file: File) => {
            const fileExt = file.name.split('.').pop()
            const filePath = `${userId}/${Math.random()}.${fileExt}`

            const { data, error } = await supabase.storage
                .from('CVs')
                .upload(filePath, file)
            if (error) {
                throw error
            }
            return data
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['recruitment'])

            },
            onError: () => {
                alert('Error updating the data!')
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
                <label className='font-bold text-base'
                    htmlFor="position">Position</label>
                <input
                    className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                    id="position"
                    type="text"
                    value={position || ''}
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <input
                    type="file"
                    id="file"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
                <label htmlFor="file" className="flex items-center gap-2 text-black cursor-pointer">
                    <FileUpload className='text-violet-600' />
                    <span>Select a file</span>
                </label>
                {file?.name && <p>{file.name}</p>}
            </div>
            <button
                className="px-4 py-2 rounded-full hover:opacity-90 transition bg-gradient-to-b from-violet-600 to-violet-500 text-white"
                onClick={() => {
                    if (file) {
                        const path = `applications/${file.name}+${Math.random()}`;

                        supabaseAdmin.storage.from('CVs').upload(path, file)
                            .then(response => {
                                if (response.error) {
                                    console.error('Error uploading file:', response.error.message);
                                } else {
                                    console.log('File uploaded successfully');
                                }
                            });

                        addCandidate({
                            fullname,
                            email,
                            position,
                            status: 'Received',
                            file_path: path,
                            manager_id: userId,
                        });
                    } else {
                        toast.error('Please upload a file')
                    }
                }}>
                DUPA
            </button>

        </div>
    )

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                body={bodyContent}
            />
            <button className='fixed bottom-24 right-4 bg-gradient-to-b from-violet-600 to-violet-500 p-2 rounded-full min-[1024px]:w-fit min-[1024px]:flex min-[1024px]:gap-2 min-[1024px]:relative min-[1024px]:top-0 min-[1024px]:right-0 hover:opacity-90 transition'
                onClick={onOpen}>
                <p className='max-[1024px]:hidden text-white'>Add candidate</p>
                <UserAdd size="24" color="#fff" />
            </button>
        </>
    )
}