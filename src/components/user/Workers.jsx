import { useState } from 'react'
import { useGetWorkersContext } from '../../shared/hooks/user/useGetWorkersContext'
import { WorkerCard } from './WorkerCard'

const carouselImages = [
  { url: 'https://res.cloudinary.com/djedsgxyh/image/upload/v1750036149/banner01_gb3ocn.jpg' },
  { url: 'https://cdn-fgcbo.nitrocdn.com/LhXwybchMmlYzxHNbFxKYWKAyaZEuWNH/assets/images/optimized/rev-b348688/www.totalmobile.com/wp-content/uploads/2023/03/mobile-worker-header.jpg' },
  { url: 'https://fastlabourhire.com.au/wp-content/uploads/2022/03/blog-image-0061.webp' },
]

export const WorkersList = () => {
  const { workers, isFetchingWorkers } = useGetWorkersContext()
  const [currentSlide, setCurrentSlide] = useState(0)

  if (isFetchingWorkers) return <div>Cargando trabajadores...</div>
  if (!workers || workers.length === 0) return <div>No hay trabajadores disponibles.</div>

  const groupedByCategory = workers.reduce((acc, worker) => {
    const categoryName = worker.category?.name || 'Sin categoría'
    if (!acc[categoryName]) acc[categoryName] = []
    acc[categoryName].push(worker)
    return acc
  }, {})

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">

      {/* Carrusel de imágenes */}
      <div className="relative w-full h-100 mb-8 overflow-hidden rounded-lg shadow-lg">
        <img
          src={carouselImages[currentSlide].url}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-100 object-cover"
        />
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
          aria-label="Anterior"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
          aria-label="Siguiente"
        >
          &#10095;
        </button>
      </div>

      {/* Listado por categoría */}
    {Object.entries(groupedByCategory).map(([categoryName, categoryWorkers]) => (
    <div key={categoryName} className="mb-10">
        <h2 className="text-2xl font-bold">{categoryName}</h2>
        <p className="text-gray-500 mb-4">Los más cercanos a tu área.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categoryWorkers.slice(0, 4).map(worker => (
            <WorkerCard
            key={worker._id}
            _id={worker._id}
            name={`${worker.name} ${worker.surname}`}
            category={worker.category}
            ratingAverage={worker.ratingAverage}
            profileImage={worker.profileImage}
            />
        ))}
        </div>
    </div>
    ))}
    </div>
  )
}
