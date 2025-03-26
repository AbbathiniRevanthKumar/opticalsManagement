import React, { useState } from "react";
import Header from "../layouts/Header";
import StockOrders from "../elements/StockOrders";
import CustomerOrders from "../elements/CustomerOrders";
import InsideNavbar from "../layouts/InsideNavbar";

const Orders = () => {
  const links = ["Stock"];
  const [selectedLink, setSelectedLink] = useState("Stock");

  return (
    <div className="flex flex-col gap-2">
      <Header heading={"Orders"} />
      <div className="py-4 bg-secondary px-4 rounded-3xl min-h-[70vh] flex flex-col">
        {/* Navbar Section */}
        <div className="py-2">
          <InsideNavbar
            links={links}
            onChangeLink={(link) => setSelectedLink(link)}
          />
        </div>

        {/* Content Section */}
        <div className="py-2 transition-opacity ease-in duration-200 opacity-100 flex-1">
          {selectedLink === "Stock" ? <StockOrders /> : <CustomerOrders />}
        </div>
      </div>
    </div>
  );
};

export default Orders;
