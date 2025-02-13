import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Hero />
      <Features />
    </div>
  );
}
