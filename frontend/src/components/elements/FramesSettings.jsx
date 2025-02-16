import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import api from "../../helpers/api";
import { notify } from "../notifier/Notifier";
import SearchBar from "../layouts/SearchBar";
import Loader from "../layouts/Loader";

const FramesSettings = () => {
  const [details, setDetails] = useState({
    company: [],
    materialType: [],
    modelType: [],
    size: [],
  });
  const [companyDetails, setCompanyDetails] = useState([]);
  const [materialDetails, setMaterialDetails] = useState([]);
  const [modelDetails, setModelDetails] = useState([]);
  const [sizeDetails, setSizeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    getFramesPropertyDetails,
    addOrUpdateFrameCompany,
    addOrUpdateFrameMaterialType,
    addOrUpdateFrameModelType,
    addOrUpdateFrameSize,
    deleteFrameSubDetailsByProperty,
  } = api;
  const [addEnabled, setAddEnabled] = useState(false);
  const [settingActive, setSettingActive] = useState("");
  const [newItem, setNewItem] = useState("");
  const [itemAdded, setItemAdded] = useState({
    property: "",
    value: 0,
  });

  // Instead of a single search value, we maintain one per setting.
  const [searchValues, setSearchValues] = useState({
    Companies: "",
    "Material Types": "",
    "Model Types": "",
    Sizes: "",
  });

  const settings = [
    { name: "Companies", value: companyDetails, placeholder: "company" },
    {
      name: "Material Types",
      value: materialDetails,
      placeholder: "material type",
    },
    { name: "Model Types", value: modelDetails, placeholder: "model type" },
    { name: "Sizes", value: sizeDetails, placeholder: "size" },
  ];

  useEffect(() => {
    const propertyDetails = async () => {
      setLoading(true);
      const company = await setPropertyDetails("company");
      const materialType = await setPropertyDetails("materialType");
      const modelType = await setPropertyDetails("modelType");
      const size = await setPropertyDetails("size");

      setCompanyDetails(company);
      setMaterialDetails(materialType);
      setModelDetails(modelType);
      setSizeDetails(size);
      setDetails({
        company,
        materialType,
        modelType,
        size,
      });
      setLoading(false);
    };
    propertyDetails();
  }, []);

  useEffect(() => {
    const propertyDetails = async () => {
      const results = await setPropertyDetails(itemAdded.property);
      if (itemAdded.property === "company") {
        setCompanyDetails(results);
        setDetails({ ...details, company: results });
        return;
      }
      if (itemAdded.property === "materialType") {
        setMaterialDetails(results);
        setDetails({ ...details, materialType: results });
        return;
      }
      if (itemAdded.property === "modelType") {
        setModelDetails(results);
        setDetails({ ...details, modelType: results });
        return;
      }
      if (itemAdded.property === "size") {
        setSizeDetails(results);
        setDetails({ ...details, size: results });
        return;
      }
    };
    setLoading(true);
    if (itemAdded.value > 0) propertyDetails();
    setLoading(false);
  }, [itemAdded.value]);

  const setPropertyDetails = async (property) => {
    const response = await getFramesPropertyDetails(property);
    if (response.success) {
      return response.data.map((item) => ({
        label: item.value,
        value: item.id,
        code: item.code,
      }));
    }
    console.log(response.message);
    return [];
  };

  const onAddItem = async (e, type, code = "") => {
    if (e.key === "Enter" && newItem.trim() !== "") {
      let success = "";
      let error = "";
      let property = "";
      const item = newItem.trim();
      switch (type) {
        case "Companies": {
          const companyBody = {
            companyCode: code,
            companyName: item,
          };
          const response = await addOrUpdateFrameCompany(companyBody);
          if (response.success) {
            success = response.message;
            property = "company";
          } else error = response.message;
          break;
        }
        case "Material Types": {
          const materialBody = {
            materialCode: code,
            materialType: item,
          };
          const response = await addOrUpdateFrameMaterialType(materialBody);
          if (response.success) {
            success = response.message;
            property = "materialType";
          } else error = response.message;
          break;
        }
        case "Model Types": {
          const modelBody = {
            modelCode: code,
            modelType: item,
          };
          const response = await addOrUpdateFrameModelType(modelBody);
          if (response.success) {
            success = response.message;
            property = "modelType";
          } else error = response.message;
          break;
        }
        case "Sizes": {
          const sizeBody = {
            sizeCode: code,
            size: item,
          };
          const response = await addOrUpdateFrameSize(sizeBody);
          if (response.success) {
            success = response.message;
            property = "size";
          } else error = response.message;
          break;
        }
        default:
          break;
      }
      if (error !== "") {
        notify.error(error);
        return;
      }
      notify.success(success);
      setNewItem("");
      setAddEnabled(false);
      setSettingActive("");
      setItemAdded({
        property: property,
        value: itemAdded.value + 1,
      });
      // Reset the search value for the current setting.
      setSearchValues((prev) => ({
        ...prev,
        [type]: "",
      }));
    }
  };

  const onClickDelete = async (type, id) => {
    let property = "";
    if (type === "Companies") property = "company";
    if (type === "Material Types") property = "materialType";
    if (type === "Model Types") property = "modelType";
    if (type === "Sizes") property = "size";

    const body = {
      property,
      id,
    };

    const response = await deleteFrameSubDetailsByProperty(body);
    if (response.success) {
      notify.success(response.message);
    } else {
      notify.error(response.message);
      return;
    }
    setNewItem("");
    setAddEnabled(false);
    setSettingActive("");
    setItemAdded({
      property,
      value: itemAdded.value + 1,
    });
  };

  const searchFunctionality = (value, type) => {
    // Update the search value for the given setting
    setSearchValues((prev) => ({
      ...prev,
      [type]: value,
    }));
    setNewItem("");
    setAddEnabled(false);
    setSettingActive("");
    const filterList = (list) =>
      list.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );

    switch (type) {
      case "Companies":
        setCompanyDetails(filterList(details.company));
        break;
      case "Material Types":
        setMaterialDetails(filterList(details.materialType));
        break;
      case "Model Types":
        setModelDetails(filterList(details.modelType));
        break;
      case "Sizes":
        setSizeDetails(filterList(details.size));
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-2 flex flex-col gap-4">
      {loading && <Loader />}
      {settings.map((setting, index) => (
        <div key={index} className="max-h-80 overflow-auto pb-1 scroll-smooth">
          <div className="flex flex-col md:flex-row w-full md:justify-between border-b border-gray-600 bg-slate-200 p-2 md:items-center sticky top-0 z-20 gap-2 rounded-t-lg">
            <div className="uppercase text-black font-medium">
              {setting.name}
            </div>
            <div className="w-full md:w-fit ">
              <SearchBar
                onChangeSearch={(value) =>
                  searchFunctionality(value, setting.name)
                }
                value={searchValues[setting.name] || ""}
              />
            </div>
          </div>
          <div className="py-2 px-4 bg-secondary">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {setting.value.map((item, idx) => (
                <li
                  className="bg-gray-200 p-2 rounded-lg w-full flex justify-between items-center gap-2"
                  key={idx}
                >
                  {item.label !== settingActive && (
                    <div
                      className="text-nowrap"
                      onClick={() => {
                        setNewItem("");
                        setAddEnabled(false);
                        setSettingActive("");
                      }}
                    >
                      {item.label}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {addEnabled && item.label === settingActive && (
                      <div className="flex items-center gap-2 rounded-lg widthExpansion w-full">
                        <input
                          className="input-box rounded px-2 py-1 w-full"
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value.trim())}
                          onKeyDown={(e) =>
                            onAddItem(e, setting.name, item.code)
                          }
                        />
                      </div>
                    )}
                    <div
                      className="cursor-pointer text-blue-900 hover:scale-125"
                      onClick={() => {
                        setNewItem(item.label);
                        setAddEnabled(true);
                        setSettingActive(item.label);
                      }}
                    >
                      {item.label !== settingActive && <icons.Edit />}
                    </div>
                    <div
                      className="cursor-pointer text-red-600 hover:scale-125"
                      onClick={() => {
                        onClickDelete(setting.name, item.value);
                      }}
                    >
                      <icons.Close />
                    </div>
                  </div>
                </li>
              ))}
              <li className="w-full flex items-center sticky z-20 bottom-0 ">
                <div
                  className={`btn flex items-center cursor-pointer w-fit ${
                    setting.name === settingActive ? "p-0" : "p-2"
                  } transition-all duration-150 `}
                  onClick={() => {
                    setNewItem("");
                    setAddEnabled(true);
                    setSettingActive(setting.name);
                  }}
                >
                  {setting.name !== settingActive && (
                    <icons.Add fontSize="medium" />
                  )}
                </div>
                {addEnabled && setting.name === settingActive && (
                  <div className="flex items-center gap-2 bg-gray-300 p-2 rounded-lg widthExpansion">
                    <input
                      className="input-box rounded px-2 py-1 w-full"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder={`Enter new ${setting.placeholder}`}
                      onKeyDown={(e) => onAddItem(e, setting.name)}
                    />
                    <div
                      className="cursor-pointer text-red-600 hover:scale-125 widthClose"
                      onClick={() => {
                        setAddEnabled(false);
                        setSettingActive("");
                        setNewItem("");
                      }}
                    >
                      <icons.Close />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FramesSettings;
