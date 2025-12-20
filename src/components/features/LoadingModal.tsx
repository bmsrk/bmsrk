import React, { useState, useEffect } from 'react';

interface LoadingModalProps {
  onLoadingComplete: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ onLoadingComplete }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the profile image
    const img = new Image();
    const profileImageUrl = './profile.jpg';
    const fallbackUrl = 'https://github.com/bmsrk.png';

    img.onload = () => {
      setIsImageLoaded(true);
    };

    img.onerror = () => {
      // Try fallback URL
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        setIsImageLoaded(true);
      };
      fallbackImg.onerror = () => {
        // Even if both fail, continue after a timeout
        setTimeout(() => {
          setIsImageLoaded(true);
        }, 1000);
      };
      fallbackImg.src = fallbackUrl;
    };

    img.src = profileImageUrl;
  }, []);

  useEffect(() => {
    if (isImageLoaded) {
      // Wait a brief moment to ensure smooth transition
      setTimeout(() => {
        onLoadingComplete();
      }, 300);
    }
  }, [isImageLoaded, onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#f3f2f1] z-[200] flex flex-col items-center justify-center">
      {/* Loading Spinner */}
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#0078d4] border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <div className="text-[#0078d4] font-semibold text-lg">Loading Dynamics 365...</div>

      {/* Microsoft-style loading indicator */}
      <div className="mt-8 flex gap-2">
        <div
          className="w-2 h-2 bg-[#0078d4] rounded-full animate-pulse"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-2 h-2 bg-[#0078d4] rounded-full animate-pulse"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-2 h-2 bg-[#0078d4] rounded-full animate-pulse"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingModal;
