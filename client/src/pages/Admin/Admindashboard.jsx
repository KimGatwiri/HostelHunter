import React from "react";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";

function Admindashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col items-start">
        {/* Link to Add Hostel */}
        <Link
          to="AddHostel"
          className="flex items-center text-blue-500 hover:text-blue-700 text-lg mb-4"
        >
          <MdAddCircle className="mr-2 text-2xl" />
          Add Hostel
        </Link>
        {/* Additional Links or Features */}
        <p className="text-gray-600">Other admin features coming soon...</p>
      </div>
    </div>
  );
}

export default Admindashboard;
