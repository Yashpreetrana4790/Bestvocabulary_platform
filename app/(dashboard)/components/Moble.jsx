'use client'
import Link from 'next/link';

const Mobile = () => {
  const AdminNavigation = [
    { label: 'Dashboard', icon: 'pi pi-home', href: '/dashboard' },
    { label: 'Settings', icon: 'pi pi-cog', href: '/settings' },
    { label: 'Profile', icon: 'pi pi-user', href: '/profile' },
    { label: 'Messages', icon: 'pi pi-envelope', href: '/messages' },
  ];

  const isActive = (href) => {
    return false; 
  };

  return (
    <div className={`h-screen bg-gray-100 shadow-lg  transition-width duration-300`}>
      <div className="w-full p-2 flex flex-col space-y-2 bg-gray-100">
        {AdminNavigation.map((link, index) => (
          <div key={index} className={` flex items-center justify-center p-2 w-full rounded-sm ${isActive(link.href) ? 'bg-black text-gray-50' : 'bg-gray-50'}`}>
            <Link href={link.href}>
              <div className="flex items-center space-x-2">
                <i className={`${link.icon} text-gray-600`}></i>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobile;
