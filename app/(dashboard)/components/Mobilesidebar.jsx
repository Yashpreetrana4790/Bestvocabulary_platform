import { Link } from 'next/link';

const Mobilesidebar = () => {
  const AdminNavigation = [
    { label: 'Dashboard', icon: 'pi pi-home', href: '/dashboard' },
    { label: 'Settings', icon: 'pi pi-cog', href: '/settings' },
    { label: 'Profile', icon: 'pi pi-user', href: '/profile' },
    { label: 'Messages', icon: 'pi pi-envelope', href: '/messages' },
  ];

  // Helper function to determine active state
  const isActive = (href) => {
    // Add logic to determine if the link is active (example: using window.location.pathname)
    return false; // Replace with actual logic
  };

  return (
    <div className={`h-screen bg-gray-100 shadow-lg w-20 transition-width duration-300`}>
      <div className="w-full p-2 flex flex-col space-y-2 bg-gray-100">
        {AdminNavigation.map((link, index) => (
          <div key={index} className={`p-2 w-full rounded-sm ${isActive(link.href) ? 'bg-black text-gray-50' : 'bg-gray-50'}`}>
            <Link href={link.href}>
              <a className="flex items-center space-x-2">
                <i className={`${link.icon} text-gray-600`}></i>
                <span className="font-opensans rounded-2xl p-2 block">{link.label}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobilesidebar;
