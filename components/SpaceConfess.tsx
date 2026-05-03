"use client";

import React, { useState, useEffect, useMemo } from "react";

interface SpaceConfessProps {
  photos: string[];
}

function generateStars(count: number, seed: number) {
  const stars = [];
  let s = seed;
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 2 + 0.5,
      opacity: rand() * 0.6 + 0.2,
      duration: rand() * 4 + 2,
      delay: rand() * 6,
      color: ["#ffffff", "#ffe4e1", "#e0e8ff", "#ffd6fa", "#d6f0ff"][
        Math.floor(rand() * 5)
      ],
    });
  }
  return stars;
}

function generateShootingStars(count: number, seed: number) {
  const stars = [];
  let s = seed + 99999;
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: rand() * 60,
      left: rand() * 80,
      duration: rand() * 2 + 1.5,
      delay: rand() * 12 + i * 3,
      angle: rand() * 30 + 20,
      length: rand() * 120 + 80,
    });
  }
  return stars;
}

// Orbit rings config — each photo gets assigned to an orbit
const ORBITS = [
  { radius: 130, speed: 18, tilt: 0 },
  { radius: 195, speed: 26, tilt: 15 },
  { radius: 265, speed: 36, tilt: -10 },
  { radius: 340, speed: 48, tilt: 8 },
];

