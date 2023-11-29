"use client"

import { Database } from "@/types/supabase"
import { Session, createClientComponentClient, } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

type Notes = Database["public"]["Tables"]["notes"]["Row"]

export const Notes = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const user = session?.user
    const [loading, setLoading] = useState(true)
    const [isData, setIsData] = useState<Notes[]>([])
    const getNotes = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("notes")
                .select("*")
                .eq("user_id", user?.id as string);

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
    }, [user, supabase])

    useEffect(() => {
        getNotes()
    }, [user, getNotes])

    return (
        <>
            {
                isData.map((note) => (
                    <div className="flex flex-col justify-center items-center">
                        <Link href={`/dashboard/note/${note.id}`} 
                        passHref
                        key={note.id}>
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Title
                                    </label>
                                    <p className="text-gray-700 text-base">
                                        {note.title}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                                        Content
                                    </label>
                                    {/* <p className="text-gray-700 text-base">
                                        {note.content as string}
                                    </p> */}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdAt">
                                        Created At
                                    </label>
                                    <p className="text-gray-700 text-base">
                                        {note.created_at}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </>
    )
}