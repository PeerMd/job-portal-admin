import { RootState } from "@/app/store";

export const selectAdmin = (state: RootState) => state.auth.admin;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
