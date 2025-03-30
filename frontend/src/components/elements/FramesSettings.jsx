import React, { useEffect, useState } from "react";
import api from "../../helpers/api";
import SearchBar from "../layouts/SearchBar";
import Chip from "../layouts/Chip";
import AddingChip from "../layouts/AddingChip";
import { notify } from "../notifier/Notifier";
import { useDispatch } from "react-redux";
import { removeFromCartBySettings } from "../../store/slices/productCartSlice";
import InsideNavbar from "../layouts/InsideNavbar";

const FrameSettings = () => {
  const [originalSettings, setOriginalSettings] = useState({
    companies: [],
    materials: [],
    models: [],
    sizes: [],
  });
  const [settings, setSettings] = useState({
    companies: [],
    materials: [],
    models: [],
    sizes: [],
  });

  const [searchValue, setSearchValue] = useState({
    companies: "",
    materials: "",
    models: "",
    sizes: "",
  });

  const [focusItem, setFocusItem] = useState({ setting: null, id: null });
  const [propertyChanged, setPropertyChanged] = useState({
    type: "",
    count: 0,
  });
  const [activeTab, setActiveTab] = useState(Object.keys(settings)[0]);
  const dispatch = useDispatch();

  const setDetailsByProperty = async (property) => {
    try {
      const response = await api.getFramesPropertyDetails(property);
      if (response.success && response.data) {
        return response.data.map((item) => ({
          label: item.name,
          value: item.id,
          code: item.code,
        }));
      }
      return [];
    } catch (error) {
      console.error(`Error fetching ${property}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const updateOptions = async () => {
      const options = await setDetailsByProperty(propertyChanged.type);
      setSettings({ ...settings, [propertyChanged.type]: options });
      setOriginalSettings({
        ...originalSettings,
        [propertyChanged.type]: options,
      });
    };
    if (propertyChanged.type !== "") updateOptions();
  }, [propertyChanged]);

  useEffect(() => {
    const setOptions = async () => {
      const materialOptions = await setDetailsByProperty("materials");
      const modelOptions = await setDetailsByProperty("models");
      const companyOptions = await setDetailsByProperty("companies");
      const sizeOptions = await setDetailsByProperty("sizes");

      const newOptions = {
        companies: companyOptions,
        materials: materialOptions,
        models: modelOptions,
        sizes: sizeOptions,
      };
      setSettings(newOptions);
      setOriginalSettings(newOptions);
    };
    setOptions();
  }, []);

  const handleItemAdded = async (settingName, value, code) => {
    let message = { type: "", msg: "" };
    switch (settingName) {
      case "companies": {
        const body = {
          companyCode: code,
          companyName: value,
        };
        const response = await api.addOrUpdateFrameCompany(body);
        if (response.success) {
          message = { type: "success", msg: response.message };
        } else message = { type: "error", msg: response.message };
        break;
      }
      case "materials": {
        const body = {
          materialCode: code,
          materialType: value,
        };
        const response = await api.addOrUpdateFrameMaterialType(body);
        if (response.success) {
          message = { type: "success", msg: response.message };
        } else message = { type: "error", msg: response.message };
        break;
      }
      case "models": {
        const body = {
          modelCode: code,
          modelType: value,
        };
        const response = await api.addOrUpdateFrameModelType(body);
        if (response.success) {
          message = { type: "success", msg: response.message };
        } else message = { type: "error", msg: response.message };
        break;
      }
      case "sizes": {
        const body = {
          sizeCode: code,
          size: value,
        };
        const response = await api.addOrUpdateFrameSize(body);
        if (response.success) {
          message = { type: "success", msg: response.message };
        } else message = { type: "error", msg: response.message };
        break;
      }
    }
    if (message.type === "error") {
      notify.error(message.msg);
      return;
    }
    setPropertyChanged({ type: settingName, count: propertyChanged.count + 1 });
    notify.success(message.msg);
  };

  const onDelete = async (settingName, id, label) => {
    const response = await api.deleteFrameSubDetailsByProperty({
      property: settingName,
      id: id,
    });
    if (response.success) {
      notify.success(response.message);
      setPropertyChanged({
        type: settingName,
        count: propertyChanged.count + 1,
      });
      dispatch(
        removeFromCartBySettings({
          setting: settingName,
          value: label,
        })
      );
      return;
    }
    notify.error(response.message);
  };

  const handleSearch = async (setting, value) => {
    setSearchValue((prev) => ({ ...prev, [setting]: value }));

    if (!value.trim()) {
      setSettings((prev) => ({
        ...prev,
        [setting]: originalSettings[setting],
      }));
      return;
    }

    const filteredItems = originalSettings[setting].filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );

    setSettings((prev) => ({ ...prev, [setting]: filteredItems }));
  };

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col gap-2 overflow-hidden items-start w-full justify-start min-h-96 ">
      <div className="px-4 flex flex-col py-4 md:py-0 gap-2 md:flex-row items-center justify-between w-full bg-background rounded-lg shadow-sm">
        <div className="px-4">
          <InsideNavbar
            links={Object.keys(settings)}
            onChangeLink={handleChangeTab}
          />
        </div>
        <div className="p-2 flex flex-col md:flex-row justify-end gap-2 md:gap-4 md:items-center z-20 ">
          <div className="w-full">
            <SearchBar
              value={searchValue[activeTab]}
              onChangeSearch={(value) => {
                handleSearch(activeTab, value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full" key={activeTab + "frame"}>
        <div className="px-4 py-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4 max-h-96 overflow-auto transition-all duration-150 ease-out">
          {settings[activeTab].map((item) => (
            <Chip
              key={item.value}
              item={item}
              setting={activeTab}
              focusItem={focusItem}
              setFocusItem={setFocusItem}
              onChipUpdated={(value) =>
                handleItemAdded(activeTab, value, item.code)
              }
              handleDelete={() => onDelete(activeTab, item.value, item.label)}
            />
          ))}
          <div className="flex items-center  left-4 z-10">
            <AddingChip
              setting={activeTab}
              onChipAdded={(value) => handleItemAdded(activeTab, value, "")}
              focusItem={focusItem}
              setFocusItem={setFocusItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameSettings;
