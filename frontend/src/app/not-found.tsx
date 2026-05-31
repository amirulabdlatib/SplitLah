"use client";

import { Button } from "@/components/ui/button";
import { useIsAuthenticated } from "@/stores/auth.selectors";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative overflow-hidden">
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                        linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 flex flex-col items-center text-center max-w-md">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8"
                >
                    <Wallet className="w-8 h-8 text-primary-foreground" />
                </motion.div>

                {/* 404 */}
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="text-8xl font-black text-foreground/10 dark:text-foreground/5 leading-none mb-2 select-none">
                    404
                </motion.p>

                {/* Title */}
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-2xl font-bold text-foreground tracking-tight mb-3">
                    Page not found
                </motion.h1>

                {/* Desc */}
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Looks like this bill link expired or the page doesn&apos;t exist. Double check the URL or head back home.
                </motion.p>

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button asChild variant="outline" className="flex-1 h-11 rounded-xl border-border font-medium gap-2 hover:bg-muted transition-all duration-200">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4" />
                            Back to home
                        </Link>
                    </Button>
                    {isAuthenticated && (
                        <Button asChild className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    )}
                </motion.div>

                {/* Bottom label */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-xs text-muted-foreground mt-8">
                    SplitLah — Split bills, not friendships.
                </motion.p>
            </motion.div>
        </div>
    );
}
