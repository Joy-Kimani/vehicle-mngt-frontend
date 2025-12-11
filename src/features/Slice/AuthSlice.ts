import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface User {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    password:string,
    contact_phone:string,
    role:string
}

//co-relate with the initial state
interface AuthState {
    isAuthenticated: boolean
    token: string | null
    user: User | null
}

//initial state as shown by the browser
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //create reducers
    reducers: {
        // create user credentials
        setCredentials: (state, action: PayloadAction<{ user: User; token: string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        // reset user credentials/logout
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
        logout: (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        },
    },
})

export const { setCredentials, clearCredentials, loginSuccess, logout } = authSlice.actions
export default authSlice.reducer