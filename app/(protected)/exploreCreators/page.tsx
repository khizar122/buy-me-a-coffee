'use client';

import { getAllUsers } from '@/actions/user'; // Update path to match your project structure
import { useEffect, useState } from 'react';
import ImageUrl from '../../../public/images/logins.png';
import Avatr from '../../../public/images/placeholder.jpeg';
import CreatorsGrid from './creatorGrid';
import FollowingGrid from './followingGrid';
import NavigationTabs from './navigationTabs';
import PublishedCard from './PublishedCard';
import SearchBar from './searchBar';
import SectionHeading from './SectionHeading';

// Types for our user data
interface Creator {
  id: string;
  avatar: string;
  name: string;
  description: string;
  supporters: number;
}

// Mock data for following creators - with Instagram-style posts
const followingCreators = [
  {
    id: 101,
    name: 'Coffee Enthusiast',
    date: 'Nov 18, 2024',
    title: 'Get Ready for Heartfelt Video Messages from Supporters',
    likes: 442,
    imageUrl: ImageUrl,
    avatar: Avatr, // Added avatar property
    comments: 170
  },
  {
    id: 102,
    name: 'Drawfee',
    date: 'Nov 17, 2024',
    title: 'Supporting Independent Artists Has Never Been Easier',
    likes: 289,
    imageUrl: ImageUrl,
    avatar: Avatr, // Added avatar property
    comments: 94
  },
  {
    id: 103,
    name: 'Urban Sketcher',
    date: 'Nov 16, 2024',
    imageUrl: ImageUrl,
    avatar: Avatr, // Added avatar property
    title: 'New Membership Tiers Available Now',
    likes: 521,
    comments: 132
  }
];


// Mock data for published posts with local images
const publishedPosts = {
  author: {
    name: 'The Tech Prepper',
    avatarUrl: Avatr // Local avatar image
  },
  posts: [
    {
      id: '1',
      title: 'The Ultimate Manpack',
      date: 'Sep 8, 2022',
      imageUrl: ImageUrl, // Local laptop image
      link: '#'
    },
    {
      id: '2',
      title: '30K Subscriber Winners',
      date: 'Mar 5, 2023',
      imageUrl: ImageUrl, // Local nature field image
      link: '#'
    }
  ]
};
console.log('hello', publishedPosts);

export default function TrendingCreatorsPage() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingCreators, setTrendingCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch creators when the component mounts or search term changes
  useEffect(() => {
    async function fetchCreators() {
      setLoading(true);
      try {
        // Call the server action to get users
        const response = await getAllUsers({
          isCreator: true,
          searchTerm: searchTerm,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          limit: 8 // Limit to 8 trending creators
        });

        if (response.success) {
          // Format users to match the structure expected by CreatorsGrid
          const formattedUsers = response.users.map((user, index) => ({
            id: user.id,
            // Use local avatar images as fallback
            avatar:
              user.profilePictureUrl ||
              `/images/avatars/creator-${(index % 5) + 1}.jpg`,
            name: user.displayName || user.username,
            description: user.creatorTagline || 'Creator',
            supporters: user.followersCount || 0
          }));

          setTrendingCreators(formattedUsers);
          setError(null);
        } else {
          setError(response.error || 'Failed to load creators');
        }
      } catch (err) {
        setError('Failed to load creators. Please try again later.');
        console.error('Error fetching creators:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCreators();
  }, [searchTerm]); // Re-fetch when search term changes

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFollow = () => {
    console.log('Follow clicked');
  };

  return (
    <div className="min-h-screen bg-profile-bg">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <SearchBar onSearch={handleSearch} />

        {activeTab === 'explore' ? (
          <>
            <SectionHeading title="Trending creators this week" />
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-4">{error}</div>
              ) : trendingCreators.length === 0 ? (
                <div className="text-center py-4">No creators found</div>
              ) : (
                <CreatorsGrid creators={trendingCreators} />
              )}
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
