"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";

export default function CTABanner() {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 sm:px-16 text-center"
                >
                    {/* Background decoration */}
                    <div className="absolute top-[-40%] right-[-10%] w-100 h-100 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute bottom-[-40%] left-[-10%] w-87.5 h-87.5 rounded-full bg-white/5 pointer-events-none" />
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `linear-gradient(white 1px, transparent 1px),
                linear-gradient(90deg, white 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6"
                        >
                            <Wallet className="w-7 h-7 text-white" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
                        >
                            Ready to stop chasing?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="text-white/75 text-lg max-w-md mx-auto mb-8"
                        >
                            Create your first bill in under a minute. Free forever, no credit card needed.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.36, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col sm:flex-row gap-3 justify-center"
                        >
                            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold rounded-xl px-8 gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                                <Link href="/dashboard">
                                    Create a bill free
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl px-8 font-medium transition-all duration-200">
                                <Link href="#how-it-works">See how it works</Link>
                            </Button>
                        </motion.div>

                        {/* Trust row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-white/60"
                        >
                            {["Free to use", "No app download", "Works on WhatsApp"].map((item) => (
                                <span key={item} className="flex items-center justify-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
