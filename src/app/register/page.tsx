import UserDetailsModal from "@/components/UserDetailsModal/UserDetailsModal";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Register() {
  
    
    
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <UserDetailsModal  />
            </div>
        </>
    )
}