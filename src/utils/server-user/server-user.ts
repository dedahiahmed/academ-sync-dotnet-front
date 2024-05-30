// user-fetcher.ts
import { NextRequest } from "next/server";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzg2MjU4NCwiaWF0IjoxNzA3ODYyNTg0fQ.5Ab6-iu6ds1--VS6JG5aLkpKSJggIL6f8c-nam79pPM";

export async function getCurrentUser(
  req: NextRequest
): Promise<Record<string, any>> {
  try {
    const encryptedToken = Cookies.get("accessToken");
    if (!encryptedToken) {
      throw new Error("Access token not found in the cookie");
    }

    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    const response = await fetch("/api/userme", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: decryptedToken,
        ...req.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current user data");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return {}; // Return empty object in case of error
  }
}
