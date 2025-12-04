import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiDomain } from '../../ApiDomain/ApiDomain'
import type { VehicleSpec } from '../../Types/types';

export const vehicleSpecApi = createApi({
  reducerPath: 'vehicleSpecApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ['VehicleSpecs'],
  endpoints: (builder) => ({
    //fetch all vehicle specs
    getAllVehicleSpecs: builder.query<VehicleSpec[], void>({
      query: () => '/vehiclespec',
      providesTags: ['VehicleSpecs']
    }),
    //get vehicle spec by id
    getVehicleSpecById: builder.query<VehicleSpec, {vehicle_spec_id: number}>({
      query: ({vehicle_spec_id}) => `/vehiclespec/${vehicle_spec_id}`,
      providesTags: ['VehicleSpecs']
    }),
    createVehicleSpec: builder.mutation({
      query: (body) => ({
        url: '/vehiclespec',
        method: 'POST',
        body
      }),
      invalidatesTags: ['VehicleSpecs']
    }),
    updateVehicleSpec: builder.mutation({
      query: ({ vehicle_spec_id, ...body }) => ({
        url: `/vehiclespecs/${vehicle_spec_id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['VehicleSpecs']
    }),
    deleteVehicleSpec: builder.mutation({
      query: ({vehicle_spec_id}) => ({
        url: `/vehiclespecs/${vehicle_spec_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['VehicleSpecs']
    })
  })
}); 