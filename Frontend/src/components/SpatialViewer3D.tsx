import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Move } from 'lucide-react';

const VIDEO_SRC = '/bunglow.mp4';

interface SpatialViewer3DProps {
  children?: React.ReactNode;
  onInViewChange?: (inView: boolean) => void;
}

export const SpatialViewer3D: React.FC<SpatialViewer3DProps> = ({ children, onInViewChange }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [rotationComplete, setRotationComplete] = useState(false);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const scrollAccumulator = useRef(0);

  // On video metadata loaded
  const onLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
      video.currentTime = 0;
      setIsLoaded(true);
    }
  };

  // Track buffering progress
  const onProgress = () => {
    const video = videoRef.current;
    if (video && video.buffered.length > 0) {
      const buffered = video.buffered.end(video.buffered.length - 1);
      setLoadProgress(Math.round((buffered / video.duration) * 100));
    }
  };

  // Scroll-based video scrubbing — block page scroll until rotation complete
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (rotationComplete) return;

      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video || !duration) return;

      const rect = container.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      e.preventDefault();
      setHasInteracted(true);

      const delta = e.deltaY || e.deltaX;
      scrollAccumulator.current += Math.abs(delta);

      // Map scroll to video time
      const scrollSensitivity = duration / (window.innerHeight * 2);
      const timeDelta = delta * scrollSensitivity;
      let newTime = video.currentTime + timeDelta;

      // Wrap around
      if (newTime > duration) newTime = newTime - duration;
      if (newTime < 0) newTime = duration + newTime;

      video.currentTime = newTime;

      // Mark complete after enough scrolling
      if (scrollAccumulator.current > window.innerHeight * 3) {
        setRotationComplete(true);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [duration, rotationComplete]);

  // Detect when hero is in view for header styling
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inView = rect.bottom > 0;
      onInViewChange?.(inView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onInViewChange]);

  // Drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    const video = videoRef.current;
    if (!video) return;
    setIsDragging(true);
    setHasInteracted(true);
    dragStartX.current = clientX;
    dragStartTime.current = video.currentTime;
  }, []);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || dragStartX.current === null) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !duration) return;

    const deltaX = clientX - dragStartX.current;
    const containerWidth = container.offsetWidth;
    const timeDelta = (deltaX / containerWidth) * duration;
    let newTime = dragStartTime.current + timeDelta;

    if (newTime > duration) newTime -= duration;
    if (newTime < 0) newTime += duration;

    video.currentTime = newTime;
  }, [isDragging, duration]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    dragStartX.current = null;
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); handleDragStart(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

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
      className={`relative w-full h-screen overflow-hidden bg-black select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover pointer-events-none"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={onLoadedMetadata}
        onProgress={onProgress}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FAF8F5]">
          <div className="w-48 h-1 bg-[#E5E0D8] rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#8C7456] transition-all duration-300" style={{ width: `${loadProgress}%` }} />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans">
            Loading 360° Model — {loadProgress}%
          </p>
        </div>
      )}

      {/* Gradient for text */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Text overlaid */}
      <div className="absolute inset-0 z-10 flex items-end">
        {children}
      </div>

      {/* Drag hint */}
      {isLoaded && !hasInteracted && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-[11px] uppercase tracking-widest animate-pulse">
            <Move className="w-4 h-4" />
            Scroll or Drag to Rotate 360°
          </div>
        </div>
      )}

      {/* Progress bar */}
      {hasInteracted && !rotationComplete && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="w-32 h-[3px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8C7456] rounded-full transition-all duration-75"
              style={{ width: duration ? `${(videoRef.current?.currentTime || 0) / duration * 100}%` : '0%' }}
            />
          </div>
        </div>
      )}

      {/* Scroll down indicator */}
      {rotationComplete && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <div className="flex flex-col items-center gap-1 text-white/80 text-[10px] uppercase tracking-widest">
            <span>Scroll Down</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
