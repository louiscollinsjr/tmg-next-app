import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function StartProject() {
  return (
    <>
   
      <div className="min-h-screen bg-zinc-50 -mt-[64px] pt-[64px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24">
            <div className="text-center">
              <h1 className="font-roboto text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
                Start Your Dream Project
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-roboto">
                Tell us about your project and get matched with qualified professionals
              </p>
              
              {/* Project Form */}
              <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <form className="space-y-6">
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Project Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto">
                      <option value="">Select a project type</option>
                      <option value="kitchen">Kitchen Remodel</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="painting">Interior Painting</option>
                      <option value="flooring">Flooring Installation</option>
                    </select>
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Project Description</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe your project in detail..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Timeline</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto">
                      <option value="">When do you want to start?</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-2weeks">1-2 weeks</option>
                      <option value="1month">Within a month</option>
                      <option value="planning">Just planning</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Submit Project
                  </button>
                </form>
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
    
    </>
  );
}
