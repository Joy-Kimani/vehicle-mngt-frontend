import React, { useMemo, useState, useEffect } from "react";
import {Settings,Users,Fuel,ChevronDown,Search,Filter,Calendar,Clock} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"; 
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { vehicleApi } from "../features/Api/VehicleApi";
import AnimatedModal from "../components/AnimatedModal";
import { BookingsApi } from "../features/Api/BookingsApi";
import type { RootState } from "../features/Api/slice";

type VehicleProduct = {
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
};

const Vehicles: React.FC = () => {
  // which vehicle modal is open 
  const [openVehicleId, setOpenVehicleId] = useState<number | null>(null);

  // fetch vehicles
  const {
    data: vehiclesResponse,
    error: vehiclesError,
    isLoading: vehiclesLoading,
  } = vehicleApi.useGetAllVehiclesQuery();

  const allCarProducts: VehicleProduct[] = vehiclesResponse ?? [];

  // filters
  const [searchCar, setSearchCar] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState("All");
  const [sortBy, setSortBy] = useState("year");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const categories = ["All",...Array.from(new Set(allCarProducts.map((v) => v.manufacturer).filter(Boolean) as string[]))];

  // filter + sort vehicles
  const filterCars = useMemo(() => {
    return allCarProducts
      .filter((vehicle) => {
        const matchesSearch =
          vehicle.manufacturer.toLowerCase().includes(searchCar.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchCar.toLowerCase()) ||
          String(vehicle.year).includes(searchCar.toLowerCase());

        const matchesCategory =
          selectCategory === "All" || vehicle.manufacturer === selectCategory;

        const matchesAvailability =
          !showAvailableOnly || vehicle.availability === true;

        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === "year") return b.year - a.year;
        if (sortBy === "price") return a.rental_rate - b.rental_rate;
        if (sortBy === "brand") return a.model.localeCompare(b.model);
        if (sortBy === "transmission")
          return a.transmission.localeCompare(b.transmission);
        if (sortBy === "fuel_type")
          return a.fuel_type.localeCompare(b.fuel_type);
        return 0;
      });
  }, [searchCar, selectCategory, sortBy, showAvailableOnly, allCarProducts]);

  const [selectedPickupDate, setSelectedPickupDate] = useState<Date | null>(null);
  const [selectedDropoffDate, setSelectedDropoffDate] = useState<Date | null>(null);
  const [selectedPickupTime, setSelectedPickupTime] = useState<Date | null>(null);
  
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(""); 
  const [dropoffDate, setDropoffDate] = useState(""); 
  const [pickupTime, setPickupTime] = useState(""); 

  // booking mutation
  const [createBooking,{ data: bookingResponse, error: bookingError, isLoading: bookingLoading },] = BookingsApi.useCreateBookingMutation();

  //console.log("Booking Response:", bookingResponse);

  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
    const user_id = user?.user_id;

  // toast state 
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPickupDate) {
      setPickupDate(selectedPickupDate.toISOString().split('T')[0]);
    } else {
      setPickupDate("");
    }
  }, [selectedPickupDate]);

  useEffect(() => {
    if (selectedDropoffDate) {
      setDropoffDate(selectedDropoffDate.toISOString().split('T')[0]);
    } else {
      setDropoffDate("");
    }
  }, [selectedDropoffDate]);
  
  useEffect(() => {
    if (selectedPickupTime) {
      const hours = selectedPickupTime.getHours().toString().padStart(2, '0');
      const minutes = selectedPickupTime.getMinutes().toString().padStart(2, '0');
      setPickupTime(`${hours}:${minutes}`);
    } else {
      setPickupTime("");
    }
  }, [selectedPickupTime]);


  // clear toast after a short while
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  const handleSubmit = async (vehicle_id: number) => {
    if (!user_id) {
      setToastMessage("Please log in.");
      return;
    }

    if (!pickupDate || !dropoffDate || !pickupTime) {
      setToastMessage("Please select both pickup date, drop-off date, and time.");
      return;
    }

    const payload = {
      user_id: user_id,
      vehicle_id: vehicle_id,
      booking_date: pickupDate, 
      return_date: dropoffDate,
      pickup_time: pickupTime, 
      total_amount: 0, 
      booking_status: "Pending",
    };

    try {
      const res = await createBooking(payload).unwrap();
      // success 
      setToastMessage(
        res?.message ?? "Booking created. Redirecting to bookings page..."
      );

      // close modal
      setOpenVehicleId(null);
      setTimeout(() => {
        navigate("/dashboard/bookings"); 
      }, 1000);
    } catch (err: any) {
      const message =
        (err?.data && (err.data as any).message) ||
        err?.message ||
        "Failed to create booking";
      setToastMessage(message);
    }
  };

