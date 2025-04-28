'use client';

import { useState } from 'react';
import CreatorsGrid from './creatorGrid';
import NavigationTabs from './navigationTabs';
import PublishedCard from './PublishedCard';
import SearchBar from './searchBar';
import SectionHeading from './SectionHeading';
import FollowingGrid from './followingGrid';


// Mock data for creators
const trendingCreators = [
  {
    id: 1,
    avatar:
      'https://as1.ftcdn.net/v2/jpg/01/73/77/00/1000_F_173770068_LRQyNUZQn9WtQyJoJsOEwK8qwBzypBm0.jpg',
    name: 'Simple Politics',
    description: 'Helping people have better conversations about politics',
    supporters: 6182
  },
  {
    id: 2,
    avatar:
      'https://as1.ftcdn.net/v2/jpg/01/73/77/00/1000_F_173770068_LRQyNUZQn9WtQyJoJsOEwK8qwBzypBm0.jpg',
    name: 'Cara',
    description: 'building a new platform for artists',
    supporters: 6182
  },
  {
    id: 3,
    avatar:
      'https://as1.ftcdn.net/v2/jpg/01/73/77/00/1000_F_173770068_LRQyNUZQn9WtQyJoJsOEwK8qwBzypBm0.jpg',
    name: 'Beach Talk Radio',
    description: 'A Dinky Little Podcast',
    supporters: 1609
  },
  {
    id: 4,
    avatar:
      'https://as1.ftcdn.net/v2/jpg/01/73/77/00/1000_F_173770068_LRQyNUZQn9WtQyJoJsOEwK8qwBzypBm0.jpg',
    name: 'Tanaka san',
    description: 'teaching Japanese on YouTube & Instagram',
    supporters: 512
  }
];

// Mock data for following creators - with Instagram-style posts
const followingCreators = [
  {
    id: 101,
    name: 'Coffee Enthusiast',
    date: 'Nov 18, 2024',
    title: 'Get Ready for Heartfelt Video Messages from Supporters',
    likes: 442,
    comments: 170
  },
  {
    id: 102,
    name: 'Drawfee',
    date: 'Nov 17, 2024',
    title: 'Supporting Independent Artists Has Never Been Easier',
    likes: 289,
    comments: 94
  },
  {
    id: 103,
    name: 'Urban Sketcher',
    date: 'Nov 16, 2024',
    title: 'New Membership Tiers Available Now',
    likes: 521,
    comments: 132
  }
];

// Mock data for published posts
const publishedPosts = {
  author: {
    name: 'The Tech Prepper',
    avatarUrl: '/api/placeholder/40/40' // Replace with actual avatar image
  },
  posts: [
    {
      id: '1',
      title: 'The Ultimate Manpack',
      date: 'Sep 8, 2022',
      imageUrl: '/api/placeholder/400/320', // This would be replaced with the tactical gear image
      link: '#'
    },
    {
      id: '2',
      title: '30K Subscriber Winners',
      date: 'Mar 5, 2023',
      imageUrl: '/api/placeholder/400/320', // This would be replaced with the terminal/console image
      link: '#'
    }
  ]
};

export default function TrendingCreatorsPage() {
  const [activeTab, setActiveTab] = useState('explore');
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFollow = () => {
    console.log('Follow clicked');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e5ffff' }}>
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        <SearchBar />
        
        {activeTab === 'explore' ? (
          <>
            <SectionHeading title="Trending creators this week" />
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <CreatorsGrid creators={trendingCreators} />
            </div>
            
            {/* Published Now section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold">Published now</h2>
                <span className="ml-2 w-3 h-3 bg-orange-500 rounded-full"></span>
              </div>
              <PublishedCard 
                author={publishedPosts.author}
                posts={publishedPosts.posts}
                onFollow={handleFollow}
              />
            </div>
          </>
        ) : (
          <>
            <div className="my-6">
              <h2 className="text-xl font-bold mb-4">Creators you follow</h2>
              <FollowingGrid creators={followingCreators} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
