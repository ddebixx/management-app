"use client"

import { useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useQuery } from 'react-query'
import { DropDownMenu } from './DropDownMenu'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { supabaseAdmin } from '@/libs/admin'
import { AddCandidateModal } from './AddCandidateModal'
import { useUserContext } from '@/actions/userContextProvider'
import Link from 'next/link'
import { EditCandidateModal } from './EditCandidateModal'
import { Download } from '@mui/icons-material'

type Candidates = Database["public"]["Tables"]["recruitment"]["Row"]

const Pagination = dynamic(() => import("../Pagination"), {
    loading: () => <p>...</p>,
});


export const CandidateCard = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const [isData, setIsData] = useState<Candidates[]>([])
    const [candidateId, setCandidateId] = useState<any | null>(null);
    const [pdfUrls, setPdfUrls] = useState<{ [id: string]: string }>({});
    const searchParams = useSearchParams();
    const membersPerPage = 10;
    const page = Number(searchParams.get('page') ?? 1);
    const pathName = '/dashboard/recruitment';
    const [pageCount, setPageCount] = useState(0);
    const { userName } = useUserContext();
    const [searchPrompt, setSearchPrompt] = useState("");
    const filteredData = isData.filter(item => item.full_name && item.full_name.includes(searchPrompt));

    const handleCandidateSelect = (candidateId: number) => {
        setCandidateId(candidateId);
    };

    const { data: candidateData, isLoading, isError } = useQuery(
        ['recruitment', isData, page],
        async () => {
            const { data, error, status, count } = await supabase
                .from("recruitment")
                .select("*", { count: 'exact' })
                .eq("manager_id", (await supabase.auth.getUser()).data.user?.id as string)
                .range((page - 1) * membersPerPage, page * membersPerPage - 1);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
                setPageCount(Math.ceil(count as number / membersPerPage));
            }
        },
    );

    useEffect(() => {
        isData.forEach((candidate) => {
            if (candidate.file_path) {
                supabaseAdmin.storage.from('CVs').download(candidate.file_path)
                    .then(({ data, error }) => {
                        if (error) {
                            console.error('Error downloading file:', error.message);
                        } else if (data) {
                            const url = URL.createObjectURL(data);
                            setPdfUrls((prevUrls) => ({ ...prevUrls, [candidate.id]: url }));
                        }
                    });
            }
        });
    }, [isData]);

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
                                    <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">There is your list of candidates!</p>
                                )}

                                {isData.length === 0 && (
                                    <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">No applications yet</p>
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
                            <AddCandidateModal session={session} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-4 min-[1024px]:grid-cols-3 grid-template-rows-1fr-1fr-1fr">
                        {filteredData.map((candidate) => (
                            <div className="flex justify-between items-start p-4 w-full bg-white rounded-lg border-[1px] hover:border-violet-300 transition shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] gap-4"
                                key={candidate.id}>
                                <div className='flex gap-4'>
                                    <div className="bg-violet-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl uppercase">
                                        <p>
                                            {candidate.full_name?.split(' ').map(name => name.charAt(0)).join('')}
                                        </p>
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex gap-2 items-center max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1'>
                                                <p className='font-bold text-xl truncate max-[600px]:text-lg'>
                                                    {candidate.full_name}
                                                </p>
                                                <p className='bg-violet-600/10 w-fit rounded-lg text-xs p-1'>
                                                    {candidate.position}
                                                </p>
                                            </div>

                                            <p className='text-black/70'>
                                                {candidate.email}
                                            </p>
                                        </div>

                                        {pdfUrls[candidate.id] && (
                                            <div className='text-violet-500 w-fit text-lg font-semibold max-[600px]:text-base'>
                                                <Link className='text-black/80'
                                                    href={pdfUrls[candidate.id]} download={`${candidate.full_name}.pdf`}>
                                                    Download CV
                                                </Link>
                                                <Download />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div onClick={() => handleCandidateSelect(candidate.id)}>
                                    <DropDownMenu candidateId={candidate.id} />
                                </div>

                            </div>
                        ))
                        }
                    </div>

                    {pageCount > 1 && <Pagination page={page} pageCount={pageCount} pathname={pathName} />}
                </div>
            </div>
            <EditCandidateModal candidateId={candidateId} />
        </>
    )
}