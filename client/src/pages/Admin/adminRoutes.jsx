import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddHostel from "./addHostel";
import Admindashboard from "./Admindashboard";
import HostelCards from "../Hostels/Hostelcard";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admindashboard />} />
        <Route path="AddHostel" element={<AddHostel />} />
        <Route path="hostels" element={<HostelCards />} />
        {/* <Route path='/profile' element={< Profile/>}/> */}
      </Routes>
    </>
  );
}

export default AdminRoutes;
