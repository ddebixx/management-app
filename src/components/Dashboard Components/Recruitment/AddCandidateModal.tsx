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


export const AddCandidateModal = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const { refetch } = useQuery(['recruitment', session?.user.id])
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
            const filePath = `${session?.user.id}/${Math.random()}.${fileExt}`

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
                <input type="file"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
            </div>
            <div>
                <button
                    className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4"
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
                                manager_id: session?.user.id as string,
                            });
                        } else {
                            toast.error('Please upload a file')
                        }
                    }}>
                    DUPA
                </button>
            </div>
        </div>
    )

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Add candidate"
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