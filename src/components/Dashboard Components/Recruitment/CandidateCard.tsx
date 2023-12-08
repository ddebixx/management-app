"use client"

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useQuery, useQueryClient } from 'react-query'
import { DropDownMenu } from './DropDownMenu'
import { EditCandidateModal } from './EditCandidateModal'

type Candidates = Database["public"]["Tables"]["recruitment"]["Row"]

export const CandidateCard = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const [isData, setIsData] = useState<Candidates[]>([])
    const [candidateId, setCandidateId] = useState<any | null>(null);
    const queryClient = useQueryClient();

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
                    </div>
                ))}
            </div>

            {candidateId && (
                <EditCandidateModal candidateId={candidateId} />
            )}
        </>
    )
}
