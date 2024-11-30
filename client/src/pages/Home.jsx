import React from "react";
import hero from "../assets/HOME.JPEG";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="flex flex-row items-center justify-center min-h-screen bg-custom-blue text-white">
        <div className="w-full md:w-1/2 px-6 md:px-10 text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Find cozy homes with SunshineHostels
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl mb-8">
            Discover comfortable rooms, great community spaces, and everything
            you need for a memorable stay.
          </h2>
          <Link to="/hostels">
            <button
              className="bg-yellow-500 text-black text-lg py-4 px-8 rounded-full hover:bg-yellow-400 transition duration-300"
              aria-label="Book a stay with SunshineHostels"
            >
              Book Now
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/2 p-0 m-0">
          <img
            src={hero}
            alt="Cozy hostel room with community spaces"
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
