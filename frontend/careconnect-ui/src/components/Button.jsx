const Button = ({ children, type = "submit", disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 w-full"
    >
      {children}
    </button>
  );
};

export default Button;
