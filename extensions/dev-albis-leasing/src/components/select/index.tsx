import React from "react";

type SelectProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  options: Array<{ id: number | string; bezeichnung?: string, text?: string, crefo?: string }>;
  label?: string;
  defaultText?: string;
  selectedValue?: string | number;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
};

export const Select = ({
  handleChange,
  name,
  options,
  defaultText,
  label,
  selectedValue,
  disabled = false,
  hidden = false,
  required = false,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-[2px]">
      {label && <label className={``}>{label}</label>}
      <select
        name={name}
        id={name}
        onChange={(e) => handleChange(e)}
        value={selectedValue}
        disabled={disabled}
        required={required}
        className={`h-[40px] block w-full p-[6px] text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${hidden ? "hidden" : "visible"}`}
      >
        <option selected disabled key={0}>{defaultText}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.bezeichnung ? option.bezeichnung : option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
