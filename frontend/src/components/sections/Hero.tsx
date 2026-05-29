"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Wallet } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
};

const participants = [
    { name: "Azlan", amount: "RM 30", paid: true },
    { name: "Syira", amount: "RM 30", paid: true },
    { name: "Hafiz", amount: "RM 30", paid: false },
    { name: "Danial", amount: "RM 30", paid: false },
];

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Subtle background grid */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Glow blob — indigo */}
            <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
            {/* Glow blob — emerald */}
            <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — copy */}
                    <div>
                        {/* Badge */}
                        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                            <Badge variant="secondary" className="mb-6 px-3 py-1 text-xs font-medium gap-1.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                No login needed for members
                            </Badge>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                            Split bills, <span className="text-primary">not</span> friendships.
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                            Create a bill, share the link via WhatsApp, and track who has paid — without the awkward follow-ups. Perfect for makan, trips, events, and monthly house bills.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-col sm:flex-row gap-3 mb-10">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-6 gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                                <Link href="/dashboard">
                                    Create a bill free
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-xl px-6 font-medium border-border hover:bg-muted transition-all duration-200">
                                <Link href="#how-it-works">See how it works</Link>
                            </Button>
                        </motion.div>

                        {/* Trust signals */}
                        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                            {["Free to use", "No app download needed", "Works on WhatsApp"].map((item) => (
                                <span key={item} className="flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-accent-foreground shrink-0" />
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — mock bill card */}
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:flex justify-center">
                        <div className="relative w-full max-w-sm">
                            {/* Floating card — behind */}
                            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-4 w-48 bg-card border border-border rounded-2xl p-4 shadow-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium text-foreground">4 members</span>
                                </div>
                                <div className="text-xs text-muted-foreground mb-1">Total collected</div>
                                <div className="text-lg font-bold text-foreground">
                                    RM 60 <span className="text-xs font-normal text-muted-foreground">/ RM 120</span>
                                </div>
                                {/* Mini progress bar */}
                                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ delay: 0.8, duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-primary" />
                                </div>
                            </motion.div>

                            {/* Main bill card */}
                            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="bg-card border border-border rounded-2xl p-6 shadow-xl mt-8">
                                {/* Bill header */}
                                <div className="flex items-start justify-between mb-5">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Wallet className="w-4 h-4 text-primary" />
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Bill</span>
                                        </div>
                                        <h3 className="font-bold text-foreground text-lg">Dinner @ Pelita</h3>
                                        <p className="text-xs text-muted-foreground mt-0.5">Due 1 Jun 2025</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-foreground">RM 120</div>
                                        <div className="text-xs text-muted-foreground">RM 30 / person</div>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                                        <span>Payment progress</span>
                                        <span className="font-medium text-foreground">50%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }} className="h-full rounded-full bg-primary" />
                                    </div>
                                </div>

                                {/* Participants */}
                                <div className="space-y-2.5">
                                    {participants.map((p, i) => (
                                        <motion.div key={p.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">{p.name[0]}</div>
                                                <span className="text-sm text-foreground">{p.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">{p.amount}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.paid ? "bg-accent text-accent-foreground" : "bg-destructive/10 text-destructive"}`}>{p.paid ? "Paid" : "Unpaid"}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
