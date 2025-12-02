import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiDomain } from "../../ApiDomain/ApiDomain";
import type { PaymentsResponse } from "../../Types/types";


export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    initializePayment: builder.mutation({
      query: (body) => ({
        url: "/payment/initialize",
        method: "POST",
        body
      })
    }),
    
    getPayments: builder.query<PaymentsResponse[], { payment_id?: number }>({
      query: ({ payment_id } = {}) => ({
        url: payment_id ? `/payment/${payment_id}` : `/payment`,
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),
    
    processPayment: builder.mutation({
      query: (body) => ({
        url: "/payment/webhook",
        method: "POST",
        body
      }),
      invalidatesTags: ["Payments"]
    })
  })
});

