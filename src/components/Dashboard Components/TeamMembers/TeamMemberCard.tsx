"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

type Members = Database["public"]["Tables"]["subordinates"]["Row"]

const Pagination = dynamic(() => import("../Pagination"), {
    loading: () => <p>...</p>,
});


export const TeamMemberCard = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Members[]>([])
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const user = session?.user;
    const searchParams = useSearchParams();
    const membersPerPage = 10;
    const page = Number(searchParams.get('page') ?? 1);
    const pathName = '/dashboard/team-members';

    const { data: memberData, isLoading, isError } = useQuery(
        ['subordinates', page],
        async () => {
            const { data, error, count, status } = await supabase
                .from("subordinates")
                .select("*", { count: 'exact' })
                .eq("manager_id", user?.id as string)
                .range((page - 1) * membersPerPage, page * membersPerPage - 1);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
                setPageCount(Math.ceil(count as number / membersPerPage));
            }

            setLoading(false);
        },
    );

    return (
        <>
            <div>
                {loading && <div>Loading...</div>}
                {isData.map((member) => (
                    <div key={member.id}>
                        <p>{member.full_name}</p>
                        <p>{member.email}</p>
                    </div>
                ))}
            </div>
            {pageCount > 0 && <Pagination page={page} pageCount={pageCount} pathname={pathName} />}
        </>
    );
}