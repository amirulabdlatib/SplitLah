"use client";

import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { useAuthLoading } from "@/stores/auth.selectors";
import { useAuthStore } from "@/stores/useAuthStore";
import { WithChildren } from "@/types/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Loading from "./loading";

function AuthInitializer({ children }: WithChildren) {
    const fetchUser = useAuthStore((state) => state.fetchUser);
    const loading = useAuthLoading();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading) {
        return <Loading />;
    }

    return <>{children}</>;
}

const Providers = ({ children }: WithChildren) => {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <QueryProvider>
                <AuthInitializer>{children}</AuthInitializer>
            </QueryProvider>
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
};

export default Providers;
