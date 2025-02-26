import React, { useState, useEffect } from "react";
import icons from "../../utils/icons";

const SearchBar = ({ placeholder = "search", onChangeSearch, value = "" }) => {
  const [searchValue, setSearchValue] = useState(value);

  // Sync local state when the `value` prop changes.
  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <div className="flex items-center relative w-full">
      <input
        type="text"
        className="px-4 input-box w-full py-1 shadow-md"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onChangeSearch(e.target.value);
        }}
      />
      <button className="absolute right-0 px-2 text-primary">
        <icons.Search />
      </button>
    </div>
  );
};

export default SearchBar;
