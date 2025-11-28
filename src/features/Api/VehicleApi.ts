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
      query: ({ id, ...body }) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Vehicles']
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vehicles']
    })
  })
});

export const {
  useGetAllVehiclesQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation
} = vehicleApi;
