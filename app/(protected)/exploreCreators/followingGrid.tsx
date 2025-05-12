import FollowingCard from "./followingCard";

const FollowingGrid = ({ creators }) => {
  console.log("test",creators)
  return (
    <div className="flex flex-col space-y-4">
      {creators.map((creator) => (
        <FollowingCard key={creator.id} creator={creator} />
      ))}
    </div>
  );
};

export default FollowingGrid;
