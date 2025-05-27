import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed w-full top-0 left-0 z-50 shadow-md">
      {/* Logo */}
     
<h2 className="text-2xl">Health tracker</h2>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Navigation Menu */}
      <ul
        className={`absolute md:static top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 transition-all duration-300 ease-in-out 
          ${isOpen ? "block" : "hidden"} md:flex`} // ✅ Always show on PC
      >
       

        {/* Buttons - Wrapped in div to align properly */}
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
          <a href="/Login" className="block">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
              Login
            </button>
          </a>
          <a href="/Signup" className="block">
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">

              Sign In
            </button>
          </a>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
