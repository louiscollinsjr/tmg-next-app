// import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HomeownersCTA from "@/components/HomeownersCTA";
import CommunityPowerCTA from "@/components/CommunityPowerCTA";
import Hero from "@/components/Hero";
import ServiceAssistance from "@/components/ServiceAssistance";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="bg-zinc-100">
        <Hero />
      </div>
      <Footer />
    </div>
  )
}
