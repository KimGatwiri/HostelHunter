import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import Profile from "../profile";
import PersonalHostels from "../Hostels/personalHostels";
import NotificationBanner from "../Notifications";

function Admindashboard() {
  const [selectedContent, setSelectedContent] = useState("profile");

  const renderContent = () => {
    switch (selectedContent) {
      case "profile":
        return <Profile />;
      case "addHostel":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add Hostel
            </h2>

            <Link to="AddHostel" className="text-blue-500 hover:text-blue-700">
              Click here to add a hostel
            </Link>
          </div>
        );
      case "myHostels":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              My Hostels
            </h2>
            <PersonalHostels />
          </div>
        );
      case "notifications":
        return <NotificationBanner />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 min-h-screen flex">
      <div className="w-1/4 bg-gray-100 p-4 space-y-4">
        <button
          onClick={() => setSelectedContent("profile")}
          className="w-full text-left py-2 px-4 bg-white hover:bg-teal-500 hover:text-white rounded-md shadow-md text-lg font-semibold"
        >
          Profile
        </button>
        <button
          onClick={() => setSelectedContent("addHostel")}
          className="w-full text-left py-2 px-4 bg-white hover:bg-teal-500 hover:text-white rounded-md shadow-md text-lg font-semibold"
        >
          Add Hostel
        </button>
        <button
          onClick={() => setSelectedContent("myHostels")}
          className="w-full text-left py-2 px-4 bg-white hover:bg-teal-500 hover:text-white rounded-md shadow-md text-lg font-semibold"
        >
          My Hostels
        </button>
        <button
          onClick={() => setSelectedContent("notifications")}
          className="w-full text-left py-2 px-4 bg-white hover:bg-teal-500 hover:text-white rounded-md shadow-md text-lg font-semibold"
        >
          Notifications
        </button>
      </div>

      <div className="w-3/4 p-6 bg-white rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
}

export default Admindashboard;
