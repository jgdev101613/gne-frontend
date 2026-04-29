import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");

  const { verifyEmail, isLoading, user } = useAuthStore();

  const cardRef = useRef(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  /* ─────────────────────────────
     ENTER ANIMATION (GSAP ONLY)
  ───────────────────────────── */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
    );
  }, []);

  /* ─────────────────────────────
     AUTO EMAIL FROM USER
  ───────────────────────────── */
  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  /* ─────────────────────────────
     INPUT HANDLING
  ───────────────────────────── */
  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pasted = value.split("").slice(0, 6);
      pasted.forEach((v, i) => (newCode[i] = v));

      setCode(newCode);

      const last = newCode.findLastIndex((d) => d !== "");
      const focus = last < 5 ? last + 1 : 5;
      inputRefs.current[focus]?.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ─────────────────────────────
     SUBMIT
  ───────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = code.join("");

    const t = toast.loading("Verifying identity...");

    try {
      await verifyEmail(verificationCode, email);

      toast.success("Identity verified", { id: t });

      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || err, {
        id: t,
      });
    }
  };

  const isComplete = code.every((d) => d !== "");

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-sm brightness-50"
        style={{ backgroundImage: `url(/verify-background.jpg)` }}
      />

      {/* DARK PURPLE OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/80 via-black/60 to-purple-950/90" />

      {/* FLOATING LIGHTS */}
      <div className="absolute inset-0">
        <div className="absolute w-100 h-100 bg-purple-600/20 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-75 h-75 bg-pink-500/20 blur-[120px] bottom-[-10%] right-[-10%]" />
      </div>

      {/* CARD */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 bg-linear-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
            Verify Identity
          </h2>

          <p className="text-center text-gray-300 text-sm mb-8">
            Enter the 6-digit code sent to your email
          </p>

          {/* INPUTS */}
          <div className="flex justify-between gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="
                  w-12 h-14 text-center text-xl font-bold
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  text-white
                  rounded-xl
                  focus:outline-none
                  focus:border-purple-400/50
                  focus:ring-2 focus:ring-purple-500/20
                  transition-all
                "
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isLoading}
            className="
              w-full py-3 rounded-xl
              bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600
              text-white font-semibold
              shadow-lg
              disabled:opacity-40
              transition
            "
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
