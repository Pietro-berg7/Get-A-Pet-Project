import React from "react";

import "./Input.css";

interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  multiple?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  text,
  name,
  placeholder,
  handleChange,
  value,
  multiple,
}) => {
  return (
    <div className="form_control">
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        {...(multiple ? { multiple } : "")}
      />
    </div>
  );
};

export default Input;
