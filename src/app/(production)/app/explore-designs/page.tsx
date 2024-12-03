import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ExploreDesigns() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50 -mt-[64px] pt-[64px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24">
            <div className="text-center">
              <h1 className="font-roboto text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
                Explore Beautiful Home Designs
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-roboto">
                Get inspired by our curated collection of stunning home designs and transformations
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  Browse Gallery
                </button>
                <button className="bg-white text-gray-900 font-roboto px-8 py-3 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors">
                  Filter Designs
                </button>
              </div>
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
