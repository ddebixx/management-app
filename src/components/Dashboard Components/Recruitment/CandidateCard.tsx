"use client"

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useQuery, useQueryClient } from 'react-query'
import { DropDownMenu } from './DropDownMenu'
import { EditCandidateModal } from './EditCandidateModal'
import { supabaseAdmin } from '@/lib/admin'

type Candidates = Database["public"]["Tables"]["recruitment"]["Row"]

export const CandidateCard = () => {
    const supabase = createClientComponentClient<Database>()
    const [isData, setIsData] = useState<Candidates[]>([])
    const [candidateId, setCandidateId] = useState<any | null>(null);
    const queryClient = useQueryClient();
    const [pdfUrls, setPdfUrls] = useState<{ [id: string]: string }>({});

    const handleCandidateSelect = (candidateId: number) => {
        setCandidateId(candidateId);
    };

    const { data: candidateData, isLoading, isError } = useQuery(
        ['recruitment'],
        async () => {
            const { data, error, status } = await supabase
                .from("recruitment")
                .select("*")

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
                queryClient.invalidateQueries(['recruitment']);
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
                    <div>
                        <div onClick={() => handleCandidateSelect(candidate.id)}>
                            <DropDownMenu candidateId={candidateId}
                                setCandidateId={setCandidateId}
                            />
                        </div>

                        <div key={candidate.id}>
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


            {candidateId && (
                <EditCandidateModal candidateId={candidateId} />
            )}
        </>
    )
}
