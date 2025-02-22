"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const useAuthorization = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role == "admin") {
      if (!pathname.indexOf("admin")) router.back();
    } else if (role == "client") {
      if (!pathname.indexOf("client")) router.back();
    } else if (role == "manager") {
      if (!pathname.indexOf("manager")) router.back();
    } else if (role == "member") {
      if (!pathname.indexOf("member")) router.back();
    }
  }, [pathname]);

  return { flag };
};
