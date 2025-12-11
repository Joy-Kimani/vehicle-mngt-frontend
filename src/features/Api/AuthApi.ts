import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UserInfo{
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    password:string,
    contact_phone:string,
    role:string
}

interface RequestResetPayload {
  email: string;
}

interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

//define api
export const AuthApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl : 'http://localhost:3000/api'}),
    endpoints: (builder)=>({
        //reg user
        registerUser: builder.mutation<{message:string}, { first_name: string; last_name: string; email: string; contact_phone: string; password: string}>({
            query:(userInfo) => ({
                url: 'auth/register',
                method: 'POST',
                body: userInfo
            }),
        }),
        //user login
        loginUser: builder.mutation<{ token: string; userInfo:UserInfo }, { email: string; password: string }>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        requestPasswordReset: builder.mutation< { message: string }, RequestResetPayload>({
          query: (body) => ({
            url: "/auth/request-reset",
            method: "POST",
            body,
          }),
        }),
        resetPassword: builder.mutation<{ message: string },ResetPasswordPayload>({
        query: (body) => ({
          url: "/auth/reset-password",
          method: "POST",
          body,
        }),
       }),
        
    })
})



