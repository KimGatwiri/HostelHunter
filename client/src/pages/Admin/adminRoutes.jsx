import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddHostel from "./addHostel";
import Admindashboard from "./Admindashboard";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admindashboard />} />
        <Route path="AddHostel" element={<AddHostel />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
