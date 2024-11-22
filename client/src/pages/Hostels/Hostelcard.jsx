import React, { useEffect, useState } from "react";

const HostelCards = () => {
  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch("http://localhost:4000/hostels", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch hostels");
        }

        const data = await res.json();
        setHostels(data);
      } catch (error) {
        console.error("Error fetching hostels:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostels();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {hostels.map((hostel) => (
        <div
          key={hostel.id}
          className="bg-white border rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={hostel.imageUrl}
            alt={hostel.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{hostel.name}</h3>
            <p className="text-gray-600">{hostel.location}</p>
            <p className="mt-2">Room Type: {hostel.roomType}</p>
            <p className="mt-2">Rooms Available: {hostel.roomsCount}</p>
            <p className="mt-2">Price per Room: ${hostel.pricePerRoom}</p>
            <button
              onClick={() =>
                alert(`Redirect to hostel details for ${hostel.name}`)
              }
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostelCards;
