"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthorizationContext = React.createContext<ContextType | null>(null);

const AuthorizationProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const router = useRouter();
    const pathname = usePathname();
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        console.log("***********" + pathname);
        const role = localStorage.getItem("role");
        if(pathname.includes("login") || pathname.includes("register")) return;
        if (role == "admin") {
            if (!pathname.includes("admin")) {router.back();};
        } else if (role == "client") {
            if (!pathname.includes("client")) router.back();
        } else if (role == "manager") {
            if (!pathname.includes("manager")) router.back();
        } else if (role == "member") {
            if (!pathname.includes("member")) router.back();
        }
    }, [pathname]);

    return (
        <>
            <AuthorizationContext.Provider value={{ token, setToken }}>
                {children}
            </AuthorizationContext.Provider>
        </>
    )
}

export { AuthorizationContext, AuthorizationProvider }
