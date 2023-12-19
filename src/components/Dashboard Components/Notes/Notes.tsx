"use client"

import { Database } from "@/types/supabase"
import { Session, createClientComponentClient, } from "@supabase/auth-helpers-nextjs"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"

type Notes = Database["public"]["Tables"]["notes"]["Row"]

const Pagination = dynamic(() => import("../Pagination"), {
    loading: () => <p>...</p>,
});


export const Notes = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const user = session?.user
    const [isData, setIsData] = useState<Notes[]>([])
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const membersPerPage = 10;
    const page = Number(searchParams.get('page') ?? 1);
    const pathName = '/dashboard/notes';
    const [pageCount, setPageCount] = useState(0);

    const { data: notesData, isLoading, isError } = useQuery(
        ['notes', user?.id, page],
        async () => {
            const { data, error, status, count } = await supabase
                .from("notes")
                .select("*", { count: 'exact' })
                .eq("user_id", user?.id as string)
                .range((page - 1) * membersPerPage, page * membersPerPage - 1);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
                setPageCount(Math.ceil(count as number / membersPerPage));
                queryClient.invalidateQueries(['notes', user?.id]);
            }
        },
    );

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

            {pageCount > 0 && <Pagination page={page} pageCount={pageCount} pathname={pathName} />}
        </>
    )
}