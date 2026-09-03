import React, { useState, useRef } from 'react';
import { ZoomIn } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className = '' }) => {
  const [isZooming, setIsZooming] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const ZOOM = 2.5;
  const LENS_SIZE = 160;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clamp lens position inside container
    const clampedX = Math.max(LENS_SIZE / 2, Math.min(x, rect.width - LENS_SIZE / 2));
    const clampedY = Math.max(LENS_SIZE / 2, Math.min(y, rect.height - LENS_SIZE / 2));

    setLensPos({ x: clampedX, y: clampedY });

    // Calculate zoom window position (percentage based)
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    setZoomPos({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  return (
    <div className={`relative flex gap-4 ${className}`}>
      {/* Main image with lens */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 overflow-hidden border border-[#DDD6CB] bg-[#FAF8F5] cursor-crosshair"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
          referrerPolicy="no-referrer"
        />

        {/* Zoom lens circle */}
        {isZooming && (
          <div
            className="absolute pointer-events-none z-10 border-2 border-[#8C7456]/60 rounded-full shadow-lg"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lensPos.x - LENS_SIZE / 2,
              top: lensPos.y - LENS_SIZE / 2,
              backgroundImage: `url(${src})`,
              backgroundSize: `${containerRef.current!.offsetWidth * ZOOM}px ${containerRef.current!.offsetHeight * ZOOM}px`,
              backgroundPosition: `-${lensPos.x * ZOOM - LENS_SIZE / 2}px -${lensPos.y * ZOOM - LENS_SIZE / 2}px`,
            }}
          />
        )}

        {/* Zoom hint icon */}
        {!isZooming && (
          <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm rounded-full p-2 pointer-events-none">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Zoomed preview panel — appears on right when hovering */}
      {isZooming && (
        <div className="hidden lg:block w-[400px] h-[400px] shrink-0 overflow-hidden border border-[#DDD6CB] bg-[#FAF8F5] shadow-xl relative">
          <img
            src={src}
            alt={`${alt} — zoomed`}
            className="pointer-events-none select-none"
            draggable={false}
            referrerPolicy="no-referrer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${ZOOM})`,
              transformOrigin: `${zoomPos.x * 100}% ${zoomPos.y * 100}%`,
            }}
          />
          {/* Zoom indicator label */}
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-xs pointer-events-none">
            {ZOOM}× Zoom
          </div>
        </div>
      )}
    </div>
  );
};
