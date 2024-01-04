"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useUserContext } from "@/actions/userContextProvider";
import { AddMemberModal } from "./AddMemberModal";
import { DropDownMenu } from "./DropDownMenu";

type Members = Database["public"]["Tables"]["subordinates"]["Row"]

const Pagination = dynamic(() => import("../Pagination"), {
    loading: () => <p>...</p>,
});


export const TeamMemberCard = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Members[]>([])
    const [loading, setLoading] = useState(true);
    const [memberId, setMemberId] = useState<any | null>(null);
    const user = session?.user;
    const searchParams = useSearchParams();
    const membersPerPage = 10;
    const page = Number(searchParams.get('page') ?? 1);
    const pathName = '/dashboard/recruitment';
    const [pageCount, setPageCount] = useState(0);
    const { userName } = useUserContext();
    const [searchPrompt, setSearchPrompt] = useState("");
    const filteredData = isData.filter(item => item.full_name && item.full_name.includes(searchPrompt));

    const handleMemberSelect = (memberId: number) => {
        setMemberId(memberId);
    };

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
            <div className="p-4 border-[1px] rounded-lg bg-white w-full h-[80vh] overflow-y-auto">
                {loading && <div>Loading...</div>}
                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        {userName && (
                            <div className="flex flex-col justify-end">
                                <h1 className="text-3xl font-bold truncate min-[768px]:text-4xl">
                                    Hello, <span className="bg-clip-text text-transparent bg-gradient-to-b from-violet-600 to-violet-500">{userName}</span>
                                </h1>

                                {isData.length > 0 && (
                                    <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">There are your team members!</p>
                                )}

                                {isData.length === 0 && (
                                    <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">No team members yet</p>
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
                            <AddMemberModal session={session} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-4 min-[1024px]:grid-cols-4 grid-template-rows-1fr-1fr-1fr">
                        {filteredData.map((member) => (
                            <div className="flex justify-between items-start p-4 w-full bg-white rounded-lg border-[1px] hover:border-violet-300 transition shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] gap-4"
                                key={member.id}>
                                <div className='flex gap-4'>
                                    <div className="bg-violet-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl uppercase">
                                        <p>
                                            {member.full_name?.split(' ').map(name => name.charAt(0)).join('')}
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex gap-2 items-center max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1'>
                                                <p className='font-bold text-xl truncate max-[600px]:text-lg'>
                                                    {member.full_name}
                                                </p>
                                                <p className='bg-violet-600/10 w-fit rounded-lg text-xs p-1'>
                                                    {member.position}
                                                </p>
                                            </div>
                                            <p className='text-black/70'>
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => handleMemberSelect}>
                                    <DropDownMenu memberId={member.id} />
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    {pageCount > 1 && <Pagination page={page} pageCount={pageCount} pathname={pathName} />}
                </div>
            </div>
        </>
    );
};