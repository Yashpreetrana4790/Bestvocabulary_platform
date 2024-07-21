import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between p-4   bg-gray-200 shadow-md w-full">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold font-playfair text-red-900">Locofy</h1>
      </div>
      <div className="flex items-center">
        <FaUserCircle className="ml-4 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminNavbar;
