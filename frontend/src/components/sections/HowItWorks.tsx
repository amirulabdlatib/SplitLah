"use client";

import { motion } from "framer-motion";
import { CheckCircle, FilePlus, Share2 } from "lucide-react";

const steps = [
    {
        icon: FilePlus,
        step: "01",
        title: "Create a bill",
        desc: "Add the title, total amount, participants, due date, and split type. Takes less than a minute.",
        color: "bg-primary/10 text-primary",
    },
    {
        icon: Share2,
        step: "02",
        title: "Share the link",
        desc: "SplitLah generates a unique payment link. Send it via WhatsApp, Telegram, or copy it anywhere.",
        color: "bg-accent text-accent-foreground",
    },
    {
        icon: CheckCircle,
        step: "03",
        title: "Track who paid",
        desc: "Members confirm payment on their end. You see the dashboard update in real time — no chasing needed.",
        color: "bg-primary/10 text-primary",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            {/* Section bg tint */}
            <div className="absolute inset-0 bg-muted/30 pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                        <span className="w-4 h-px bg-primary inline-block" />
                        How it works
                        <span className="w-4 h-px bg-primary inline-block" />
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                        From bill to paid in <span className="text-primary">3 simple steps</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">No app download. No sign up for members. Just a link that gets the job done.</p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
                    {/* Connector line — desktop only */}
                    <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-border z-0" />

                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    delay: i * 0.15,
                                    duration: 0.55,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ y: -4 }}
                                className="relative z-10 bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 cursor-default"
                            >
                                {/* Step number + icon row */}
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-4xl font-black text-muted/50 dark:text-muted-foreground/20 select-none leading-none">{s.step}</span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
