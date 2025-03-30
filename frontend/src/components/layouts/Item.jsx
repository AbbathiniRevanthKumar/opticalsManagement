import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/productCartSlice";

const Item = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.productCart);

  const productCode = product?.f_code || product?.l_code || "";

  const isProductInCart = cartProducts.find(
    (item) => item.code === productCode
  );

  const [productInCart, setProductInCart] = useState(!!isProductInCart);

  const handleClick = () => {
    if (productInCart) {
      dispatch(removeFromCart({ code: productCode })); // Remove item from cart
    } else {
      let payload = {
        code: product?.f_code || product?.l_code,
        qty: product?.f_qty || product?.l_qty,
        name: product?.f_name || product?.l_name,
        company: product?.f_company_name || product?.l_company,
        model: product?.f_model_name || product?.l_model,
        material: product?.f_material_name || product?.l_material,
        size: product?.f_size || null,
        type: product?.l_type || null,
        sight: product?.spherical
          ? {
              sph: product.spherical,
              cyl: product.cylinder,
              add: product.addition,
            }
          : null,
        productType: product?.f_code ? "Frames" : "Lens",
      };
      dispatch(addToCart(payload));
    }
    setProductInCart(!productInCart);
  };

  return (
    <div
      className="bg-gray-200 p-2 rounded-lg flex flex-col gap-2"
      key={productCode}
    >
      <div className="grid grid-cols-2 lg:grid-cols-10 gap-2 w-full justify-between items-center">
        <div className="col-span-1 flex lg:justify-center items-center">
          {productCode}
        </div>
        <div className="col-span-2 flex lg:justify-start items-center">
          {product?.f_name || product?.l_name}
        </div>
        <div className="col-span-2 flex lg:justify-start items-center">
          {product?.f_company_name || product?.l_company}
        </div>
        <div className="col-span-1 flex lg:justify-center items-center">
          {product?.f_material_name || product?.l_material}
        </div>
        <div className="col-span-1 flex lg:justify-center items-center">
          {product?.f_model_name || product?.l_model}
        </div>
        <div className="col-span-1 flex lg:justify-center items-center">
          {product?.f_size || product?.l_type}
        </div>
        <div className="col-span-1 w-16 flex justify-start md:justify-center items-center">
          {product?.f_qty || product?.l_qty || ""}
        </div>
        <div className="col-span-1 md:col-span-1">
          <button
            className={`btn py-1 px-4 md:w-full ${
              productInCart ? "bg-danger" : "bg-primary"
            }`}
            onClick={handleClick}
          >
            {productInCart ? "Remove" : "Add"}
          </button>
        </div>
      </div>

      {/* If the product is a lens, display additional lens details */}
      {product?.spherical && (
        <div className="flex py-1 justify-center gap-4 bg-secondary rounded-lg items-center w-full px-2">
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
            <span>SPH :</span>{" "}
            <span className="font-semibold">{product?.spherical}</span>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
            <span>CYL :</span>{" "}
            <span className="font-semibold">{product?.cylinder}</span>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
            <span>ADD :</span>{" "}
            <span className="font-semibold">{product?.addition}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
