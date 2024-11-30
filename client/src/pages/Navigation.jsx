import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-white text-black px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        <img src="./logo.PNG" alt="Logo" className="h-32 w-32 object-contain" />
      </div>

      <div className="flex space-x-14 text-lg md:text-xl font-extrabold">
        {" "}
        <Link to="/" className="hover:text-yellow-500 transition duration-300">
          Home
        </Link>
        <Link
          to="/hostels"
          className="hover:text-yellow-500 transition duration-300"
        >
          Hostels
        </Link>
        <Link
          to="/login"
          className="hover:text-yellow-500 transition duration-300"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
