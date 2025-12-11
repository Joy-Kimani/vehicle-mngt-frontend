import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router';

const MidSection:React.FC = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const items = [
    {
      title: '1957 Mercedes-Benz 300 SL',
      price: 2800, 
      description: 'Iconic Gullwing. Concours Condition. Ideal for film and high-end exhibits.',
      images: [
        'https://placehold.co/260x256/1c1917/b45309?text=1957+300SL',
        'https://placehold.co/260x256/1c1917/b45309?text=Gullwing+Interior',
      ],
    },
    {
      title: '1965 Shelby Cobra 427',
      price: 1500,
      description: 'Raw performance. Authenticated competition history for research events.',
      images: [
        'https://placehold.co/260x256/1c1917/b45309?text=1965+Cobra',
        'https://placehold.co/260x256/1c1917/b45309?text=Cobra+Engine',
      ],
    },
    {
      title: '1932 Ford Model B Roadster',
      price: 950,
      description: 'Pre-war elegance. Perfect period correct vehicle for historical context.',
      images: [
        'https://placehold.co/260x256/1c1917/b45309?text=1932+Model+B',
        'https://placehold.co/260x256/1c1917/b45309?text=Roadster+Profile',
      ],
    },
    {
      title: '1970 Porsche 911 Targa',
      price: 1200,
      description: 'Classic air-cooled icon. Popular choice for 70s-themed film shoots.',
      images: [
        'https://placehold.co/260x256/1c1917/b45309?text=1970+911+I',
        'https://placehold.co/260x256/1c1917/b45309?text=1970+911+II',
      ],
    },
    {
      title: '1969 Aston Martin DB6',
      price: 3200,
      description: 'British grandeur. Rare model often requested for exclusive display grounds.',
      images: [
        'https://placehold.co/260x256/1c1917/b45309?text=1969+DB6',
        'https://placehold.co/260x256/1c1917/b45309?text=DB6+Front',
      ],
    },
    {
      title: '1955 Chevrolet Bel Air',
      price: 850,
      description: 'Tri-Five classic. An American staple for car shows and cultural history studies.',
      images: [
        'https://placehold.co/260x256/1c1917/b45309?text=1955+Bel+Air',
        'https://placehold.co/260x256/1c1917/b45309?text=Bel+Air+Rear',
      ],
    },
  ];

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % items.length;
        const container = containerRef.current;

        if (container) {

          const cardWidth = container.querySelector('.card-item')?.clientWidth || 304; 
          const scrollPosition = next * (cardWidth + 24); 
          container.scrollTo({ left: scrollPosition, behavior: 'smooth' });

          // reset scroll to loop
          if (next === 0) {
              // then jump to the first after seeing the last card
              setTimeout(() => {
                  container.scrollTo({ left: 0, behavior: 'instant' });
              }, 400); 
          }
        }

        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [items.length]); 

  return (
    <div className="w-full py-12 bg-zinc-900 font-serif">
      {/*scrollbar hiding default scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
              display: none;
          }
          .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
      
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-2">
          Featured Exhibition Vehicles
        </h3>
        <p className="text-gray-400">
          Our rotating selection of premium classics available for immediate rental.
        </p>
      </div>

     <div
         ref={containerRef}
         className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[40%] md:auto-cols-[30%] lg:auto-cols-[20%] xl:auto-cols-[25%] gap-6 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="card-item card bg-zinc-800 text-gray-100 rounded-xl shadow-2xl snap-start flex flex-col hover:shadow-amber-500/50 transition-shadow duration-300 min-w-[280px]"
          >
            <figure className="h-48 overflow-hidden rounded-t-xl">
             
              <img 
                src={item.images[0]} 
                alt={`${item.title} Car`} 
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/260x256/1c1917/b45309?text=Image+Not+Found"; }}
              />
            </figure>
            <div className="p-5 flex-grow">
              <h2 className="text-xl font-bold text-amber-500 mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
              <div className="mt-auto">
                <span className="font-mono text-2xl font-extrabold">${item.price}</span>
                <span className="text-sm text-gray-400"> / day</span>
              </div>
            </div>
            <button className="bg-amber-600 hover:bg-amber-500 text-zinc-900 font-bold py-3 px-4 rounded-b-xl transition duration-300">
              <Link to ="/vehicles">
                Inquire & Rent Now
                </Link>
            </button>
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
      {items.map((_, i) => (
        <div
          key={i}
          className={`h-2 w-6 rounded-full transition-all duration-300 cursor-pointer ${
          i === index % items.length ? 'bg-amber-500 w-8' : 'bg-gray-700'
        }`}
       ></div>
      ))}
      </div>
    </div>
  );
};

export default MidSection
