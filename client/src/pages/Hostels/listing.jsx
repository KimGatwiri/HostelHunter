import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchHostels = async () => {
  const response = await fetch("http://localhost:4000/hostels");
  if (!response.ok) {
    throw new Error("Failed to fetch hostels");
  }
  return response.json();
};

const HostelList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const {
    data: hostels,
    isLoading,
    isError,
    error,
  } = useQuery("allhostels", fetchHostels);

  const tolerance = 100;

  const filteredHostels = hostels?.filter((hostel) => {
    const matchesName = hostel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRent = searchTerm
      ? Math.abs(hostel.pricePerRoom - parseInt(searchTerm)) <= tolerance
      : true;
    return matchesName || matchesRent;
  });

  if (isLoading) return <div>Loading hostels...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or rent..."
          className="mb-4 md:mb-0 p-2 border rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {filteredHostels?.length === 0 && (
        <div className="text-red-500 mb-4">
          {isNaN(searchTerm)
            ? "Sorry, no hostels match the name ."
            : "Sorry, we currently don't have a hostel by that rent amount."}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHostels?.map((hostel) => (
          <div
            key={hostel.id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={hostel.imageUrl || "/placeholder.jpg"}
              alt={hostel.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hostel.name}
              </h3>

              <p className="text-gray-600 mt-1">{hostel.location}</p>

              <p className="text-gray-800 mt-2">
                Rent per Room:{" "}
                <span className="font-medium">ksh {hostel.pricePerRoom}</span>
              </p>

              <p className="text-gray-600 mt-1">
                Owner:{" "}
                <span className="font-medium">{hostel.user.firstName}</span>
              </p>

              <Link
                to={`/hostel/${hostel.id}`}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200 inline-block text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelList;
