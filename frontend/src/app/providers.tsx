"use client";

import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { WithChildren } from "@/types/react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: WithChildren) => {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <QueryProvider>
                {children}
                <Toaster richColors position="top-right" />
            </QueryProvider>
        </ThemeProvider>
    );
};

export default Providers;
