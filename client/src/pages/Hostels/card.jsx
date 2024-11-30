import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Card = ({ hostel }) => {
  const [message, setMessage] = useState(""); // State for success/error messages
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize navigate hook

  // Mutation to delete a hostel
  const deleteMutation = useMutation(
    async (hostelId) => {
      const response = await fetch(
        `http://localhost:4000/hostels/${hostelId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete hostel");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("personalhostels");
        setMessage("Hostel successfully deleted.");
      },
      onError: (error) => {
        if (error.message.includes("booked")) {
          setMessage(
            "Sorry, this hostel cannot be deleted because it has already been booked.",
          );
        } else {
          setMessage(
            "Sorry, this hostel cannot be deleted because it has already been booked.",
          );
        }
      },
    },
  );

  const handleRemove = () => {
    deleteMutation.mutate(hostel.id);
  };

  const handleUpdate = () => {
    navigate(`/updatehostel/${hostel.id}`);
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <img
        src={hostel.imageUrl}
        alt={hostel.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{hostel.name}</h3>

        <p className="text-gray-600 mt-1">{hostel.location}</p>

        <p className="text-gray-800 mt-2">
          Room Type: <span className="font-medium">{hostel.roomType}</span>
        </p>

        <p className="text-gray-800 mt-2">
          Rooms Available:{" "}
          <span className="font-medium">{hostel.roomsCount}</span>
        </p>

        <p className="text-gray-800 mt-2">
          Rent per Room:{" "}
          <span className="font-medium">ksh {hostel.pricePerRoom}</span>
        </p>

        <button
          onClick={handleRemove}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Remove
        </button>

        <button
          onClick={handleUpdate}
          className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Update
        </button>

        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
