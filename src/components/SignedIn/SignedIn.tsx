import { accessToken } from "@/utils/token/token";
import { getCurrentUser } from "@/utils/user-me/userme";
import React, { ReactNode, useEffect, useState } from "react";

export default function SignedIn({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getCurrentUser();
        console.log("token", accessToken);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  return isLoggedIn ? <>{children}</> : null;
}
