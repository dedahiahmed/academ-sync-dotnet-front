import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export default function Logout() {
  const [isClearing, setIsClearing] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsClearing(true);

    try {
      // Clear local storage item for immediate effect
      localStorage.removeItem("accessToken");

      // Trigger server-side cookie clearing
      Cookies.remove("accessToken"); // Replace with actual cookie names
      Cookies.remove("access_token");

      // Reload the page to apply server-side changes
      router.reload();
    } catch (error) {
      console.error("Error clearing cookies:", error);
      // Handle errors gracefully, inform user if needed
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="hidden md:inline-block lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
      disabled={isClearing}
    >
      <HiOutlineLogout className="inline-block mr-2" />
      Se déconnecter
    </button>
  );
}
