import React from "react";

const Button = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-lg  transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
