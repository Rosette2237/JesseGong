"use client";

import { useState, useEffect, useCallback } from "react";

const aboutCards = [
  {
    id: "academics",
    label: "academics",
    title: "Education & Academics",
    content: (
      <p>
        I am an <strong>Industrial and Systems Engineering</strong> and <strong>Computer Science </strong>
        double major at the Georgia Institute of Technology with a 4.0
        GPA, specializing in <strong>Data Science</strong>. My work centers on the
        intersection of optimization and intelligent systems, leveraging
        a robust foundation in deep learning and statistical modeling to
        transform complex datasets into actionable strategic insights.
      </p>
    ),
  },
  {
    id: "professional",
    label: "professional",
    title: "Professional Experience",
    content: (
      <p>
        My <strong>professional and project-based background</strong> spans software
        architecture, data-driven optimization, and quantitative finance.
        I have designed scalable platforms to enhance operational
        efficiency and engineered predictive deep learning frameworks for
        equity analysis and market forecasting. My <strong>quantitative
        proficiency</strong> is further underscored by my success as a top-ranked
        finalist in the Citadel Quant League, where I applied advanced
        mathematical skills to navigate financial markets. Additionally,
        my <strong>research</strong> explores the underlying mechanics of AI, specifically
        focusing on model interpretability and forecasting through
        high-performance computing.
      </p>
    ),
  },
  {
    id: "recognition",
    label: "recognition",
    title: "Leadership & Awards",
    content: (
      <p>
        I have been recognized for excellence through international
        <strong> awards</strong> in mathematics and physics and hold memberships in the Tau
        Beta Pi and Alpha Pi Mu engineering honor societies. My
        <strong> leadership</strong> as a university orientation leader and international
        interpreter highlights my ability to manage complex logistics and
        communicate effectively across global audiences.
      </p>
    ),
  },
  {
    id: "personal",
    label: "personal",
    title: "Personal Interests",
    content: (
      <p>
        Beyond my technical pursuits, I am an avid photographer and
        hiker who finds inspiration in the outdoors. I also played
        competitive soccer in high school and achieved ABRSM Grade 8
        certification in piano, bringing the same focused and curious
        mindset to my <strong>personal interests</strong> as I do to my professional life.
      </p>
    ),
  },
];

export default function RotatingAbout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const totalCards = aboutCards.length;
  const ANGLE = 65; 
  const RADIUS = 500;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  return (
    <div className="relative w-full h-[650px] md:h-[750px] [perspective:2000px] flex items-center">
      
      {/* LEFT CONTROL PANEL */}
      <div className="absolute left-0 z-50 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-200 p-2.5 rounded-full shadow-md">
          {/* Up Button: Now moves to NEXT tile (e.g. 2 to 3) */}
          <button 
            onClick={handleNext}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            aria-label="Next Tile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-full transition-colors shadow-sm"
            aria-label={isPlaying ? "Pause" : "Start"}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>

          {/* Down Button: Now moves to PREVIOUS tile */}
          <button 
            onClick={handlePrev}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            aria-label="Previous Tile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>

        {/* Horizontal Prompt Label directly under buttons */}
        <p className="max-w-[100px] text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none leading-tight">
          click up or down to see more about me
        </p>
      </div>

      {/* 3D CYLINDER */}
      <div
        className="relative w-full h-full transition-transform duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1)"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(-${RADIUS}px) rotateX(${-activeIndex * ANGLE}deg)`,
        }}
      >
        {aboutCards.map((card, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={card.id}
              onClick={() => { if(!isActive) setActiveIndex(i); }}
              className={`
                absolute inset-y-0 right-0 my-auto w-[calc(100%-8rem)] h-[550px] md:h-[620px]
                bg-white border border-slate-200 rounded-2xl shadow-2xl p-8 md:p-12
                transition-all duration-700 ease-in-out
                ${isActive ? "cursor-default opacity-100 z-10" : "cursor-pointer opacity-40 hover:opacity-60 z-0"}
              `}
              style={{
                transform: `rotateX(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* Background Watermark Number */}
              <div className="absolute top-4 right-10 text-8xl md:text-[10rem] font-bold text-slate-100/60 z-0 select-none pointer-events-none">
                {i + 1}
              </div>

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="font-heading text-3xl font-semibold text-[#000080] mb-8 capitalize">
                  {card.title}
                </h2>
                <div className="text-slate-700 text-lg leading-relaxed max-w-2xl">
                  {card.content}
                </div>
              </div>

              {/* Label Tab - Shrinked width to avoid overlap */}
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 -left-8 md:-left-11 w-8 md:w-11 h-40 md:h-48
                  border border-r-0 rounded-l-2xl shadow-[-8px_0px_20px_rgba(0,0,0,0.04)]
                  flex items-center justify-center transition-all duration-500
                  ${isActive 
                    ? "bg-[#fde047] border-[#ca8a04]/30 scale-105" 
                    : "bg-white border-slate-200"}
                `}
              >
                <span className={`transform -rotate-90 font-bold tracking-widest uppercase text-[10px] md:text-xs whitespace-nowrap transition-colors duration-500 ${isActive ? "text-[#ca8a04]" : "text-slate-400"}`}>
                  {card.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}