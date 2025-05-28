import React, { useEffect, useRef } from 'react';

const NoiseEffect = ({ 
  patternSize = 250, 
  patternScaleX = 1, 
  patternScaleY = 1, 
  patternAlpha = 15,
  patternRefreshInterval = 100,
  className = ""
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frameCount = 0;

    const generateNoise = () => {
      const imageData = ctx.createImageData(patternSize, patternSize);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = patternAlpha; // Alpha
      }

      return imageData;
    };

    const animate = () => {
      frameCount++;
      
      if (frameCount % patternRefreshInterval === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const noiseData = generateNoise();
        
        // Scale and repeat the pattern
        for (let x = 0; x < canvas.width; x += patternSize * patternScaleX) {
          for (let y = 0; y < canvas.height; y += patternSize * patternScaleY) {
            ctx.putImageData(noiseData, x, y);
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [patternSize, patternScaleX, patternScaleY, patternAlpha, patternRefreshInterval]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 mix-blend-overlay ${className}`}
      style={{
        opacity: 0.1,
      }}
    />
  );
};

export default NoiseEffect;