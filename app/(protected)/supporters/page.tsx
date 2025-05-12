'use client';

import React, { useState } from 'react';
import ChooseLayout from './chooseLayout';
import StatsCards from './statsCard';
import SupportersCard from './supportersCards';
import Tabs from './tabs';
import ThankYouMessage from './thankyouMessage';

const SupportersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('one-time');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen  bg-profile-bg">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Supporters</h1>

        <Tabs
          tabs={[
            {
              id: 'one-time',
              label: 'One-time',
              isActive: activeTab === 'one-time'
            },
            {
              id: 'settings',
              label: 'Settings',
              isActive: activeTab === 'settings'
            }
          ]}
          onTabChange={handleTabChange}
        />

        {activeTab === 'one-time' && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <StatsCards />
            <SupportersCard />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="mt-6 space-y-6">
            <ThankYouMessage />
            <ChooseLayout />
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportersPage;
