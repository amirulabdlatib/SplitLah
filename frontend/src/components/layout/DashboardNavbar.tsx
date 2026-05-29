"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { LogOut, Moon, Plus, Settings, Sun, Wallet } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardNavbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
    }, []);

    const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

    return (
        <motion.header initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg text-foreground tracking-tight">
                            Split<span className="text-primary">Lah</span>
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Create bill CTA */}
                        <Button asChild size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-4 gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                            <Link href="/dashboard/create">
                                <Plus className="w-4 h-4" />
                                New bill
                            </Link>
                        </Button>

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

                        {/* User dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted transition-all duration-200 outline-none">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">AA</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">Ahmad Amirul</span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52 rounded-xl">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-sm font-semibold text-foreground">Ahmad Amirul</p>
                                        <p className="text-xs text-muted-foreground truncate">ahmad@example.com</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2">
                                    <Link href="/dashboard/settings">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="rounded-lg cursor-pointer gap-2 text-destructive focus:text-destructive">
                                    <LogOut className="w-4 h-4" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
