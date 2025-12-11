import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Make all fields optional to avoid TypeScript errors
export interface User {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  contact_phone?: string;
  role?: string;
  
  // optional extra fields so TypeScript stops throwing errors
  avatar?: string;
  location?: string;
  country?: string;
  language?: string;
  time_zone?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
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
});

export const { setCredentials, clearCredentials, loginSuccess, logout } =
  authSlice.actions;

export default authSlice.reducer;
