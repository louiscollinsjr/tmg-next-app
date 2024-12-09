'use client';

interface PrelaunchSchedulingProps {
  onOpenModal: () => void;
}

export default function PrelaunchScheduling({ onOpenModal }: PrelaunchSchedulingProps) {
  return (
    <div className="py-64 bg-zinc-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className=" w-full h-[780px] rounded-xl bg-cover bg-left-top bg-no-repeat" style={{ backgroundImage: 'url("/images/plumber.jpeg")' }}></div>

          <div className="space-y-6 md:pl-24">
            <h2 className="~text-5xl/7xl  md:~text-6xl/9xl tracking-tight font-bold text-slate-800">
              Get the work <span className="text-burnt-orange">you want</span> when you want it
            </h2>
            <p className="text-gray-600 ~text-base/3xl max-w-5xl py-12">
            TryMyGuys connects trusted tradespeople with local job opportunities in minutes. Access the details you need, browse photos, and screen customers to make informed decisions before accepting a job.
            </p>
            <ul className="space-y-4 ~text-base/3xl pb-14">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-burnt-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Promote your business locally</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-burnt-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Send quotes and schedule jobs</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-burnt-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Grow a loyal local client base</span>
              </li>
            </ul>

            <button
              onClick={onOpenModal}
              className=" inline-flex items-center  ~px-5/12 ~py-4/8 ~text-base/3xl md:~text-3xl/5xl font-medium rounded-full bg-burnt-orange text-white hover:bg-opacity-90 transition-all"
            >
              Grow your business
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
