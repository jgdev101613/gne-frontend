import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const WhatYouAreSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Title reveal ── */
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          );
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.4,
              ease: "power3.out",
              delay: 0.4,
            },
          );
        },
      });

      /* ── Cards ── */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const isLeft = i % 2 === 0;

        /* Entry animation */
        gsap.fromTo(
          card,
          {
            x: isLeft ? -60 : 60,
            y: 50,
            opacity: 0,
            scale: 0.9,
            filter: "blur(6px)",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
            delay: (i % 3) * 0.1,
          },
        );

        /* Hover 3d tilt */
        const handleEnter = () => {
          gsap.to(card, {
            y: -8,
            boxShadow: "0 30px 60px rgba(244, 114, 182, 0.2)",
            duration: 0.35,
            ease: "power2.out",
          });
          const img = card.querySelector("img");
          if (img)
            gsap.to(img, { scale: 1.08, duration: 0.5, ease: "power2.out" });
        };
        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            duration: 0.5,
            ease: "power3.out",
          });
          const img = card.querySelector("img");
          if (img)
            gsap.to(img, { scale: 1, duration: 0.5, ease: "power3.out" });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        return () => {
          card.removeEventListener("mouseenter", handleEnter);
          card.removeEventListener("mouseleave", handleLeave);
        };
      });

      /* ── Background orbs parallax ── */
      gsap.to(".wa-orb-1", {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".wa-orb-2", {
        y: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 px-5 overflow-hidden">
      {/* Orbs */}
      <div className="wa-orb-1 absolute top-20 right-[-5%] w-95 h-95 rounded-full bg-purple-600/15 blur-[110px] pointer-events-none" />
      <div className="wa-orb-2 absolute bottom-10 left-[-5%] w-[320px] h-80 rounded-full bg-rose-500/12 blur-[100px] pointer-events-none" />

      {/* Title */}
      <div
        ref={titleRef}
        className="relative z-10 text-center mb-20"
        style={{ opacity: 0 }}
      >
        <p
          className="text-rose-400/60 text-xs tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          a love letter in fragments
        </p>
        <h2
          className="text-2xl sm:text-5xl p-5 font-bold leading-tight"
          style={{
            background:
              "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 40%, #c084fc 80%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          What You Are To Me
        </h2>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="mt-6 mx-auto h-px w-32 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(244,114,182,0.7), transparent)",
            transform: "scaleX(0)",
            opacity: 0,
          }}
        />

        <p
          className="text-rose-100/40 mt-5 text-sm sm:text-base max-w-md mx-auto leading-relaxed italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem",
          }}
        >
          Not defined by one thing… but by everything you became to me
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {sections.map((item, i) => (
          <Card key={i} item={item} i={i} cardRefs={cardRefs} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cormorant+Garamond:ital,wght@1,400;1,500&display=swap');
      `}</style>
    </section>
  );
};

const Card = ({ item, i, cardRefs }) => {
  const accentColors = [
    "from-rose-500/30 to-pink-600/20",
    "from-purple-500/30 to-indigo-600/20",
    "from-pink-400/30 to-rose-500/20",
    "from-violet-500/30 to-purple-600/20",
    "from-indigo-400/30 to-blue-600/20",
    "from-fuchsia-400/30 to-pink-600/20",
  ];
  const accent = accentColors[i % accentColors.length];

  return (
    <div
      ref={(el) => (cardRefs.current[i] = el)}
      className="group relative rounded-3xl overflow-hidden cursor-default will-change-transform"
      style={{
        opacity: 0,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full p-2 rounded-3xl object-cover will-change-transform"
          style={{ display: "block" }}
        />
        {/* Overlay gradient */}
        <div
          className={`absolute inset-0 bg-linear-to-t ${accent} opacity-60`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0b12]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Number badge */}
        <div
          className="inline-flex items-center justify-center w-6 h-6 rounded-full mb-3 text-[10px] font-bold text-rose-300 border border-rose-400/30"
          style={{ background: "rgba(244,114,182,0.12)" }}
        >
          {String(i + 1).padStart(2, "0")}
        </div>

        <h2 className="text-white/90 text-xl font-bold leading-snug mb-2">
          {item.title}
        </h2>
        <p
          className="text-rose-100/45 text-sm leading-relaxed italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.97rem",
          }}
        >
          {item.text}
        </p>
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(244,114,182,0.6), rgba(167,139,250,0.6), transparent)",
        }}
      />
    </div>
  );
};

export default WhatYouAreSection;
