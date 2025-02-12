import React, { useEffect, useState } from "react";
import Select from "../select/select";
import api from "../../helpers/api";
import { notify } from "../notifier/Notifier";
import Loader from "../layouts/Loader";
import { formatDateForInput } from "../../helpers/help";
import { useDispatch } from "react-redux";
import { framesChanged } from "../../store/slices/productSlice";

const AddFrames = (props) => {
  const { data, onCloseModal } = props;
  const dispatch = useDispatch();

  const date = data?.f_purchase_date
    ? formatDateForInput(new Date(data.f_purchase_date))
    : formatDateForInput(new Date());

  const frameDetails = {
    frameCode: data?.f_code || "",
    frameName: data?.f_name || "",
    frameCompanyDetails: {
      id: data?.f_company_id || "",
    },
    frameMaterialDetails: {
      id: data?.f_material_id || "",
    },
    frameModelDetails: {
      id: data?.f_model_id || "",
    },
    sizeDetails: {
      id: data?.f_size_id || "",
    },
    priceDetails: {
      discount: data?.f_discount || 0.0,
      purchasePrice: data?.f_purchase_price || "",
      salesPrice: data?.f_sales_price || "",
    },
    extraDetails: data?.f_extra_details || "",
    purchaseDate: date,
    qty: data?.f_qty || "",
  };
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [materialDetails, setMaterialDetails] = useState([]);
  const [modelDetails, setModelDetails] = useState([]);
  const [sizeDetails, setSizeDetails] = useState([]);
  const [frameData, setFrameData] = useState(frameDetails);
  const { getFramesPropertyDetails } = api;

  useEffect(() => {
    const propertyDetails = async () => {
      const company = await setPropertyDetails("company");
      const material = await setPropertyDetails("materialType");
      const model = await setPropertyDetails("modelType");
      const size = await setPropertyDetails("size");

      setCompanyDetails(company);
      setMaterialDetails(material);
      setModelDetails(model);
      setSizeDetails(size);
    };
    propertyDetails();
  }, []);

  const setPropertyDetails = async (property) => {
    const response = await getFramesPropertyDetails(property);
    if (response.success) {
      const data = response.data;
      const details = data.map((item) => {
        return { label: item.value, value: item.id };
      });
      return details;
    }
    console.log(response.message);
    return [];
  };

  const handleInputChange = (e, type) => {
    if (type === "name") {
      setFrameData({ ...frameData, ["frameName"]: e.target.value });
      return;
    }
    if (type === "purchase") {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        const priceDetails = {
          ...frameData["priceDetails"],
          ["purchasePrice"]: e.target.value,
        };
        setFrameData({ ...frameData, ["priceDetails"]: priceDetails });
        return;
      }
    }
    if (type === "sales") {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        const priceDetails = {
          ...frameData["priceDetails"],
          ["salesPrice"]: e.target.value,
        };
        setFrameData({ ...frameData, ["priceDetails"]: priceDetails });
        return;
      }
    }
    if (type === "discount") {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        const priceDetails = {
          ...frameData["priceDetails"],
          ["discount"]: e.target.value,
        };
        setFrameData({ ...frameData, ["priceDetails"]: priceDetails });
        return;
      }
    }
    if (type === "qty") {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setFrameData({ ...frameData, ["qty"]: e.target.value });
        return;
      }
    }
    if (type === "extraDetails") {
      setFrameData({ ...frameData, ["extraDetails"]: e.target.value });
      return;
    }
    if (type === "date") {
      setFrameData({ ...frameData, ["purchaseDate"]: e.target.value });
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      frameData.frameName === "" ||
      frameData.frameCompanyDetails.id === "" ||
      frameData.frameMaterialDetails.id === "" ||
      frameData.frameModelDetails.id === "" ||
      frameData.sizeDetails.id === "" ||
      frameData.priceDetails.purchasePrice === "" ||
      frameData.priceDetails.salesPrice === "" ||
      frameData.qty === ""
    ) {
      notify.error("Add Mandatory fields");
      return;
    }
    setLoading(true);
    const response = await api.addFrameDetails(frameData);
    if (response.success) {
      setLoading(false);
      dispatch(framesChanged(true));
      notify.success(response.message);
      onCloseModal();
      return;
    }
    setLoading(false);
    notify.error(response.message);
    return;
  };
  return (
    <div className="px-4 py-2">
      {loading && <Loader />}
      <form
        className="h-full flex flex-col justify-between "
        id="add-frame-form"
      >
        <div className="bg-neutral-200 shadow-sm p-4 md:p-6 rounded-lg flex gap-2 flex-col">
          <div className="form-element">
            <label htmlFor="frameName" className="form-label">
              Frame name *
            </label>
            <input
              type="text"
              id="frameName"
              className="input-box"
              placeholder="Enter frame name"
              value={frameData.frameName}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-element">
              <label htmlFor="company" className="form-label">
                Company *
              </label>
              <Select
                options={companyDetails}
                id={"company"}
                value={frameData.frameCompanyDetails.id}
                onChange={(e) => {
                  setFrameData({
                    ...frameData,
                    ["frameCompanyDetails"]: { id: e.target.value },
                  });
                }}
                placeholder={"Select company"}
                required={true}
              />
            </div>
            <div className="form-element">
              <label htmlFor="material" className="form-label">
                Material *
              </label>
              <Select
                id={"material"}
                options={materialDetails}
                value={frameData.frameMaterialDetails.id}
                onChange={(e) => {
                  setFrameData({
                    ...frameData,
                    ["frameMaterialDetails"]: { id: e.target.value },
                  });
                }}
                placeholder={"Select material type"}
                required={true}
              />
            </div>
            <div className="form-element">
              <label htmlFor="model" className="form-label">
                Model *
              </label>
              <Select
                id={"model"}
                options={modelDetails}
                value={frameData.frameModelDetails.id}
                onChange={(e) => {
                  setFrameData({
                    ...frameData,
                    ["frameModelDetails"]: { id: e.target.value },
                  });
                }}
                placeholder={"Select model type"}
                required={true}
              />
            </div>
            <div className="form-element">
              <label htmlFor="size" className="form-label">
                Size *
              </label>
              <Select
                id={"size"}
                options={sizeDetails}
                value={frameData.sizeDetails.id}
                onChange={(e) => {
                  setFrameData({
                    ...frameData,
                    ["sizeDetails"]: { id: e.target.value },
                  });
                }}
                placeholder={"Select size"}
                required={true}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-element">
              <label htmlFor="purchasePrice" className="form-label">
                Purchase price (Rs.) *
              </label>
              <input
                id="purchasePrice"
                type="text"
                className="input-box"
                placeholder="Enter frame Purchase price"
                value={frameData.priceDetails.purchasePrice}
                onChange={(e) => handleInputChange(e, "purchase")}
              />
            </div>
            <div className="form-element">
              <label htmlFor="salesPrice" className="form-label">
                Sales price (Rs.) *
              </label>
              <input
                id="salesPrice"
                type="text"
                className="input-box"
                placeholder="Enter frame Sales price"
                value={frameData.priceDetails.salesPrice}
                onChange={(e) => handleInputChange(e, "sales")}
              />
            </div>
            <div className="form-element">
              <label htmlFor="discount" className="form-label">
                Discount (%)
              </label>
              <input
                id="discount"
                type="text"
                className="input-box"
                placeholder="Enter frame discount in %  "
                value={frameData.priceDetails.discount}
                onChange={(e) => handleInputChange(e, "discount")}
              />
            </div>
            <div className="form-element">
              <label htmlFor="qty" className="form-label">
                Quantity *
              </label>
              <input
                id="qty"
                type="text"
                className="input-box"
                placeholder="Enter frame qty"
                value={frameData.qty}
                onChange={(e) => handleInputChange(e, "qty")}
              />
            </div>
          </div>
          <div className="form-element">
            <label htmlFor="purchaseDate" className="form-label">
              Purchase Date
            </label>
            <input
              id="purchaseDate"
              type="date"
              className="input-box"
              placeholder="Purchase date"
              value={frameData.purchaseDate}
              onChange={(e) => handleInputChange(e, "date")}
            />
          </div>
          <div className="form-element">
            <label htmlFor="extraDetails" className="form-label">
              Extra Details
            </label>
            <input
              id="extraDetails"
              type="text"
              className="input-box"
              placeholder="Something about frame"
              value={frameData.extraDetails}
              onChange={(e) => handleInputChange(e, "extraDetails")}
            />
          </div>
        </div>
        <div className="flex justify-end py-4">
          <button
            className="btn w-fit px-6"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {data && Object.keys(data).length > 0
              ? "Update Frame"
              : "Add Frame"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFrames;
