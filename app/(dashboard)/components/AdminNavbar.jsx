import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FaBars, FaSearch, FaCog, FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between p-4   bg-gray-200 shadow-md w-full">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">E-Commerce Dashboard</h1>
      </div>
      <div className="flex items-center">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <FaSearch className="text-gray-500 mr-2" />
          <InputText placeholder="Search" className="border-none focus:outline-none bg-transparent" />
        </div>
        <FaCog className="ml-4 text-xl cursor-pointer" />
        <FaUserCircle className="ml-4 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminNavbar;
