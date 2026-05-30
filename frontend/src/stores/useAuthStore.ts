import api from "@/lib/axios";
import { AuthActions, AuthState, AuthUser, ResetPasswordPayload } from "@/types/auth";
import { create } from "zustand";

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    isPending: false,
    errors: null,

    fetchUser: async () => {
        set({ loading: true });
        try {
            const { data } = await api.get<AuthUser>("/api/user");
            set({ user: data, isAuthenticated: true, loading: false });
        } catch {
            set({ user: null, isAuthenticated: false, loading: false });
        }
    },

    login: async (payload) => {
        set({ isPending: true, errors: null });
        try {
            await api.get("/sanctum/csrf-cookie");
            await api.post("/login", payload);
            await get().fetchUser();
        } catch (error: any) {
            if (error.response?.status === 422) {
                set({ errors: error.response.data.errors });
            }
            set({ isPending: false });
            throw error;
        }
    },

    register: async (payload) => {
        set({ isPending: true, errors: null });
        try {
            await api.get("/sanctum/csrf-cookie");
            await api.post("/register", payload);
            await get().fetchUser();
        } catch (error: any) {
            if (error.response?.status === 422) {
                set({ errors: error.response.data.errors });
            }
            set({ isPending: false });
            throw error;
        }
    },

    logout: async () => {
        await api.post("/logout");
        set({ user: null, isAuthenticated: false, isPending: false, errors: null });
    },

    forgotPassword: async (email: string) => {
        set({ isPending: true, errors: null });
        try {
            await api.get("/sanctum/csrf-cookie");
            await api.post("/forgot-password", { email });
        } catch (error: any) {
            if (error.response?.status === 422) {
                set({ errors: error.response.data.errors });
            }
            set({ isPending: false });
            throw error;
        } finally {
            set({ isPending: false });
        }
    },

    resetPassword: async (payload: ResetPasswordPayload) => {
        set({ isPending: true, errors: null });
        try {
            await api.get("/sanctum/csrf-cookie");
            await api.post("/reset-password", payload);
        } catch (error: any) {
            if (error.response?.status === 422) {
                set({ errors: error.response.data.errors });
            }
            set({ isPending: false });
            throw error;
        } finally {
            set({ isPending: false });
        }
    },

    clearErrors: () => set({ errors: null }),
}));
