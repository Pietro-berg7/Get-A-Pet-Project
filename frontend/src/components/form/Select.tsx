import React from "react";

import "./Select.css";

interface SelectProps {
  text: string;
  name: string;
  options: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  text,
  name,
  options,
  handleChange,
  value,
}) => {
  return (
    <div className="form_control">
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name} onChange={handleChange} value={value || ""}>
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
