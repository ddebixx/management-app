"use client"

import { Auth } from "@supabase/auth-ui-react";
import { Modal } from "./Modal"
import { useAuthModal } from "@/hooks/useAuthModal"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export const AuthModal = () => {
    const supabaseClient = createClientComponentClient<Database>()
    const router = useRouter()
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    useEffect(() => {
        if (session) {
            onClose()
        }
    }, [session, router, onClose])

    return (
        <Modal
            title="Welcome back!"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}>
             <Auth
                theme="dark"
                magicLink
                providers={['google']}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: "#22c55e",
                            }
                        }
                    }
                }} />
        </Modal>
    )
}