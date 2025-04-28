// components/FollowCard.tsx

const FollowCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">
          Follow <span className="text-blue-500">samman</span>
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Name or @yoursocial (optional)"
            className="w-full p-3 border rounded-md bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md bg-gray-50"
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors">
          Follow
        </button>
      </div>
    </div>
  );
};

export default FollowCard;
