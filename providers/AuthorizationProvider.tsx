"use client"
import { useAuthorization } from "@/hooks/useAuthorization"

const AuthorizationProvider = () => {
    const flag = useAuthorization();
    return (
        <></>
    );
}

export default AuthorizationProvider