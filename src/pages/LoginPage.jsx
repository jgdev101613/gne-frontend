import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const cardRef = useRef(null);
  const titleRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 🎬 ENTRY ANIMATION (GSAP ONLY)
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    ).fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.2",
    );
  }, []);

  // 🧠 DESKTOP ONLY PARALLAX
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const x = (window.innerWidth / 2 - e.clientX) / 60;
      const y = (window.innerHeight / 2 - e.clientY) / 60;

      gsap.to(cardRef.current, {
        rotateY: x,
        rotateX: y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const t = toast.loading("Opening gateway...");

    try {
      await login(email, password);
      toast.success("Welcome back 💜", { id: t });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error, { id: t });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-black">
      {/* 🌄 BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 brightness-80 blur-xs"
        style={{ backgroundImage: `url(/login-background.png)` }}
      />

      {/* 🌫 SOFT OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🌌 AMBIENT LIGHT */}
      <div className="absolute inset-0">
        <div className="absolute w-125 h-125 bg-purple-600/20 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-100 h-100 bg-pink-500/20 blur-[120px] bottom-[-10%] right-[-10%]" />
      </div>

      {/* ✨ PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 6 : 12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* 🔮 CARD */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.15)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="p-6 sm:p-8">
          {/* TITLE */}
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl font-bold text-center mb-1 bg-linear-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text"
          >
            Gregg & Eunice
          </h2>
          <p className="text-center text-sm sm:text-md font-semibold text-gray-300 mb-6">
            Welcome back Babe!
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              icon={Mail}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between">
              <p className="text-sm text-purple-300/80">
                You can't access if you're not Eunice
              </p>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-300 hover:text-white transition"
              >
                Recover access
              </Link>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-semibold shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Enter Our Story"
              )}
            </button>
          </form>
        </div>

        <div className="px-6 sm:px-8 py-4  text-center border-t border-white/10 ">
          <p className="text-xs sm:text-sm text-gray-300">
            No account?{" "}
            <Link
              to="/signup"
              className="text-purple-300 hover:text-white transition"
            >
              Create one for free (but you know you can't)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
