interface WaitlistSuccessModalProps {
    onClose: () => void;
  }
  
  export default function WaitlistSuccessModal({ onClose }: WaitlistSuccessModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-zinc-100 rounded-2xl max-w-xl w-full p-16 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 transition-colors z-10"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="absolute inset-0">
            <div className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at center, var(--tw-gradient-from) 0.5rem, transparent 0.5rem), 
                                radial-gradient(circle at center, var(--tw-gradient-from) 0.25rem, transparent 0.25rem)`,
                backgroundSize: '4rem 4rem, 2rem 2rem',
                backgroundPosition: '0 0, 1rem 1rem',
                backgroundRepeat: 'repeat',
                ['--tw-gradient-from' as string]: 'rgb(255 137 53 / 0.1)'
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 via-zinc-100/90 to-transparent" />
          </div>
          <div className="relative text-center">
            <div className="mb-12 flex justify-center">
              <div className="bg-orange-500 rounded-full p-4">
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-semibold mb-6 tracking-tight">You have been<br/> added to our <span className="text-burnt-orange">waitlist!</span></h2>
            <p className="text-gray-600 mb-12 text-sm font-semibold">Thank you for joining, you&apos;ll be the first<br/> to know when we are ready!</p>
            <div className="flex justify-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full border-4 border-white bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: `url(/images/avatar0${i}.png)` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-600 mt-2">
              You&apos;re not alone, <span className="text-orange-600 font-semibold">the world</span> is waiting!
            </p>
          </div>
        </div>
      </div>
    );
  }