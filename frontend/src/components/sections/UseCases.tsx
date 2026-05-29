"use client";

import { motion } from "framer-motion";
import { BookOpen, Home, PartyPopper, Plane, Trophy, Utensils } from "lucide-react";

const cases = [
    {
        icon: Utensils,
        title: "Makan beramai-ramai",
        desc: "Dinner @ mamak, steamboat, or any group meal. Split equally or by what each person ordered.",
        tag: "Most popular",
        tagStyle: "bg-primary/10 text-primary",
    },
    {
        icon: Plane,
        title: "Group trip",
        desc: "Hotel deposits, transport, activities — collect everything in one bill before the trip even starts.",
        tag: "Trip",
        tagStyle: "bg-accent text-accent-foreground",
    },
    {
        icon: Home,
        title: "Monthly house bills",
        desc: "TNB, Unifi, water, groceries. Set a recurring bill and track who has transferred for the month.",
        tag: "Rumah",
        tagStyle: "bg-accent text-accent-foreground",
    },
    {
        icon: Trophy,
        title: "Sports session",
        desc: "Badminton court, futsal, bowling — collect court fees from the squad without the back-and-forth.",
        tag: "Sports",
        tagStyle: "bg-primary/10 text-primary",
    },
    {
        icon: PartyPopper,
        title: "Events & celebrations",
        desc: "Birthday surprise, farewell dinner, office potluck. Collect contributions before the event stress kicks in.",
        tag: "Events",
        tagStyle: "bg-accent text-accent-foreground",
    },
    {
        icon: BookOpen,
        title: "Class & study group",
        desc: "Printing costs, shared references, course materials. Keep classmates accountable without being awkward.",
        tag: "Study",
        tagStyle: "bg-primary/10 text-primary",
    },
];

export default function UseCases() {
    return (
        <section id="use-cases" className="py-24 relative overflow-hidden">
            {/* Section bg tint */}
            <div className="absolute inset-0 bg-muted/30 pointer-events-none" />

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                        <span className="w-4 h-px bg-primary inline-block" />
                        Use cases
                        <span className="w-4 h-px bg-primary inline-block" />
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                        Built for <span className="text-primary">everyday Malaysians</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">Whether it is a RM 15 nasi lemak or a RM 3,000 Langkawi trip — SplitLah handles it.</p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cases.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <motion.div
                                key={c.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    delay: i * 0.08,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group relative bg-card border border-border rounded-2xl p-6 cursor-default overflow-hidden"
                            >
                                {/* Subtle hover bg */}
                                <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                                {/* Top row — icon + tag */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="w-5 h-5 text-foreground" />
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.tagStyle}`}>{c.tag}</span>
                                </div>

                                <h3 className="font-bold text-foreground text-base mb-2">{c.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
