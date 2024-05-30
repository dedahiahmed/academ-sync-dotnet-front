import { accessToken } from "@/utils/token/token";

export async function getAllCourses(): Promise<Record<string, any>> {
  try {
    const response = await fetch("/api/get-courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses data");
    }

    const courses = await response.json();
    return courses.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("An error occurred while fetching courses data");
  }
}
