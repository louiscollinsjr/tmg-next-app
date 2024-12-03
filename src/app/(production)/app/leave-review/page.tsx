import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LeaveReview() {
  return (
    <>
    
      <div className="min-h-screen bg-zinc-50 -mt-[64px] pt-[64px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Share Your Experience
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let&apos;s build a stronger community through honest feedback
              </p>
              
              {/* Review Form */}
              <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <form className="space-y-6">
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Professionals Name</label>
                    <input
                      type="text"
                      placeholder="Enter the professionals name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Service Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto">
                      <option value="">Select service type</option>
                      <option value="kitchen">Kitchen Remodel</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="painting">Interior Painting</option>
                      <option value="flooring">Flooring Installation</option>
                    </select>
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Rating</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-12 h-12 rounded-xl border border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Your Review</label>
                    <textarea 
                      rows={4}
                      placeholder="Share your experience working with this professional&apos;s work..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Submit Review
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
        <p className="text-gray-600 mb-8">
          Your review helps others make informed decisions and encourages professionals to maintain high standards. Let&apos;s work together to build trust!
        </p>
      </div>
   
    </>
  );
}
