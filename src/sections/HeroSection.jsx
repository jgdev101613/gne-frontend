import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const videos = [
  "/videos/homepage/We.mp4",
  "/videos/homepage/We2.mp4",
  "/videos/homepage/We3.mp4",
];

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const videoRefs = useRef([]);
  const dateRef = useRef(null);
  const heartRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Master timeline ── */
      const tl = gsap.timeline({ delay: 0.3 });

      /* Ambient orbs float in */
      tl.fromTo(
        ".hero-orb",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          stagger: 0.3,
        },
        0,
      );

      /* Date badge */
      tl.fromTo(
        dateRef.current,
        { y: -20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
        0.5,
      );

      /* Heart pulse */
      tl.fromTo(
        heartRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" },
        0.8,
      );

      /* Heading — letter by letter */
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "chars" });
        tl.fromTo(
          split.chars,
          { y: 60, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.04,
          },
          0.9,
        );
      }

      /* Subtitle fade */
      tl.fromTo(
        subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        1.5,
      );

      /* Videos — cascade reveal */
      tl.fromTo(
        videoRefs.current,
        { y: 80, opacity: 0, scale: 0.88, rotateY: 12 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.18,
        },
        1.6,
      );

      /* ── Continuous heart beat ── */
      gsap.to(heartRef.current, {
        scale: 1.15,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });

      /* ── Orb gentle drift ── */
      gsap.utils.toArray(".hero-orb").forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? "+=30" : "-=30",
          y: "+=20",
          duration: 4 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* ── Scroll parallax on heading ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(headingRef.current, { y: self.progress * -60 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-5 pt-24 pb-32 overflow-hidden"
    >
      {/* ── Ambient orbs ── */}
      <div className="hero-orb absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-500/20 blur-[120px] pointer-events-none" />
      <div className="hero-orb absolute bottom-[-5%] right-[-8%] w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[130px] pointer-events-none" />
      <div className="hero-orb absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-pink-400/15 blur-[100px] pointer-events-none" />

      {/* ── Fine grain overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Date badge */}
        <div
          ref={dateRef}
          className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-300 text-xs tracking-widest uppercase"
          style={{ opacity: 0 }}
        >
          <span ref={heartRef} className="text-rose-400" style={{ opacity: 0 }}>
            <Heart size={14} />
          </span>
          <p>our story</p>
        </div>

        {/* Heading */}
        <div
          ref={headingRef}
          className="text-6xl sm:text-7xl font-bold leading-none tracking-tight mb-6 perspective-[1000px]"
        >
          <h2 className="text-purple-300">Hey Babe,</h2>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-rose-100/60 max-w-xl mx-auto leading-relaxed mb-16"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            opacity: 0,
          }}
        >
          I turned our memories into something you can see, feel, and revisit
          anytime… because loving you is my favorite story to tell.
        </p>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {videos.map((src, i) => (
            <VideoCard
              key={i}
              src={src}
              index={i}
              refEl={(el) => (videoRefs.current[i] = el)}
              onClick={() => setActiveVideo(src)}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-10 bg-gradient-to-b from-rose-400/60 to-transparent"
          style={{
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span className="text-rose-300/40 text-[10px] tracking-[0.3em] uppercase">
          scroll
        </span>
      </div>

      {/* Modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cormorant+Garamond:ital,wght@1,400;1,500&display=swap');
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
};

const VideoCard = ({ src, index, refEl, onClick }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  const labels = ["Our Beginning", "Us, Always", "Forever & Ever"];
  const subtexts = [
    "where it all started",
    "every ordinary moment",
    "into infinity",
  ];

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(cardRef.current, {
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveCard = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
    handleMouseLeave();
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        refEl(el);
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
      className="relative rounded-2xl overflow-hidden cursor-pointer border border-white/10"
      style={{
        opacity: 0,
        transformStyle: "preserve-3d",
        willChange: "transform",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <video
        src={src}
        muted
        autoPlay
        loop
        playsInline
        className="w-full h-64 sm:h-72 object-cover"
        style={{ display: "block" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Hover shimmer */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background:
            "linear-gradient(135deg, rgba(244,114,182,0.15) 0%, rgba(167,139,250,0.1) 100%)",
        }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="text-white/90 font-semibold text-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {labels[index]}
        </p>
        <p className="text-white/45 text-xs mt-0.5 italic">{subtexts[index]}</p>
      </div>

      {/* Play icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="M5 3l9 5-9 5V3z" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
