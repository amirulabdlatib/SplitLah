"use client";

import { Button } from "@/components/ui/button";
import { useIsAuthenticated } from "@/stores/auth.selectors";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, Wallet, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Use cases", href: "#use-cases" },
];

export default function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
    const isAuthenticated = useIsAuthenticated();

    const href = isAuthenticated ? "/dashboard" : "/login";

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div whileHover={{ rotate: -10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <Wallet className="w-4 h-4 text-primary-foreground" />
                            </motion.div>
                            <span className="font-bold text-lg text-foreground tracking-tight">
                                Split<span className="text-primary">Lah</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <motion.div key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                                    <Link href={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-all duration-200">
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-2">
                            {/* Theme toggle */}
                            {mounted && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleTheme}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                                    aria-label="Toggle theme"
                                >
                                    {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </motion.button>
                            )}

                            {/* CTA */}
                            <div className="hidden md:block">
                                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-4">
                                    <Link href={href}>Create a bill</Link>
                                </Button>
                            </div>

                            {/* Mobile hamburger */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileOpen((prev) => !prev)}
                                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
                        >
                            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="pt-2 pb-1">
                                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg">
                                        <Link href={href} onClick={() => setMobileOpen(false)}>
                                            Create a bill
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <div className="h-16" />
        </>
    );
}
