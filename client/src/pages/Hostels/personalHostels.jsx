import React from "react";
import { useQuery } from "react-query";
import Card from "./card"; // Assuming Card component is in the same folder

function PersonalHostels() {
  const {
    data: hostels = [],
    isLoading,
    isError,
    error,
  } = useQuery("personalhostels", async () => {
    const response = await fetch("http://localhost:4000/hostels/user", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch hostels");
    }

    return response.json();
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2 className="text-red-500">{error.message}</h2>;

  if (hostels.length === 0) {
    return <h3>No hostels available. Please add one.</h3>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {hostels.map((hostel) => (
        <Card key={hostel.id} hostel={hostel} />
      ))}
    </div>
  );
}

export default PersonalHostels;
