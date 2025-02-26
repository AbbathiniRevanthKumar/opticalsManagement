import React, { useState } from "react";
import icons from "../../utils/icons";

const AddingChip = ({ setting, onChipAdded, focusItem, setFocusItem }) => {
  const [chipValue, setChipValue] = useState("");
  const isAdding = focusItem.setting === setting && focusItem.id === "adding";

  const handleAddChip = (e) => {
    if (e.key === "Enter" && chipValue.trim()) {
      onChipAdded(chipValue.trim());
      setChipValue("");
      setFocusItem({ setting: null, id: null });
    }
  };

  return (
    <div>
      {!isAdding ? (
        <button
          className="btn p-1 md:p-2 rounded-lg flex items-center transition-all ease-linear duration-150"
          onClick={() => setFocusItem({ setting, id: "adding" })}
        >
          <icons.Add fontSize="medium" />
        </button>
      ) : (
        <div className="flex items-center justify-between w-full gap-2 bg-background px-4 shadow-sm py-2 rounded-lg hover:scale-105 transition-transform ease-linear ring-1 ring-blue-500">
          <input
            className="input-box py-0 bg-transparent rounded-lg focus:ring-0 shadow-none px-2"
            autoFocus
            value={chipValue}
            onChange={(e) => setChipValue(e.target.value)}
            onKeyDown={handleAddChip}
            placeholder="Enter Value"
          />
          <div
            className="hover:scale-125 text-red-600 transition-transform ease-linear duration-150 cursor-pointer"
            onClick={() => setFocusItem({ setting: null, id: null })}
          >
            <icons.Close fontSize="small" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddingChip;
