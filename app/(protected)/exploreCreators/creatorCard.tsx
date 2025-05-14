'use client';

import { getFollowerCount } from '@/actions/support';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CreatorCardProps {
  id: string;
  rank: number;
  avatar: string;
  name: string;
  description: string;
  followers?: number;
}

const CreatorCard = ({
  id,

  avatar,
  name,
  description,
  followers: initialFollowers
}: CreatorCardProps) => {
  const router = useRouter();
  const [followers, setFollowers] = useState<number>(initialFollowers ?? 0);
  const [isLoading, setIsLoading] = useState<boolean>(
    initialFollowers === undefined
  );

  // Fetch follower count if not provided
  useEffect(() => {
    let isMounted = true;

    async function fetchFollowerCount() {
      if (initialFollowers === undefined) {
        setIsLoading(true);

        try {
          const count = await getFollowerCount(id);

          if (isMounted) {
            setFollowers(count);
          }
        } catch (error) {
          console.error(
            `Error fetching follower count for creator ${id}:`,
            error
          );

          if (isMounted) {
            setFollowers(0); // Default to 0 on error
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    }

    fetchFollowerCount();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [id, initialFollowers]);

  // Handle card click to navigate to view page with user ID
  const handleCardClick = () => {
    router.push(`/viewPage?userId=${id}`);
  };

  return (
    <div
      className="p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-purple-200 shadow-sm hover:shadow"
      onClick={handleCardClick}
    >
      <div className="flex items-start">
       
      
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 border-2 border-white shadow-md">
          <img
            src={avatar || '/placeholder-avatar.jpg'}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-avatar.jpg';
            }}
          />
        </div>

        {/* Content with better spacing */}
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-1 mt-0.5">
            {description || 'Creator'}
          </p>

         
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Heart size={14} className="mr-1 text-pink-500" fill="#ec4899" />
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                <span className="font-medium">
                  {followers.toLocaleString()}
                </span>
                <span className="ml-1 text-gray-400">
                  {followers === 1 ? 'follower' : 'followers'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
