"use client";

import { Button } from "@/components/ui/button";
import { useAuthErrors, useAuthPending } from "@/stores/auth.selectors";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoginPayload } from "@/types/auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const loginAction = useAuthStore((state) => state.login);
    const errors = useAuthErrors();
    const clearErrors = useAuthStore((state) => state.clearErrors);
    const isPending = useAuthPending();
    const router = useRouter();

    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const payload: LoginPayload = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        try {
            await loginAction(payload);
            toast.success("Login successful. Welcome to SplitLah");
            router.push("/dashboard");
        } catch {
            toast.error("Login Failed. Please try again");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-foreground tracking-tight">
                    Split<span className="text-primary">Lah</span>
                </span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">Welcome back</h1>
                <p className="text-sm text-muted-foreground">Sign in to manage your bills and track payments.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                        {errors?.email && <p className="text-xs text-destructive">{errors.email[0]}</p>}
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Password</label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full h-11 pl-10 pr-11 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                        <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors?.password && <p className="text-xs text-destructive">{errors.password[0]}</p>}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] hover:cursor-pointer"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
                </Button>
            </form>

            {/* Register link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary font-medium hover:underline">
                    Create one free
                </Link>
            </p>
        </motion.div>
    );
}
