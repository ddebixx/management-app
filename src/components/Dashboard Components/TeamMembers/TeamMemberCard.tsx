"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react";

type Members = Database["public"]["Tables"]["subordinates"]["Row"]

export const TeamMemberCard = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Members[]>([])
    const [loading, setLoading] = useState(true);
    const user = session?.user;
    
    const getMembers = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase.from("subordinates").select("*").eq("manager_id", user?.id as string);
        
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getMembers();
    }, [getMembers, user]);

    return (
        <>
            <div>
                
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