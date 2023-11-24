"use client"

import { UserDetails } from "@/types/types"
import { createContext, useContext, useState } from "react";

type UserContextType = {
    user: UserDetails | null;
    setUser: (user: UserDetails | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserDetails | null>(null);
    const saveUser = (user: UserDetails | null) => {
        setUser(user);
        // localStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        if (user) {
            return user;
        }

        // const localStorageUser = localStorage.getItem('user');

        // if (localStorageUser) {
        //     return JSON.parse(localStorageUser);
        // }

        return null;
    }

    return (
        <UserContext.Provider value={{
            user: getUser(),
            setUser: saveUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }
    return context;
}