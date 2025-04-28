'use client';


const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'explore', label: 'Explore creators' },
    { id: 'following', label: 'Following' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 text-sm font-medium relative ${
              activeTab === tab.id
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;
