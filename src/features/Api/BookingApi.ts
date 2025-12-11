// import { baseApi } from "./baseApi";

// export const BookingsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getBookings: builder.query({
//       query: () => "/bookings",
//       providesTags: ["Bookings"],
//     }),

//     approveBooking: builder.mutation({
//       query: (id) => ({
//         url: `/bookings/${id}/approve`,
//         method: "PUT",
//       }),
//       invalidatesTags: ["Bookings"],
//     }),

//     cancelBooking: builder.mutation({
//       query: ({booking_id}) => ({
//         url: `/bookings/dashboard/cancel/${booking_id}`,
//         method: "PUT",
//       }),
//       invalidatesTags: ["Bookings"],
//     }),

//     extendBooking:builder.mutation({
//       query: ({booking_id, new_return_date}) => ({
//         url: `/bookings/dashboard/extend/${booking_id}`,
//         method: "PUT",
//         body: { new_return_date },
//       }),
//       invalidatesTags: ["Bookings"],
//     }),

//     //more CRUD ops
//     getBookingById: builder.query({
//       query: (booking_id) => `/bookings/${booking_id}`,
//       providesTags: ["Bookings"],
//     }),
//     createBooking: builder.mutation({
//       query: (newBooking) => ({
//         url: `/bookings`,
//         method: "POST",
//         body: newBooking,
//       }),
//       invalidatesTags: ["Bookings"],
//     }),
//     updateBooking: builder.mutation({
//       query: ({ booking_id, ...updatedBooking }) => ({
//         url: `/bookings/${booking_id}`,
//         method: "PUT",
//         body: updatedBooking,
//       }),
//       invalidatesTags: ["Bookings"],
//     }),
//     deleteBooking: builder.mutation({
//       query: (booking_id) => ({
//         url: `/bookings/${booking_id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Bookings"],
//     }),
//   }),
// });

