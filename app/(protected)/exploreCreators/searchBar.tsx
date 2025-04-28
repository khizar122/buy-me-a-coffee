'use client';

import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full my-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        className="bg-white w-full py-3 pl-12 pr-4 rounded-full border border-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
        placeholder="Search 1,000,000+ creators"
      />
    </div>
  );
};

export default SearchBar;
