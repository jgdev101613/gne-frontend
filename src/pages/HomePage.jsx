import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../sections/HeroSection";
import WhatYouAreSection from "../sections/WhatYouAreSection";
import Navigation from "../components/Navigation";
import Journey from "../sections/JourneySection";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const wrapRef = useRef(null);

  useEffect(() => {
    /* Refresh ScrollTrigger after mount so measurements are correct */
    ScrollTrigger.refresh();
    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <>
      {/*
        ╔══════════════════════════════════════╗
        ║  GLOBAL BACKGROUND — truly fixed,    ║
        ║  behind everything, no white flash   ║
        ╚══════════════════════════════════════╝
        We use a <style> tag to set the root
        html/body color so there is NEVER a
        white background exposed on any device.
      */}
      <style>{`
        html, body, #root {
          background-color: #09090f !important;
          margin: 0;
          padding: 0;
        }

        /* Prevent iOS overscroll rubber-band flash */
        html {
          overscroll-behavior: none;
        }

        @keyframes nebulaDrift {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(30px, -20px) scale(1.05); }
          66%  { transform: translate(-20px, 15px) scale(0.97); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes nebulaDrift2 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-25px, 25px) scale(1.04); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>

      {/* ── Fixed background layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          backgroundColor: "#09090f",
          overflow: "hidden",
          /* GPU compositing hint so this layer never triggers repaints */
          willChange: "transform",
        }}
      >
        {/* Nebula blobs */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-12%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,38,127,0.22) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "nebulaDrift 14s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "nebulaDrift2 18s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "nebulaDrift 22s ease-in-out infinite reverse",
          }}
        />

        {/* Fine star-like dots */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.35 }}
        >
          {[
            [12, 8],
            [25, 35],
            [45, 15],
            [60, 70],
            [80, 20],
            [90, 55],
            [35, 80],
            [70, 40],
            [15, 60],
            [55, 90],
            [5, 45],
            [85, 10],
            [40, 50],
            [20, 25],
            [75, 85],
          ].map(([x, y], idx) => (
            <circle
              key={idx}
              cx={`${x}%`}
              cy={`${y}%`}
              r={idx % 3 === 0 ? 1.2 : 0.7}
              fill={idx % 2 === 0 ? "#f9a8d4" : "#c084fc"}
              opacity={0.4 + (idx % 5) * 0.1}
            />
          ))}
        </svg>

        {/* Ultra-fine noise grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "192px",
          }}
        />
      </div>

      {/* ── Page content ── */}
      <div
        ref={wrapRef}
        className="relative"
        style={{ zIndex: 1, color: "#fff", minHeight: "100vh" }}
      >
        <HeroSection />
        <WhatYouAreSection />
        <Journey />
      </div>

      <Navigation />
      <Footer />
    </>
  );
};

export default HomePage;
