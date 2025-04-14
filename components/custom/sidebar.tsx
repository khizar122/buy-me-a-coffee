'use client';

import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if window is defined, meaning we're on the client side
    // if (typeof window !== 'undefined') {
    //   const storedUser = localStorage.getItem('user');
    //   if (storedUser) {
    //     try {
    //       const parsedUser = JSON.parse(storedUser); // Parse user JSON
    //       setUser(parsedUser);
    //     } catch (e) {
    //       console.error('Error parsing user from localStorage:', e);
    //     }
    //   }
    // }
  }, []);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard'
    }
  ];

  const filteredMenuItems =
    user?.userType === 'superAdmin'
      ? menuItems.filter((item) => item.adminAccessible)
      : menuItems;

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="PV RUGS" className="h-8" />
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isDisabled =
                user?.userType !== 'Organizational Admin' && user?.isFirstLogin;
              return (
                <li key={item.title}>
                  {isDisabled ? (
                    <span className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 cursor-not-allowed">
                      {item.icon}
                      <span>{item.title}</span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
