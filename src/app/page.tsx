// import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// import ProfessionalCTA from "@/components/ProfessionalCTA";
import HomeownersCTA from "@/components/HomeownersCTA";
import CommunityPowerCTA from "@/components/CommunityPowerCTA";
// import Testimonials from "@/components/Testimonials";
// import MissionStatement from "@/components/MissionStatement";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-primary">
        {/* Hero Section */}
        <main className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-44 pb-16 text-center md:min-h-[75vh] flex flex-col justify-center">
          {/* Main Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-8 font">tmg.com</h1>
            <h1 className="text-4xl sm:text-7xl font-bold text-white tracking-tight mb-2">
              Find trusted pros, recommended by our community.
            </h1>
            <p className="text-xl text-white/80 my-8">
              Connect with Community-Recommended Service Professionals!
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/find-services"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-primary bg-white hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
              >
                Find Services
              </a>
              <a
                href="/post-job"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-semibold rounded-lg text-white hover:bg-white/10 transition duration-150 ease-in-out shadow-sm"
              >
                Start a Project
              </a>
            </div>
          </div>
          
          {/* Background Pattern - Subtle Grid */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
        </main>
        
        {/* <MissionStatement /> */}
        <HomeownersCTA />
        <CommunityPowerCTA />
        
        {/* <ProfessionalCTA />
         */}
      </div>
      <Footer />
    </>
  );
}
