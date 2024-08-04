
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Mobile from './Moble';
import { AdminNavigation } from '@/constants';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <div className={`h-screen bg-gray-100 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`p-3 focus:outline-none flex w-full ${isCollapsed ? 'justify-center' : 'justify-end'}`}
      >
        {isCollapsed ? (
          <i className="pi pi-bars text-gray-600"></i>
        ) : (
          <i className="pi pi-bars text-gray-600"></i>
        )}
      </button>

      <div className="flex">
        {!isCollapsed && (
          <div className='w-full p-2 flex flex-col space-y-2 bg-gray-100'>
            <div>
              {AdminNavigation?.map((link, index) => (
                <div key={index} className={`p-2 w-full rounded-sm ${isActive(link.href) ? 'bg-black text-white' : 'bg-gray-50'}`}>
                  <Link href={link.href}>
                    <div className="flex items-center space-x-2">
                      <p className="font-opensans rounded-2xl p-2 block">
                        {link.label}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-full p-2">
            {isCollapsed && <Mobile />}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminSidebar;
