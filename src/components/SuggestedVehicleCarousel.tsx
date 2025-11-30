import { useEffect, useRef } from "react";

interface Vehicle {
  vehicle_id: number;
  manufacturer: string;
  model: string;
  front_image_url: string;
  rental_rate: number;
}

interface Props {
  vehicles?: Vehicle[]; 
}

const SuggestedVehiclesCarousel: React.FC<Props> = ({ vehicles = [] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    const scrollStep = 2; 
    const interval = setInterval(() => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        carousel.scrollLeft += scrollStep;
        scrollAmount += scrollStep;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!vehicles || vehicles.length === 0) {
    return <p className="text-gray-400">No suggestions available</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-white mb-4">Recommended for You</h3>
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.vehicle_id}
            className="min-w-[180px] bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center snap-start"
          >
            <img
              src={vehicle.front_image_url}
              alt={vehicle.model}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p className="text-sm font-semibold text-white">
              {vehicle.manufacturer} {vehicle.model}
            </p>
            <p className="text-xs text-gray-400">Ksh {vehicle.rental_rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedVehiclesCarousel;
