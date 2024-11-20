export default function Hero() {
  return (
    <main className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8  lg:pt-4 pb-16 text-center md:min-h-[70vh] flex flex-col justify-center font-roboto">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        {/* <h1 className="text-lg sm:text-lg font-normal text-black tracking-tight mb-8">trymyguys.com</h1> */}
        <h1 className="text-4xl sm:text-6xl font-normal text-black mb-2">
          Find trusted pros, recommended by our community.
        </h1>
        <p className="text-xl text-gray-600 my-8">
          Connect with Community-Recommended Service Professionals!
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-black rounded-xl hover:bg-gray-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium border border-black text-black bg-whiteX rounded-xl hover:bg-gray-100 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  )
}
