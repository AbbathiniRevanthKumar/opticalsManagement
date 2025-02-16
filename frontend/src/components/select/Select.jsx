import React from "react";

const Select = (props) => {
  const { options, onChange, value, placeholder, required, id } = props;
  return (
    <div>
      <select
        id={id}
        type="text"
        className="input-box w-full"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        required={required}
      >
        <option value={""} className="text-gray-600">
          {placeholder}
        </option>
        {options &&
          options.length > 0 &&
          options.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
