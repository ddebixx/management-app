"use client"

import { useUserContext } from "@/actions/userContextProvider"
import { Database } from "@/types/supabase"
import { Session, createClientComponentClient, } from "@supabase/auth-helpers-nextjs"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { AddNoteModal } from "./AddNoteModal"

type Notes = Database["public"]["Tables"]["notes"]["Row"]

const Pagination = dynamic(() => import("../Pagination"), {
    loading: () => <p>...</p>,
});


export const Notes = () => {
    const supabase = createClientComponentClient<Database>()
    const [isData, setIsData] = useState<Notes[]>([])
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const notesPerPage = 10;
    const page = Number(searchParams.get('page') ?? 1);
    const pathName = '/dashboard/notes';
    const [pageCount, setPageCount] = useState(0);
    const { userName, userId } = useUserContext();
    const [searchPrompt, setSearchPrompt] = useState("");
    const filteredData = isData.filter(item => item.title && item.title.includes(searchPrompt));

    const { data: notesData, isLoading, isError } = useQuery(
        ['notes', userId, page],
        async () => {
            const { data, error, status, count } = await supabase
                .from("notes")
                .select("*", { count: 'exact' })
                .eq("user_id", userId)
                .range((page - 1) * notesPerPage, page * notesPerPage - 1);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
                setPageCount(Math.ceil(count as number / notesPerPage));
                queryClient.invalidateQueries(['notes', userId]);
            }
        },
    );

    return (
        <>
            <div className="p-4 border-[1px] rounded-lg bg-white w-full h-[80vh] overflow-y-auto">
                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        {userName && (
                            <div className="flex flex-col justify-end">
                                <h1 className="text-3xl font-bold truncate min-[768px]:text-4xl">
                                    Hello, <span className="bg-clip-text text-transparent bg-gradient-to-b from-violet-600 to-violet-500">{userName}</span>
                                </h1>

                                {isData.length > 0 && (
                                    <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">Your notes are waiting for you!</p>
                                )}

                                {isData.length === 0 && (
                                    <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">You have no notes yet. Create one!</p>
                                )}
                            </div>
                        )}
                        <div className="flex justify-between">
                            <input
                                className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                                type="text"
                                placeholder="Search"
                                value={searchPrompt}
                                onChange={(e) => setSearchPrompt(e.target.value)}
                            />
                            <AddNoteModal />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-4 min-[1024px]:grid-cols-4 grid-template-rows-1fr-1fr-1fr">
                        {filteredData.map((note) => (
                            <Link href={`/dashboard/note/${note.id}`}
                                key={note.id}
                                passHref>
                                <div className="flex flex-col justify-center items-start p-4 w-full bg-white rounded-lg border-[1px] hover:border-violet-300 transition shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] gap-4"
                                    key={note.id}>
                                    <div>
                                        <label className="block text-black text-lg font-bold mb-2" htmlFor="title">
                                            Title
                                        </label>
                                        <p className="text-black/70 text-base">
                                            {note.title}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-black text- font-bold mb-2" htmlFor="createdAt">
                                            Created At
                                        </label>
                                        <p className="text-black/70 text-sm">
                                            {new Date(note.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                        }
                    </div>

                    {pageCount > 1 && <Pagination page={page} pageCount={pageCount} pathname={pathName} />}
                </div>
            </div>
        </>
    )
}