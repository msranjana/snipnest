import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { ipAddress } from "@vercel/functions";

import { type NextRequest, NextResponse } from "next/server";

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
});

export default async function middleware(request: NextRequest) {
  const ip = ipAddress(request) || "127.0.0.1";

  if (ip === "127.0.0.1") return NextResponse.next();

  const { success } = await rateLimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.json(
        { status: 429, message: "Rate limit exceeded." },
        {
          status: 429,
        },
      );
}

export const config = {
  matcher: "/api/:path*",
};
