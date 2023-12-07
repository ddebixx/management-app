"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { useQuery } from "react-query";

type Members = Database["public"]["Tables"]["subordinates"]["Row"]

export const TeamMemberCard = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Members[]>([])
    const [loading, setLoading] = useState(true);
    const user = session?.user;

    const { data: memberData, isLoading, isError } = useQuery(
        ['subordinates', user?.id],
        async () => {
            const { data, error, status } = await supabase
                .from("subordinates")
                .select("*")
                .eq("manager_id", user?.id as string);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
            }

            setLoading(false);
        },
    );

    console.log(user?.id);

    return (
        <>
            <div>
                {loading && <div>Loading...</div>}
                {isData.map((member) => (
                    <div key={user?.id}>
                        <p>{member.full_name}</p>
                        <p>{member.email}</p>
                    </div>
                ))}

            </div>
        </>
    )
}