const variants = {
  primary: "bg-[#f4ff5a] text-[#10110c] hover:bg-white border-transparent",
  secondary: "bg-white/[0.06] text-white hover:bg-white/[0.12] border-white/15",
  ghost: "bg-transparent text-white hover:bg-white/[0.06] border-transparent",
};

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4ff5a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a08] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
