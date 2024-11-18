'use client';

import React, { useState, useEffect } from 'react';

const placeholders = [
  'I need a plumber to fix a leaky faucet...',
  'Looking for an electrician to install new lighting...',
  'Need a landscaper for yard maintenance...',
  'Searching for a reliable contractor...'
];

const AIAssistantDemo = () => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseDuration = 2000;

    if (isTyping) {
      if (charIndex < placeholders[currentIndex].length) {
        const timer = setTimeout(() => {
          setCurrentPlaceholder(prev => prev + placeholders[currentIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setCurrentPlaceholder(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        }, deletingSpeed);
        return () => clearTimeout(timer);
      } else {
        setCurrentIndex(prev => (prev + 1) % placeholders.length);
        setIsTyping(true);
      }
    }
  }, [currentIndex, charIndex, isTyping]);

  return (
    <section className="bg-primary/80 backdrop-blur-sm py-12">
      <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[298px] bg-white/10 rounded-lg">
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="flex w-full max-w-2xl">
              <input
                type="text"
                placeholder={currentPlaceholder}
                className="flex-1 px-4 py-3 rounded-l-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25"
              />
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-r-lg transition-all duration-200 flex items-center">
                <svg 
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12h12m0 0L9 6m6 6l-6 6" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-left">
          <span className="text-sm font-medium text-white/60 uppercase tracking-wider">TryMyGuys AI Assistant</span>
          <h2 className="mt-3 text-3xl font-bold text-white">Powered by AI to Ensure Perfect Matches</h2>
          <p className="mt-4 text-lg text-white/80">
            Our AI assistant helps ensure everyone is aligned by clarifying project details, 
            setting clear expectations, and eliminating unknowns before work begins.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantDemo;
