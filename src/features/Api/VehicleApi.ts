import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import type { VehicleProduct } from '../../Types/types';
import { apiDomain } from '../../ApiDomain/ApiDomain'
import type { VehicleProduct } from '../../Types/types';


export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['Vehicles'],
  endpoints: (builder) => ({
    //fetch all vehicles
    getAllVehicles: builder.query<VehicleProduct[], void>({
      query: () => '/vehicles',
      providesTags: ['Vehicles']
    }),
    //gey by id
    getVehicleById: builder.query<VehicleProduct[],{id: number}>({
      query: (vehicle_id) => `/vehicles/${vehicle_id}`,
      providesTags: ['Vehicles']
    }),
    createVehicle: builder.mutation({
      query: (body) => ({
        url: '/vehicles',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Vehicles']
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicle_id, ...body }) => ({
        url: `/vehicles/${vehicle_id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Vehicles']
    }),

    deleteVehicle: builder.mutation({
      query: (vehicle_id) => ({
        url: `/vehicles/${vehicle_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vehicles']
    }),
    createVehicleWithSpec: builder.mutation({    
     query: (payload) => ({
       url: "/vehicles/specs",
       method: "POST",
       body: payload
     }),
     invalidatesTags: ["Vehicles"]
    }),
  })
});
