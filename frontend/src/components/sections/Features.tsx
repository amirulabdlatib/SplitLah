"use client";

import { motion } from "framer-motion";
import { Bell, LayoutDashboard, Link2, ScanLine, ShieldCheck, Smartphone } from "lucide-react";

const features = [
    {
        icon: Link2,
        title: "Shareable payment link",
        desc: "One unique link per bill. Send via WhatsApp, Telegram, or any platform — members open it and confirm payment instantly.",
        accent: "bg-primary/10 text-primary",
    },
    {
        icon: ShieldCheck,
        title: "No login for members",
        desc: "Members don't need an account. They just open the link, confirm payment, and upload receipt if needed. Zero friction.",
        accent: "bg-primary/10 text-primary",
    },
    {
        icon: ScanLine,
        title: "Receipt upload",
        desc: "Members can upload proof of payment — screenshot, bank slip, anything. Organiser gets full visibility.",
        accent: "bg-accent text-accent-foreground",
    },
    {
        icon: Bell,
        title: "Payment reminders",
        desc: "Gently remind unpaid members with one tap. No awkward WhatsApp messages needed — SplitLah does it for you.",
        accent: "bg-accent text-accent-foreground",
    },
    {
        icon: Smartphone,
        title: "Mobile-first design",
        desc: "Built for people clicking links from WhatsApp on their phone. Smooth, fast, and easy on any screen size.",
        accent: "bg-primary/10 text-primary",
    },
    {
        icon: LayoutDashboard,
        title: "Organiser dashboard",
        desc: "See total collected, remaining amount, payment progress, and each member's status — all in one clean dashboard.",
        accent: "bg-accent text-accent-foreground",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                        <span className="w-4 h-px bg-primary inline-block" />
                        Features
                        <span className="w-4 h-px bg-primary inline-block" />
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                        Everything you need to <span className="text-primary">collect payments</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">Simple enough for your mak cik to use, powerful enough to handle your group trip.</p>
                </motion.div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    delay: i * 0.08,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group bg-card border border-border rounded-2xl p-6 cursor-default transition-shadow duration-300 hover:shadow-md hover:shadow-primary/5"
                            >
                                {/* Icon */}
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.accent} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
