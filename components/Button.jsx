// Button.js

import React from 'react';

const ReButton = ({ type, label, onClick, iconleft, iconright, className }) => {
  // Determine button classes based on type prop
  let buttonClasses = `py-2 px-4 text-sm rounded-full text-white focus:outline-none focus:ring-2 shadow-2xl ${className}`;

  switch (type) {
    case 'primary':
      buttonClasses += ' bg-blue-500 text-xl hover:bg-blue-600 rounded-full font-playfair';
      break;
    case 'secondary':
      buttonClasses += ' bg-black text-xl hover:bg-black rounded-full font-playfair ';
      break;
    case 'red':
      buttonClasses += ' bg-red-900 text-xl hover:bg-red-600 rounded-full font-playfair';
      break;

    default:
      buttonClasses += ' bg-black text-xl text-white hover:bg-gray-800 rounded-full font-playfair ';
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {iconleft && <span className={`${iconleft} mr-[6px]`}></span>}
      {label}
      {iconright && <span className={`${iconright} ml-[6px]`}></span>}
    </button>
  );
};

export default ReButton;
