import { useAuthStore } from "./useAuthStore";

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthErrors = () => useAuthStore((state) => state.errors);
export const useAuthPending = () => useAuthStore((state) => state.isPending);
