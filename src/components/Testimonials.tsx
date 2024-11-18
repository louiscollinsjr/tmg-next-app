import React from 'react';

const testimonialData = [
  {
    text: &quot;TryMyGuys connected me with an incredible contractor who transformed my kitchen.&quot;,
    name: "Sarah Johnson",
    title: "Homeowner",
    avatar: "/images/avatar-1.jpg"
  },
  {
    text: &quot;TryMyGuys PRO helped me grow my business through quality leads and a supportive community.&quot;,
    name: "Michael Chen",
    title: "Professional",
    avatar: "/images/avatar-2.jpg"
  },
  {
    text: &quot;The community reviews were spot-on. Found a great landscaper.&quot;,
    name: "Emily Rodriguez",
    title: "Homeowner",
    avatar: "/images/avatar-3.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-sm tracking-[0.1em] font-normal text-white mb-12">
          Testimonials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialData.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative transition-all duration-300 ease-in-out"
            >
              <div className="h-full p-8 flex flex-col bg-gray-50 backdrop-blur-sm rounded-lg">
                <p className="text-gray-900 mb-6 text-sm font-light leading-relaxed transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-auto flex items-center">
                  <div className="flex-shrink-0">
                    {/* <div className="h-10  w-10 rounded-full bg-gray-200 overflow-hidden"> */}
                      {/* Placeholder for avatar - replace src with actual image path */}
                      {/* <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      /> */}
                    {/* </div> */}
                  </div>
                  <div className="ml-0">
                    <div className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
