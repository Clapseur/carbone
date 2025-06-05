import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const VideoText = ({ text, className = '', videoSrc }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the video text
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          WebkitMask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="HKGrotesk, sans-serif" font-weight="900" font-size="80" fill="white">${text}</text></svg>')`,
          mask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="HKGrotesk, sans-serif" font-weight="900" font-size="80" fill="white">${text}</text></svg>')`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center'
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Fallback text with gradient */}
      <span 
        className={`relative z-10 font-black font-hk-grotesk ${className.includes('text-') ? '' : 'text-3xl sm:text-5xl md:text-7xl lg:text-8xl'}`}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default VideoText;