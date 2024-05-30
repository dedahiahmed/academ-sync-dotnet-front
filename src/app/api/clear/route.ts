// pages/api/clear-cookie.js

import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  const url = new URL("/?cookieCleared=true", req.url); // Construct redirect URL

  return NextResponse.redirect(url);
}
