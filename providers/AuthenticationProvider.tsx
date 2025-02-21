import React, { useEffect } from "react"

const AuthenticationProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            window.location.href = '/login'
        }
    }, [token]);

    return (
        <>
            {children}
        </>
    )
}
