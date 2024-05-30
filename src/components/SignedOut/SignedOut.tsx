import React, { ReactNode, useEffect, useState } from "react";

import { access } from "fs";

import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/utils/user-me/userme";
import { accessToken } from "@/utils/token/token";

export default function SignedOut({ children }: { children: ReactNode }) {
  const [isSignedOut, setIsSignedOut] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getCurrentUser();
        setIsSignedOut(false); // Token is valid
      } catch (error) {
        setIsSignedOut(true); // Token is invalid or expired
      }
    };

    checkAuthentication();
  }, []);

  return isSignedOut ? <>{children}</> : null;
}
