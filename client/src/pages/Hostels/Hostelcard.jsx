import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const HostelCards = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const {
    isLoading,
    isError,
    error,
    data: hostel,
  } = useQuery({
    queryKey: ["hostel", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/HostelDetails/${id}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        throw new Error(errorData.message || "Failed to fetch hostel");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return (
      <h2 className="text-3xl text-center font-semibold mt-5">
        Loading... Please Wait...
      </h2>
    );
  }

  if (isError) {
    return (
      <h2 className="text-3xl text-center font-semibold mt-5 text-red-500">
        {error.message}
      </h2>
    );
  }

  console.log("Hostel data:", hostel);

  const handleBookNow = () => {
    sessionStorage.setItem("hostelId", id);

    navigate("/login");
  };

  return (
    <div className="flex justify-center p-6">
      <div className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-full sm:w-96">
        <img
          src={hostel.imageUrl || "fallback-image.jpg"}
          alt={hostel.name || "Hostel"}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 flex flex-col items-center">
          <h3 className="text-2xl font-extrabold text-gray-800">
            {hostel.name || "Unknown Name"}
          </h3>

          <p className="text-lg text-gray-600 mt-2">
            {hostel.location || "Unknown Location"}
          </p>

          <p className="text-lg text-gray-800 mt-2">
            Room Type:{" "}
            <span className="font-medium">{hostel.roomType || "N/A"}</span>
          </p>

          <p className="text-lg text-gray-800 mt-2">
            Rooms Available:{" "}
            <span className="font-medium">{hostel.roomsCount || 0}</span>
          </p>

          <p className="text-lg text-gray-800 mt-2">
            Price per Room:{" "}
            <span className="font-medium">
              Ksh {hostel.pricePerRoom || "N/A"}
            </span>
          </p>

          <p className="text-lg text-gray-800 mt-2">
            Amenities:
            {Array.isArray(hostel.amenities) ? (
              <ol className="list-disc list-inside mt-2">
                {hostel.amenities.map((amenity, index) => (
                  <li key={index}>{amenity.name}</li> // Access the name property of each amenity object
                ))}
              </ol>
            ) : (
              <span className="text-gray-600">No amenities listed</span>
            )}
          </p>

          <div className="mt-6">
            <button
              onClick={handleBookNow}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelCards;
