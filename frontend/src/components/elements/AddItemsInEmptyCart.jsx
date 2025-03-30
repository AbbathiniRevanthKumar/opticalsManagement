import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import api from "../../helpers/api";
import Item from "../layouts/Item";
import SearchBar from "../layouts/SearchBar";
import Toogle from "../Toogle/Toogle";

const AddItemsInEmptyCart = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true);
  const [initialProducts, setInitialProducts] = useState([]);
  const [isLensSelected, setIsLensSelected] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    fetchProducts(false); // Default to fetching frames
  }, []);

  const fetchFrameProducts = async () => {
    setProducts([]); // Clear previous products
    const response = await api.fetchFrameProducts();
    if (response.success) {
      setProducts(response.data);
      setInitialProducts(response.data);
    }
  };

  const fetchLensProducts = async () => {
    setProducts([]); // Clear previous products
    const response = await api.getLensDetails();
    if (response.success) {
      setProducts(response.data);
      setInitialProducts(response.data);
    }
  };

  const fetchProducts = (isLens) => {
    setIsLensSelected(isLens);
    if (isLens) {
      fetchLensProducts();
    } else {
      fetchFrameProducts();
    }
  };

  const handleSearch = (value) => {
    let filteredProducts = [...initialProducts];
    filteredProducts = filteredProducts.filter((item) => {
      const code = item?.f_code || item?.l_code;
      return code.includes(value);
    });
    setProducts(filteredProducts);
  };

  return (
    <div className="w-full">
      {showModal && (
        <Modal
          header="Select Items to Add to Cart"
          onCloseModal={() => {
            setShowModal(false);
            onClose();
          }}
          width="w-full"
        >
          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 sticky top-16 bg-background p-2 rounded-lg shadow-md">
              <Toogle left="Frames" right="Lens" onChange={fetchProducts} />
              <div>
                <SearchBar
                  placeholder="search by code"
                  onChangeSearch={handleSearch}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {products.length > 0 ? (
                products.map((item) => (
                  <Item key={item.f_code || item.l_code} product={item} />
                ))
              ) : (
                <p className="text-center">No products available.</p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddItemsInEmptyCart;
