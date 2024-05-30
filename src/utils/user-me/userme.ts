import { accessToken } from "../token/token";

export async function getCurrentUser(): Promise<Record<string, any>> {
  try {
    const response = await fetch("/api/userme", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken, // Include the authorization token
      },
    });
    console.log("tokwnfinodv", accessToken);
    if (!response.ok) {
      throw new Error("Failed to fetch current user data");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("An error occurred while fetching current user data");
  }
}
