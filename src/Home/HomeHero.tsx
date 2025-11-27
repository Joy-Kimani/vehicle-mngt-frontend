import React from 'react'
import { Car, Search } from 'lucide-react';
import { Link } from 'react-router';

const HomeHero:React.FC = () => {
return (
  <div className="relative w-full h-[90vh] flex items-center justify-center font-serif">

    {/* Background Image (Placeholder) */}

     {/* Background Video */}
     <video
       autoPlay
       loop
       muted
       playsInline
       className="absolute inset-0 w-full h-full object-cover z-0"
     >
       <source
         src="https://media.istockphoto.com/id/1093220732/video/news-animation-of-the-car-abstract-auto-consisting-of-program-code-in-electronic-space.mp4?s=mp4-640x640-is&k=20&c=f5n34r2lsg9crsUhDV_V_N0FFLRDZzehydTnJLwAdrI="
         type="video/mp4"
       />
     </video>
    

    {/* Overlay */}
    <div className="absolute inset-0 bg-zinc-900/60 z-10"></div>

    {/* Hero Content */}
    <div className="hero-content text-center relative z-20 p-6 max-w-4xl">
      <div className="flex flex-col items-center">
        <p className="text-lg text-amber-400 uppercase tracking-widest mb-4 font-sans font-semibold">
            Provenance & Prestige
        </p>
        <h1 className="mb-8 text-lg sm:text-2xl font-bold leading-tight text-white shadow-text">
          Rent Exhibition-Grade Vintage Automobiles
        </h1>
        <p className="mb-10 text-lg text-gray-200 max-w-2xl">
          The specialist choice for film, museum displays, and historical research. Every vehicle is authenticated and show-ready.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/vehicles" className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-zinc-900 font-bold rounded-full transition duration-300 shadow-xl text-lg uppercase">
            <Car className="w-5 h-5"/> Browse Inventory
          </Link>
          <Link to="/about" className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-amber-600 hover:bg-amber-600 text-amber-400 hover:text-zinc-900 font-bold rounded-full transition duration-300 shadow-xl text-lg uppercase">
            <Search className="w-5 h-5"/> Research Services
          </Link>
        </div>
      </div>
    </div>

  </div>
);

}

export default HomeHero



    // {/* Background Video */}
    // <video
    //   autoPlay
    //   loop
    //   muted
    //   playsInline
    //   className="absolute inset-0 w-full h-full object-cover z-0"
    // >
    //   <source
    //     src="https://cdn.pixabay.com/video/2024/09/22/232685_large.mp4"
    //     type="video/mp4"
    //   />
    // </video>