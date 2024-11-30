import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Hello, {user?.firstName}
      </h1>

      <div className="flex justify-center mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-teal-500"
        />
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-teal-600">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>

        <div className="flex justify-between items-center text-gray-800 border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="font-bold">{user?.emailAddress}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/updateTenantProfile")}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default TenantProfile;
