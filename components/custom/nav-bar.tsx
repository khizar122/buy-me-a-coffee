'use client';

import { signOutUser } from '@/actions/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { ChevronDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ViewedProfile {
  fullName: string;
  profileImage?: string;
}

// Create a custom hook to handle localStorage and provide a way to update it
const useLocalStorage = (key, initialValue) => {
  // Get from localStorage then parse stored json or return initialValue
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key in other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
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
  const router = useRouter();
  const pathname = usePathname();
  const [viewedProfile, setViewedProfile] = useLocalStorage(
    'viewedProfile',
    null
  );
  const [isViewPage, setIsViewPage] = useState(false);

  // Check if we're on a view page route
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if this is a profile view page
    const isProfileViewRoute = pathname === '/viewPage';
    console.log('Current path:', pathname);
    console.log('Is view page:', isProfileViewRoute);
    setIsViewPage(isProfileViewRoute);

    // Set up test data only if on view page and no existing data
    if (isProfileViewRoute && !viewedProfile) {
      console.log(
        'No profile in storage, you may want to add test data here during development'
      );

      // Uncomment below for testing with sample data
      /*
      setViewedProfile({
        fullName: "Test User",
        profileImage: "/images/logo.svg"
      });
      */
    }
  }, [pathname, viewedProfile]);

  // Handle sign out with our custom server action
  const handleSignOut = async () => {
    try {
      console.log('Sign out process started');

      // Call the server action to sign out
      const result = await signOutUser();
      console.log('Sign out result:', result);

      if (result.success) {
        console.log('Sign out successful, redirecting to signin page');

        // Clear any viewed profile data
        setViewedProfile(null);

        // Force a hard refresh to ensure all state is cleared
        window.location.href = '/signin';
      } else {
        console.error('Sign out failed:', result.error);
        alert('Sign out failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
      alert('An error occurred during sign out. Please try again.');
    }
  };

  // For testing purposes - a button to update the profile
  const handleUpdateProfile = () => {
    // This function can be used to test updating the profile
    setViewedProfile({
      fullName: 'Updated User',
      profileImage: '/images/logo.svg'
    });
  };

  console.log('Render state:', { isViewPage, viewedProfile }); // Debug log

  return (
    <div className="border-b border-gray-200">
      <nav className="h-16 bg-gray-100 flex items-center justify-between px-8">
        {/* Left side - conditionally show viewed profile info */}
        <div className="flex items-center">
          {isViewPage && viewedProfile ? (
            <div className="flex items-center gap-2">
              {viewedProfile.profileImage ? (
                <img
                  src={viewedProfile.profileImage}
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-md" // Added rounded-md for slight border radius
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-md">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
              )}
              <span className="text-sm font-medium">
                {viewedProfile.fullName}
              </span>
            </div>
          ) : (
            <h1 className="text-xl font-semibold"></h1>
          )}
        </div>

        {/* Right side - user menu */}
        <div className="flex items-end gap-4">
          {/* Add test button (remove in production) */}
          {process.env.NODE_ENV !== 'production' &&
            pathname === '/viewPage' && (
              <button
                onClick={handleUpdateProfile}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
              >
                Update Profile (Test)
              </button>
            )}

          <div className="flex items-center gap-3 pl-4 border-l">
            <img
              src="/images/logo.svg"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2">
                  <span className="text-sm font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 mt-4">
                <div className="flex flex-col gap-1">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <User className="h-4 w-4" />
                    <Link href={'/profile'}>Edit Profile</Link>
                  </button>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
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
