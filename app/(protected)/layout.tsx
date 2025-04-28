'use client';

import Navbar from '@/components/custom/nav-bar';
import Sidebar from '@/components/custom/sidebar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    // Check if the current path includes 'viewPage'
    const isViewPage = pathname?.includes('viewPage') || false;
    setShowSidebar(!isViewPage);
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
}
