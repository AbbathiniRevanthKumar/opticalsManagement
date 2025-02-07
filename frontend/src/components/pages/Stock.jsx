import React, { useState } from "react";
import Header from "../layouts/Header";
import ClickableBtn from "../layouts/ClickableBtn";
import icons from "../../utils/icons";
import SearchBar from "../layouts/SearchBar";
import Frames from "../elements/Frames";
import Lens from "../elements/Lens";
import Modal from "../Modal/Modal";

const Stock = () => {
  const [productType, setProductType] = useState("frames");
  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState(false);
  const onChangeSearch = (value) => {
    setSearchValue(value);
  };
  return (
    <div className="flex flex-col gap-2">
      <Header heading={"Stock"} />
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
        <div className="flex flex-col basis-1/2 gap-2 h-32 justify-between">
          <div className="flex gap-2 ">
            <ClickableBtn
              active={productType === "frames" ? true : false}
              onClick={() => setProductType("frames")}
            >
              <div className="flex items-center justify-between w-full p-2 md:p-4 gap-2">
                <div className="text-lg md:text-xl font-bold">Frames</div>
                <div
                  className={`${
                    productType === "frames" ? "text-secondary" : "text-primary"
                  }`}
                >
                  <icons.Stock style={{ fontSize: "2.3em" }} />
                </div>
              </div>
            </ClickableBtn>
            <ClickableBtn
              active={productType === "lens" ? true : false}
              onClick={() => setProductType("lens")}
            >
              <div className="flex items-center justify-between w-full p-2 md:p-4 gap-2">
                <div className="text-lg md:text-xl font-bold">Lens</div>
                <div
                  className={`${
                    productType === "lens" ? "text-secondary" : "text-primary"
                  }`}
                >
                  <icons.Lens style={{ fontSize: "2.5em" }} />
                </div>
              </div>
            </ClickableBtn>
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <SearchBar
              placeholder={`search ${productType}`}
              onChangeSearch={onChangeSearch}
            />
            <div className="flex md:hidden items-center justify-end text-secondary ">
              <button className="btn w-fit p-2 shadow-sm text-black" onClick={()=>setModal(true)}>
                <icons.Add />
              </button>
            </div>
          </div>
        </div>
        <div className="hiden md:flex w-full rounded-lg h-32 basis-1/2  bg-secondary shadow-sm px-4 relative overflow-hidden">
          <div className="flex items-center justify-center w-full h-full basis-3/4 absolute left-0 right-0 top-0 bottom-0 z-0">
            <div className="text-primary text-2xl font-bold ">Graph</div>
          </div>
          <div className="flex items-center justify-center w-fit h-full basis-1/4 absolute top-0 right-4 z-10">
            <div className="text-secondary text-lg  btn bg-primary bg-opacity-90 flex justify-center items-center shadow-sm p-2 cursor-pointer" onClick={()=>setModal(true)}>
              <icons.Add />
            </div>
          </div>
        </div>
      </div>
      <div>
        {productType === "frames" ? (
          <Frames searchValue={searchValue} />
        ) : (
          <Lens searchValue={searchValue} />
        )}
      </div>
      {modal && (
        <Modal
          header={`Add ${productType}`}
          onCloseModal={() => setModal(false)}
        />
      )}
    </div>
  );
};

export default Stock;
