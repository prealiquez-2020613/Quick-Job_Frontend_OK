const ReviewCard = ({ review }) => {
  const { rating, comment, sender, createdAt } = review;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-slate-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm">
      {/* Header con avatar y nombre */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={sender.profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
            alt={`Foto de ${sender.name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-slate-700 to-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-700">{sender.name}</h4>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars(rating)}
            <span className="text-sm text-slate-500 ml-2">({rating}/5)</span>
          </div>
        </div>
      </div>

      {/* Comentario */}
      <div className="mb-4">
        <p className="text-slate-600 leading-relaxed text-sm">
          "{comment}"
        </p>
      </div>

      {/* Footer con fecha */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(createdAt).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        
        {/* Badge de calificación */}
        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
          rating >= 4 
            ? 'bg-green-100 text-green-700' 
            : rating >= 3 
            ? 'bg-amber-100 text-amber-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {rating >= 4 ? 'Excelente' : rating >= 3 ? 'Bueno' : 'Regular'}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;