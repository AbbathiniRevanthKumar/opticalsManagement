import React, { useState } from "react";
import icons from "../../utils/icons";
const SearchBar = ({ placeholder = "search", onChangeSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="flex items-center relative w-full">
      <input
        type="text"
        className="px-4 input-box w-full py-2 shadow-md"
        placeholder={placeholder}
        value = {searchValue}
        onChange={(e) => {
          onChangeSearch(e.target.value);
          setSearchValue(e.target.value);
        }}
      />
      <button className="absolute right-0 px-2 text-primary">
        <icons.Search />
      </button>
    </div>
  );
};

export default SearchBar;
