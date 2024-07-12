' use client'
import React from 'react'

import { InputText } from 'primereact/inputtext';

const Searchbar = ({ placeholder, value, setValueFn }) => {
  return (
    <div className='w-full'>
      <ul className='hidden sm:flex gap-5'>
        <li>Home</li>
        <li>Words</li>
        <li>Trending words</li>
        <li>Ask AI</li>
      </ul>
    </div>
  )
}

export default Searchbar