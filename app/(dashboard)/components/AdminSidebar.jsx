'use client'
import React, { useState } from 'react';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen  bg-gray-200 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-3 focus:outline-none"
      >
        {isCollapsed ? (
          <i className="pi pi-bars  text-gray-600"></i>
        ) : (
          <i className="pi pi-bars text-gray-600"></i>
        )}
      </button>


    </div>
  );
};

export default AdminSidebar;
