import React, { useState } from "react";
import TenantProfile from "./TenantProfile";
import BookingForm from "./Booking";

function TenantDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto p-6 flex">
      <div className="flex flex-col space-y-4 w-1/4 mr-8">
        <button
          className={`px-8 py-3 rounded-lg text-lg font-medium ${
            activeTab === "profile"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
        <button
          className={`px-8 py-3 rounded-lg text-lg font-medium ${
            activeTab === "booking"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("booking")}
        >
          Book Now
        </button>
      </div>

      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        {activeTab === "profile" && <TenantProfile />}
        {activeTab === "booking" && <BookingForm />}
      </div>
    </div>
  );
}

export default TenantDashboard;
