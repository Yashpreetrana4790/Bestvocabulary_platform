// Button.js

import React from 'react';

const Button = ({ type, label, onClick }) => {
  // Determine button classes based on type prop
  let buttonClasses = 'py-2 px-4 text-sm rounded-full text-white focus:outline-none';

  switch (type) {
    case 'primary':
      buttonClasses += ' bg-blue-500 text-xl hover:bg-blue-600 rounded-full';
      break;
    case 'secondary':
      buttonClasses += ' bg-black text-xl hover:bg-black rounded-full';
      break;
    case 'danger':
      buttonClasses += ' bg-red-500 text-xl hover:bg-red-600 rounded-full';
      break;
    default:
      buttonClasses += ' bg-black text-xl text-white hover:bg-gray-800 rounded-full';
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
