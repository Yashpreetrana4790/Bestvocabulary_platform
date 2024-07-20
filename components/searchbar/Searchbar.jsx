'use client'
import React from 'react';
import { InputText } from 'primereact/inputtext';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';


const Searchbar = ({ value, onSearch, options, selectOption, optionsvalue }) => {

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const handleOptionChange = (event) => {
    selectOption(event.target.value);
  };

  return (
    <div className='max-sm:mx-1'>

      <div className=" searchbar w-full max-w-2xl mx-auto gap-2  2xl:-translate-y-20 mb-5 flex items-center justify-center rounded-full px-3 py-2 border-2 border-gray-600">
        <IconField iconPosition="left" className='w-full'>
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText iconPos="right" value={value} onChange={handleSearch} placeholder='Search' className="pl-5 w-full min-h-[40px] p-inputtext p-ml-2 p-inputtext-plain" />
        </IconField>
        <div className="p-inputgroup min-h-[40px] max-w-[150px]  p-ml-2 border rounded-full">
          <select

            value={optionsvalue}
            onChange={handleOptionChange}
            className="w-full  p-inputtext p-ml-2 p-inputtext-plain rounded-full max-w-sm p-2"
          >
            <option value="">All Categories</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
