'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen  bg-gray-200 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`p-3 focus:outline-none flex  w-full ${isCollapsed ? 'justify-center' : 'justify-end'}`}
      >
        {isCollapsed ? (
          <i className="pi pi-bars  text-gray-600"></i>
        ) : (
          <i className="pi pi-bars text-gray-600"></i>
        )}
      </button>
      {
        !isCollapsed &&
        <div className='w-full p-2 flex flex-col space-y-2'>
          <div className='font-playfair  text-2xl text-red-900  p-2'>
            Best Vocabulary
          </div>

          <div className='p-2 w-full bg-gray-50 rounded-sm '>
            <Link href="/admin/admindashboard" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Dashboard</Link>
          </div>

          <div className='p-2 w-full bg-gray-50 rounded-sm '>
            <Link href="/admin/users" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Users</Link>
          </div>

          <div className='p-2 w-full bg-gray-50 rounded-sm '>
            <Link href="/admin/addword" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Add Word</Link>
          </div>

          <div className='p-2 w-full bg-gray-50 rounded-sm '>
            <Link href="/admin/quiz" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Quiz</Link>
          </div>
          <div className='p-2 w-full bg-gray-50 rounded-sm '>
            <Link href="/admin/quizresult" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Quiz Result</Link>
          </div>
          <div className='p-2 w-full bg-gray-50 rounded-sm'  >
            <Link href="/admin/changepassword" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Change Password</Link>
          </div>
          <div className='p-2 w-full bg-gray-50 rounded-sm '>
            <Link href="/admin/logout" className='font-opensans  text-sm text-black p-2 bg-gray-50 ' prefetch={false}>Logout</Link>
          </div>

        </div>
      }
    </div>
  );
};

export default AdminSidebar;
