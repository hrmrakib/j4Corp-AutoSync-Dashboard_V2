/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Matches the exact structure of the backend JSON data object
export type TUser = {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  username: string | null;
  profile_pic: string | null;
  profile_pic_url: string | null;
  phone: string | null;
  address: string | null;
  zip_code: string | null;
  dob: string | null;
  is_verified: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
};

export type TTokens = {
  access: string;
  refresh: string;
};

type TAuthState = {
  userToggle: boolean;
  user: TUser | null;
  token: string | null;
  refreshToken?: string | null;
  profileLoading?: boolean;
};

const initialState: TAuthState = {
  userToggle: false,
  user: null,
  token: null,
  refreshToken: null,
  profileLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userTrack: (state) => {
      state.userToggle = !state.userToggle;
    },

    // Payload accepts the user object and either access token string or full tokens object
    setUser: (
      state,
      action: PayloadAction<{
        user: TUser;
        token: string;
        refreshToken?: string;
      }>,
    ) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },

    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload;
    },
  },
});

export const { userTrack, setUser, logout, setProfileLoading } =
  authSlice.actions;
export default authSlice.reducer;
