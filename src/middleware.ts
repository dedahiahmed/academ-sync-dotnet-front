// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const restrictedRoutes = ["/new-course", "/gestion-cours"];
  const { pathname } = req.nextUrl;
  if (restrictedRoutes.includes(pathname)) {
    try {
      // Extract cookies from the incoming request
      const cookiesHeader = req.headers.get("Cookie");
      const cookies: Record<string, string> = {};

      if (cookiesHeader) {
        cookiesHeader.split(";").forEach((cookie) => {
          const [name, value] = cookie.split("=").map((c) => c.trim());
          cookies[name] = value;
        });
      }

      // Get the access token from cookies
      const accessToken = cookies["access_token"] || "";

      // Fetch user data from the API, including the access token dynamically
      const response = await fetch("http://localhost:8000/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log("userData:", userData);

      // Check if user is authorized based on role
      if (!userData || !userData.role) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Add additional role-based authorization logic if needed
      if (userData.role !== "ADMIN" && userData.role !== "TEACHER") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|_next/static|_next/image|favicon.ico|assets\\/api).*)",
  ],
};
