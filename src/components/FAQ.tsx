'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does TryMyGuys verify service professionals?",
    answer: "We use a comprehensive verification process that includes background checks, license verification, and community reviews to ensure all professionals meet our quality standards."
  },
  {
    question: "What happens after I submit a service request?",
    answer: "Once you submit a request, we'll match you with relevant professionals in your area. You'll receive notifications when pros express interest, and you can review their profiles and ratings before making a decision."
  },
  {
    question: "Are the service professionals insured?",
    answer: "Yes, all service professionals on our platform are required to maintain appropriate insurance coverage for their specific trade or service category."
  },
  {
    question: "How do I leave a review for a service?",
    answer: "After your service is completed, you'll receive a notification to rate and review your experience. Your honest feedback helps maintain quality and assists other community members in making informed decisions."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "Your satisfaction is our priority. If you're not happy with a service, contact our support team within 48 hours, and we'll work with you and the service provider to resolve any issues."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-normal text-black">
              Professional services, <br />
              delivered with care.
            </h2>
            <p className="text-gray-600">
              Connect with skilled professionals who are committed to delivering exceptional service. Our community-driven platform ensures quality and reliability.
            </p>
          </div>

          {/* Right Column - FAQ */}
          <div>
            <h3 className="text-xl font-normal text-black mb-8">Your questions answered</h3>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full py-4 text-left"
                  >
                    <span className="text-sm font-medium text-black">{item.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      {openIndex === index ? (
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pb-4">
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
