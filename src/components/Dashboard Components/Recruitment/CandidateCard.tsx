"use client"

import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type Candidates = Database["public"]["Tables"]["recruitment"]["Row"]

export const CandidateCard = ({ session }: { session: Session | null}) => {
    const supabase = createClientComponentClient<Database>()
    const [isData, setIsData] = useState<Candidates[]>([])
    const queryClient = useQueryClient();

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
            <div>
                {isData.map((candidate) => (
                    <div key={candidate.id}>
                        <p>{candidate.full_name}</p>
                        <p>{candidate.email}</p>
                        <p>{candidate.position}</p>
                        <p>{candidate.status}</p>
                    </div>
                ))}
            </div>
        </>
    )
}