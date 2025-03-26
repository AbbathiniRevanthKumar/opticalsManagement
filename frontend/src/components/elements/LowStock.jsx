import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import Modal from "../Modal/Modal";
import AddStockModalDetails from "../layouts/AddStockModalDetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";

const LowStock = (props) => {
  const { data, header, type } = props;
  const [showModal, setShowModal] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [modalHeader, setModalHeader] = useState("");
  const [action, setAction] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const { cartProducts, count } = useSelector((state) => state.productCart);
  const navigate = useNavigate();

  const classifyData = () => {
    const classifiedData = [...data];
    data.map((item, index) => {
      if (cartProducts.find((product) => product.code === item.code)) {
        classifiedData[index] = { ...item, inCart: true };
        return;
      }
      classifiedData[index] = { ...item, inCart: false };
    });
    return classifiedData;
  };

  useEffect(() => {
    const classifiedData = classifyData();
    setFilteredData(classifiedData);
  }, [count, data]);

  const handlePlaceOrder = (item) => {
    setClickedItem(item);
    setShowModal(true);
    setModalHeader(`Order Stock of ${item?.name}`);
    setAction("order");
  };

  const handleAddStock = async (item) => {
    setClickedItem(item);
    setShowModal(true);
    setModalHeader(`Add Stock of ${item?.name}`);
    setAction("add");
  };

  const handleClickCart = () => {
    navigate(routes.protectedRoutes.Orders, { state: { type: "stock" } });
  };
  return (
    <>
      {filteredData.length > 0 ? (
        <div className="w-full bg-secondary p-2 rounded-lg h-96 overflow-auto">
          {/* Fixed Header */}
          <div
            className="bg-danger p-2 rounded-lg text-center font-semibold text-secondary shadow-sm flex justify-center items-center gap-2 w-full text-nowrap 
            sticky top-0 z-10"
          >
            {header}
            <div>[ {filteredData.length} ]</div>
            {<icons.Alert />}
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-col gap-2 w-full p-2">
            {filteredData.map((item, index) => {
              return (
                <div
                  key={index}
                  id={`${item.qty + index}`}
                  className="flex items-center justify-between w-full border-b border-black py-1 px-2"
                >
                  <div className="basis-2/6 md:basis-3/6">
                    <div className="font-semibold">{item.name}</div>
                  </div>
                  <div className="basis-4/6 md:basis-3/6 flex items-center justify-end gap-4">
                    <div className="flex items-center justify-center bg-danger shadow-sm px-4 rounded-lg">
                      <div className="text-secondary font-semibold text-sm md:text-lg py-1 flex items-center justify-center">
                        {item.qty}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 items-center">
                      {!item.inCart ? (
                        <button
                          className="btn w-fit px-4 py-1 text-sm rounded-lg bg-primary bg-opacity-80 text-black font-medium flex items-center justify-center"
                          onClick={() => handlePlaceOrder(item)}
                        >
                          <div className="lg:hidden">
                            <icons.Store fontSize="small" />
                          </div>
                          <div className="hidden lg:flex">{"Place Order"}</div>
                        </button>
                      ) : (
                        <button
                          className="btn w-fit px-4 py-1 text-sm rounded-lg bg-success bg-opacity-80 text-black font-medium flex items-center justify-center"
                          onClick={handleClickCart}
                        >
                          <div className="lg:hidden">
                            <icons.Cart fontSize="small" />
                          </div>
                          <div className="hidden lg:flex">{"View in Cart"}</div>
                        </button>
                      )}
                      <button
                        className="btn w-fit px-4 py-1 text-sm rounded-lg bg-primary bg-opacity-80 text-black font-medium flex items-center justify-center"
                        onClick={() => handleAddStock(item)}
                      >
                        <div className="lg:hidden">
                          <icons.Stock fontSize="small" />
                        </div>
                        <div className="hidden lg:flex">{"Add Stock"}</div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {showModal && (
        <div>
          <Modal
            header={modalHeader}
            onCloseModal={() => {
              setShowModal(false);
              setClickedItem(null);
            }}
          >
            <AddStockModalDetails
              item={clickedItem}
              type={type}
              action={action}
              onClose={() => {
                setShowModal(false);
                setClickedItem(null);
              }}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default LowStock;
