import type { Metadata } from "next";
import dynamic from "next/dynamic";

// import { NotFound } from "@/components/not-found";

const NotFoundWithNoSSR = dynamic(
  () => import("../components/not-found").then((x) => x.NotFound),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "Not Found - SnipNest",
};

export default function NotFoundPage() {
  return <NotFoundWithNoSSR />;
}
