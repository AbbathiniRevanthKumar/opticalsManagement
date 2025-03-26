import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";
import Stock from "./Stock";
import Footer from "../layouts/Footer";
import Settings from "./Settings";
import PageNotFound from "./PageNotFound";
import FloatingButton from "../layouts/FloatingButton";
import StockCartBtn from "../elements/StockCartBtn";
import { routes } from "../../helpers/routes";
import Orders from "./Orders";

const ProtectedRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { count: productCartCount } = useSelector((state) => state.productCart);
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const StockCartButtonClick = () => {
    navigate(routes.protectedRoutes.Orders, { state: { type: "stock" } });
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
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      {location.pathname !== "/app/orders" && (
        <FloatingButton
          count={productCartCount}
          handleClick={StockCartButtonClick}
        >
          <StockCartBtn />
        </FloatingButton>
      )}
      <Footer />
    </div>
  );
};

export default ProtectedRoutes;
