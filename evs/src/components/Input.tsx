import React, { ReactNode } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: any;
  style?: string;
  error: string | null;
  handleChange?: (arg: any) => void;
  handleBlur?: (arg: any) => void;
}

interface InputIconProps extends InputProps {
  icon: React.ReactNode;
  handleClick: () => void;
}

interface InputRadioProps extends InputProps {
  values: string[];
}

export const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  style,
  error,
  handleChange,
  handleBlur,
}: InputProps) => {
  const labelContents = label.split(" ");
  const formatLabel = labelContents.length > 2 ? "normal-case" : "capitalize";
  return (
    <div className="my-2">
      <label
        htmlFor={name}
        className={`text-sm font-semibold lg:text-inherit ${formatLabel} ${
          error ? "text-red-600" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      <input
        className={`w-full mt-1 rounded-md px-4 py-3 outline-0 text-sm bg-gray-200 ${
          error ? "border border-red-600" : ""
        } ${style}`}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="mt-1 mb-2 text-xs text-red-600">{error}</div>
    </div>
  );
};

export const InputIcon = ({
  label,
  type,
  name,
  placeholder,
  value,
  icon,
  style,
  error,
  handleChange,
  handleBlur,
  handleClick,
}: InputIconProps) => {
  return (
    <div className="my-2">
      <label
        htmlFor={label}
        className={`text-sm capitalize font-semibold lg:text-inherit ${
          error ? "text-red-600" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      <div
        className={`flex mt-1 rounded-md px-4 py-3 bg-gray-200 ${
          error ? "border border-red-600" : ""
        } ${style}`}
      >
        <input
          className="w-full grow outline-0 text-sm bg-gray-200"
          type={type}
          id={label}
          name={label}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          className="text-gray-500"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          {icon}
        </button>
      </div>
      <div className="mt-1 mb-2 text-xs text-red-600">{error}</div>
    </div>
  );
};

export const InputRadio = ({
  label,
  type,
  name,
  style,
  values,
  error,
  handleChange,
  handleBlur,
}: InputRadioProps) => {
  return (
    <div className="my-2">
      <label
        htmlFor={label}
        className={`text-sm capitalize font-semibold lg:text-inherit ${
          error ? "text-red-600" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      <div className="flex gap-5">
        {values.map((value) => (
          <div key={value}>
            <input
              className={`mt-3 mb-2 md:mx-2 outline-0 active:text-red-600 ${style}`}
              type={type}
              id={label}
              name={label}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="ml-1 text-sm">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 mb-2 text-xs text-red-600">{error}</div>
    </div>
  );
};
