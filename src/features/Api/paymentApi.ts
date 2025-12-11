import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiDomain } from "../../ApiDomain/ApiDomain";
import type { PaymentsResponse } from "../../Types/types";

export interface InitializePaymentBody {
  email: string;
  amount: number;
  booking_id: number;
  method?: string;
}

export interface UpdatePaymentBody {
  payment_id: number;
  payment_status?: PaymentsResponse["payment_status"];
  amount?: number;
  payment_method?: string;
}

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    initializePayment: builder.mutation<any, InitializePaymentBody>({
      query: (body) => ({
        url: "payment/initialize",
        method: "POST",
        body,
      }),
    }),

    verifyPayment: builder.query<any, string>({
      query: (reference) => `payment/verify?reference=${reference}`,
    }),

    getUserPaymentsById: builder.query<PaymentsResponse[], number>({
      query: (user_id) => `payment/user/${user_id}`,
      providesTags: ["Payments"],
    }),

    getPaymentStatus: builder.query<{ payment_status: string; count: number }[], void>({
      query: () => "payment/status/count",
    }),

    getAllPayments: builder.query<PaymentsResponse[], void>({
      query: () => "payment",
      providesTags: ["Payments"],
    }),

    updatePayment: builder.mutation<PaymentsResponse, UpdatePaymentBody>({
      query: ({ payment_id, ...body }) => ({
        url: `payment/${payment_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),

    deletePayment: builder.mutation<{ success: boolean; payment_id: number }, number>({
      query: (payment_id) => ({
        url: `payment/${payment_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useInitializePaymentMutation,
  useVerifyPaymentQuery,
  useGetPaymentStatusQuery,
  useGetAllPaymentsQuery,
  useGetUserPaymentsByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApi;
