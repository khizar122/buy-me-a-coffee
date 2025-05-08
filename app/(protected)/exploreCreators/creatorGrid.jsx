'use client';

import CreatorCard from './creatorCard';

const CreatorsGrid = ({ creators }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {creators.map((creator, index) => (
        <CreatorCard
          key={creator.id}
          id={creator.id} // This line was missing! Pass the ID to the CreatorCard
          rank={index + 1}
          avatar={creator.avatar}
          name={creator.name}
          description={creator.description}
          supporters={creator.supporters}
        />
      ))}
    </div>
  );
};

export default CreatorsGrid;
 