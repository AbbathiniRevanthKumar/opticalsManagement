import React, { useEffect, useState } from "react";
import Select from "../select/select";
import SightSelector from "./SightSelector";
import api from "../../helpers/api";
import { formatDateForInput } from "../../helpers/help";
import { notify } from "../notifier/Notifier";
import { useDispatch } from "react-redux";
import { lensChanged } from "../../store/slices/productSlice";
import Loader from "./Loader";

const AddLens = (props) => {
  const { data, onCloseModal } = props;
  const date = data?.l_purchase_date
    ? formatDateForInput(new Date(data.l_purchase_date))
    : formatDateForInput(new Date());
  const details = {
    lensCode: data?.l_code || "",
    lensName: data?.l_name || "",
    typeDetails: {
      id: data?.l_type_id || "",
    },
    materialDetails: {
      id: data?.l_material_id || "",
    },
    modelDetails: {
      id: data?.l_model_id || "",
    },
    companyDetails: {
      id: data?.l_company_id || "",
    },
    sightDetails: {
      sph: data?.spherical || "-0.00",
      cyl: data?.cylinder || "-0.00",
      add: data?.addition || "-0.00",
    },
    priceDetails: {
      purchasePrice: data?.l_pruchase_price || "",
      salesPrice: data?.l_sales_price || "",
      discount: data?.l_discount || "0.00",
    },
    purchaseDate: date,
    qty: data?.l_qty || "",
    extraDetails: data?.l_extra_details || "",
  };

  const [lensDetailsByProperty, setLensDetailsByProperty] = useState({
    materials: [],
    models: [],
    types: [],
    companies: [],
  });

  const [lensDetails, setLensDetails] = useState(details);
  const [idDetails, setIdDetails] = useState({});
  const [modelOptions, setModelOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const setOptions = async () => {
      const materialoptions = await setDetailsByProperty("materials");
      const modelOptions = await setDetailsByProperty("models");
      const companyOptions = await setDetailsByProperty("companies");
      const typeOptions = await setDetailsByProperty("types");

      setLensDetailsByProperty({
        materials: materialoptions,
        models: modelOptions,
        companies: companyOptions,
        types: typeOptions,
      });

      const typeId = typeOptions.filter(
        (item) => String(item.label).toLowerCase() === "bifocal"
      );
      const id = typeId && typeId.length > 0 ? `${typeId[0].value}` : null;
      if (id) {
        setIdDetails({
          type: id,
        });
      }
      setModelOptions(modelOptions);
    };
    setOptions();
  }, []);

  useEffect(() => {
    if (lensDetails.typeDetails.id != idDetails.type) {
      let models = [...modelOptions];
      models = models.filter((item) => item.label !== "Progressive");
      setLensDetailsByProperty({
        ...lensDetailsByProperty,
        models: models,
      });
    } else {
      setLensDetailsByProperty({
        ...lensDetailsByProperty,
        models: modelOptions,
      });
    }
  }, [lensDetails.typeDetails]);

  const setDetailsByProperty = async (property) => {
    const response = await api.getLensDetailsByProperty(property);
    if (response.success) {
      const options =
        response.data &&
        response.data.map((item) => {
          return { label: item.name, value: item.code };
        });
      return options;
    }
    return;
  };

  const handleChange = (value, type) => {
    switch (type) {
      case "name": {
        setLensDetails({ ...lensDetails, lensName: value });
        break;
      }
      case "qty": {
        if (/^\d*$/.test(value)) {
          setLensDetails({ ...lensDetails, ["qty"]: value });
        }
        break;
      }
      case "details": {
        setLensDetails({ ...lensDetails, extraDetails: value });
        break;
      }
      case "date": {
        setLensDetails({ ...lensDetails, purchaseDate: value });
        break;
      }
      case "purchasePrice": {
        if (/^\d*\.?\d*$/.test(value)) {
          const priceDetails = {
            ...lensDetails["priceDetails"],
            ["purchasePrice"]: value,
          };
          setLensDetails({ ...lensDetails, ["priceDetails"]: priceDetails });
        }
        break;
      }
      case "salesPrice": {
        if (/^\d*\.?\d*$/.test(value)) {
          const priceDetails = {
            ...lensDetails["priceDetails"],
            ["salesPrice"]: value,
          };
          setLensDetails({ ...lensDetails, ["priceDetails"]: priceDetails });
        }
        break;
      }
      case "discount": {
        if (/^\d*\.?\d*$/.test(value)) {
          const priceDetails = {
            ...lensDetails["priceDetails"],
            ["discount"]: value,
          };
          setLensDetails({ ...lensDetails, ["priceDetails"]: priceDetails });
        }
        break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      lensDetails.lensName === "" ||
      lensDetails.companyDetails.id === "" ||
      lensDetails.materialDetails.id === "" ||
      lensDetails.modelDetails.id === "" ||
      lensDetails.typeDetails.id === "" ||
      lensDetails.sightDetails.sph === "" ||
      lensDetails.sightDetails.cyl === "" ||
      lensDetails.sightDetails.add === "" ||
      lensDetails.priceDetails.purchasePrice === "" ||
      lensDetails.priceDetails.salesPrice === "" ||
      lensDetails.qty === ""
    ) {
      notify.error("Add Mandatory fields");
      return;
    }
    if (lensDetails.typeDetails.id != idDetails.type) {
      lensDetails.sightDetails.add = "-";
    }
    setLoading(true);
    const response = await api.addLensDetails(lensDetails);
    if (response.success) {
      dispatch(lensChanged(true));
      setLoading(false);
      notify.success(response.message);
      onCloseModal();
      return;
    }
    setLoading(false);
    notify.error("Try again");
    return;
  };

  return (
    <div>
      {loading && <Loader />}
      <form
        className="px-4 py-2 flex flex-col gap-4"
        onSubmit={handleSubmit}
        id="lensForm"
      >
        <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg">
          <div className="form-element">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              className="input-box"
              value={lensDetails.lensName}
              onChange={(e) => handleChange(e.target.value, "name")}
              placeholder="Enter lens name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="form-element">
                <label htmlFor="company" className="form-label">
                  Company *
                </label>
                <Select
                  options={lensDetailsByProperty.companies}
                  onChange={(e) =>
                    setLensDetails({
                      ...lensDetails,
                      ["companyDetails"]: { id: e.target.value },
                    })
                  }
                  value={lensDetails.companyDetails.id}
                  placeholder={"Select company name"}
                  required={true}
                  id={"company"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="type" className="form-label">
                  Type *
                </label>
                <Select
                  options={lensDetailsByProperty.types}
                  onChange={(e) =>
                    setLensDetails({
                      ...lensDetails,
                      ["typeDetails"]: { id: e.target.value },
                    })
                  }
                  value={lensDetails.typeDetails.id}
                  placeholder={"Select Type"}
                  required={true}
                  id={"type"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="model" className="form-label">
                  Model *
                </label>
                <Select
                  options={lensDetailsByProperty.models}
                  onChange={(e) =>
                    setLensDetails({
                      ...lensDetails,
                      ["modelDetails"]: { id: e.target.value },
                    })
                  }
                  value={lensDetails.modelDetails.id}
                  placeholder={"Select Model"}
                  required={true}
                  id={"model"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="material" className="form-label">
                  Material *
                </label>
                <Select
                  options={lensDetailsByProperty.materials}
                  onChange={(e) =>
                    setLensDetails({
                      ...lensDetails,
                      ["materialDetails"]: { id: e.target.value },
                    })
                  }
                  value={lensDetails.materialDetails.id}
                  placeholder={"Select Material"}
                  required={true}
                  id={"material"}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between itemd-center w-full gap-2">
              <div className="form-element w-full">
                <label htmlFor="spherical" className="form-label">
                  SPH *
                </label>
                <SightSelector
                  value={lensDetails.sightDetails.sph}
                  handleSightChange={(value) =>
                    setLensDetails({
                      ...lensDetails,
                      ["sightDetails"]: {
                        ...lensDetails.sightDetails,
                        ["sph"]: value,
                      },
                    })
                  }
                />
              </div>
              <div className="form-element w-full">
                <label htmlFor="cylinder" className="form-label">
                  CYL *
                </label>
                <SightSelector
                  value={lensDetails.sightDetails.cyl}
                  handleSightChange={(value) =>
                    setLensDetails({
                      ...lensDetails,
                      ["sightDetails"]: {
                        ...lensDetails.sightDetails,
                        ["cyl"]: value,
                      },
                    })
                  }
                />
              </div>
              {lensDetails.typeDetails.id == idDetails.type && (
                <div className="form-element w-full">
                  <label htmlFor="addition" className="form-label">
                    ADD *
                  </label>
                  <SightSelector
                    value={lensDetails.sightDetails.add}
                    handleSightChange={(value) =>
                      setLensDetails({
                        ...lensDetails,
                        ["sightDetails"]: {
                          ...lensDetails.sightDetails,
                          ["add"]: value,
                        },
                      })
                    }
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="form-element">
                <label htmlFor="purchase" className="form-label">
                  Purchase Price (Rs.) *
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={lensDetails.priceDetails.purchasePrice}
                  onChange={(e) =>
                    handleChange(e.target.value, "purchasePrice")
                  }
                  placeholder="Enter purchase price"
                  required
                />
              </div>
              <div className="form-element">
                <label htmlFor="salesPrice" className="form-label">
                  Sales price (Rs.) *
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={lensDetails.priceDetails.salesPrice}
                  onChange={(e) => handleChange(e.target.value, "salesPrice")}
                  placeholder="Enter sales price"
                  required
                />
              </div>
              <div className="form-element">
                <label htmlFor="name" className="form-label">
                  Discount (%)
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={lensDetails.priceDetails.discount}
                  onChange={(e) => handleChange(e.target.value, "discount")}
                  placeholder="Enter discount"
                />
              </div>
              <div className="form-element">
                <label htmlFor="qty" className="form-label">
                  Quantity *
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={lensDetails.qty}
                  onChange={(e) => {
                    handleChange(e.target.value, "qty");
                  }}
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-element">
            <label htmlFor="date" className="form-label">
              Purchase Date
            </label>
            <input
              type="date"
              min={"2001-01-01"}
              className="input-box"
              value={lensDetails.purchaseDate}
              onChange={(e) => {
                handleChange(e.target.value, "date");
              }}
            />
          </div>
          <div className="form-element">
            <label htmlFor="details" className="form-label">
              Extra Details
            </label>
            <input
              type="text"
              className="input-box"
              value={lensDetails.extraDetails}
              onChange={(e) => {
                handleChange(e.target.value, "details");
              }}
              placeholder="Something about lens..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn w-fit px-8" type="submit">
            {data && Object.keys(data).length > 0 ? "Update Lens" : "Add Lens"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLens;
