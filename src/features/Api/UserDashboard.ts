import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiDomain } from '../../ApiDomain/ApiDomain'
import type { ActiveBookingResponse, PendingBookingResponse, RecentActivityItem, TotalBookings, UpcomingReturnsAPIResponse, UpcomingReturnsResponse } from '../../Types/types'


export const UserDashboardApi = createApi({
  reducerPath: 'userDashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['UserDashboard'],
  endpoints: (builder) => ({
    
    getAllActiveBookings: builder.query<ActiveBookingResponse[], { user_id: number }>({
      query: ({ user_id }) => `/dashboard/active/${user_id}`,
      providesTags: ['UserDashboard'],
    }),

    getAllPendingBookings: builder.query<PendingBookingResponse[], { user_id: number }>({
      query: ({ user_id }) => `/dashboard/pending/${user_id}`,
      providesTags: ['UserDashboard'],
    }),

    getTotalBookings: builder.query<TotalBookings, { user_id: number }>({
      query: ({ user_id }) => `/dashboard/total/${user_id}`,
      providesTags: ['UserDashboard'],
    }),

    getUpcomingReturns: builder.query<UpcomingReturnsResponse[] , {user_id: number}> ({
      query: ({user_id}) => `dashboard/returns/${user_id}`,
      providesTags: ['UserDashboard']
    }),

    getRecentActivity: builder.query<RecentActivityItem[], { user_id: number }>({
      query: ({ user_id }) => `/dashboard/recent-activity/${user_id}`,
    }),
    getBookingDetails: builder.query({
      query: ({ booking_id }) => `/bookings/details/${booking_id}`,
    })
  }),
});
