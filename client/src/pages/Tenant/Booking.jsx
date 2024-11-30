import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import * as jwt_decode from "jwt-decode"; // Import the jwt-decode library

const BookingForm = () => {
  const [roomsCount, setRoomsCount] = useState(1);
  const [pricePerRoom, setPricePerRoom] = useState(0);
  const [bookingMessage, setBookingMessage] = useState(""); // Notification message

  const hostelId = sessionStorage.getItem("hostelId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      const socket = io("http://localhost:4000", {
        query: {
          userId: userId,
        },
      });

      socket.on("notification", (data) => {
        setBookingMessage(`Real-time update: ${data.message}`);
      });

      return () => {
        socket.disconnect();
        console.log("WebSocket disconnected");
      };
    } else {
      console.error("No token found, user is not authenticated.");
    }
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    const roomsCountInt = Number(roomsCount);

    if (isNaN(roomsCountInt)) {
      alert("Please enter a valid number for rooms count.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          hostelId,
          roomsCount: roomsCountInt,
          pricePerRoom,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking.");
      }

      const data = await response.json();
      setBookingMessage(
        `Successfully booked ${roomsCountInt} room(s) at ${data.booking.hostel.name}!`,
      );
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="booking-container max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleBooking} className="booking-form space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Book Your Hostel
        </h2>

        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700">
            Rooms Count:
          </label>
          <input
            type="number"
            value={roomsCount}
            onChange={(e) => setRoomsCount(e.target.value)}
            min="1"
            className="form-input w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700">
            Price Per Room:
          </label>
          <input
            type="number"
            value={pricePerRoom}
            onChange={(e) => setPricePerRoom(e.target.value)}
            min="0"
            className="form-input w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="submit-button w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Book Now
        </button>
      </form>

      {bookingMessage && (
        <h1 className="booking-notification mt-6 text-lg text-green-600 font-semibold text-center">
          {bookingMessage}
        </h1>
      )}
    </div>
  );
};

export default BookingForm;
