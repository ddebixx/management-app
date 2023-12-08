import {
    useSessionContext,
    useUser as useSupaUser
} from "@supabase/auth-helpers-react";
import React, { createContext, useEffect } from "react";

type UserContextType = {
    userRole: string;
    setUserRole: (userRole: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [userRole, setUserRole] = React.useState<string>("");
    const {
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();

    useEffect(() => {
        if (user) {
            const getUserRole = async () => {
                const { data: userRole, error } = await supabase
                    .from("users")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                if (error) {
                    console.log(error);
                }

                if (userRole) {
                    setUserRole(userRole.role);
                }
            };
            getUserRole();
        }
    }, [user, supabase]);

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider"
        );
    }
    return context;
}