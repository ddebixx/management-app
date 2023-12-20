"use client"

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useQuery } from 'react-query'
import { DropDownMenu } from './DropDownMenu'
import { EditCandidateModal } from './EditCandidateModal'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { supabaseAdmin } from '@/libs/admin'

type Candidates = Database["public"]["Tables"]["recruitment"]["Row"]

const Pagination = dynamic(() => import("../Pagination"), {
    loading: () => <p>...</p>,
});


export const CandidateCard = () => {
    const supabase = createClientComponentClient<Database>()
    const [isData, setIsData] = useState<Candidates[]>([])
    const [candidateId, setCandidateId] = useState<any | null>(null);
    const [pdfUrls, setPdfUrls] = useState<{ [id: string]: string }>({});
    const searchParams = useSearchParams();
    const membersPerPage = 10;
    const page = Number(searchParams.get('page') ?? 1);
    const pathName = '/dashboard/recruitment';
    const [pageCount, setPageCount] = useState(0);

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
            <div className='flex items-start gap-4'>
                {isData.map((candidate) => (
                    <div key={candidate.id}>
                        <div onClick={() => handleCandidateSelect(candidate.id)}>
                            <DropDownMenu candidateId={candidate.id}
                                // setCandidateId={setCandidateId}
                            />
                        </div>

                        <div>
                            <p>{candidate.full_name}</p>
                            <p>{candidate.email}</p>
                            <p>{candidate.position}</p>
                            <p>{candidate.status}</p>
                        </div>
                        {pdfUrls[candidate.id] && (
                            <div>
                                <a href={pdfUrls[candidate.id]} download={`${candidate.full_name}.pdf`}>Download PDF</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {pageCount > 0 && <Pagination page={page} pageCount={pageCount} pathname={pathName} />}

            <EditCandidateModal candidateId={candidateId} />
        </>
    )
}