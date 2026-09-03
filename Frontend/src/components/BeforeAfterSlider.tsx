import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) updatePosition(e.clientX);
  };

  const onMouseUp = () => setIsDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) updatePosition(e.touches[0].clientX);
  };

  const onTouchEnd = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xs border border-[#DDD6CB] select-none ${
        isDragging ? 'cursor-ew-resize' : 'cursor-ew-resize'
      }`}
    >
      {/* After image (full, behind) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
        referrerPolicy="no-referrer"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw' }}
          draggable={false}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-[2px] h-full bg-white shadow-md" />
        {/* Drag handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-[#8C7456] flex items-center justify-center pointer-events-auto">
          <svg className="w-5 h-5 text-[#8C7456]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
          <svg className="w-5 h-5 text-[#8C7456] -ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l-4-4-4 4m0 6l4 4 4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-xs font-sans font-semibold">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="bg-white/80 backdrop-blur-sm text-[#1A1917] text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-xs font-sans font-semibold">
          {afterLabel}
        </span>
      </div>
    </div>
  );
};
