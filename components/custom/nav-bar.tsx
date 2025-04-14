'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
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
                    onClick={() => signOut({ callbackUrl: '/signin' })}
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
