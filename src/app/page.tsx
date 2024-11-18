import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          {/* Main Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Your Home. Our Trusted Professionals.
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Connect with local service providers for all your home improvement needs.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/find-services"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-black hover:bg-gray-900 transition duration-150 ease-in-out shadow-sm"
              >
                Find Services
              </a>
              <a
                href="/post-job"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
              >
                Post a Job
              </a>
            </div>
          </div>
          
          {/* Background Pattern - Subtle Grid */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
