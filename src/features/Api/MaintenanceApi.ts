import { baseApi } from "./baseApi";

export const MaintenanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaintenanceRequests: builder.query({
      query: () => "/maintenance",
      providesTags: ["Maintenance"],
    }),

    createMaintenance: builder.mutation({
      query: (data) => ({
        url: "/maintenance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Maintenance"],
    }),

    updateMaintenanceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/maintenance/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Maintenance"],
    }),
  }),
});

export const {
  useGetMaintenanceRequestsQuery,
  useCreateMaintenanceMutation,
  useUpdateMaintenanceStatusMutation
} = MaintenanceApi;
