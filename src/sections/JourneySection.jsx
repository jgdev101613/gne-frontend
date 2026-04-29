import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  const connectorRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Title reveal ── */
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 82%",
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
              duration: 1.5,
              ease: "power3.out",
              delay: 0.5,
            },
          );
        },
      });

      /* ── Step cards ── */
      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        const isLeft = i % 2 === 0;
        const imgEl = step.querySelector(".journey-img-wrap");
        const textEl = step.querySelector(".journey-text");
        const dateEl = step.querySelector(".journey-date");
        const numEl = step.querySelector(".journey-num");

        /* Image side */
        gsap.fromTo(
          imgEl,
          {
            x: isLeft ? -70 : 70,
            opacity: 0,
            scale: 0.92,
            filter: "blur(8px)",
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );

        /* Text side */
        gsap.fromTo(
          textEl,
          { x: isLeft ? 50 : -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );

        /* Date badge pop */
        gsap.fromTo(
          dateEl,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.8)",
            delay: 0.3,
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );

        /* Number badge */
        gsap.fromTo(
          numEl,
          { scale: 0, opacity: 0, rotate: -20 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.55,
            ease: "back.out(2)",
            delay: 0.1,
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );

        /* Hover tilt on image */
        const handleEnter = (e) => {
          gsap.to(imgEl, {
            y: -8,
            scale: 1.02,
            duration: 0.35,
            ease: "power2.out",
          });
          const inner = imgEl.querySelector("img");
          if (inner)
            gsap.to(inner, { scale: 1.08, duration: 0.5, ease: "power2.out" });
        };
        const handleLeave = () => {
          gsap.to(imgEl, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
          const inner = imgEl.querySelector("img");
          if (inner)
            gsap.to(inner, { scale: 1, duration: 0.5, ease: "power3.out" });
        };
        imgEl.addEventListener("mouseenter", handleEnter);
        imgEl.addEventListener("mouseleave", handleLeave);
      });

      /* ── Connector lines draw in ── */
      connectorRefs.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      /* ── Parallax orbs ── */
      gsap.to(".journey-orb-a", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(".journey-orb-b", {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 px-5 overflow-hidden">
      {/* ── Ambient orbs ── */}
      <div className="journey-orb-a absolute top-10 left-[-8%] w-[380px] h-[380px] rounded-full bg-rose-500/14 blur-[110px] pointer-events-none" />
      <div className="journey-orb-b absolute bottom-20 right-[-6%] w-[340px] h-[340px] rounded-full bg-purple-600/14 blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full bg-pink-400/8 blur-[90px] pointer-events-none" />

      {/* ── Title ── */}
      <div
        ref={titleRef}
        className="relative z-10 text-center mb-24"
        style={{ opacity: 0 }}
      >
        <p
          className="text-rose-400/60 text-xs tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          chapter by chapter
        </p>

        <h2
          className="text-4xl p-4 sm:text-6xl font-bold leading-tight"
          style={{
            background:
              "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 40%, #c084fc 80%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Story
        </h2>

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
          className="text-rose-100/40 mt-5 max-w-md mx-auto leading-relaxed italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem",
          }}
        >
          Every moment with you became a chapter I never want to end
        </p>
      </div>

      {/* ── Journey steps ── */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-0">
        {journey.map((step, i) => {
          const isLeft = i % 2 === 0;
          const isLast = i === journey.length - 1;

          return (
            <div key={i}>
              {/* Step */}
              <div
                ref={(el) => (stepRefs.current[i] = el)}
                className={`relative flex flex-col ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-12 py-10`}
              >
                {/* ── Image ── */}
                <div className="journey-img-wrap w-full md:w-1/2 relative cursor-default will-change-transform">
                  {/* Number badge */}
                  <div
                    className="journey-num absolute -top-4 z-20"
                    style={{
                      [isLeft ? "left" : "right"]: "-12px",
                      opacity: 0,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-rose-200 border border-rose-400/30"
                      style={{
                        background: "rgba(244,63,94,0.15)",
                        backdropFilter: "blur(8px)",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "24px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.date}
                      className="w-full object-cover"
                      style={{ height: "300px", display: "block" }}
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isLeft
                          ? "linear-gradient(135deg, rgba(244,63,94,0.25) 0%, rgba(124,58,237,0.15) 100%)"
                          : "linear-gradient(225deg, rgba(244,63,94,0.25) 0%, rgba(124,58,237,0.15) 100%)",
                        mixBlendMode: "multiply",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(9,9,15,0.6) 0%, transparent 60%)",
                      }}
                    />

                    {/* Date badge on image */}
                    <div
                      className="journey-date absolute bottom-4 px-3 py-1 rounded-full"
                      style={{
                        [isLeft ? "left" : "right"]: "16px",
                        background: "rgba(9,9,15,0.65)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(244,114,182,0.25)",
                        opacity: 0,
                      }}
                    >
                      <span
                        className="text-rose-300/90 text-xs tracking-widest"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontStyle: "italic",
                        }}
                      >
                        {step.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Text ── */}
                <div
                  className={`journey-text w-full md:w-1/2 ${
                    isLeft ? "md:text-left" : "md:text-right"
                  } text-center`}
                  style={{ opacity: 0 }}
                >
                  {/* Small eyebrow */}
                  <div
                    className={`flex items-center gap-2 mb-4 ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } justify-center`}
                  >
                    <div
                      className="w-5 h-px"
                      style={{ background: "rgba(244,114,182,0.5)" }}
                    />
                    <span
                      className="text-rose-400/60 text-[10px] tracking-[0.35em] uppercase"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      chapter {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="w-5 h-px"
                      style={{ background: "rgba(244,114,182,0.5)" }}
                    />
                  </div>

                  <p
                    className="text-white/80 leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.2rem",
                      fontStyle: "italic",
                      lineHeight: "1.75",
                    }}
                  >
                    {step.text}
                  </p>

                  {/* Decorative quote mark */}
                  <div
                    className={`mt-6 ${isLeft ? "md:text-left" : "md:text-right"} text-center`}
                    style={{
                      fontSize: "4rem",
                      lineHeight: 1,
                      color: "rgba(244,114,182,0.12)",
                      fontFamily: "Georgia, serif",
                      userSelect: "none",
                    }}
                  >
                    ❝
                  </div>
                </div>
              </div>

              {/* ── Connector between steps ── */}
              {!isLast && (
                <div className="relative flex justify-center py-2">
                  <div
                    ref={(el) => (connectorRefs.current[i] = el)}
                    className="origin-top"
                    style={{
                      width: "1px",
                      height: "60px",
                      background:
                        "linear-gradient(to bottom, rgba(244,114,182,0.5), rgba(167,139,250,0.2), transparent)",
                      opacity: 0,
                      transform: "scaleY(0)",
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: "rgba(244,114,182,0.6)",
                      boxShadow: "0 0 8px rgba(244,114,182,0.5)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Journey;
