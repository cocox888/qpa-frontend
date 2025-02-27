"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ContextType = {
    totalTime: number | null;
    setTotalTime: React.Dispatch<React.SetStateAction<number | null>>;
};

const TotalTimeContext = React.createContext<ContextType | null>(null);

const TotalTimeProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [totalTime, setTotalTime] = React.useState<number | null>(null);
    return (
        <>
            <TotalTimeContext.Provider value={{ totalTime, setTotalTime }}>
                {children}
            </TotalTimeContext.Provider>
        </>
    )
}

export { TotalTimeContext, TotalTimeProvider }
