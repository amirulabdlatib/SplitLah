"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { CheckCircle, Clock, Copy, Plus, Receipt, TrendingUp, Users, Wallet } from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Total bills", value: "12", icon: Receipt, color: "bg-primary/10 text-primary" },
    { label: "Total collected", value: "RM 1,240", icon: TrendingUp, color: "bg-accent text-accent-foreground" },
    { label: "Pending amount", value: "RM 360", icon: Clock, color: "bg-destructive/10 text-destructive" },
    { label: "Active bills", value: "4", icon: Wallet, color: "bg-primary/10 text-primary" },
];

const bills = [
    { id: "1", title: "Dinner @ Pelita", total: 120, collected: 60, participants: 4, paid: 2, dueDate: "1 Jun 2025", status: "active" },
    { id: "2", title: "Langkawi Trip Deposit", total: 800, collected: 800, participants: 5, paid: 5, dueDate: "15 May 2025", status: "completed" },
    { id: "3", title: "Monthly Unifi Bill", total: 180, collected: 90, participants: 3, paid: 1, dueDate: "30 May 2025", status: "active" },
    { id: "4", title: "Futsal Court — May", total: 60, collected: 0, participants: 6, paid: 0, dueDate: "20 May 2025", status: "overdue" },
];

const statusConfig = {
    active: { label: "Active", class: "bg-primary/10 text-primary border-primary/20" },
    completed: { label: "Completed", class: "bg-accent text-accent-foreground border-accent/20" },
    overdue: { label: "Overdue", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Page header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Good morning, Amirul </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Here&apos;s an overview of your bills.</p>
                </div>
                <Button asChild className="sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl gap-2">
                    <Link href="/dashboard/create">
                        <Plus className="w-4 h-4" />
                        New bill
                    </Link>
                </Button>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" animate="show" className="bg-card border border-border rounded-2xl p-5">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <p className="text-2xl font-bold text-foreground">{s.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bills section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Your bills</h2>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 text-sm rounded-lg px-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                        <Link href="/dashboard/create">
                            <Plus className="w-3.5 h-3.5" />
                            New bill
                        </Link>
                    </Button>
                </div>

                <div className="space-y-3">
                    {bills.map((bill, i) => {
                        const percent = Math.round((bill.collected / bill.total) * 100);
                        const status = statusConfig[bill.status as keyof typeof statusConfig];
                        return (
                            <motion.div
                                key={bill.id}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                className="group bg-card border border-border rounded-2xl p-5 cursor-pointer transition-shadow duration-200 hover:shadow-sm"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    {/* Left */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <h3 className="font-semibold text-foreground text-sm truncate">{bill.title}</h3>
                                            <Badge variant="outline" className={`text-xs px-2 py-0 shrink-0 ${status.class}`}>
                                                {status.label}
                                            </Badge>
                                        </div>

                                        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percent}%` }}
                                                transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                                                className={`h-full rounded-full ${bill.status === "completed" ? "bg-accent-foreground" : bill.status === "overdue" ? "bg-destructive" : "bg-primary"}`}
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {bill.paid}/{bill.participants} paid
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Due {bill.dueDate}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                {percent}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                                        <p className="font-bold text-foreground text-sm">
                                            RM {bill.collected}
                                            <span className="text-muted-foreground font-normal"> / RM {bill.total}</span>
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                                                aria-label="Copy link"
                                            >
                                                <Copy className="w-3.5 h-3.5" />
                                            </motion.button>
                                            <Button asChild size="sm" variant="outline" className="h-8 text-xs rounded-lg border-border hover:bg-muted px-3">
                                                <Link href={`/dashboard/bills/${bill.id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
