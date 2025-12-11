import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketMessagesApi = createApi({
  reducerPath: "ticketMessagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/tickets",
  }),
  tagTypes: ["Messages", "Tickets"],
  endpoints: (builder) => ({

    // Fetch messages for a ticket
    getMessages: builder.query({
      query: (ticket_id) => `/${ticket_id}/messages`,
      providesTags: (result, error, ticket_id) => [
        { type: "Messages", id: ticket_id },
      ],
    }),

    // Send a message (admin or user)
    sendMessage: builder.mutation({
      query: ({ ticket_id, message, from_admin }) => ({
        url: `/${ticket_id}/messages`,
        method: "POST",
        body: { message, from_admin },
      }),
      invalidatesTags: (result, error, { ticket_id }) => [
        { type: "Messages", id: ticket_id },
      ],
    }),

    // Resolve a ticket
    resolveTicket: builder.mutation({
      query: (ticket_id) => ({
        url: `/${ticket_id}/resolve`,
        method: "PUT",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useResolveTicketMutation,
} = ticketMessagesApi;