export default function SpaceConfess({ photos }: SpaceConfessProps) {
  const [noPosition, setNoPosition] = useState({ top: "55%", left: "55%" });
  const [isAccepted, setIsAccepted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [sunPulse, setSunPulse] = useState(0);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handle = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handle);

    document.documentElement.style.backgroundColor = "#03010f";
    document.body.style.backgroundColor = "#03010f";
    document.body.style.color = "#ffffff";

    const pulse = setInterval(() => setSunPulse((p) => p + 1), 50);

    return () => {
      window.removeEventListener("resize", handle);
      clearInterval(pulse);
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  const moveNoButton = () => {
    if (windowSize.width === 0) return;
    const x = Math.random() * (windowSize.width - 120);
    const y = Math.random() * (windowSize.height - 60);
    setNoPosition({ top: `${y}px`, left: `${x}px` });
  };

  const smallStars = useMemo(() => generateStars(200, 42), []);
  const shootingStars = useMemo(() => generateShootingStars(5, 88), []);

  // Assign each photo to an orbit + starting angle
  const orbitItems = useMemo(
    () =>
      photos.map((photoName, i) => {
        const orbitIdx = i % ORBITS.length;
        const orbit = ORBITS[orbitIdx];
        // Spread photos evenly on the same orbit if multiple share it
        const photosOnOrbit = photos.filter((_, j) => j % ORBITS.length === orbitIdx).length;
        const posIdx = Math.floor(i / ORBITS.length);
        const startAngle = (posIdx / photosOnOrbit) * 360;
        const photoSize = 58 - orbitIdx * 4; // outer orbits = slightly smaller
        const r = ((i * 1664525 + 1013904223) >>> 0) / 4294967296;
        const glowColors = [
          "rgba(236,72,153,0.55)",
          "rgba(139,92,246,0.55)",
          "rgba(56,189,248,0.5)",
          "rgba(52,211,153,0.45)",
          "rgba(251,191,36,0.5)",
        ];
        return {
          id: i,
          src: `/photos/${photoName}`,
          orbit,
          orbitIdx,
          startAngle,
          size: photoSize,
          glow: glowColors[i % glowColors.length],
        };
      }),
    [photos]
  );

  if (isAccepted) {
    return (
      <div
        className="flex h-screen w-screen items-center justify-center text-white overflow-hidden relative"
        style={{ background: "#03010f", fontFamily: "'Georgia', serif" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#03010f] via-[#0a0520] to-[#03010f]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-600/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/25 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
        {smallStars.slice(0, 100).map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ${star.delay}s infinite ease-in-out alternate`,
            }}
          />
        ))}
        <div className="z-10 text-center px-6">
          <div
            className="mx-auto mb-8 rounded-full"
            style={{
              width: 80,
              height: 80,
              background: "radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 40%, #ff8800 70%, #ff4400)",
              boxShadow: "0 0 40px 20px rgba(255,180,0,0.4), 0 0 80px 40px rgba(255,100,0,0.2)",
            }}
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #a18cd1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            WE'RE CLOSER TO THE STARS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">To my dearest Julian Christy, </p>
          <p className="text-sm text-gray-500 mt-4">i know there will be a day when the world calls you with many names, but for me, you will always be My Bogels.</p>
        </div>
        <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ background: "#03010f", fontFamily: "'Georgia', serif" }}
    >
      {/* Deep space bg */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #03010f 0%, #07021a 50%, #03010f 100%)" }} />

      {/* Nebula glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vh] rounded-full bg-indigo-900/25 blur-[130px] animate-nebula-drift" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vh] rounded-full bg-violet-900/20 blur-[110px] animate-nebula-drift" style={{ animationDelay: "-8s", animationDirection: "reverse" }} />
      <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vh] rounded-full bg-pink-900/15 blur-[90px] animate-nebula-drift" style={{ animationDelay: "-3s" }} />

      {/* Stars */}
      {smallStars.map((star) => (
        <div
          key={`sm-${star.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ${star.delay}s infinite ease-in-out alternate`,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="absolute pointer-events-none"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.length}px`,
            height: "2px",
            transform: `rotate(${s.angle}deg)`,
            animation: `shooting ${s.duration}s ${s.delay}s infinite`,
            opacity: 0,
            zIndex: 1,
          }}
        >
          <div
            className="absolute inset-y-0 right-0 w-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9))", borderRadius: "999px" }}
          />
        </div>
      ))}

      {/* ─── SOLAR SYSTEM CENTER ─── */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      >
        {/* Orbit ring SVGs */}
        {ORBITS.map((orbit, oi) => (
          <div
            key={`ring-${oi}`}
            className="absolute"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              top: -orbit.radius,
              left: -orbit.radius,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.06)",
              transform: `perspective(600px) rotateX(${orbit.tilt}deg)`,
            }}
          />
        ))}

        {/* The Sun */}
        <div
          className="absolute"
          style={{
            width: 90,
            height: 90,
            top: -45,
            left: -45,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fff7a0 0%, #ffdd00 25%, #ff9500 55%, #ff4500 80%, #c22000 100%)",
            boxShadow: `
              0 0 30px 10px rgba(255,200,0,0.5),
              0 0 70px 30px rgba(255,130,0,0.3),
              0 0 130px 60px rgba(255,60,0,0.15),
              0 0 220px 100px rgba(200,30,0,0.08)
            `,
            zIndex: 20,
            animation: "sun-spin 60s linear infinite",
          }}
        >
          {/* Corona rays */}
          {[...Array(12)].map((_, ri) => (
            <div
              key={ri}
              className="absolute"
              style={{
                width: 2,
                height: 18 + (ri % 3) * 8,
                background: "linear-gradient(to top, rgba(255,200,0,0.8), transparent)",
                top: "50%",
                left: "50%",
                transformOrigin: "bottom center",
                transform: `translateX(-50%) translateY(-100%) rotate(${ri * 30}deg) translateY(-45px)`,
                borderRadius: "2px",
                animation: `corona-flicker ${1.5 + ri * 0.2}s ${ri * 0.1}s infinite ease-in-out alternate`,
              }}
            />
          ))}
          {/* Sun surface texture */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 60% 40%, rgba(255,255,200,0.3) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(200,80,0,0.25) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Orbiting photo planets */}
        {orbitItems.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              width: item.orbit.radius * 2,
              height: item.orbit.radius * 2,
              top: -item.orbit.radius,
              left: -item.orbit.radius,
              borderRadius: "50%",
              animation: `orbit-${item.orbitIdx} ${item.orbit.speed}s ${-(item.startAngle / 360) * item.orbit.speed}s linear infinite`,
              zIndex: 15,
            }}
          >
            {/* Planet dot at the "3 o'clock" position, we rotate the ring */}
            <div
              className="absolute group cursor-pointer"
              style={{
                width: item.size,
                height: item.size,
                top: item.orbit.radius - item.size / 2,
                right: -item.size / 2,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.25)",
                boxShadow: `0 0 16px ${item.glow}, 0 0 32px ${item.glow}`,
                animation: `counter-orbit-${item.orbitIdx} ${item.orbit.speed}s ${-(item.startAngle / 360) * item.orbit.speed}s linear infinite`,
              }}
            >
              <img
                src={item.src}
                alt="photo"
                className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                style={{ transform: "scale(1)", transition: "all 0.5s" }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 10px ${item.glow}` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Center Card (overlaid on the solar system) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-11/12 max-w-xs pointer-events-none">
        <div
          className="relative p-7 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(20,5,40,0.82) 0%, rgba(10,2,25,0.75) 100%)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 50px rgba(168,85,247,0.1), 0 0 100px rgba(236,72,153,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
            pointerEvents: "all",
          }}
        >
          <h1
            className="text-3xl font-bold text-white mb-1 tracking-wide"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.02em" }}
          >
            Would you be my girlfriend?
          </h1>
          <p className="text-gray-400 text-xs mb-6" style={{ letterSpacing: "0.05em" }}>
            Somewhere in this vast universe, among of endless possibilities… And yet, here you are… and somehow, that’s where everything I feel begins. 
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setIsAccepted(true)}
              className="relative overflow-hidden text-white font-bold py-2.5 px-9 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #ec4899, #be185d)",
                boxShadow: "0 0 20px rgba(236,72,153,0.45), 0 4px 15px rgba(0,0,0,0.3)",
                fontSize: "15px",
                letterSpacing: "0.03em",
              }}
            >
              Yes!
            </button>
          </div>
        </div>
      </div>

      {/* No button */}
      <button
        onMouseEnter={moveNoButton}
        onClick={moveNoButton}
        className="fixed z-50 text-white font-medium py-2 px-6 rounded-full transition-all duration-200 text-sm"
        style={{
          top: noPosition.top,
          left: noPosition.left,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        No
      </button>

      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
    </div>
  );
}

const cssStyles = `
  @keyframes twinkle {
    0%   { opacity: 0.15; transform: scale(0.7); }
    100% { opacity: 1;    transform: scale(1.3); }
  }

  @keyframes nebula-drift {
    0%   { transform: translate(0px,   0px)  scale(1);    }
    33%  { transform: translate(30px, -20px) scale(1.05); }
    66%  { transform: translate(-20px, 15px) scale(0.96); }
    100% { transform: translate(0px,   0px)  scale(1);    }
  }
  .animate-nebula-drift {
    animation: nebula-drift 22s ease-in-out infinite;
  }

  @keyframes shooting {
    0%   { opacity: 0;   transform: translateX(-120px); }
    5%   { opacity: 1; }
    40%  { opacity: 0.6; }
    70%  { opacity: 0;   transform: translateX(220px); }
    100% { opacity: 0;   transform: translateX(220px); }
  }

  @keyframes sun-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes corona-flicker {
    0%   { opacity: 0.5; transform: translateX(-50%) translateY(-100%) rotate(var(--r, 0deg)) translateY(-45px) scaleY(0.8); }
    100% { opacity: 1;   transform: translateX(-50%) translateY(-100%) rotate(var(--r, 0deg)) translateY(-45px) scaleY(1.2); }
  }

  /* Orbit animations for each ring + counter-rotations to keep photos upright */
  @keyframes orbit-0 {
    from { transform: perspective(600px) rotateX(0deg)   rotate(0deg); }
    to   { transform: perspective(600px) rotateX(0deg)   rotate(360deg); }
  }
  @keyframes counter-orbit-0 {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }

  @keyframes orbit-1 {
    from { transform: perspective(600px) rotateX(15deg)  rotate(0deg); }
    to   { transform: perspective(600px) rotateX(15deg)  rotate(360deg); }
  }
  @keyframes counter-orbit-1 {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }

  @keyframes orbit-2 {
    from { transform: perspective(600px) rotateX(-10deg) rotate(0deg); }
    to   { transform: perspective(600px) rotateX(-10deg) rotate(360deg); }
  }
  @keyframes counter-orbit-2 {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }

  @keyframes orbit-3 {
    from { transform: perspective(600px) rotateX(8deg)   rotate(0deg); }
    to   { transform: perspective(600px) rotateX(8deg)   rotate(360deg); }
  }
  @keyframes counter-orbit-3 {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
`;