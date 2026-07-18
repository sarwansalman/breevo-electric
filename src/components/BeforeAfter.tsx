import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data';

export default function BeforeAfter() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const onStartDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if ('touches' in e) {
      handleMove(e.touches[0].clientX);
    } else {
      handleMove(e.clientX);
    }
  };

  return (
    <div id="before-after-section" className="w-full">
      {/* Selector Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {BEFORE_AFTER_CASES.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveCaseIdx(idx);
              setSliderPosition(50);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              activeCaseIdx === idx
                ? 'bg-brand-navy text-white shadow-md border border-brand-cyan/20'
                : 'bg-white hover:bg-primary-100 text-primary-800 border border-primary-100'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-2xl mx-auto text-center mb-8 px-4">
        <p className="text-sm text-primary-200/90 leading-relaxed bg-brand-navy/60 p-4 rounded-xl border border-white/5">
          {activeCase.description}
        </p>
      </div>

      {/* Interactive Drag Stage */}
      <div className="flex justify-center px-4">
        <div className="relative max-w-4xl w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-primary-950 select-none">
          <div
            ref={containerRef}
            className="relative w-full h-full cursor-ew-resize"
            onMouseDown={onStartDrag}
            onTouchStart={onStartDrag}
          >
            {/* After Image (Full Base) */}
            <img
              src={activeCase.afterImage}
              alt="Pristine After State"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
              referrerPolicy="no-referrer"
            />
            <div className="absolute right-4 bottom-4 z-20 px-3 py-1.5 rounded-md bg-emerald-950/80 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/20 backdrop-blur-xs">
              After: Breevo Precision
            </div>

            {/* Before Image (Overlaid & Clipped) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImage}
                alt="Dangerous Before State"
                className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
                draggable="false"
                referrerPolicy="no-referrer"
              />
              <div className="absolute left-4 bottom-4 z-20 px-3 py-1.5 rounded-md bg-amber-950/80 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/20 backdrop-blur-xs">
                Before: Aging / Hazard
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-30"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary-950 shadow-xl border-4 border-brand-navy flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-transform duration-150">
                <ArrowLeftRight className="w-4 h-4 text-brand-cyan" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Note */}
      <div className="flex justify-center items-center gap-1.5 mt-4 text-xs font-mono text-primary-400">
        <HelpCircle className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
        <span>Click and slide the center arrow left & right to inspect.</span>
      </div>
    </div>
  );
}
