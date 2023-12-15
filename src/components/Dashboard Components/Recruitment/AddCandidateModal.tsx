'use client'

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQueryClient } from 'react-query'
import { Modal } from '@/components/Modal'
import { useModal } from '@/hooks/useModal'
import { Database } from '@/types/supabase'
import { supabaseAdmin } from '@/lib/admin'


export const AddCandidateModal = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const { isOpen, onOpen, onClose } = useModal();
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();

    const addCandidate = useMutation(
        async ({
            fullname,
            email,
            position,
            status
        }: {
            fullname: string | null;
            email: string | null;
            position: string | null;
            status: string | null;
        }) => {
            await supabase
                .from('recruitment')
                .upsert([
                    {
                        email: email ?? '',
                        full_name: fullname ?? '',
                        position: position ?? '',
                        status: status ?? '',
                    },
                ])
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['recruitment'])
                onClose();
            },
            onError: () => {
                alert('Error updating the data!')
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
                onClose();
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

                                        supabase.from('recruitment').insert([
                                            {
                                                file_path: path ?? '',
                                                status: 'Received',
                                                email: email ?? '',
                                                full_name: fullname ?? '',
                                                position: position ?? '',
                                            },
                                        ]).then(insertResponse => {
                                            if (insertResponse.error) {
                                                console.error('Error inserting file path:', insertResponse.error.message);
                                            } else {
                                                console.log('File path inserted successfully');
                                                onClose();
                                            }
                                        });
                                    }
                                });
                        }
                    }}>
                    DUPA
                </button>
            </div>
        </div>
    )

    return (
        <>
            {session?.user &&
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    title="Add candidate"
                    body={bodyContent}
                />
            }
            <button onClick={onOpen}
                className="button relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transtion w-full bg-violet-600 p-4">
                Add candidate
            </button>
        </>
    )
}