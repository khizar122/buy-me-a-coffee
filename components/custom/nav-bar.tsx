'use client';

import { signOutUser } from '@/actions/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  // Handle sign out with our custom server action
  const handleSignOut = async () => {
    try {
      console.log('Sign out process started');

      // Call the server action to sign out
      const result = await signOutUser();
      console.log('Sign out result:', result);

      if (result.success) {
        console.log('Sign out successful, redirecting to signin page');

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

  return (
    <div className="border-b border-gray-200">
      <nav className="h-16 bg-gray-100 flex items-center justify-between px-8">
        <h1 className="text-xl font-semibold"></h1>

        <div className="flex items-end gap-4">
          <div className="flex items-center gap-3 pl-4 border-l">
            <img
              src="images/logo.svg"
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
