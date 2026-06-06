import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials } from "./authTypes";
import { loginUser } from "@/services/authService";

const initialState: AuthState = {
  admin: JSON.parse(localStorage.getItem("admin") || "null"),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const admin = await loginUser(credentials);
      localStorage.setItem("admin", JSON.stringify(admin));
      localStorage.setItem("isAuthenticated", "true");
      return admin;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("isAuthenticated");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
