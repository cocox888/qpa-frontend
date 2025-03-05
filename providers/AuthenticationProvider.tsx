"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthenticationContext = React.createContext<ContextType | null>(null);

const AuthenticationProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const router = useRouter();
    const pathname = usePathname();
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        const access_token =  localStorage.getItem('refresh_token');
        console.log("access_token: ", access_token);
        if (!access_token) {
            router.push('/login');
        }
    }, [pathname]);

    return (
        <>
            <AuthenticationContext.Provider value={{ token, setToken }}>
                {children}
            </AuthenticationContext.Provider>
        </>
    )
}

export { AuthenticationContext, AuthenticationProvider }
