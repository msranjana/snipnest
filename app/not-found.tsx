import type { Metadata } from "next";

import { NotFound } from "@/components/not-found";

export const metadata: Metadata = {
  title: "Not Found - SnipNest",
};

export const dynamic = "force-dynamic";

export default function NotFoundPage() {
  return <NotFound />;
}
