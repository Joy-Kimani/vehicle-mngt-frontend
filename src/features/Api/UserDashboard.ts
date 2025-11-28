import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiDomain } from '../../ApiDomain/ApiDomain'


export const UserDashboardApi = createApi({
    reducerPath: 'userDashboardApi',
    baseQuery: fetchBaseQuery({baseUrl: apiDomain}),
    tagTypes: ['UserDashboard'],
    endpoints: (builder) => ({
        getAllActiveBookings: builder.query({
            query: () => '/dashboard',
            providesTags: ['UserDashboard']
        }),
    })
})