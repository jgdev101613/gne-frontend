const Input = ({ icon: Icon, error, ...props }) => {
  return (
    <div className="relative mb-5">
      {/* ICON */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-purple-300/80" />
      </div>

      {/* INPUT */}
      <input
        {...props}
        className={`
          w-full pl-10 pr-4 py-3
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-xl
          text-white placeholder-gray-400

          transition-all duration-300 ease-out

          focus:outline-none
          focus:border-purple-400/50
          focus:ring-2 focus:ring-purple-500/20
          focus:bg-white/10

          hover:bg-white/7
        `}
      />

      {/* ERROR STATE (optional future use) */}
      {error && <p className="mt-1 text-xs text-red-400/80">{error}</p>}
    </div>
  );
};

export default Input;