return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-900 font-serif text-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* header */}
          <header className="text-center mb-12 pt-8">
            <p className="text-xl text-amber-500 uppercase tracking-widest mb-2 font-sans font-semibold">
              Curated Access
            </p>
            <h1 className="text-lg sm:text-3xl font-bold text-white mb-3">
              The Exhibition Inventory
            </h1>
            <p className="text-md text-gray-400 max-w-3xl mx-auto">
              Browse our hand-selected vehicles available for film, display, and
              historical research projects.
            </p>
          </header>

          {/* filter controls */}
          <div className="bg-zinc-800 p-6 rounded-xl shadow-inner mb-10 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4">
            {/* search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchCar}
                onChange={(e) => setSearchCar(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-zinc-700 text-gray-100 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* category */}
            <div className="relative w-full md:w-auto">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
              <select
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-2 bg-zinc-700 text-gray-100 border rounded-lg focus:ring-2 focus:ring-amber-500 appearance-none"
              >
                <option value="All">All Manufacturers</option>
                {categories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            </div>

            {/* sort */}
            <div className="relative w-full md:w-auto">
              <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-2 bg-zinc-700 text-gray-100 border rounded-lg focus:ring-2 focus:ring-amber-500 appearance-none"
              >
                <option value="year">Newest Year</option>
                <option value="price">Rate: Low to High</option>
                <option value="brand">Manufacturer Name</option>
                <option value="transmission">Transmission</option>
                <option value="fuel_type">Fuel Type</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            </div>

            {/* availability */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={() => setShowAvailableOnly(!showAvailableOnly)}
                className="w-4 h-4 text-amber-600 bg-zinc-700"
              />
              <span className="text-sm text-gray-300">Available Only</span>
            </label>
          </div>

          {/* Vehicle Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {vehiclesLoading ? (
                <p>Loading...</p>
              ) : vehiclesError ? (
                <p>Error loading vehicles.</p>
              ) : filterCars.length === 0 ? (
                <p>No vehicles found.</p>
              ) : (
                filterCars.map((vehicle) => (
                  <div
                    key={vehicle.vehicle_id}
                    className={`bg-zinc-800 rounded-xl shadow-2xl overflow-hidden border-2 
                    ${vehicle.availability ? "border-amber-600/50" : "border-zinc-700 opacity-50"}`}
                  >
                    {/* Image Gallery */}
                    <figure className="hover-gallery h-48 w-full overflow-hidden">
                      <img src={vehicle.front_image_url} className="w-full h-full object-cover" />
                      <img src={vehicle.back_image_url} className="w-full h-full object-cover" />
                      <img src={vehicle.side_image_url} className="w-full h-full object-cover" />
                      <img src={vehicle.interior_image_url} className="w-full h-full object-cover" />
                    </figure>
            
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-sm text-amber-500 font-bold uppercase">
                          {vehicle.model} ({vehicle.year})
                        </p>
                        <h3 className="text-2xl font-bold text-white">
                          {vehicle.manufacturer}
                        </h3>
                        <p
                          className={`text-xs font-medium ${
                            vehicle.availability ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {vehicle.availability ? "Available" : "Currently Booked"}
                        </p>
                      </div>
            
                      {/* Specs */}
                      <div className="flex justify-between text-sm text-gray-400 border-t border-b border-zinc-700 py-4 mb-5">
                        <span className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-amber-500" />
                          <span>{vehicle.transmission}</span>
                        </span>
            
                        <span className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-amber-500" />
                          <span>{vehicle.seating_capacity} Seats</span>
                        </span>
            
                        <span className="flex items-center space-x-2">
                          <Fuel className="w-4 h-4 text-amber-500" />
                          <span>{vehicle.fuel_type}</span>
                        </span>
                      </div>
            
                      {/* Price + Button */}
                      <div className="flex justify-between items-center">
                        <div className="text-3xl font-extrabold text-amber-500">
                          Ksh {vehicle.rental_rate}
                          <span className="text-sm text-gray-400"> /day</span>
                        </div>
            
                        {isAuthenticated ? (
                          <button
                            className={`py-2 px-4 rounded-lg font-semibold transition duration-150
                              ${
                                vehicle.availability
                                  ? "bg-amber-600 text-zinc-900 hover:bg-amber-500"
                                  : "bg-zinc-700 text-gray-500 cursor-not-allowed"
                              }`}
                            disabled={!vehicle.availability || bookingLoading}
                            onClick={() => {
                              setOpenVehicleId(vehicle.vehicle_id);
                              setPickupLocation("");
                              setSelectedPickupDate(null);
                              setSelectedDropoffDate(null);
                              setSelectedPickupTime(null);
                              setPickupDate("");
                              setDropoffDate("");
                              setPickupTime("");
                            }}
                          >
                            Request Booking
                          </button>
                        ) : (
                          <button
                            className="py-2 px-4 rounded-lg font-semibold bg-zinc-700 text-gray-500 cursor-not-allowed"
                            disabled
                          >
                            Log in to Book
                          </button>
                        )}
                      </div>
                    </div>

                {/* MODAL — correctly outside the card */}
                <AnimatedModal
                  isOpen={openVehicleId === vehicle.vehicle_id}
                  onClose={() => setOpenVehicleId(null)}
                  title="Request Booking"
                >
                    
                  
                    {/* Images inside modal */}
                    <figure className="hover-gallery h-48 w-full overflow-hidden mb-4 rounded-xl">
                      <img
                        src={vehicle.front_image_url}
                        className="w-full h-full object-cover"
                      />
                      <img
                        src={vehicle.back_image_url}
                        className="w-full h-full object-cover"
                      />
                      <img
                        src={vehicle.side_image_url}
                        className="w-full h-full object-cover"
                      />
                      <img
                        src={vehicle.interior_image_url}
                        className="w-full h-full object-cover"
                      />
                    </figure>

                    {/* Booking Form */}
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(vehicle.vehicle_id);
                      }}
                    >
                      {/* Location */}
                      <div>
                        <label className="text-sm font-medium text-gray-800">Pick-up Location</label>
                        <input
                          type="text"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          placeholder="Headquarters"
                          className="w-full p-3 border rounded-xl text-gray-900 bg-gray-100 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      {/* Pickup Date + Time */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* Pick-up Date */}
                        <div className="col-span-2">
                          <label className="text-sm font-medium text-gray-800">Pick-up Date</label>
                          <div className="flex items-center gap-2 p-3 border rounded-xl text-gray-900 bg-gray-100 relative">
                            <Calendar size={18} className="text-amber-600" />
                           
                            <DatePicker
                              selected={selectedPickupDate}
                              onChange={(date: Date | null) => setSelectedPickupDate(date)}
                              customInput={<input type="text" className="bg-transparent w-full focus:outline-none" />} 
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select Date"
                              className="w-full bg-transparent"
                            />
                          </div>
                        </div>

                        {/* Pick-up Time */}
                        <div>
                          <label className="text-sm font-medium text-gray-800">Time</label>
                          <div className="flex items-center gap-2 p-3 border rounded-xl text-gray-900 bg-gray-100">
                            <Clock size={18} className="text-amber-600" />
                            {/* Time Picker */}
                            <DatePicker
                              selected={selectedPickupTime}
                              onChange={(date: Date | null) => setSelectedPickupTime(date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              dateFormat="h:mm aa" 
                              timeCaption="Time"
                              placeholderText="Select Time"
                              customInput={<input type="text" className="bg-transparent w-full focus:outline-none" />} 
                              className="w-full bg-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dropoff Date */}
                      <div>
                        <label className="text-sm font-medium text-gray-800">Drop-off Date</label>
                        <div className="flex items-center gap-2 p-3 border rounded-xl text-gray-900 bg-gray-100 relative">
                          <Calendar size={18} className="text-amber-600" />
                           
                          <DatePicker
                            selected={selectedDropoffDate}
                            onChange={(date: Date | null) => setSelectedDropoffDate(date)}
                            customInput={<input type="text" className="bg-transparent w-full focus:outline-none" />}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date"
                            className="w-full bg-transparent"
                            minDate={selectedPickupDate || new Date()}                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="mt-4 w-full p-3 bg-amber-600 text-zinc-900 font-semibold rounded-xl hover:bg-amber-500 transition disabled:opacity-60"
                      >
                        {bookingLoading ? "Booking..." : "Confirm Booking"}
                      </button>
                    </form>
                  </AnimatedModal>
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>

      <Footer />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default Vehicles;



