import React, { useMemo, useState } from 'react';
import { Settings, Users, Fuel, ChevronDown, Search, Filter } from 'lucide-react'; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { vehicleApi } from '../features/Api/VehicleApi';


type VehicleProduct ={
   vehicle_id: number;
    vehicle_spec_id: number;
    rental_rate: number;
    availability: boolean;

    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity: string;
    transmission: string;
    seating_capacity: string;
    color: string;
    features: string;

    front_image_url?: string;
    back_image_url?: string;
    side_image_url?: string;
    interior_image_url?: string;
}



// const allCarProducts: VehicleProduct[] = [
//   {
//     vehicle_id: 1,
//     name: '300 SL Gullwing',
//     brand: 'Mercedes-Benz',
//     transmission: 'Manual',
//     fuel_type: 'Petrol',
//     seat_number: 2,
//     is_available: true,
//     price: 3500,
//     rating: 5.0,
//     year: 1957,
//     images: {
//       front: "https://images.squarespace-cdn.com/content/v1/5c84de4dca525b5555d882ad/1553779776393-NDE72RNIILK8FQI24D42/21+Merc+300SL+Frontal+Doors+Up.JPG?format=300w",
//       back: "https://images.squarespace-cdn.com/content/v1/5c84de4dca525b5555d882ad/1553779761465-GVVK98ICBDAWMQ85BTJ6/19+Merc+300SL+Rear+Rump.JPG?format=300w",
//       side: "https://images.squarespace-cdn.com/content/v1/5c84de4dca525b5555d882ad/1553779754109-MURB64V2VD4GDLBTRHO4/18+Merc+300SL+Profile+R2L.JPG?format=300w",
//       interior: "https://images.squarespace-cdn.com/content/v1/5c84de4dca525b5555d882ad/1553779704533-DLAWSLE1XCV0Y55KEEIS/12+Merc+300SL+Interior+from+Passenger.JPG?format=300w"
//     }
//   },
//   {
//     vehicle_id: 2,
//     name: 'E-Type Roadster',
//     brand: 'Jaguar',
//     transmission: 'Manual',
//     fuel_type: 'Petrol',
//     seat_number: 2,
//     is_available: true,
//     price: 2800,
//     rating: 4.8,
//     year: 1965,
//     images: {
//       front: "https://i.imgur.com/kOepxyP.jpeg",
//       back: "https://i.imgur.com/gakdmIv.jpeg",
//       side: "https://i.imgur.com/8p4kEfC.jpeg",
//       interior: "https://i.imgur.com/3OLpQIQ.jpeg"
//     }
//   },
//   {
//     vehicle_id: 3,
//     name: 'DB5',
//     brand: 'Aston Martin',
//     transmission: 'Auto',
//     fuel_type: 'Petrol',
//     seat_number: 4,
//     is_available: false,
//     price: 4200,
//     rating: 4.9,
//     year: 1964,
//     images: {
//       front: "https://i.imgur.com/6xMHpE4.jpeg",
//       back: "https://i.imgur.com/dRm44oa.jpeg",
//       side: "https://i.imgur.com/7Pz5ZVe.jpeg",
//       interior: "https://i.imgur.com/wiAE0TH.jpeg"
//     }
//   },
//   {
//     vehicle_id: 4,
//     name: 'Model B',
//     brand: 'Ford',
//     transmission: 'Manual',
//     fuel_type: 'Petrol',
//     seat_number: 4,
//     is_available: true,
//     price: 1500,
//     rating: 4.0,
//     year: 1932,
//     images: {
//       front: "https://i.imgur.com/fj85z38.jpeg",
//       back: "https://i.imgur.com/MRsduyG.jpeg",
//       side: "https://i.imgur.com/nf9M3rh.jpeg",
//       interior: "https://i.imgur.com/MxT6c1s.jpeg"
//     }
//   },
//   {
//     vehicle_id: 5,
//     name: '911 Targa',
//     brand: 'Porsche',
//     transmission: 'Manual',
//     fuel_type: 'Petrol',
//     seat_number: 4,
//     is_available: true,
//     price: 1800,
//     rating: 4.7,
//     year: 1973,
//     images: {
//       front: "https://i.imgur.com/CRZgKgY.jpeg",
//       back: "https://i.imgur.com/ObgoDbE.jpeg",
//       side: "https://i.imgur.com/8dGTMPZ.jpeg",
//       interior: "https://i.imgur.com/foY6P0N.jpeg"
//     }
//   },
//   {
//     vehicle_id: 6,
//     name: 'Firebird Formula',
//     brand: 'Pontiac',
//     transmission: 'Auto',
//     fuel_type: 'Petrol',
//     seat_number: 4,
//     is_available: false,
//     price: 1200,
//     rating: 4.3,
//     year: 1970,
//     images: {
//       front: "https://i.imgur.com/Rk3y1hB.jpeg",
//       back: "https://i.imgur.com/WzvgrJp.jpeg",
//       side: "https://i.imgur.com/0pxtxwP.jpeg",
//       interior: "https://i.imgur.com/FKyG8fR.jpeg"
//     }
//   }
// ];


