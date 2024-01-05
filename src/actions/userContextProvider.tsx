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
    userEmail: string;
    setUserEmail: (userEmail: string) => void;
    userId: string;
    setUserId: (userId: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [userRole, setUserRole] = React.useState<string>("");
    const [userName, setUserName] = React.useState<string>("");
    const [userEmail, setUserEmail] = React.useState<string>("");
    const [userId, setUserId] = React.useState<string>("");
    const {
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();

    useEffect(() => {
        if (user) {
            const getUserRole = async () => {
                const { data: userData, error } = await supabase
                    .from("users")
                    .select("role, full_name, email, id")
                    .eq("id", user.id)
                    .single();
                if (error) {
                    console.log(error);
                }

                if (userData) {
                    setUserRole(userData.role);
                    setUserName(userData.full_name);
                    setUserEmail(userData.email);
                    setUserId(userData.id);
                }
            };
            getUserRole();
        }
    }, [user, supabase]);

    return (
        <UserContext.Provider value={{ 
            userRole, 
            setUserRole, 
            userName, 
            setUserName, 
            userEmail,
            setUserEmail,
            userId,
            setUserId }}>
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