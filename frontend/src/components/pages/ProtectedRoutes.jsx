import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";
import Stock from "./Stock";
import Footer from "../layouts/Footer";
import Settings from "./Settings";

const ProtectedRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen py-16 px-6 " onClick={handlePageClick}>
      <Navbar onClickMenu={handleMenuClick} isSidebarOpen={isSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={"/app/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoutes;
