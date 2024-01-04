import {
    useSessionContext,
    useUser as useSupaUser
} from "@supabase/auth-helpers-react";
import React, { createContext, useEffect } from "react";

type UserContextType = {
    userRole: string;
    setUserRole: (userRole: string) => void;
    userName: string;
    setUserName: (userName: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [userRole, setUserRole] = React.useState<string>("");
    const [userName, setUserName] = React.useState<string>("");
    const {
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();

    useEffect(() => {
        if (user) {
            const getUserRole = async () => {
                const { data: userData, error } = await supabase
                    .from("users")
                    .select("role, full_name")
                    .eq("id", user.id)
                    .single();
                if (error) {
                    console.log(error);
                }

                if (userData) {
                    setUserRole(userData.role);
                    setUserName(userData.full_name);
                }
            };
            getUserRole();
        }
    }, [user, supabase]);

    return (
        <UserContext.Provider value={{ userRole, setUserRole, userName, setUserName }}>
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