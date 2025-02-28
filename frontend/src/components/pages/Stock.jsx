import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import ClickableBtn from "../layouts/ClickableBtn";
import icons from "../../utils/icons";
import SearchBar from "../layouts/SearchBar";
import Frames from "../elements/Frames";
import Lens from "../elements/Lens";
import Modal from "../Modal/Modal";
import AddFrames from "../layouts/AddFrames";
import AddLens from "../layouts/AddLens";
import Graph from "../layouts/Graph";
import api from "../../helpers/api";
import { formatDateForInput } from "../../helpers/help";
import { useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import { useLocation } from "react-router-dom";

const Stock = () => {
  const [productType, setProductType] = useState("frames");
  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState(false);
  const [purchaseTrendsData, setPurchaseTrendsData] = useState([]);
  const { isFramesChanged, isLensChanged } = useSelector(
    (state) => state.productChange
  );
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    const buttonType = location?.state?.action || null;
    if(buttonType === "Add Frame")
    {
      setProductType("frames");
      setModal(true);
      return;
    }
    if(buttonType === "Add Lens")
    {
      setProductType("lens");
      setModal(true);
      return;
    }
  },[location]);

  useEffect(() => {
    const getPurchaseTrendData = async () => {
      const response = await api.getPurchaseDateTrends(productType);
      if (response.success) {
        let data = response.data;
        data = data.map((item) => {
          return {
            date: formatDateForInput(item.date),
            qty: item.qty,
          };
        });
        setPurchaseTrendsData(data);
      }
    };
    setLoading(true);
    getPurchaseTrendData();
    setLoading(false);
  }, [isFramesChanged, isLensChanged, productType]);

  const onChangeSearch = (value) => {
    setSearchValue(value);
  };

  
  
  return (
    <div className="flex flex-col gap-2">
      {loading && <Loader />}
      <Header heading={"STOCK"} />
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
        <div className="flex flex-col  md:basis-1/2 gap-2 md:h-28  md:justify-between ">
          <div className="flex gap-2">
            <ClickableBtn
              active={productType === "frames" ? true : false}
              onClick={() => setProductType("frames")}
            >
              <div className="flex items-center justify-between w-full p-2 md:p-4 gap-2">
                <div className="text-lg md:text-2xl font-bold">Frames</div>
                <div
                  className={`${
                    productType === "frames" ? "text-secondary" : "text-primary"
                  }`}
                >
                  <icons.Stock style={{ fontSize: "2.7em" }} />
                </div>
              </div>
            </ClickableBtn>
            <ClickableBtn
              active={productType === "lens" ? true : false}
              onClick={() => setProductType("lens")}
            >
              <div className="flex items-center justify-between w-full p-2 md:p-4 gap-2">
                <div className="text-lg md:text-2xl font-bold">Lens</div>
                <div
                  className={`${
                    productType === "lens" ? "text-secondary" : "text-primary"
                  }`}
                >
                  <icons.Lens style={{ fontSize: "2.7em" }} />
                </div>
              </div>
            </ClickableBtn>
          </div>
          <div className="hidden md:flex items-center justify-between w-full gap-2">
            <SearchBar
              placeholder={`search ${productType}`}
              onChangeSearch={onChangeSearch}
            />
            <div className="flex items-center justify-end text-secondary ">
              <button
                className="btn w-fit p-1 md:p-2 shadow-sm text-black"
                onClick={() => setModal(true)}
              >
                <icons.Add />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full rounded-lg h-40 md:h-36 md:basis-1/2 bg-secondary shadow-sm p-2">
          <h2 className="px-4 py-1 font-semibold text-center">
            Purchase Date Trends
          </h2>
          {purchaseTrendsData && purchaseTrendsData.length > 0 && (
            <div className="w-full h-full">
              <Graph data={purchaseTrendsData} />
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center justify-between w-full gap-2">
          <SearchBar
            placeholder={`search ${productType}`}
            onChangeSearch={onChangeSearch}
          />
          <div className="flex items-center justify-end text-secondary ">
            <button
              className="btn w-fit p-1 md:p-2 shadow-sm text-black"
              onClick={() => setModal(true)}
            >
              <icons.Add />
            </button>
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
      <div>
        {modal && (
          <Modal
            header={`Add ${productType}`}
            onCloseModal={() => setModal(false)}
          >
            {productType === "frames" && (
              <AddFrames onCloseModal={() => setModal(false)} />
            )}
            {productType === "lens" && (
              <AddLens onCloseModal={() => setModal(false)} />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Stock;
