const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
