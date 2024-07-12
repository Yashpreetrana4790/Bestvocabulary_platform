'use client'
import React, { useState } from 'react'

import { Button } from 'primereact/button';
import Searchbar from './Searchbar';

const Navbar = () => {
  const [ value, setValue ] = useState("")


  const setValueFn = (value) => {
    setValue(value)
  }
  return (
    <div className='w-full shadow-2xl '>

      <div className='container mx-auto'>
        <div className='flex justify-between items-center min-h-16   '>
          <div> Best Vocabulary</div>
          <div>
            <Searchbar placeholder="search bar" value={value} setValueFn={setValueFn} />
          </div>
          <div>
            <Button label="Login" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar