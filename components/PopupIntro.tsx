"use client";

import { useEffect, useState } from "react";

interface PopupIntroProps {
  onContinue: () => void;
}

const FULL_TEXT =
  "Do you ever wonder what makes a moment truly beautiful… what gives meaning to every passing minute?";

export default function PopupIntro({ onContinue }: PopupIntroProps) {
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Force dark bg on html & body so fixed overlay looks correct
  useEffect(() => {
    const prevHtml = document.documentElement.style.backgroundColor;
    const prevBody = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    const prevOverflow = document.body.style.overflow;
    document.documentElement.style.backgroundColor = "#03010f";
    document.body.style.backgroundColor = "#03010f";
    document.body.style.color = "#ffffff";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.backgroundColor = prevHtml;
      document.body.style.backgroundColor = prevBody;
      document.body.style.color = prevColor;
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (charIndex < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + FULL_TEXT[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 38);
      return () => clearTimeout(timeout);
    } else {
      // Show button after text is done
      const t = setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(t);
    }
  }, [charIndex]);

  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => onContinue(), 900);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#03010f",
        animation: fadeOut
          ? "fadeToSpace 0.9s ease-in forwards"
          : "fadeIn 0.8s ease-out",
        overflow: "hidden",
      }}
    >
      {/* Background subtle star particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              opacity: s.opacity,
              animation: `twinklePopup ${s.dur}s ${s.delay}s infinite ease-in-out alternate`,
              boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            }}
          />
        ))}
      </div>

      {/* Nebula glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(99,60,180,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
          animation: "nebulaPulse 6s ease-in-out infinite alternate",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">
        {/* Decorative quote mark */}
        <div
          className="text-7xl text-white/10 font-serif leading-none mb-4 select-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          "
        </div>

        {/* Typewriter text */}
        <p
          className="text-2xl md:text-3xl text-white leading-relaxed tracking-wide"
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            textShadow: "0 0 40px rgba(168,85,247,0.4)",
            minHeight: "8rem",
          }}
        >
          {displayed}
          {/* blinking cursor */}
          {charIndex < FULL_TEXT.length && (
            <span
              className="inline-block w-0.5 h-7 bg-violet-400 ml-1 align-middle"
              style={{ animation: "blink 0.8s step-end infinite" }}
            />
          )}
        </p>

        {/* Closing quote */}
        {charIndex >= FULL_TEXT.length && (
          <div
            className="text-7xl text-white/10 font-serif leading-none mt-2 select-none"
            style={{
              fontFamily: "Georgia, serif",
              animation: "fadeInUp 0.6s ease-out",
            }}
          >
            "
          </div>
        )}

        {/* Continue button */}
        {showButton && (
          <div style={{ animation: "fadeInUp 0.7s ease-out" }}>
            <button
              onClick={handleContinue}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.3) 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                boxShadow:
                  "0 0 30px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Animated shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.5) 0%, rgba(236,72,153,0.5) 100%)",
                }}
              />
              <span className="relative z-10">KLIK SINIII</span>
              <svg
                className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: popupStyles }} />
    </div>
  );
}

// Seeded star generator agar stabil
const STARS = (() => {
  const stars = [];
  let s = 55555;
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const colors = ["#ffffff", "#e0e8ff", "#ffd6fa", "#d6f0ff", "#ffe4b5"];
  for (let i = 0; i < 120; i++) {
    stars.push({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 2 + 0.5,
      opacity: rand() * 0.6 + 0.2,
      color: colors[Math.floor(rand() * colors.length)],
      dur: rand() * 3 + 2,
      delay: rand() * 5,
    });
  }
  return stars;
})();

const popupStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeToSpace {
    0%   { opacity: 1; transform: scale(1); }
    60%  { opacity: 0.4; transform: scale(1.04); }
    100% { opacity: 0; transform: scale(1.08); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes twinklePopup {
    0%   { opacity: 0.15; transform: scale(0.8); }
    100% { opacity: 0.9;  transform: scale(1.3); }
  }
  @keyframes nebulaPulse {
    0%   { opacity: 0.6; transform: translate(-50%,-50%) scale(0.95); }
    100% { opacity: 1;   transform: translate(-50%,-50%) scale(1.05); }
  }
`;
