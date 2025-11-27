import React, { useMemo, useState } from 'react';
import { Settings, Users, Fuel, ChevronDown, Search, Filter } from 'lucide-react'; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


type VehicleProduct = {
  vehicle_id: number;
  name: string;
  brand: string;
  transmission: 'Auto' | 'Manual';
  fuel_type: 'Petrol' | 'Diesel';
  seat_number: number;
  is_available: boolean;
  price: number; 
  rating: number;
  year: number;
  vehicle_img_url: string;
}

const allCarProducts:VehicleProduct[] = [
  { vehicle_id: 1, name: '300 SL Gullwing', brand: 'Mercedes-Benz', transmission: 'Manual', fuel_type: 'Petrol', seat_number: 2, is_available: true, price: 3500, rating: 5.0, year: 1957, vehicle_img_url: '' },
  { vehicle_id: 2, name: 'E-Type Roadster', brand: 'Jaguar', transmission: 'Manual', fuel_type: 'Petrol', seat_number: 2, is_available: true, price: 2800, rating: 4.8, year: 1965, vehicle_img_url: '' },
  { vehicle_id: 3, name: 'DB5', brand: 'Aston Martin', transmission: 'Auto', fuel_type: 'Petrol', seat_number: 4, is_available: false, price: 4200, rating: 4.9, year: 1964, vehicle_img_url: '' },
  { vehicle_id: 4, name: 'Model B', brand: 'Ford', transmission: 'Manual', fuel_type: 'Petrol', seat_number: 4, is_available: true, price: 1500, rating: 4.0, year: 1932, vehicle_img_url: '' },
  { vehicle_id: 5, name: '911 Targa', brand: 'Porsche', transmission: 'Manual', fuel_type: 'Petrol', seat_number: 4, is_available: true, price: 1800, rating: 4.7, year: 1973, vehicle_img_url: '' },
  { vehicle_id: 6, name: 'Firebird Formula', brand: 'Pontiac', transmission: 'Auto', fuel_type: 'Petrol', seat_number: 4, is_available: false, price: 1200, rating: 4.3, year: 1970, vehicle_img_url: '' },
];

const Vehicles:React.FC = () => {

// Filter states
const [searchCar, setSearchCar] = useState<string>("");
const [selectCategory, setSelectCategory] = useState("All");
const [sortBy, setSortBy] = useState("year"); 
const [showAvailableOnly, setShowAvailableOnly] = useState(false); 

const categories = ["All", ...Array.from(new Set(allCarProducts.map((vehicle) => vehicle.brand).filter(Boolean)))];

// sorting logic
const filterCars = useMemo(() => {
  
  return allCarProducts
    .filter((vehicle) => {
      // search filter
      const matchesSearch =
        vehicle.brand.toLowerCase().includes(searchCar.toLowerCase()) ||
        vehicle.name.toLowerCase().includes(searchCar.toLowerCase()) ||
        String(vehicle.year).includes(searchCar.toLowerCase());

      // category filter 
      const matchesCategory =
        selectCategory === "All" || vehicle.brand === selectCategory;

      // availability filter
      const matchesAvailability =
        !showAvailableOnly || vehicle.is_available; 

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    
    // sort
    .sort((a, b) => {
      if (sortBy === "year") {
        return b.year - a.year; 
      } else if (sortBy === "price") {
        return a.price - b.price; 
      } else if (sortBy === "transmission"){
        return a.transmission.localeCompare(b.transmission)
      } else if (sortBy === "fuel_type"){
        return a.fuel_type.localeCompare(b.fuel_type)
      } else if (sortBy === "brand"){
        return a.brand.localeCompare(b.brand)
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
            {filterCars.length > 0 ? (
                filterCars.map((vehicle) => (
                    <div 
                        key={vehicle.vehicle_id} 
                        className={`bg-zinc-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]
                        ${vehicle.is_available ? 'border-2 border-amber-600/50' : 'opacity-50 cursor-not-allowed border-2 border-zinc-700'} 
                        `}
                    >
                        {/* image */}
                        <div className='h-48 w-full overflow-hidden'>
                            <img 
                                src={vehicle.vehicle_img_url} 
                                alt={vehicle.name} 
                                className='w-full h-full object-cover transform transition duration-500 hover:scale-110'                                
                            />
                        </div>

                        <div className='p-6'>
                            {/* Info*/}
                            <div className='mb-4'>
                                <p className='text-sm text-amber-500 font-bold uppercase'>{vehicle.brand} ({vehicle.year})</p>
                                <h3 className='text-2xl font-bold text-white mb-0.5'>{vehicle.name}</h3>
                                <p className={`text-xs font-medium ${vehicle.is_available ? 'text-green-500' : 'text-red-500'}`}>
                                    {vehicle.is_available ? 'Available for Booking' : 'Currently Booked'}
                                </p>
                            </div>

                            {/* specs*/}
                            <div className='flex justify-between text-sm text-gray-400 border-t border-b border-zinc-700 py-4 mb-5'>
                                <span className='flex items-center space-x-2'>
                                    <Settings className='w-4 h-4 text-amber-500' />
                                    <span>{vehicle.transmission}</span>
                                </span>
                                <span className='flex items-center space-x-2'>
                                    <Users className='w-4 h-4 text-amber-500' />
                                    <span>{vehicle.seat_number} Seats</span>
                                </span>
                                <span className='flex items-center space-x-2'>
                                    <Fuel className='w-4 h-4 text-amber-500' />
                                    <span>{vehicle.fuel_type}</span>
                                </span>
                            </div>

                            {/* price and button */}
                            <div className='flex justify-between items-center'>
                                <div className='text-3xl font-extrabold text-amber-500'>
                                    ${vehicle.price}
                                    <span className='text-sm font-normal text-gray-400'> /day</span>
                                </div>
                                <button className={`py-2 px-4 rounded-lg font-semibold transition duration-150
                                ${vehicle.is_available ? 'bg-amber-600 text-zinc-900 hover:bg-amber-500 shadow-md' : 'bg-zinc-700 text-gray-500 cursor-not-allowed'}`}
                                    disabled={!vehicle.is_available}
                                >
                                    {vehicle.is_available ? 'Request Booking' : 'Not Available'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // Message when no cars are found
                <div className="col-span-full text-center py-16 text-gray-500 text-2xl border-2 border-dashed border-zinc-700 rounded-xl">
                    <p className="mb-2">No historical vehicles match your current criteria.</p>
                    <p className="text-lg">Please try adjusting your search or filters.</p>
                </div>
            )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Vehicles
