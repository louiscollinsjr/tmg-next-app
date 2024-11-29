export default function PrelaunchFooter() {
  return (
    <footer className="bg-zinc-100">
      <div className="max-w-5xl mx-auto px-[22px] py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-luckiest-guy tracking-wide text-burnt-orange mb-4 md:mb-0">
            TryMyGuys
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} TryMyGuys. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
