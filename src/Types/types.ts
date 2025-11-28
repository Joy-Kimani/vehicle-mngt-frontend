export interface VehicleImages  {
  front: string;
  back: string;
  side: string;
  interior: string;
};

// export interface VehicleProduct  {
//   vehicle_id: number;
//   name: string;
//   brand: string;
//   transmission: 'Auto' | 'Manual';
//   fuel_type: 'Petrol' | 'Diesel';
//   seat_number: number;
//   is_available: boolean;
//   price: number; 
//   rating: number;
//   year: number;
//   images: VehicleImages;
// };

export interface VehicleProduct {
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

    images: {
    front_image_url?: string;
    back_image_url?: string;
    side_image_url?: string;
    interior_image_url?: string;
  };
}

export interface ActiveBookingResponse {
   booking_id: number; 
   user_id: number;
   vehicle_id: number;
   return_date : date;
   booking_status: string
}


// type VehicleProduct = {
//   vehicle_id: number;
//   manufacturer: string;
//   model: string;
//   engine_capacity: string;
//   transmission: 'Auto' | 'Manual';
//   fuel_type: 'Petrol' | 'Diesel';
//   seat_number: number;
//   availability: boolean;
//   price: number; 
//   rating: number;
//   year: number;
//   images: {
//     front_image_url?: string;
//     back_image_url?: string;
//     side_image_url?: string;
//     interior_image_url?: string;
//   };
// };