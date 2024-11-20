import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function FindProfessionals() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50 -mt-[64px] pt-[64px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24">
            <div className="text-center">
              <h1 className="font-roboto text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
                Find Trusted Professionals
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-roboto">
                Connect with experienced, community-recommended professionals for your home improvement projects
              </p>
              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                  />
                  <button className="bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-roboto">
                Popular: Kitchen Remodel, Bathroom Renovation, Interior Design
              </p>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        </section>

        {/* Content will go here */}
      </div>
      <Footer />
    </>
  );
}