const Vehicles:React.FC = () => {



const { data: vehicle, error, isLoading } = vehicleApi.useGetAllVehiclesQuery();

// Filter states
const [searchCar, setSearchCar] = useState<string>("");
const [selectCategory, setSelectCategory] = useState("All");
const [sortBy, setSortBy] = useState("year"); 
const [showAvailableOnly, setShowAvailableOnly] = useState(false); 

const allCarProducts: VehicleProduct[] = vehicle ?? []

console.log('allcarproductrs', allCarProducts)

const categories = ["All", ...Array.from(new Set(allCarProducts.map((vehicle) => vehicle.manufacturer).filter(Boolean)))];

// sorting logic
const filterCars = useMemo(() => {
  
  return allCarProducts
    .filter((vehicle) => {
      // search filter
      const matchesSearch =
        vehicle.manufacturer.toLowerCase().includes(searchCar.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchCar.toLowerCase()) ||
        String(vehicle.year).includes(searchCar.toLowerCase());

      // category filter 
      const matchesCategory =
        selectCategory === "All" || vehicle.model === selectCategory;

      // availability filter
      const matchesAvailability =
        !showAvailableOnly || vehicle.availability; 

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    
    // sort
    .sort((a, b) => {
      if (sortBy === "year") {
        return b.year - a.year; 
      } else if (sortBy === "price") {
        return a.rental_rate - b.rental_rate; 
      } else if (sortBy === "transmission"){
        return a.transmission.localeCompare(b.transmission)
      } else if (sortBy === "fuel_type"){
        return a.fuel_type.localeCompare(b.fuel_type)
      } else if (sortBy === "brand"){
        return a.model.localeCompare(b.model)
      }
      return 0;
    });
}, [searchCar, selectCategory, sortBy, showAvailableOnly]);

  
  if (filterCars === undefined) {
    return null;
  }

  

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-zinc-900 font-serif text-gray-100">
      
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <p className="text-xl text-amber-500 uppercase tracking-widest mb-2 font-sans font-semibold">
            Curated Access
          </p>
          <h1 className="text-lg sm:text-3xl font-bold text-white mb-3">
            The Exhibition Inventory
          </h1>
          <p className="text-md text-gray-400 max-w-3xl mx-auto">
            Browse our hand-selected vehicles available for film, display, and historical research projects.
          </p>
        </header>
        
        {/* Filter and Sort Controls */}
        <div className='bg-zinc-800 p-6 rounded-xl shadow-inner mb-10 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4'>
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
            <input
              type='text'
              placeholder='Search...'
              value={searchCar}
              onChange={(e) => setSearchCar(e.target.value)}
              className='w-full pl-12 pr-4 py-2 bg-zinc-700 text-gray-100 placeholder-gray-400 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition'
            />
          </div>
          
          {/* Category Select */}
          <div className="relative w-full md:w-auto flex-grow md:flex-grow-0">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
            <select 
              value={selectCategory} 
              onChange={(e) => setSelectCategory(e.target.value)}
              className='w-full appearance-none pl-12 pr-10 py-2 bg-zinc-700 text-gray-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition cursor-pointer'
            >
              <option value="All">All Manufacturers</option>
              {categories.slice(1).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
          </div>

          {/* Sort Select */}
          <div className="relative w-full md:w-auto flex-grow md:flex-grow-0">
            <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full appearance-none pl-12 pr-10 py-2 bg-zinc-700 text-gray-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition cursor-pointer'
            >
              <option value='year'>Sort By Year (Newest)</option>
              <option value='price'>Rate: Low to High</option>
              <option value='brand'>Manufacturer Name</option>
              <option value='transmission'>Transmission Type</option>
              <option value='fuel_type'>Fuel Type</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
          </div>

          {/* Availability Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer w-full md:w-auto">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={() => setShowAvailableOnly(!showAvailableOnly)}
              className="w-4 h-4 text-amber-600 bg-zinc-700 border-zinc-600 rounded focus:ring-amber-500 transition"
            />
            <span className='text-sm font-medium text-gray-300'>Show Available Only</span>
          </label>
        </div>

        {/* Vehicle Grid */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4'>
        {
        isLoading ?(
          <span className='loading loading-ring loading-success'></span> 
        ): error ? (
            <p> Error</p> 
         ):  filterCars.length === 0 ? (
<p>No vehicles</p>
         ): 
          filterCars.map((vehicle) => (
            <div 
              key={vehicle.vehicle_id} 
              className={`bg-zinc-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]
              ${vehicle.availability ? 'border-2 border-amber-600/50' : 'opacity-50 cursor-not-allowed border-2 border-zinc-700'} 
              `}
            >
              {/*IMAGE HOVER GALLERY */}
              <figure className="hover-gallery h-48 w-full overflow-hidden">
                <img src={vehicle.front_image_url} className="w-full h-full object-cover" />
                <img src={vehicle.back_image_url} className="w-full h-full object-cover" />
                <img src={vehicle.side_image_url} className="w-full h-full object-cover" />
                <img src={vehicle.interior_image_url} className="w-full h-full object-cover" />
              </figure>
      
              <div className='p-6'>
                <div className='mb-4'>
                  <p className='text-sm text-amber-500 font-bold uppercase'>{vehicle.model} ({vehicle.year})</p>
                  <h3 className='text-2xl font-bold text-white'>{vehicle.manufacturer}</h3>
                  <p className={`text-xs font-medium ${vehicle.availability ? 'text-green-500' : 'text-red-500'}`}>
                    {vehicle.availability ? 'Available for Booking' : 'Currently Booked'}
                  </p>
                </div>
      
                <div className='flex justify-between text-sm text-gray-400 border-t border-b border-zinc-700 py-4 mb-5'>
                  <span className='flex items-center space-x-2'><Settings className='w-4 h-4 text-amber-500' /><span>{vehicle.transmission}</span></span>
                  <span className='flex items-center space-x-2'><Users className='w-4 h-4 text-amber-500' /><span>{vehicle.seating_capacity} Seats</span></span>
                  <span className='flex items-center space-x-2'><Fuel className='w-4 h-4 text-amber-500' /><span>{vehicle.fuel_type}</span></span>
                </div>
      
                <div className='flex justify-between items-center'>
                  <div className='text-3xl font-extrabold text-amber-500'>${vehicle.rental_rate}<span className='text-sm text-gray-400'> /day</span></div>
                  <button 
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-150
                    ${vehicle.availability ? 'bg-amber-600 text-zinc-900 hover:bg-amber-500 shadow-md' : 'bg-zinc-700 text-gray-500 cursor-not-allowed'}`}
                    disabled={!vehicle.availability}
                  >
                    {vehicle.availability ? 'Request Booking' : 'Not Available'}
                  </button>
                </div>
              </div>
            </div>
          ))        
         }
      </div>
      
      </div>
    </div>    
    <Footer />
    </>
  )
}

export default Vehicles


