// import React from 'react';
// import MembershipCard from './MembershipCard';
// import MembershipStatsVisual from './MembershipStatsVisual';
// import Image from 'next/image';

// const MembershipPage: React.FC = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Memberships</h1>

//         <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
//           <div className="flex flex-col items-center md:items-start">
//             <h2 className="text-2xl md:text-3xl font-bold mb-2">
//               Enable membership
//             </h2>
//             <p className="text-gray-400 uppercase text-sm font-medium tracking-wide mb-6">
//               HIGHLY RECOMMENDED
//             </p>

//             <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-full flex items-center transition-colors">
//               Enable membership
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 ml-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
//           <div className="flex flex-col md:flex-row items-start justify-between">
//             <div className="w-full md:w-1/2 mb-6 md:mb-0">
//               <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
//                 Earn recurring income
//               </h2>
//               <p className="text-gray-600">
//                 Memberships are a great way to build recurring revenue, create
//                 engagement, and build deep and meaningful relationships with
//                 your fans. Start earning monthly/yearly upfront payments doing
//                 what you love!
//               </p>
//             </div>

//             <div className="w-full md:w-2/5">
//               <MembershipStatsVisual />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
//           <div className="flex flex-col md:flex-row items-start justify-between">
//             <div className="w-full md:w-1/2 mb-6 md:mb-0">
//               <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
//                 Share exclusives
//               </h2>
//               <p className="text-gray-600">
//                 Share exclusive posts, messages or other rewards with your
//                 members. Creators also turn on membership without rewards, only
//                 to accept monthly support.
//               </p>
//             </div>

//             <div className="w-full md:w-2/5">
//               <div className="relative w-full h-64">
//                 <Image
//                   src="/images/membership-exclusives.png"
//                   alt="Exclusive content for members"
//                   fill
//                   style={{ objectFit: 'contain' }}
//                   className="rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembershipPage;
