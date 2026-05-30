"use client";

import { useIsAuthenticated } from "@/stores/auth.selectors";
import { WithChildren } from "@/types/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function AuthLayout({ children }: WithChildren) {
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex">
            {/* Left panel — branding, desktop only */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `linear-gradient(white 1px, transparent 1px),
                            linear-gradient(90deg, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                {/* Blobs */}
                <div className="absolute top-[-20%] right-[-20%] w-100 h-100 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-20%] w-87.5 h-87.5 rounded-full bg-white/10 pointer-events-none" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                        </svg>
                    </div>
                    <Link href="/" className="text-white font-bold text-xl tracking-tight">
                        SplitLah
                    </Link>
                </div>

                {/* Center quote */}
                <div className="relative z-10">
                    <p className="text-white/90 text-3xl font-bold leading-snug tracking-tight mb-4">
                        Stop chasing.
                        <br />
                        Start collecting.
                    </p>
                    <p className="text-white/60 text-base leading-relaxed max-w-sm">Create a bill, share a link, track who paid — all without the awkward WhatsApp follow-ups.</p>
                </div>

                {/* Bottom stats */}
                <div className="relative z-10 flex gap-8">
                    {[
                        { value: "100%", label: "Free to use" },
                        { value: "0", label: "App download needed" },
                        { value: "1 min", label: "To create a bill" },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-white font-bold text-xl">{s.value}</p>
                            <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel — form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-background">{children}</div>
        </div>
    );
}
