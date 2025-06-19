const ReviewCard = ({ review }) => {
  const { rating, comment, sender, createdAt } = review;

  const stars = Array(rating).fill('⭐').join('');

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md mb-4 w-full sm:w-1/2 md:w-1/4">
      <img
        src={sender.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
        alt={`Foto de ${sender.name}`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-semibold">{sender.name}</span>
          <span className="ml-2 text-yellow-500">{stars}</span>
        </div>
        <p className="text-gray-700">{comment}</p>
        <span className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
