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

// export interface ActiveBookingResponse {
//    booking_id: number; 
//    user_id: number;
//    vehicle_id: number;
//    return_date : date;
//    booking_status: string
// }


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

export interface ActiveBookingResponse {
  booking_id: number;
  user_id: number;
  vehicle_id: number;  
  booking_date: string;  
  return_date: string;   
  total_amount: number;
  booking_status: "Pending" | "Approved" | "Active" | "Completed" | "Cancelled" | "Rejected";
  created_at: string;
  updated_at: string | null;
}

export interface PendingBookingResponse {
  payment_id: number;
  amount: number;
  payment_status: "Pending"| "Completed"
  payment_date: string;
  payment_method: "Card" | "M Pesa";
  transaction_id: number;
  created_at: string;
  updated_at: string;
  booking_id: number;
  model: string;
}

export interface TotalBookings {
  total_completed: number;
  total_amount: number;
}
export interface Chart {
  data: { month: string; 
          rentals: number }[];
}
[
    {
        "payment_id": 2,
        "amount": 30000,
        "payment_status": "Pending",
        "payment_date": null,
        "payment_method": "Card",
        "transaction_id": 123456789,
        "created_at": "2025-11-27T03:19:00.990Z",
        "updated_at": null,
        "booking_id": 2,
        "model": "Bel Air"
    }
]

export interface UpcomingBooking {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string; 
  booking_status: "Pending" | "Approved" | "Active" | "Completed" | "Cancelled" | "Rejected";
  total_amount: number;
}

export interface UpcomingReturnsResponse {
  count: number;
  upcoming: UpcomingBooking[];
}

export type UpcomingReturnsAPIResponse = UpcomingReturnsResponse[];


export type RecentActivityItem = {
  id: string | number;
  type:
    | "booking_created"
    | "payment_completed"
    | "payment_pending"
    | "payment_failed"
    | "booking_status"
    | "pickup"
    | "dropoff"
    | "upgrade"
    | "inspection"
    | "profile_change"
    | "document_update";

  description: string;
  date: string;
  status?: string;
};


export interface Booking {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: "Pending" | "Approved" | "Active" | "Completed" | "Cancelled" | "Rejected";
}

export interface VehicleInfo {
  vehicle_id: number;
  manufacturer: string;
  model: string;
  year: number;
  transmission: string;
  fuel_type: string;
  seating_capacity: number;
  color: string;
  features: string;
  front_image_url?: string;
  back_image_url?: string;
  side_image_url?: string;
  interior_image_url?: string;
}

export interface PaymentInfo {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: "Pending" | "Completed" | "Failed";
  payment_date: string | null;
  payment_method: string;
  transaction_id: string;
}

export interface BookingDetails {
  booking: Booking;
  vehicle: VehicleInfo;
  payment: PaymentInfo | null;
  return_date: string;
}

export interface ExtendBookingRequest {
  booking_id: number;
  new_return_date: string;
}

export interface CancelBookingRequest {
  booking_id: number;
}

export interface PaymentRequest {
  booking_id: number;
  amount: number;
  payment_method: "Mpesa" | "Card";
}


export interface BookingInfo{
    booking: {
        booking_id: number;
        user_id: number;
        vehicle_id: number;
        booking_date: string;
        return_date: string;
        total_amount: number;
        booking_status: string;
    },
    vehicle: {
        vehicle_id: number;
        manufacturer: string;
        model: string;
        year: number;
        transmission: string;
        fuel_type: string;
        seating_capacity: string; 
        color: string;
        features: string;
        front_image_url: string;
        back_image_url: string;
        side_image_url: string;
        interior_image_url: string;
    },
    payment: string;
}

export interface BookingResponse{
  
        booking_id: number;
        user_id: number;
        vehicle_id: number;
        booking_date: string;
        return_date: string;
        total_amount: number;
        booking_status: "Pending" | "Approved" | "Active" | "Completed" | "Cancelled" | "Rejected";
        created_at: string;
        updated_at: string | null;
    
}