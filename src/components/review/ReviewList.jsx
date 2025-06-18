import ReviewCard from './ReviewCard';

const ReviewsList = ({ reviews }) => {
  return (
    <div className="w-full mt-6">
      <h3 className="text-2xl font-bold mb-4">Reseñas de este usuario</h3>
      <div className="flex flex-wrap gap-4">
        {reviews.length === 0 ? (
          <p>No hay reseñas para mostrar.</p>
        ) : (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsList;