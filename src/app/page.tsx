// import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// import ProfessionalCTA from "@/components/ProfessionalCTA";
import HomeownersCTA from "@/components/HomeownersCTA";
import CommunityPowerCTA from "@/components/CommunityPowerCTA";
import MissionStatement from "@/components/MissionStatement";
// import Testimonials from "@/components/Testimonials";
// import MissionStatement from "@/components/MissionStatement";
import AIAssistantDemo from "@/components/AIAssistantDemo";
import Hero from "@/components/Hero";
import ServiceAssistance from "@/components/ServiceAssistance";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 -mt-[64px] pt-[64px]">
        <Hero />
        <ServiceAssistance />
        <HomeownersCTA />
        <CommunityPowerCTA />
        <MissionStatement />
        <AIAssistantDemo />
      </div>
      <Footer />
    </>
  )
}
