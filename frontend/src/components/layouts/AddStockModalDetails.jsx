import React, { useEffect, useState } from "react";
import api from "../../helpers/api";
import Loader from "./Loader";
import { notify } from "../notifier/Notifier";
import { useDispatch } from "react-redux";
import { framesChanged, lensChanged } from "../../store/slices/productSlice";

const AddStockModalDetails = (props) => {
  const { item, type } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDetailsByItemName = async () => {
      let response = null;
      setLoading(true);
      if (type === "frames")
        response = await api.getFrameDetailsByFrameName(item.name);
      if (type === "lens")
        response = await api.getLensDetailsByLensName(item.name);

      if (response?.success) {
        setData(response.data);
        setLoading(false);
        return;
      }
      setData([]);
    };
    getDetailsByItemName();
  }, [item]);

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      let updatedData = [...data];
      if (type === "frames") updatedData[index].f_qty = value;
      if (type === "lens") updatedData[index].l_qty = value;
      setData(updatedData);
    }
  };

  const handleQtyUpdate = async (product) => {
    let body = {
      code: product?.f_code || product?.l_code,
      qty: product.f_qty || product?.l_qty,
    };
    //api call for updating the quantity
    let response = null;
    if (type === "frames") {
      response = await api.updateQty(body);
    }
    if (type === "lens") {
      response = await api.updateLensQty(body);
    }
    if (response && response.success) {
      if (type === "frames") dispatch(framesChanged(true));
      if (type === "lens") dispatch(lensChanged(true));
      notify.success(response.message);
      return;
    }
    notify.error(response.message);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="py-8 px-4 flex flex-col gap-2">
      {data &&
        data.length > 0 &&
        data.map((product, index) => {
          return (
            <div
              key={index}
              className="bg-background rounded-lg px-4 py-4 flex flex-col gap-2 justify-between items-center"
            >
              <div className="grid grid-cols-2 lg:grid-cols-7 gap-2 w-full justify-between items-center">
                <div className="flex lg:justify-center items-center">
                  {product?.f_code || product?.l_code}
                </div>
                <div className="flex lg:justify-center items-center ">
                  {product?.f_company_name || product?.l_company}
                </div>
                <div className="flex lg:justify-center items-center">
                  {product.f_material_name || product?.l_material}
                </div>
                <div className="flex lg:justify-center items-center">
                  {product.f_model_name || product?.l_model}
                </div>
                <div className="flex lg:justify-center items-center">
                  {product.f_size || product?.l_type}
                </div>
                <div className="w-16 flex justify-center items-center">
                  <input
                    type="text"
                    className="outline-none bg-transparent w-full border-b border-black text-center px-2 text-danger text-lg font-semibold"
                    value={product?.f_qty || product?.l_qty}
                    autoFocus
                    onChange={(e) => handleChange(e.target.value, index)}
                  />
                </div>
                <div className="">
                  <button
                    className="btn py-1 px-4 w-fit"
                    onClick={() => handleQtyUpdate(product)}
                  >
                    update
                  </button>
                </div>
              </div>
              {type === "lens" && (
                <div className="flex py-1 justify-center gap-4 bg-secondary rounded-lg items-center w-full px-2">
                  <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
                    <span>SPH : </span>
                    <span className="font-semibold">{product.spherical}</span>
                  </div>
                  <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
                    <span>CYL : </span>
                    <span className="font-semibold">{product.cylinder}</span>
                  </div>
                  <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
                    <span>ADD : </span>
                    <span className="font-semibold">{product.addition}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default AddStockModalDetails;
