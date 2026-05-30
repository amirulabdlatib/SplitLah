"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
                    className="relative overflow-hidden rounded-2xl"
                    style={{ backgroundColor: "#111113", border: "1px solid #232326" }}
                >
                    {/* Noise texture */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "128px 128px",
                            opacity: 0.04,
                        }}
                    />

                    {/* Glow — top left only, asymmetric */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: "-60px",
                            left: "-60px",
                            width: "320px",
                            height: "320px",
                            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
                        }}
                    />

                    {/* Horizontal divider layout */}
                    <div className="flex flex-col lg:flex-row">
                        {/* Left — the statement */}
                        <div className="flex-1 px-10 py-12 lg:py-14 lg:px-14">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                className="text-xs tracking-[0.16em] uppercase mb-5"
                                style={{ color: "#52525b", fontFamily: "system-ui, sans-serif" }}
                            >
                                No credit card · Free forever
                            </motion.p>

                            <motion.h2
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.16, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="text-white font-semibold leading-[1.12] tracking-[-0.03em]"
                                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", fontFamily: "system-ui, sans-serif" }}
                            >
                                Stop chasing payments.
                                <br />
                                <span style={{ color: "#52525b" }}>Start getting paid.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.24, duration: 0.5 }}
                                className="mt-4 text-sm leading-relaxed max-w-xs"
                                style={{ color: "#3f3f46", fontFamily: "system-ui, sans-serif" }}
                            >
                                Create your first bill in under a minute — works directly on WhatsApp.
                            </motion.p>
                        </div>

                        {/* Vertical divider */}
                        <div className="hidden lg:block w-px self-stretch" style={{ backgroundColor: "#1c1c1f" }} />

                        {/* Right — action */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.28, duration: 0.5 }}
                            className="flex flex-col justify-center gap-5 px-10 py-12 lg:py-14 lg:px-14 lg:min-w-75"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="w-full justify-between font-medium rounded-lg px-5 h-12 text-sm gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: "#09090b",
                                    fontFamily: "system-ui, sans-serif",
                                }}
                            >
                                <Link href="/dashboard">
                                    Create a bill — free
                                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                </Link>
                            </Button>

                            <Link
                                href="#how-it-works"
                                className="text-center text-xs transition-colors duration-150"
                                style={{ color: "#3f3f46", fontFamily: "system-ui, sans-serif" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#71717a")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#3f3f46")}
                            >
                                How does it work?
                            </Link>

                            {/* Trust — stacked, minimal */}
                            <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: "#1c1c1f", fontFamily: "system-ui, sans-serif" }}>
                                {["Free to use", "No app download", "Works on WhatsApp"].map((item) => (
                                    <span key={item} className="text-xs" style={{ color: "#3f3f46" }}>
                                        — {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
