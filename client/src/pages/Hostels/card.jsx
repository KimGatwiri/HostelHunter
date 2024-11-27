import React from "react";
import { useMutation, useQueryClient } from "react-query";

const Card = ({ hostel }) => {
  const queryClient = useQueryClient();

  // Mutation to delete a hostel
  const deleteMutation = useMutation(
    async (hostelId) => {
      const response = await fetch(
        `http://localhost:4000/hostels/${hostelId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies if using session-based authentication
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete hostel");
      }

      return response.json();
    },
    {
      // On success, invalidate the hostels query to refresh the list
      onSuccess: () => {
        queryClient.invalidateQueries("personalhostels"); // Replace "personalhostels" with your specific query key
      },
      onError: (error) => {
        alert(`Failed to delete hostel: ${error.message}`);
      },
    },
  );

  // Handle "Remove" button click
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${hostel.name}?`)) {
      deleteMutation.mutate(hostel.id); // Pass the hostel ID to the mutation
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <img
        src={hostel.imageUrl}
        alt={hostel.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Hostel Name */}
        <h3 className="text-xl font-semibold text-gray-800">{hostel.name}</h3>

        {/* Location */}
        <p className="text-gray-600 mt-1">{hostel.location}</p>

        {/* Room Type */}
        <p className="text-gray-800 mt-2">
          Room Type: <span className="font-medium">{hostel.roomType}</span>
        </p>

        {/* Rooms Available */}
        <p className="text-gray-800 mt-2">
          Rooms Available:{" "}
          <span className="font-medium">{hostel.roomsCount}</span>
        </p>

        {/* Price */}
        <p className="text-gray-800 mt-2">
          Price per Room:{" "}
          <span className="font-medium">${hostel.pricePerRoom}</span>
        </p>

        {/* Remove Button */}
        <button
          onClick={handleRemove} // Attach the delete logic to this button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Remove
        </button>

        {/* Update Button */}
        <button className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Update
        </button>
      </div>
    </div>
  );
};

export default Card;
