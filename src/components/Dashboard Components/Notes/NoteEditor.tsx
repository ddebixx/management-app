"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { Text } from 'slate'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const serialize = (node) => {
    if (Text.isText(node)) {
        if (node.code) {
            return <code>{node.text}</code>
        }
        if (node['heading-one']) {
            return (
                <h1 className="text-3xl mb-10 text-gray-800 max-[768px]:text-2xl">
                    {node.text}
                </h1>
            )
        }

        if (node.bold && node.italic) {
            return <p className="font-bold italic font-cal">{node.text}</p>
        }

        if (node.bold) {
            return <strong className="font-bold font-cal">{node.text}</strong>
        }

        if (node.italic) {
            return <i className="font-italic font-cal">{node.text}</i>
        }

        if (node['heading-two']) {
            return <h2 className="text-2xl font-cal">{node.text}</h2>
        }

        return node.text
    }

    const children = node?.children.map((n) => serialize(n))

    switch (node.type) {
        case 'block-quote':
            return <blockquote>{children}</blockquote>
        case 'italic':
            return <em className="italic">{children}</em>
        case 'underline':
            return <p className="underline">{children}</p>

        case 'heading-one':
            return <h1 className="text-4xl">{children}</h1>
        case 'heading-two':
            return <h2 className="text-2xl">{children}</h2>
        case 'code':
            return <code className="bg-gray-50 p-2 m-2">{children}</code>

        case 'list-item':
            return <li>{children}</li>
        case 'numbered-list':
            return <ol>{children}</ol>
        default:
            return <p>{children}</p>
    }
}

export const NoteEditor = () => {
    const supabase = createClientComponentClient<Database>();
    const id = window.location.pathname.split("/")[3];
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: notesData, isLoading, isError } = useQuery(['note', id], async () => {
        const { data, error, status } = await supabase
            .from("notes")
            .select("*")
            .eq("id", id as string);

        if (error && status !== 406) {
            throw error;
        }

        return data;
    });

    const deleteNoteMutation = useMutation(
        async (noteId: string) => {
            await supabase
                .from("notes")
                .delete()
                .eq("id", noteId as string);
        },
        {
            onSuccess: () => {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your note has been deleted.",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
                router.push("/dashboard/notes");
                queryClient.invalidateQueries(['note', id]);
            },
            onError: () => {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error",
                    timer: 1000
                });
            }
        }
    )

    const handleNoteDelete = async (noteId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                await deleteNoteMutation.mutateAsync(noteId);
            },
        });
    }

    return (
        <div className="p-4 border-[1px] rounded-lg bg-white w-full h-[80vh] flex flex-col gap-4">
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error loading data.</p>
            ) : notesData && notesData.length > 0 ? (
                <>
                    {notesData.map((note) => (
                        <div className="w-full border-[1px] h-full rounded-lg p-4 overflow-y-auto"
                            key={note.id}>
                            {Array.isArray(note.content) ? (
                                note.content.map((node, index) => (
                                    <div key={index}>{serialize(node)}</div>
                                ))
                            ) : (
                                <p>No content available for this note.</p>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <p>No data available.</p>
            )}
            <button
                className='bg-gradient-to-b from-red-600 to-red-500 hover:opacity-90 transition text-white font-bold py-2 px-6 rounded-full self-start'
                onClick={() => handleNoteDelete(id)}>
                DELETE
            </button>
        </div>
    );
};
