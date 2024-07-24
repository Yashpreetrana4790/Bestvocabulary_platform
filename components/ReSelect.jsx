import React from 'react';
import { SelectButton } from 'primereact/selectbutton';

const SelectBox = ({ options, value, onChange }) => {
  return (
    <SelectButton
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
    />
  );
}

export default SelectBox;
