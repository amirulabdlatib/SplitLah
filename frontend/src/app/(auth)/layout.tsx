"use client";

import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { useIsAuthenticated } from "@/stores/auth.selectors";
import { WithChildren } from "@/types/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function AuthLayout({ children }: WithChildren) {
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
    );
}
