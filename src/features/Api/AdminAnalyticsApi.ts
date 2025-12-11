import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAnalyticsApi = createApi({
  reducerPath: "adminAnalyticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().authSlice.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getKpis: builder.query<any, void>({
      query: () => "/admin/analytics/kpis",
    }),
    getRevenueReport: builder.query<any[], void>({
      query: () => "/admin/analytics/revenue",
    }),
    getRecentBookings: builder.query<any[], void>({
      query: () => "/admin/bookings?limit=5",
    }),
    getUsers: builder.query<any[], void>({
      query: () => "/admin/users",
    }),
    getFleetOccupancy: builder.query<any[], void>({
      query: () => "/admin/analytics/occupancy",
    }),
    getMaintenance: builder.query<any[], void>({
      query: () => "/admin/maintenance",
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetRevenueReportQuery,
  useGetRecentBookingsQuery,
  useGetUsersQuery,
  useGetFleetOccupancyQuery,
  useGetMaintenanceQuery,
} = adminAnalyticsApi;
