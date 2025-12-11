import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Ticket } from "../../Types/types";

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Tickets", "Messages"],

  endpoints: (builder) => ({

    // Get tickets for one user
    getUserTickets: builder.query<Ticket[], number>({
      query: (user_id) => `/user/${user_id}`,
      providesTags: ["Tickets"],
    }),

    // Admin: get all tickets
    getAllTickets: builder.query<Ticket[], void>({
      query: () => "admin/tickets",
      providesTags: ["Tickets"],
    }),

    // Create ticket
    createTicket: builder.mutation<void, any>({
      query: (data) => ({
        url: "/tickets/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),

    // Get ticket messages
    getTicketMessages: builder.query<any[], number>({
      query: (ticket_id) => `/tickets/${ticket_id}/messages`,
      providesTags: (result, error, ticket_id) => [
        { type: "Messages", id: ticket_id },
      ],
    }),

    // Send message
    sendMessage: builder.mutation<
      void,
      { ticket_id: number; message: string; from_admin: boolean }
    >({
      query: ({ ticket_id, message, from_admin }) => ({
        url: `/tickets/${ticket_id}/messages`,
        method: "POST",
        body: { message, from_admin },
      }),
      invalidatesTags: (result, error, { ticket_id }) => [
        { type: "Messages", id: ticket_id },
      ],
    }),

    //  Resolve ticket 
    resolveTicket: builder.mutation<void, number>({
      query: (ticket_id) => ({
        url: `/tickets/${ticket_id}/resolve`,
        method: "PUT",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetUserTicketsQuery,
  useGetAllTicketsQuery,
  useCreateTicketMutation,
  useGetTicketMessagesQuery,
  useSendMessageMutation,
  useResolveTicketMutation,
} = ticketsApi;
