import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeItemInCart,
  removeFromCart,
} from "../../store/slices/productCartSlice";
import { notify } from "../notifier/Notifier";
import SearchBar from "../layouts/SearchBar";
import EmptyCart from "./EmptyCart";
import Select from "../select/select";
import AddItemsInEmptyCart from "./AddItemsInEmptyCart";

const StockOrders = () => {
  const { cartProducts } = useSelector((state) => state.productCart);
  const dispatch = useDispatch();
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [products, setProducts] = useState(cartProducts);
  const [selectedFilter, setSelectedFilter] = useState({
    label: "All",
    value: "All",
  });
  const [addItemsClicked, setAddItemsClicked] = useState(false);
  useEffect(() => {
    setProducts(cartProducts);
  }, [cartProducts]);

  const handleQtyChange = (code, value) => {
    dispatch(changeItemInCart({ code, qty: value }));
  };

  const handleDelete = (product) => {
    dispatch(removeFromCart({ code: product.code }));
    notify.success("Product removed from cart");
  };

  const handleCheckChange = (e, product) => {
    setCheckedProducts((prev) =>
      e.target.checked
        ? [...prev, { code: product.code, qty: product.qty }]
        : prev.filter((item) => item.code !== product.code)
    );
  };

  const handleSearch = (value) => {
    setProducts(
      cartProducts.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleOrderSubmit = () => {
    console.log(checkedProducts);
  };

  const onClickAdditems = () => {
    setAddItemsClicked(true);
  };

  const handleFilterChange = (value) => {
    let filteredProducts = [...cartProducts];
    if (value !== "All")
      filteredProducts = filteredProducts.filter(
        (item) => item.productType === value
      );
    setProducts(filteredProducts);
    setSelectedFilter({ label: value, value: value });
  };
  return (
    <>
      <div className="flex min-h-[60vh] px-2 sm:px-4">
        {cartProducts.length > 0 ? (
          <div className="flex flex-col gap-4 pt-4 w-full ">
            {/* Search and Add button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full ">
              <div className="flex flex-col md:flex-row items-center  gap-2 w-full">
                <div className="w-full md:w-fit">
                  <SearchBar
                    placeholder="Search products"
                    onChangeSearch={handleSearch}
                  />
                </div>
                <div className="w-full md:w-fit drop-shadow">
                  <Select
                    options={[
                      { label: "All", value: "All" },
                      { label: "Frames", value: "Frames" },
                      { label: "Lens", value: "Lens" },
                    ]}
                    value={selectedFilter.value}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    id={"ProductFilter"}
                    placeholder={"select product type"}
                  />
                </div>
              </div>
              <div className="w-full flex  justify-start md:justify-end">
                <button
                  className="btn w-fit px-4 sm:w-auto "
                  onClick={onClickAdditems}
                >
                  Add Items
                </button>
              </div>
            </div>

            {/* Product List */}
            {products.map((product) => (
              <div
                key={product.code}
                className="flex flex-col gap-3 bg-background px-3 py-4 rounded-2xl shadow-md"
              >
                <div className="grid grid-cols-12 gap-2 items-center text-sm sm:text-base">
                  {/* Checkbox */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      id={`checkbox-${product.code}`}
                      onChange={(e) => handleCheckChange(e, product)}
                    />
                    <label
                      htmlFor={`checkbox-${product.code}`}
                      className="w-4 h-4 border-2 border-primary rounded-full cursor-pointer peer-checked:bg-primary"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-span-6 sm:col-span-4 lg:col-span-3 flex items-center">
                    {product.name}
                  </div>
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2 flex items-center justify-center">
                    {product.model}
                  </div>
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2 flex items-center justify-center">
                    {product.material}
                  </div>
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2 flex items-center justify-center">
                    {product?.size || product?.type || ""}
                  </div>

                  {/* Quantity Input */}
                  <div className="col-span-3 sm:col-span-2 lg:col-span-1 flex justify-center items-center">
                    <input
                      type="text"
                      value={product.qty}
                      className="w-full sm:w-16 text-center outline-none bg-transparent text-primary font-semibold text-lg border-b border-black"
                      onChange={(e) =>
                        handleQtyChange(product.code, e.target.value)
                      }
                    />
                  </div>

                  {/* Delete Icon */}
                  <div
                    className="col-span-3 sm:col-span-1 lg:col-span-1 text-danger flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-100"
                    onClick={() => handleDelete(product)}
                  >
                    <icons.Delete />
                  </div>
                </div>

                {/* Sight Details (SPH, CYL, ADD) */}
                {product.sight && (
                  <div className="flex flex-col sm:flex-row gap-2 py-2 items-center sm:justify-end">
                    {["sph", "cyl", "add"].map((prop) => (
                      <div
                        key={prop}
                        className="flex items-center justify-center gap-2 bg-secondary rounded-lg px-3 py-1 w-32 md:w-40"
                      >
                        <span>{prop.toUpperCase()}:</span>
                        <span>{product.sight[prop]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Order Button */}
            {checkedProducts.length > 0 && (
              <div className="pt-2 flex justify-end">
                <button
                  className="btn w-fit px-4 py-2 transition-all duration-100"
                  onClick={handleOrderSubmit}
                >
                  Order Products
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <EmptyCart productsPage={true} onClickAdd={onClickAdditems} />
          </div>
        )}
      </div>
      {addItemsClicked && (
        <AddItemsInEmptyCart
          onClose={() => {
            setAddItemsClicked(false);
            handleFilterChange(selectedFilter.value);
          }}
        />
      )}
    </>
  );
};

export default StockOrders;
