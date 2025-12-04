import { baseApi } from "./baseApi";

export const SettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { 
  useGetSettingsQuery, 
  useUpdateSettingsMutation 
} = SettingsApi;
