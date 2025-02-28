import React, { useState } from "react";
import icons from "../../utils/icons";

const Chip = ({ item, setting, onChipUpdated, handleDelete, focusItem, setFocusItem }) => {
  const [chipValue, setChipValue] = useState(item.label);
  const isEditing = focusItem.setting === setting && focusItem.id === item.value;

  const handleEdit = () => {
    setFocusItem({ setting, id: item.value }); 
  };

  const handleAddChip = (e) => {
    if (e.key === "Enter" && chipValue.trim()) {
      onChipUpdated(chipValue);
      setFocusItem({ setting: null, id: null }); 
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-full h-fit gap-2 bg-background px-4 shadow-sm py-2 rounded-lg hover:scale-105 transition-transform ease-linear duration-200 ${
        isEditing ? "border border-blue-500" : ""
      }`}
    >
      {!isEditing ? (
        <div className="text-nowrap">{chipValue}</div>
      ) : (
        <input
          className="input-box py-0 bg-transparent rounded-lg focus:ring-0 shadow-none px-2"
          autoFocus
          value={chipValue}
          onChange={(e) => setChipValue(e.target.value)}
          onKeyDown={handleAddChip}
          placeholder="Enter value"
        />
      )}
      <div className="flex items-center justify-between gap-1 cursor-pointer">
        {!isEditing && (
          <div className="hover:scale-125 text-blue-800 transition-transform ease-in duration-150" onClick={handleEdit}>
            <icons.Edit fontSize="small" />
          </div>
        )}
        <div className="hover:scale-125 text-red-600 transition-transform ease-linear duration-150" onClick={handleDelete}>
          <icons.Close fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Chip;
