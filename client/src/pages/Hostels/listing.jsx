import React from "react";
import { useQuery } from "react-query";
import {Link} from 'react-router-dom'

const fetchHostels = async () => {
  const response = await fetch("http://localhost:4000/hostels");
  if (!response.ok) {
    throw new Error("Failed to fetch hostels");
  }
  return response.json();
};

const HostelList = () => {
  const { data: hostels, isLoading, isError, error } = useQuery(
    "allhostels",
    fetchHostels
  );

  const handleBookNow = (hostelId) => {
    alert(`Booking confirmed for hostel with ID: ${hostelId}`);
    // Implement actual booking logic here, such as redirecting to a booking page
    // or calling a booking API.
  };

  if (isLoading) return <div>Loading hostels...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {hostels.map((hostel) => (
        <div
          key={hostel.id}
          className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Image */}
          <img
            src={hostel.imageUrl || "/placeholder.jpg"}
            alt={hostel.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            {/* Hostel Name */}
            <h3 className="text-xl font-semibold text-gray-800">
              {hostel.name}
            </h3>

            {/* Location */}
            <p className="text-gray-600 mt-1">{hostel.location}</p>

            {/* Price */}
            <p className="text-gray-800 mt-2">
              Price per Room:{" "}
              <span className="font-medium">${hostel.pricePerRoom}</span>
            </p>

            {/* Owner Info */}
            <p className="text-gray-600 mt-1">
              Owner: <span className="font-medium">{hostel.user.firstName}</span>
            </p>

            {/* Book Now Button */}
            <Link
            to={`/hostel/${hostel.id}`}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 inline-block text-center"
        >
            Book Now
        </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostelList;
