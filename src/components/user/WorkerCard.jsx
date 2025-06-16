import { useNavigate } from 'react-router-dom'

export const WorkerCard = ({ _id, name, category, ratingAverage, profileImage }) => {
  const navigate = useNavigate()

  const goToWorkerProfile = () => {
    navigate(`/worker/${_id}`)
  }

  return (
    <div
      onClick={goToWorkerProfile}
      className="max-w-sm w-full bg-white rounded-lg border border-gray-300 overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') goToWorkerProfile() }}
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={profileImage || 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750035099/default-profile_reot90.jpg'}
          alt={`Foto de ${name}`}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-1">{name}</h2>
        <p className="text-gray-600 font-medium mb-1">Categoría: {category?.name || 'Sin categoría'}</p>
        <p className="text-yellow-600 font-semibold">⭐ {ratingAverage.toFixed(1)} / 5</p>
      </div>
    </div>
  )
}