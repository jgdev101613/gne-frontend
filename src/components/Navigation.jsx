import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import {
  Home,
  Sunrise,
  CalendarHeart,
  LayoutGrid,
  Gamepad2,
  Settings,
  LogOut,
  Heart,
  X,
} from "lucide-react";

/* ─────────────────────────────────────
   NAV ITEMS
───────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/", color: "#f9a8d4" },
  { label: "Beginning", icon: Sunrise, path: "/beginning", color: "#fcd34d" },
  { label: "Month", icon: CalendarHeart, path: "/month", color: "#86efac" },
  { label: "Feed", icon: LayoutGrid, path: "/feed", color: "#93c5fd" },
  { label: "Game", icon: Gamepad2, path: "/game", color: "#c4b5fd" },
];

const UTILITY_ITEMS = [
  { label: "Settings", icon: Settings, path: "/settings", color: "#94a3b8" },
  { label: "Logout", icon: LogOut, path: "/logout", color: "#fca5a5" },
];

/* ─────────────────────────────────────
   COMPONENT
───────────────────────────────────── */
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /* refs */
  const backdropRef = useRef(null);
  const fabRef = useRef(null);
  const heartIconRef = useRef(null);
  const xIconRef = useRef(null);
  const itemRefs = useRef([]);
  const labelRefs = useRef([]);
  const dividerRef = useRef(null);
  const containerRef = useRef(null);
  const orbRef = useRef(null);

  const allItems = [...NAV_ITEMS, ...UTILITY_ITEMS];

  /* ── FAB idle pulse ── */
  useEffect(() => {
    gsap.to(orbRef.current, {
      scale: 1.35,
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      ease: "power2.out",
    });
  }, []);

  /* ── Toggle open / close ── */
  const toggle = () => {
    if (open) closeMenu();
    else openMenu();
    setOpen((v) => !v);
  };

  const openMenu = () => {
    const tl = gsap.timeline();

    /* backdrop */
    tl.fromTo(
      backdropRef.current,
      { opacity: 0, backdropFilter: "blur(0px)" },
      {
        opacity: 1,
        backdropFilter: "blur(10px)",
        duration: 0.45,
        ease: "power2.out",
      },
    );

    /* FAB morph */
    tl.to(
      heartIconRef.current,
      { opacity: 0, scale: 0.5, duration: 0.2, ease: "power2.in" },
      0,
    );
    tl.to(
      xIconRef.current,
      { opacity: 1, scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2)" },
      0.1,
    );
    tl.to(
      fabRef.current,
      {
        background: "linear-gradient(135deg, #be185d, #7c3aed)",
        boxShadow: "0 0 40px rgba(192,38,211,0.45)",
        duration: 0.4,
      },
      0,
    );

    /* container */
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" },
      0.1,
    );

    /* items stagger — bottom to top */
    const reversedItems = [...itemRefs.current].reverse();
    tl.fromTo(
      reversedItems,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.055,
        ease: "power3.out",
      },
      0.2,
    );

    /* labels */
    tl.fromTo(
      labelRefs.current,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
      0.3,
    );

    /* divider */
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.35, ease: "power2.out" },
      0.38,
    );
  };

  const closeMenu = () => {
    const tl = gsap.timeline();

    /* items out */
    tl.to(itemRefs.current, {
      x: 40,
      opacity: 0,
      duration: 0.25,
      stagger: { each: 0.04, from: "start" },
      ease: "power2.in",
    });

    /* container */
    tl.to(
      containerRef.current,
      { opacity: 0, scale: 0.88, y: 12, duration: 0.3, ease: "power2.in" },
      0.1,
    );

    /* backdrop */
    tl.to(
      backdropRef.current,
      {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.in",
      },
      0.15,
    );

    /* FAB restore */
    tl.to(
      xIconRef.current,
      { opacity: 0, scale: 0.5, rotate: -90, duration: 0.2, ease: "power2.in" },
      0,
    );
    tl.to(
      heartIconRef.current,
      { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
      0.2,
    );
    tl.to(
      fabRef.current,
      {
        background: "linear-gradient(135deg, #be185d, #9333ea)",
        boxShadow: "0 0 24px rgba(190,24,93,0.35)",
        duration: 0.35,
      },
      0,
    );
  };

  const handleNav = (path) => {
    closeMenu();
    setOpen(false);
    setTimeout(() => navigate(path), 280);
  };

  return (
    <>
      {/* ── Global font import ── */}
      <style>{`
        .nav-item-btn {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        ref={backdropRef}
        onClick={toggle}
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          opacity: 0,
          background: "rgba(9, 9, 15, 0.55)",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* ── Floating zone (bottom-right anchor) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Nav item container */}
        <div
          ref={containerRef}
          className="flex flex-col gap-1 items-end"
          style={{ opacity: 0, pointerEvents: open ? "auto" : "none" }}
        >
          {/* Main nav links */}
          <div
            className="flex flex-col gap-1"
            style={{
              background: "rgba(15, 12, 25, 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "10px",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              minWidth: "200px",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <NavItem
                key={item.label}
                item={item}
                active={location.pathname === item.path}
                refEl={(el) => (itemRefs.current[i] = el)}
                labelRef={(el) => (labelRefs.current[i] = el)}
                onClick={() => handleNav(item.path)}
              />
            ))}

            {/* Divider */}
            <div
              ref={dividerRef}
              className="my-1 h-px origin-left"
              style={{
                background:
                  "linear-gradient(90deg, rgba(244,114,182,0.4), rgba(167,139,250,0.2), transparent)",
                transform: "scaleX(0)",
                opacity: 0,
              }}
            />

            {/* Utility items */}
            {UTILITY_ITEMS.map((item, i) => (
              <NavItem
                key={item.label}
                item={item}
                active={location.pathname === item.path}
                refEl={(el) => (itemRefs.current[NAV_ITEMS.length + i] = el)}
                labelRef={(el) =>
                  (labelRefs.current[NAV_ITEMS.length + i] = el)
                }
                onClick={() => handleNav(item.path)}
                small
              />
            ))}
          </div>
        </div>

        {/* ── FAB button ── */}
        <button
          onClick={toggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="nav-item-btn relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none"
          ref={fabRef}
          style={{
            background: "linear-gradient(135deg, #be185d, #9333ea)",
            boxShadow:
              "0 0 24px rgba(190,24,93,0.35), 0 8px 24px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.15)",
            flexShrink: 0,
          }}
        >
          {/* Pulse orb */}
          <span
            ref={orbRef}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #be185d, #9333ea)",
              opacity: 0.5,
            }}
          />

          {/* Heart icon (default) */}
          <span ref={heartIconRef} className="absolute">
            <Heart size={22} fill="white" stroke="white" strokeWidth={1.5} />
          </span>

          {/* X icon (open) */}
          <span
            ref={xIconRef}
            className="absolute"
            style={{ opacity: 0, transform: "scale(0.5) rotate(-90deg)" }}
          >
            <X size={20} stroke="white" strokeWidth={2} />
          </span>
        </button>
      </div>
    </>
  );
};

/* ─────────────────────────────────────
   NAV ITEM
───────────────────────────────────── */
const NavItem = ({ item, active, refEl, labelRef, onClick, small }) => {
  const Icon = item.icon;
  const btnRef = useRef(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      x: -4,
      background: `${item.color}18`,
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(btnRef.current.querySelector(".nav-icon"), {
      color: item.color,
      scale: 1.2,
      duration: 0.25,
      ease: "back.out(2)",
    });
  };

  const handleLeave = () => {
    if (active) return;
    gsap.to(btnRef.current, {
      x: 0,
      background: "rgba(255,255,255,0)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(btnRef.current.querySelector(".nav-icon"), {
      color: "rgba(255,255,255,0.45)",
      scale: 1,
      duration: 0.3,
    });
  };

  return (
    <button
      ref={(el) => {
        btnRef.current = el;
        refEl(el);
      }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="nav-item-btn w-full flex items-center gap-3 px-3 rounded-xl text-left transition-colors"
      style={{
        height: small ? "36px" : "44px",
        opacity: 0,
        background: active ? `${item.color}20` : "transparent",
        border: active ? `1px solid ${item.color}30` : "1px solid transparent",
        cursor: "pointer",
      }}
    >
      {/* Icon */}
      <span
        className="nav-icon flex-shrink-0"
        style={{
          color: active ? item.color : "rgba(255,255,255,0.45)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon size={small ? 15 : 17} strokeWidth={active ? 2 : 1.5} />
      </span>

      {/* Label */}
      <span
        ref={labelRef}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: small ? "0.8rem" : "0.92rem",
          fontWeight: 600,
          color: active ? item.color : "rgba(255,255,255,0.55)",
          letterSpacing: "0.04em",
          opacity: 0,
        }}
      >
        {item.label}
      </span>

      {/* Active dot */}
      {active && (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{
            background: item.color,
            boxShadow: `0 0 6px ${item.color}`,
          }}
        />
      )}
    </button>
  );
};

export default Navigation;
