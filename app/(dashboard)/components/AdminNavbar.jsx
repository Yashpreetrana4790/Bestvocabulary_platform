import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between p-4   bg-gray-200 shadow-md w-full">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-semibold font-libre text-red-900">Logophile</Link>
      </div>
      <div className="flex items-center">
        <FaUserCircle className="ml-4 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminNavbar;
