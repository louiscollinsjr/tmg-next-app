'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchBox() {
  const phrases = [
    "Search for a plumber...",
    "I need a plumber to fish my wedding ring out of the garbage disposal...",
    "A carpenter to rebuild trust after my IKEA furniture assembly",
    "Search for electricians...",
    "Roof expert to stop my attic from becoming an indoor swimming pool...",
    "Lawn ninja to defeat my suburban jungle...",
  ];
  
  const [placeholderText, setPlaceholderText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    if (!isFocused) {
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseDuration = 2000;
      
      const typewriterEffect = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting) {
          if (charIndex < currentPhrase.length) {
            setPlaceholderText(currentPhrase.substring(0, charIndex + 1));
            setCharIndex(prev => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
            return;
          }
        } else {
          if (charIndex > 0) {
            setPlaceholderText(currentPhrase.substring(0, charIndex - 1));
            setCharIndex(prev => prev - 1);
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
            return;
          }
        }
      };

      const timer = setTimeout(
        typewriterEffect,
        isDeleting ? deletingSpeed : typingSpeed
      );

      return () => clearTimeout(timer);
    }
  }, [charIndex, isDeleting, phraseIndex, phrases, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholderText('');
  };

  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
      setCharIndex(0);
    }
  };

  return (
    <div className="relative w-full py-12">
     <div className="relative flex items-start w-full overflow-hidden rounded-2xl bg-gray-50 p-2">
  <div className="absolute left-2 top-[2x] p-2 px-4 rounded-full bg-gray-300">
    <MagnifyingGlass size={20} weight="bold" className="text-white" />
  </div>
  <textarea
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onFocus={handleFocus}
    onBlur={handleBlur}
    placeholder={placeholderText}
    className="w-full font-bold pl-16 pr-4 text-3xl text-gray-900 placeholder-gray-300 bg-transparent outline-none resize-none h-42 leading-tight"
    rows={3}
  />
</div>
    </div>
  );
}
