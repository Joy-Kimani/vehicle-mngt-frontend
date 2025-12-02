import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiDomain } from "../../ApiDomain/ApiDomain";
import type { BookingInfo, ExtendBookingRequest, BookingDetails, CancelBookingRequest, BookingResponse } from "../../Types/types";


export interface CreateBookingRequest {
  user_id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export interface CreateBookingResponse {
  message: string;
}

export const BookingsApi = createApi({
    reducerPath: 'BookingApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['BookingDetails'],
    endpoints: (builder) => ({

        // Get Booking and Payment details 
        getAllBookingandPaymentDetails: builder.query<BookingInfo,  number >({
            query: ( booking_id ) => `/bookings/dashboard/${booking_id}`,
            providesTags: ['BookingDetails'],
        }),

        ///extension
        putExtensionDeadline: builder.mutation< ExtendBookingRequest,  { booking_id: number } & Partial<Omit<BookingDetails, 'booking_id'>>>({
            query: ({ booking_id, ...updatedDeadline }) => ({              
                url: `/bookings/dashboard/extend/${booking_id}`,
                method: 'PUT', 
                body: updatedDeadline,
            }),           
            invalidatesTags: ['BookingDetails'],
        }),

        //cancel booking
        cancelBooking: builder.mutation<CancelBookingRequest, {booking_id: number} & Partial<Omit<BookingDetails, 'booking_id'>>>({
            query: ({ booking_id, ...cancelCarBooking}) => ({              
                url: `/bookings/dashboard/cancel/${booking_id}`,
                method: 'PUT', 
                body: cancelCarBooking,
            }),           
            invalidatesTags: ['BookingDetails'],
        }),

        createBooking: builder.mutation<CreateBookingResponse, CreateBookingRequest>({    
            query: (body) => {
                const { } = body;
                return {
                    url: `/bookings`,
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: ["BookingDetails"],
        }),
        getBookingsByUser: builder.query<BookingResponse[], number>({
           query: (user_id) => `/bookings/user/${user_id}`,
           providesTags: ["BookingDetails"]
         }),
    }),
});



