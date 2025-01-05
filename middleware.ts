import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";

import { type NextRequest, NextResponse } from "next/server";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
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
