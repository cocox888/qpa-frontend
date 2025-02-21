import React from "react";

export default function ForgetLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div  className="w-full max-w-md mx-auto">
            {children}
        </div>


    )
}