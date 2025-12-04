import { baseApi } from "./baseApi";

export const TicketsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/tickets",
      providesTags: ["Tickets"],
    }),

    getTicketMessages: builder.query({
      query: (id) => `/tickets/${id}/messages`,
      providesTags: ["Tickets"],
    }),

    replyTicket: builder.mutation({
      query: ({ id, message }) => ({
        url: `/tickets/${id}/reply`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketMessagesQuery,
  useReplyTicketMutation,
} = TicketsApi;
