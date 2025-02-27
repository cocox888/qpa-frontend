import { TotalTimeContext } from "@/providers/TotalTimeProvider";
import { useContext } from "react";

export const useTotalTime = () => {
  const context = useContext(TotalTimeContext);
  if (context === null)
    throw new Error(
      "useTotalTime must be used within a TotalTimeProvider"
    );
  return context;
};
