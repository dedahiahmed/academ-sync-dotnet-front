import { NextApiRequest, NextApiResponse } from "next";

export function clearServerSideCookies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Access cookies from the request object
  const cookies = req.headers.cookie?.split(";") || [];

  // Clear each cookie by setting an empty value and an expired date
  cookies.forEach((cookie) => {
    const [name] = cookie.split("=");
    res.setHeader(
      "Set-Cookie",
      `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    );
  });
}
