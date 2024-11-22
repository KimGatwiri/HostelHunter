import React from "react";
import hero from "../assets/HOME.JPEG";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" py-4">
        <div className="container mx-auto flex justify-between items-center">
          <img className="w-44 h-auto" src="./logo.PNG" alt="Logo" />

          <ul className=" font-semibold flex space-x-28">
            {/* <li>
              <Link to="/" className= " text-3xl text-black hover:text-yellow-500 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/Hostels" className="text-3xl text-black hover:text-yellow-500 transition duration-300">Hostels</Link>
            </li>
            <li>
              <Link to="/profile" className=" text-3xl text-black hover:text-yellow-500 transition duration-300">Profile</Link>
            </li> */}
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Sign-Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300"
            >
              Login
            </button>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-custom-blue text-white">
        <div className="w-full md:w-1/2 px-10 text-center md:text-right flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Find cozy, affordable and perfect homes with Hostel Hunter
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl mb-8">
            Discover comfortable rooms, great community spaces, and everything
            you need for a memorable stay.
          </h2>
          <button className="bg-yellow-500 text-black text-lg py-4 px-8 rounded-full">
            Book Now
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 p-0 m-0">
          <img
            src={hero}
            alt="Hostel Image"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;