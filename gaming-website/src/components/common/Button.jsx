const variants = {
  primary: "button--primary",
  secondary: "button--secondary",
  ghost: "button--ghost",
};

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={`button ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
