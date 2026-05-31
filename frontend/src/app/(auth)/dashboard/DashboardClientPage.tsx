"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBills, useDeleteBills } from "@/features/bills/hooks/useBills";
import { useAuthUser } from "@/stores/auth.selectors";
import type { Bill } from "@/types/bills";
import { motion, type Variants } from "framer-motion";
import { CheckCircle, Clock, Copy, Eye, Plus, Receipt, Trash2, TrendingUp, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const statusConfig = {
    active: { label: "Active", class: "bg-primary/10 text-primary border-primary/20" },
    completed: { label: "Completed", class: "bg-accent text-accent-foreground border-accent/20" },
    cancelled: { label: "Cancelled", class: "bg-muted text-muted-foreground border-border" },
    overdue: { label: "Overdue", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

const toTitleCase = (str: string) =>
    str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
};

function deriveStats(bills: Bill[]) {
    const totalBills = bills.length;
    const totalCollected = bills.reduce((sum, b) => sum + b.collected, 0);
    const pendingAmount = bills.reduce((sum, b) => sum + (b.total - b.collected), 0);
    const activeBills = bills.filter((b) => b.status === "active").length;

    return [
        { label: "Total bills", value: String(totalBills), icon: Receipt, color: "bg-primary/10 text-primary" },
        { label: "Total collected", value: `RM ${totalCollected.toLocaleString()}`, icon: TrendingUp, color: "bg-accent text-accent-foreground" },
        { label: "Pending amount", value: `RM ${pendingAmount.toLocaleString()}`, icon: Clock, color: "bg-destructive/10 text-destructive" },
        { label: "Active bills", value: String(activeBills), icon: Wallet, color: "bg-primary/10 text-primary" },
    ];
}

export default function DashboardClientPage() {
    const user = useAuthUser();
    const { data: bills = [], isLoading } = useBills();

    const stats = deriveStats(bills);

    const { mutate: deleteBill, isPending: isDeleting } = useDeleteBills();

    return (
        <div className="space-y-8">
            {/* Page header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome, {toTitleCase(user?.name ?? "")}</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Here&apos;s an overview of your bills.</p>
                </div>
                <Button asChild className="sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl gap-2">
                    <Link href="/bills/create">
                        <Plus className="w-4 h-4" />
                        New bill
                    </Link>
                </Button>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((state, i) => {
                    const Icon = state.icon;
                    return (
                        <motion.div key={state.label} custom={i} variants={fadeUp} initial="hidden" animate="show" className="bg-card border border-border rounded-2xl p-5">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${state.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            {isLoading ? <div className="h-8 w-16 bg-muted rounded animate-pulse mb-1" /> : <p className="text-2xl font-bold text-foreground">{state.value}</p>}
                            <p className="text-xs text-muted-foreground mt-0.5">{state.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bills section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Your bills</h2>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 text-sm rounded-lg px-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                        <Link href="/bills/create">
                            <Plus className="w-3.5 h-3.5" />
                            New bill
                        </Link>
                    </Button>
                </div>

                {isLoading ? (
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-card border border-border rounded-2xl p-5 h-24 animate-pulse" />
                        ))}
                    </div>
                ) : bills.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-10 text-center">
                        <p className="text-muted-foreground text-sm">No bills yet. Create your first bill!</p>
                        <Button asChild size="sm" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg">
                            <Link href="/bills/create">
                                <Plus className="w-3.5 h-3.5" />
                                New bill
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {bills.map((bill: Bill, i: number) => {
                            const status = statusConfig[bill.status as keyof typeof statusConfig];
                            return (
                                <motion.div
                                    key={bill.id}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                    className="group bg-card border border-border rounded-2xl p-5 transition-shadow duration-200 hover:shadow-sm"
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
                                                    animate={{ width: `${bill.percent}%` }}
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
                                                    Due {bill.due_date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    {bill.percent}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                                            <p className="font-bold text-foreground text-sm">
                                                RM {bill.collected.toLocaleString()}
                                                <span className="text-muted-foreground font-normal"> / RM {bill.total.toLocaleString()}</span>
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        const url = `${window.location.origin}/bills/${bill.bill_uuid}`;
                                                        navigator.clipboard.writeText(url);
                                                        toast.success("Link copied!");
                                                    }}
                                                    className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:cursor-pointer transition-all duration-200"
                                                    aria-label="Copy link"
                                                >
                                                    <Copy className="w-3.5 h-3.5" />
                                                </motion.button>

                                                <Button asChild size="icon" variant="outline" className="h-8 w-8 rounded-lg border-border hover:bg-muted">
                                                    <Link href={`/dashboard/bills/${bill.bill_uuid}`}>
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </Link>
                                                </Button>

                                                {/* Delete button */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="w-8 h-8 rounded-lg bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center text-destructive hover:cursor-pointer transition-all duration-200"
                                                            aria-label="Delete bill"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </motion.button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete bill?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{bill.title}&quot;</span>? This will also remove all participants and uploaded files. This
                                                                action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    deleteBill(bill.bill_uuid, {
                                                                        onSuccess: () => toast.success("Bill deleted."),
                                                                        onError: () => toast.error("Failed to delete bill."),
                                                                    })
                                                                }
                                                                disabled={isDeleting}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                {isDeleting ? "Deleting..." : "Delete"}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
