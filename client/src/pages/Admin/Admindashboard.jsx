import React from "react";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import Profile from "../profile";
import PersonalHostels from "../Hostels/personalHostels";

function Admindashboard() {
  return (
    <div className="p-8  min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Admin Dashboard</h1> */}

      <div className="space-y-1">
        {/* Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-2">
          <Profile />
        </div>

        {/* Add Hostel Link */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <Link
            to="AddHostel"
            className="flex items-center text-blue-500 hover:text-blue-700 text-lg mb-4"
          >
            <MdAddCircle className="mr-2 text-2xl" />
            Add Hostel
          </Link>
        </div>

        {/* My Hostels Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            My Hostels
          </h2>
          <PersonalHostels />
        </div>

        {/* Additional Features */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Other admin features coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
