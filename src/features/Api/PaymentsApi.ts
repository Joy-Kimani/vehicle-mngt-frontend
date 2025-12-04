import { baseApi } from "./baseApi";

export const PaymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),

    verifyPayment: builder.mutation({
      query: ({ reference }) => ({
        url: "/payments/verify",
        method: "POST",
        body: { reference },
      }),
      invalidatesTags: ["Payments"],
    }),

    markPaymentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useVerifyPaymentMutation,
  useMarkPaymentStatusMutation
} = PaymentsApi;
