'use client';

import Image from 'next/image';
import React from 'react';

interface PostType {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  link?: string;
}

interface PublishedCardProps {
  author: {
    name: string;
    avatarUrl: string;
  };
  posts: PostType[];
  onFollow?: () => void;
}

const PublishedCard: React.FC<PublishedCardProps> = ({
  author,
  posts,
  onFollow
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            {author.avatarUrl ? (
              <Image
                src={author.avatarUrl}
                alt={author.name}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500">{author.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <span className="font-medium">{author.name} added a new post.</span>
        </div>
        <button
          onClick={onFollow}
          className="border border-gray-300 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          + Follow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col">
            <div className="relative h-56 overflow-hidden rounded-lg">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="pt-3">
              <h3 className="font-medium text-base">{post.title}</h3>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublishedCard;
