"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Note } from '@mui/icons-material'
import { Database } from '@/types/supabase'
import { Text } from 'slate'

const serialize = (node) => {
    if (Text.isText(node)) {
        if (node.code) {
            return <code>{node.text}</code>
        }
        if (node['heading-one']) {
            return (
                <h1 className="text-3xl font-cal md:text-6xl mb-10 text-gray-800">
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

type Note = Database["public"]["Tables"]["notes"]["Row"]

export const NoteEditor = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(true)
    const [isData, setIsData] = useState<Note[]>([])
    const user = session?.user
    const id = window.location.pathname.split("/")[3]

    const getNote = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("notes")
                .select("*")
                .eq("id", id as string);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getNote()
    }, [user, getNote])

    

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : isData.length > 0 ? (
                <div>
                    {isData.map((note) => (
                        <div key={note.id}>
                            {note.content.map((node, index) => (
                                <div key={index}>{serialize(node)}</div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
}