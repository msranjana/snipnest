import type { Metadata } from "next";

import { NotFound } from "@/components/not-found";

export const metadata: Metadata = {
  title: "Not Found - SnipNest",
};

export default function NotFoundPage() {
  return <NotFound />;
}
