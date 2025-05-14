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
    const isViewPage = pathname?.includes('viewPage') || false;
    setShowSidebar(!isViewPage);
  }, [pathname]);

  return (
    <div className="min-h-screen flex">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
}
