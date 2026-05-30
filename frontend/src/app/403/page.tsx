"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="text-center max-w-md w-full">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Lock className="w-9 h-9 text-primary" />
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">403 Unauthorized</p>
                    <h1 className="text-3xl font-bold text-foreground mb-3">Access Denied</h1>
                    <p className="text-muted-foreground text-base leading-relaxed mb-8">You don't have permission to view this page. Please log in or go back to safety.</p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={() => router.back()} variant="outline" className="rounded-lg font-medium">
                            Go back
                        </Button>
                        <Button asChild variant="outline" className="rounded-lg font-medium">
                            <Link href="/">Go home</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
