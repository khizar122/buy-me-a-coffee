'use client';

import { signOutUser } from '@/actions/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { ChevronDown, GlassWater, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useLocalStorage = (key: any, initialValue: any) => {
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key]);

  return [storedValue, setValue];
};

const Navbar = () => {
  const pathname = usePathname();
  const [viewedProfile, setViewedProfile] = useLocalStorage(
    'viewedProfile',
    null
  );
  const [isViewPage, setIsViewPage] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isProfileViewRoute = pathname === '/viewPage';

    setIsViewPage(isProfileViewRoute);
  }, [pathname, viewedProfile]);

  const handleSignOut = async () => {
    try {
      const result = await signOutUser();

      if (result.success) {
        setViewedProfile(null);

        window.location.href = '/signin';
      } else {
        alert('Sign out failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during sign out. Please try again.');
    }
  };

  return (
    <div className="border-b border-primary shadow-md  mb-12">
      <nav className="fixed top-0  left-0 w-full h-16 bg-amber-50 border-b border-primary flex items-center justify-between px-8 z-50">
        <div className="flex items-center">
          {isViewPage && viewedProfile ? (
            <div className="flex items-center gap-2">
              {(viewedProfile as any)?.profileImage ? (
                <img
                  src={
                    (viewedProfile as any)?.profileImage || '/placeholder.svg'
                  }
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-md"
                />
              ) : (
                <div className="w-8 h-8 bg-amber-200 flex items-center justify-center rounded-md">
                  <User className="h-4 w-4 text-amber-700" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-800">
                {(viewedProfile as any)?.fullName}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <GlassWater className="h-5 w-5 text-amber-600" />
              <span className="font-bold text-lg text-gray-800">
                DrinkWithMe
              </span>
            </div>
          )}
        </div>

        {/* Center - Navigation menu items (only visible on /viewPage) */}
        {isViewPage && (
          <div className="flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/exploreCreators"
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Explore Creator
            </Link>
          </div>
        )}

        <div className="flex items-end gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-amber-200">
            <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-amber-700" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    Admin
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 mt-4 border-amber-200">
                <div className="flex flex-col gap-1">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md transition-colors">
                    <User className="h-4 w-4 text-amber-600" />
                    <Link href={'/profile'}>Edit Profile</Link>
                  </button>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md transition-colors"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 text-amber-600" />
                    Sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
