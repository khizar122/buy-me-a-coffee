'use Client';

import MembershipCard from './membershipCard';
import VideoCardSection from './videoCard';


export default function MembershipsPage() {
  return (
    <div
      className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#e5ffff' }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Memberships</h1>
        <MembershipCard />
        <div className="mt-4">
          <VideoCardSection videoUrl="https://www.youtube.com/watch?v=oQmpMYJp1dc" />
        </div>
      </div>
    </div>
  );
}
