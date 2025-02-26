import { AuthorizationContext } from "@/providers/AuthorizationProvider";
import { useContext } from "react";

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (context === null)
    throw new Error(
      "useAuthorization must be used within a AuthorizationProvider"
    );

  return context;
};
