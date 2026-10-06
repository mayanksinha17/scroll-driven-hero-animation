import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090D] text-gray-100 selection:bg-emerald-500 selection:text-black">
      <Hero />
      <Features />
    </main>
  );
}
