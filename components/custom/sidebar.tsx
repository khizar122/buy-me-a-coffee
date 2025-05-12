'use client';
import {
  DollarSign,
  Edit,
  ExternalLink,
  Grid,
  Heart,
  Home,
  Lock,
  Menu,
  Palette,
  Settings,
  ShoppingBag,
  X,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      title: 'Home',
      icon: <Home className="h-5 w-5" />,
      href: '/dashboard'
    },
    {
      title: 'View page',
      icon: <ExternalLink className="h-5 w-5" />,
      href: '/viewPage'
    },
    {
      title: 'Explore creators',
      icon: <Grid className="h-5 w-5" />,
      href: '/exploreCreators'
    }
  ];

  const monetizeItems = [
    {
      title: 'Supporters',
      icon: <Heart className="h-5 w-5" />,
      href: '/supporters'
    },
    {
      title: 'Memberships',
      icon: <Lock className="h-5 w-5" />,
      href: '/memberships'
    },
    {
      title: 'Shop',
      icon: <ShoppingBag className="h-5 w-5" />,
      href: '/comingSoon'
    },
    {
      title: 'Publish',
      icon: <Edit className="h-5 w-5" />,
      href: '/comingSoon',
      hasDropdown: true
    }
  ];

  const settingsItems = [
    {
      title: 'Buttons & Graphics',
      icon: <Palette className="h-5 w-5" />,
      href: '/comingSoon'
    },
    {
      title: 'Integrations',
      icon: <Zap className="h-5 w-5" />,
      href: '/comingSoon'
    },
    {
      title: 'Payouts',
      icon: <DollarSign className="h-5 w-5" />,
      href: '/comingSoon'
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/comingSoon'
    }
  ];

  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Toggle Button - Only shown when sidebar is closed */}
      <div className="[@media(min-width:768px)]:hidden">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden [@media(min-width:768px)]:block fixed inset-y-0 left-0 w-64 bg-[#a8e0f0] border-r border-gray-100">
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img src="/images/sidelogo.png" alt="PV RUGS" className="h-14" />
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${
                      isLinkActive(item.href)
                        ? 'bg-blue-100 text-blue-900 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-900 before:rounded-l'
                        : 'text-navy-900 hover:bg-blue-50'
                    }`}
                  >
                    {item.icon}
                    <span className="text-navy-900">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-500 px-4 mb-2">
                MONETIZE
              </h3>
              <ul className="space-y-1">
                {monetizeItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${
                        isLinkActive(item.href)
                          ? 'bg-blue-100 text-blue-900 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-900 before:rounded-l'
                          : 'text-navy-900 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-navy-900">{item.title}</span>
                      </div>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-500 px-4 mb-2">
                SETTINGS
              </h3>
              <ul className="space-y-1">
                {settingsItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${
                        isLinkActive(item.href)
                          ? 'bg-blue-100 text-blue-900 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-900 before:rounded-l'
                          : 'text-navy-900 hover:bg-blue-50'
                      }`}
                    >
                      {item.icon}
                      <span className="text-navy-900">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 [@media(min-width:768px)]:hidden
            animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          <aside
            className="fixed inset-y-0 left-0 w-64 bg-[#e5ffff] border-r border-gray-100 z-40 [@media(min-width:768px)]:hidden
            animate-in slide-in-from-left duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="h-16 flex items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span role="img" aria-label="Coffee cup">
                        ☕
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 p-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                          isLinkActive(item.href)
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'text-navy-900 hover:bg-blue-50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon}
                        <span className="text-navy-900">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold text-gray-500 px-4 mb-2">
                    MONETIZE
                  </h3>
                  <ul className="space-y-1">
                    {monetizeItems.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-colors relative ${
                            isLinkActive(item.href)
                              ? 'bg-blue-100 text-blue-900 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-900 before:rounded-l'
                              : 'text-navy-900 hover:bg-blue-50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-navy-900">{item.title}</span>
                          </div>
                          {item.hasDropdown && (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold text-gray-500 px-4 mb-2">
                    SETTINGS
                  </h3>
                  <ul className="space-y-1">
                    {settingsItems.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                            isLinkActive(item.href)
                              ? 'bg-blue-100 text-blue-900 font-medium'
                              : 'text-navy-900 hover:bg-blue-50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon}
                          <span className="text-navy-900">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

const ChevronDown = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export default Sidebar;
