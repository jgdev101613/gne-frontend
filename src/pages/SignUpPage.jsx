import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, User, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthStore();

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const t = toast.loading("Creating identity...");

    try {
      await signup(email, password, name);

      toast.success("Account created", { id: t });

      navigate("/verify-email");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || err, { id: t });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-black">
      {/* 🌄 BACKGROUND (same system as login) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(/register-background.png)` }}
      />

      {/* 🌫 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🌌 AMBIENT LIGHT FIELD */}
      <div className="absolute inset-0">
        <div className="absolute w-125 h-125 bg-purple-600/20 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-100 h-100 bg-pink-500/20 blur-[120px] bottom-[-10%] right-[-10%]" />
      </div>

      {/* 🔮 CARD */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_70px_rgba(168,85,247,0.15)]"
      >
        <div className="p-6 sm:p-8">
          {/* TITLE */}
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-linear-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text"
          >
            Create Account
          </h2>

          {/* FORM */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <Input
              icon={User}
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              icon={Mail}
              type="email"
              placeholder="Email address"
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

            <p className="text-justify text-sm sm:text-md font-semibold text-gray-300 mb-6">
              If you want to create an account, you must be Eunice. If you're
              not, you can create account but you won't be able to access the
              real content.
            </p>

            {/* PASSWORD METER (keep your logic) */}
            <PasswordStrengthMeter password={password} />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-semibold shadow-lg"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="px-6 sm:px-8 py-4 bg-black/40 text-center border-t border-white/10">
          <p className="text-xs sm:text-sm text-gray-300">
            Already have access?{" "}
            <Link
              to={"/login"}
              className="text-purple-300 hover:text-white transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
