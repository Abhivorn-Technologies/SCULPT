"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  description?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before procedure",
  afterAlt = "After procedure",
  title,
  description,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX);
  };

  const handlePointerMoveEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handlePointerMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const isCompositeImage = beforeImage === afterImage;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#EFE8E0] flex flex-col h-full group hover:shadow-xl transition-all duration-300">
      {/* 4:3 Aspect Ratio Image Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none touch-none cursor-ew-resize bg-[#151515]"
        style={{ aspectRatio: "4 / 3" }}
        onPointerDown={!isCompositeImage ? handlePointerDown : undefined}
        onPointerMove={!isCompositeImage ? handlePointerMoveEvent : undefined}
        onPointerUp={!isCompositeImage ? handlePointerUp : undefined}
        onPointerCancel={!isCompositeImage ? handlePointerUp : undefined}
      >
        {/* Base Layer: AFTER Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center w-full h-full max-w-none"
          />
        </div>

        {!isCompositeImage && (
          <>
            {/* Top Layer: BEFORE Image (clipped at sliderPosition%) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <Image
                src={beforeImage}
                alt={beforeAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center w-full h-full max-w-none"
              />
            </div>

            {/* BEFORE Label */}
            <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none bg-black/65 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border border-white/20 shadow-sm">
              BEFORE
            </div>

            {/* AFTER Label */}
            <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none bg-black/65 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border border-white/20 shadow-sm">
              AFTER
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)] z-20 pointer-events-none -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E6663A] text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover:scale-105">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </>
        )}

        {isCompositeImage && (
          <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none bg-black/65 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border border-white/20 shadow-sm flex items-center gap-1.5">
            <span className="text-[#F6B73C]">BEFORE & AFTER</span>
          </div>
        )}
      </div>

      {/* Card Content ONLY: Treatment Name & Short Description */}
      {title && (
        <div className="p-5 sm:p-6 space-y-1.5 bg-white flex-1 flex flex-col justify-start">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors leading-tight line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
