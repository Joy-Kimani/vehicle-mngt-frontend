import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiDomain } from '../../ApiDomain/ApiDomain'
import type { AdminUser, PaymentStatusSummary } from '../../Types/types';

export const AdminDashboardApi = createApi({
  reducerPath: 'adminDashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['AdminDashboard'],
  endpoints: (builder) => ({
    getAllAnalystics: builder.query({
      query: () => `/admin/dashboard/stats`,
      providesTags: ['AdminDashboard'],
    }),
    getAllUsers: builder.query<AdminUser[], void>({
      query: () => `/users`,
      providesTags: ['AdminDashboard'],
    }),
    getPendingApprovals: builder.query({
      query: () => `/admin/dashboard/pending-approvals`,
      providesTags: ['AdminDashboard'],
    }),
    getTotalVehicles: builder.query({
      query: () => `/vehicles`,
      providesTags: ['AdminDashboard'],
    }),
    getPaymentStatusSummary: builder.query<PaymentStatusSummary, void >({
      query: () => `payment/status/count`,
      providesTags: ['AdminDashboard'],
    }),
  
  }),
});     