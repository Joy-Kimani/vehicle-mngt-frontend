import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Customer {
 user_id: number,
 first_name: string,
 last_name: string,
 email: string,
 password:string,
 contact_phone:string,
 role:string,
 is_active: boolean
}


//define api
export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl : 'http://localhost:3000/api'}),
    tagTypes: ["Users"],
    endpoints: (builder)=>({ 
        getAllCustomers: builder.query<Customer[], void>({
            query: () => '/users',
            providesTags: ["Users"],
        }),
    updateUserRole: builder.mutation({
      query: ({ user_id, role }) => ({
        url: `/admin/users/${user_id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),

    toggleUserStatus: builder.mutation({
      query: (user_id) => ({
        url: `/users/${user_id}/status`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (user_id) => ({
        url: `/users/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
