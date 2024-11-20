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
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50 -mt-[64px] pt-[64px]">
        <Hero />
        <ServiceAssistance />
        <HomeownersCTA />
        <CommunityPowerCTA />
        <FAQ />
      </div>
      <Footer />
    </>
  )
}
