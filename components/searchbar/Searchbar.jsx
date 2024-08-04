'use client'
import React from 'react';
import { InputText } from 'primereact/inputtext';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';

const Searchbar = ({ value, onSearch, options, selectOption, optionsvalue, dropdown, style }) => {

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const handleOptionChange = (event) => {
    selectOption(event.target.value);
  };



  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        {/* <img alt={option.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
        <div>{option.label}</div>
      </div>
    );
  };


  return (
    <div className='flex justify-center items-center'>
      <div className={` searchbar  flex w-full max-w-2xl   gap-2  2xl:-translate-y-20 mb-5    rounded-full px-3 py-2 border-2 border-gray-600 ${style}`}>
        <IconField iconPosition="left" className='w-full flex items-center'>
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText iconPos="right" value={value} onChange={handleSearch} placeholder='Search' className="pl-5 w-full min-h-[40px]  p-inputtext p-ml-2 p-inputtext-plain" />
        </IconField>
        {
          dropdown &&
          <div className="p-inputgroup min-h-[40px]  w-full  p-ml-2 border rounded-full">
            <Dropdown

              value={optionsvalue}
              onChange={handleOptionChange}
              options={options}
              className="w-full  p-inputtext p-ml-2 p-inputtext-plain rounded-full max-w-sm p-2"
              placeholder="Select a category"
              optionLabel="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              optionGroupTemplate={groupedItemTemplate}
              itemTemplate={(option) => (
                <div className="p-clearfix">
                  <i className={`pi ${option.icon}`} style={{ fontSize: '1.5em', marginRight: '10px' }}></i>
                  {option.label}
                </div>
              )}
            />

          </div>
        }

      </div>
    </div>
  );
};

export default Searchbar;
