import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── How long you've been together ── */
const START_DATE = new Date("2024-12-30"); // ← change this to your actual start date

const getTimeTogether = () => {
  const now = new Date();
  const diff = now - START_DATE;

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;

  return { years, months, days, totalDays };
};

const Footer = () => {
  const footerRef = useRef(null);
  const heartRef = useRef(null);
  const counterRef = useRef(null);
  const quoteRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const statsRef = useRef([]);
  const signatureRef = useRef(null);

  const { years, months, days, totalDays } = getTimeTogether();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entrance timeline on scroll ── */
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 90%",
        onEnter: () => {
          const tl = gsap.timeline();

          /* Lines draw in */
          tl.fromTo(
            [lineLeftRef.current, lineRightRef.current],
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.1,
            },
          );

          /* Heart drop */
          tl.fromTo(
            heartRef.current,
            { y: -30, opacity: 0, scale: 0.5 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "elastic.out(1, 0.5)",
            },
            0.3,
          );

          /* Quote */
          tl.fromTo(
            quoteRef.current,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            0.5,
          );

          /* Stats */
          tl.fromTo(
            statsRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.5)",
              stagger: 0.1,
            },
            0.7,
          );

          /* Counter number count-up */
          tl.fromTo(
            counterRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            0.8,
          );

          const target = { val: 0 };
          gsap.to(target, {
            val: totalDays,
            duration: 2,
            delay: 0.8,
            ease: "power2.out",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.floor(
                  target.val,
                ).toLocaleString();
              }
            },
          });

          /* Signature */
          tl.fromTo(
            signatureRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            1.2,
          );
        },
      });

      /* ── Heartbeat loop ── */
      gsap.to(heartRef.current, {
        scale: 1.18,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5,
      });

      /* ── Floating orb drift ── */
      gsap.to(".footer-orb", {
        y: "+=18",
        x: "+=12",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.2,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: years,
      label: years === 1 ? "year" : "years",
      sub: "of loving you",
    },
    {
      value: months,
      label: months === 1 ? "month" : "months",
      sub: "of growing closer",
    },
    {
      value: days,
      label: days === 1 ? "day" : "days",
      sub: "since last count",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative h-screen sm:h-full overflow-hidden pt-24 pb-14 px-5"
    >
      {/* ── Ambient orbs ── */}
      <div className="footer-orb absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] rounded-full bg-rose-500/10 blur-[90px] pointer-events-none" />
      <div className="footer-orb absolute bottom-0 left-[-5%] w-[260px] h-[260px] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />
      <div className="footer-orb absolute bottom-0 right-[-5%] w-[220px] h-[220px] rounded-full bg-pink-500/10 blur-[80px] pointer-events-none" />

      {/* ── Top divider ── */}
      <div className="relative flex items-center justify-center gap-4 mb-16">
        <div
          ref={lineLeftRef}
          className="flex-1 max-w-xs h-px origin-right"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(244,114,182,0.5))",
            transform: "scaleX(0)",
            opacity: 0,
          }}
        />

        <div ref={heartRef} style={{ opacity: 0 }}>
          <Heart
            size={20}
            fill="rgba(244,114,182,0.9)"
            stroke="rgba(244,114,182,0.9)"
            strokeWidth={1.5}
          />
        </div>

        <div
          ref={lineRightRef}
          className="flex-1 max-w-xs h-px origin-left"
          style={{
            background:
              "linear-gradient(90deg, rgba(244,114,182,0.5), transparent)",
            transform: "scaleX(0)",
            opacity: 0,
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* ── Quote ── */}
        <div ref={quoteRef} style={{ opacity: 0 }}>
          <p
            className="text-rose-100/25 text-6xl leading-none mb-2 select-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ❝
          </p>
          <p
            className="text-white/70 leading-relaxed max-w-lg mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.25rem",
              fontStyle: "italic",
              lineHeight: "1.8",
            }}
          >
            In all the world, there is no heart for me like yours. In all the
            world, there is no love for you like mine.
          </p>
          <p
            className="text-rose-400/50 text-xs tracking-widest mt-3 uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            — Maya Angelou
          </p>
        </div>

        {/* ── Days counter ── */}
        <div className="mt-14 mb-4">
          <p
            className="text-rose-400/50 text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            days we've shared
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span
              ref={counterRef}
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(3rem, 10vw, 5.5rem)",
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 40%, #c084fc 80%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0,
              }}
            >
              0
            </span>
          </div>
        </div>

        {/* ── Stat pills ── */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {stats.map((s, i) => (
            <div
              key={i}
              ref={(el) => (statsRef.current[i] = el)}
              className="flex flex-col items-center px-6 py-3 rounded-2xl"
              style={{
                opacity: 0,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(244,114,182,0.15)",
                backdropFilter: "blur(10px)",
                minWidth: "100px",
              }}
            >
              <span
                className="font-bold text-white/90"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </span>
              <span
                className="text-rose-300/70 text-xs mt-0.5 capitalize"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.85rem",
                }}
              >
                {s.label}
              </span>
              <span
                className="text-white/25 text-[10px] mt-0.5 italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {s.sub}
              </span>
            </div>
          ))}
        </div>

        {/* ── Signature ── */}
        <div
          ref={signatureRef}
          className="mt-16 flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
        >
          {/* Dot row */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: i === 2 ? "6px" : "3px",
                  height: i === 2 ? "6px" : "3px",
                  background:
                    i === 2 ? "rgba(244,114,182,0.8)" : "rgba(244,114,182,0.3)",
                  boxShadow: i === 2 ? "0 0 6px rgba(244,114,182,0.6)" : "none",
                }}
              />
            ))}
          </div>

          <p
            className="text-white/20 text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            made with love, for you &amp; only you
          </p>

          <p
            className="text-white/10 text-[10px] tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            © {new Date().getFullYear()} · JGDEV
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
