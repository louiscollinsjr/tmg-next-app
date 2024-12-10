'use client';

import { useState } from 'react';
import WaitlistSuccessModal from './WaitlistSuccessModal';

interface WaitlistFormData {
  name: string;
  email: string;
  phone?: string;
  postCode?: string;
  isTradesman: boolean;
}

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    phone: '',
    postCode: '',
    isTradesman: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setIsSuccess(true);
      setSubmitStatus({
        type: 'success',
        message: 'Successfully joined the waitlist! We\'ll notify you when we launch.',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to join waitlist',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after a delay to allow for fade-out animations
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        postCode: '',
        isTradesman: false,
      });
      setIsSuccess(false);
      setSubmitStatus(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-100 rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-zinc-200 rounded-full p-2 hover:bg-zinc-300 transition-colors"
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

        {isSuccess ? (
         <WaitlistSuccessModal onClose={handleClose} />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8 font-robototext-center tracking-wide">Join waitlist</h2>

            {submitStatus?.type === 'error' && (
              <div className="mb-4 p-4 rounded bg-red-50 text-red-800">
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Name *"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burnt-orange focus:ring-burnt-orange sm:text-sm py-3 px-4"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email *"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burnt-orange focus:ring-burnt-orange sm:text-sm py-3 px-4"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burnt-orange focus:ring-burnt-orange sm:text-sm py-3 px-4"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <input
                  type="text"
                  id="postCode"
                  placeholder="Post code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burnt-orange focus:ring-burnt-orange sm:text-sm py-3 px-4"
                  value={formData.postCode}
                  onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
                />
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-fit flex justify-center py-4 px-8 border border-transparent shadow-sm text-base text-white font-bold rounded-full ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-burnt-orange hover:bg-burnt-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burnt-orange'
                  }`}
                >
                  {isSubmitting ? 'Joining...' : 'Join waitlist'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
