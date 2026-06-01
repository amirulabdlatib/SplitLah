"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetBill } from "@/features/bills/hooks/useBills";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, CheckCircle, Clock, Copy, MessageCircle, Receipt, Trash2, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const statusConfig = {
    active: { label: "Active", class: "bg-primary/10 text-primary border-primary/20" },
    completed: { label: "Completed", class: "bg-accent text-accent-foreground border-accent/20" },
    overdue: { label: "Overdue", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function BillDetailPage() {
    const { uuid } = useParams<{ uuid: string }>();
    const { data: bill, isLoading, isError } = useGetBill(uuid);

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto pt-20 flex justify-center">
                <p className="text-muted-foreground text-sm animate-pulse">Loading bill...</p>
            </div>
        );
    }

    if (isError || !bill) {
        return (
            <div className="max-w-2xl mx-auto pt-20 flex justify-center">
                <p className="text-destructive text-sm">Bill not found.</p>
            </div>
        );
    }

    const participants = bill.participants ?? [];
    const collected = participants.filter((p: any) => p.status === "paid").reduce((sum: number, p: any) => sum + Number(p.amount_owed), 0);
    const percent = Math.round((collected / Number(bill.total_amount)) * 100);
    const paidCount = participants.filter((p: any) => p.status === "paid").length;
    const status = statusConfig[bill.status as keyof typeof statusConfig];

    // const remindAll = () => {
    //     toast.success("Reminders sent!", { description: "Unpaid members have been notified." });
    // };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto space-y-6 pb-10">
            {/* Back + actions */}
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2">
                    <Link href="/dashboard">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    {/* <Button asChild variant="outline" size="sm" className="gap-1.5 rounded-lg border-border text-sm">
                        <Link href={`/bills/${bill.uuid}/edit`}>
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                        </Link>
                    </Button> */}
                    <Button variant="outline" size="sm" className="gap-1.5 rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive text-sm">
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Bill summary card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold text-foreground">{bill.title}</h1>
                                {status && (
                                    <Badge variant="outline" className={`text-xs ${status.class}`}>
                                        {status.label}
                                    </Badge>
                                )}
                            </div>
                            {bill.description && <p className="text-sm text-muted-foreground mt-0.5">{bill.description}</p>}
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-foreground">RM {bill.total_amount}</p>
                        <p className="text-xs text-muted-foreground capitalize">{bill.split_type} split</p>
                    </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-5">
                    {bill.due_date && (
                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" />
                            Due {bill.due_date}
                        </span>
                    )}
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Created {bill.created_at}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {participants.length} participants
                    </span>
                    <span className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Auto confirm: {bill.auto_confirm ? "On" : "Off"}
                    </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                            <span className="font-semibold text-foreground">RM {collected}</span> collected
                        </span>
                        <span className="font-semibold text-foreground">{percent}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ delay: 0.4, duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-primary" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>
                            {paidCount} of {participants.length} paid
                        </span>
                        <span>RM {Number(bill.total_amount) - collected} remaining</span>
                    </div>
                </div>

                {/* Remind all button */}
                {/* <div className="pt-2 flex justify-end">
                    <Button onClick={remindAll} size="sm" className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-sm font-medium transition-all">
                        <Bell className="w-3.5 h-3.5" />
                        Remind all
                    </Button>
                </div> */}
            </motion.div>

            {/* Participants card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                            <Users className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <h2 className="font-semibold text-foreground">Participants</h2>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {paidCount}/{participants.length} paid
                    </span>
                </div>

                <div className="space-y-2">
                    {participants.map((p: any, i: number) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.07, duration: 0.35 }}
                            className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/20 border border-border hover:bg-muted/30 transition-colors"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">{p.name[0]}</div>
                                <div>
                                    <p className="text-sm font-medium text-foreground leading-tight">{p.name}</p>
                                    {p.paid_at ? (
                                        <p className="text-xs text-muted-foreground mt-0.5">Paid {p.paid_at}</p>
                                    ) : (
                                        <>
                                            <p className="text-xs text-muted-foreground mt-0.5">{p.phone}</p>
                                            <p className="text-xs text-muted-foreground">{p.email}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-foreground mr-1">RM {p.amount_owed}</p>

                                {/* Copy link */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}/payment/${p.token}`);
                                        toast.success("Link copied!", {
                                            description: `Payment link for ${p.name} copied.`,
                                        });
                                    }}
                                    className="w-8 h-8 rounded-lg border border-border bg-background hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                </motion.button>

                                {/* WhatsApp */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        const link = `${window.location.origin}/payment/${p.token}`;
                                        const msg = encodeURIComponent(`Hi ${p.name}, sila bayar RM ${p.amount_owed} melalui link ni: ${link}`);
                                        window.open(`https://wa.me/${p.phone}?text=${msg}`, "_blank");
                                    }}
                                    className="w-8 h-8 rounded-lg border border-border bg-background hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                                >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                </motion.button>

                                {/* Status badge — display only, no toggle yet */}
                                <span
                                    className={`text-xs px-3.5 py-1.5 rounded-full font-medium min-w-16 text-center border ${
                                        p.status === "paid"
                                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                                            : p.status === "pending"
                                              ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
                                              : "bg-destructive/10 text-destructive border-destructive/20"
                                    }`}
                                >
                                    {p.status === "paid" ? "Paid" : p.status === "pending" ? "Pending" : "Unpaid"}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Receipt section */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h2 className="font-semibold text-foreground">Bill attachment</h2>
                </div>

                {bill.bill_file_path ? (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                        <Receipt className="w-5 h-5 text-primary" />
                        <span className="text-sm text-foreground flex-1">bill-receipt.pdf</span>
                        <Button variant="ghost" size="sm" className="text-primary h-8 px-3 text-xs">
                            View
                        </Button>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No attachment uploaded.</p>
                )}
            </motion.div>
        </motion.div>
    );
}
