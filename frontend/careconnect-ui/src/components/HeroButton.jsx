const HeroButton = ({ children, onClick, variant = "primary" }) => {
  const base =
    "px-6 py-3 rounded-lg font-semibold transition duration-200";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default HeroButton;
