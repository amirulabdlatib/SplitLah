"use client";

import { Button } from "@/components/ui/button";
import { useAuthErrors, useAuthPending } from "@/stores/auth.selectors";
import { useAuthStore } from "@/stores/useAuthStore";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const registerAction = useAuthStore((state) => state.register);
    const clearErrors = useAuthStore((state) => state.clearErrors);
    const errors = useAuthErrors();
    const isPending = useAuthPending();
    const router = useRouter();

    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            password_confirmation: formData.get("password_confirmation") as string,
        };

        try {
            await registerAction(payload);
            toast.success("Account created! Welcome to SplitLah.");
            router.push("/dashboard");
        } catch {
            toast.error("Registration failed. Please check your details.");
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
                <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">Create your account</h1>
                <p className="text-sm text-muted-foreground">Free forever. No credit card needed.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Full name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Ahmad Amirul"
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                    </div>
                    {errors?.name && <p className="text-xs text-destructive">{errors.name[0]}</p>}
                </div>

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
                    </div>
                    {errors?.email && <p className="text-xs text-destructive">{errors.email[0]}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Min. 8 characters"
                            minLength={8}
                            className="w-full h-11 pl-10 pr-11 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                        <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors?.password && <p className="text-xs text-destructive">{errors.password[0]}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Confirm password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="password_confirmation"
                            placeholder="Repeat your password"
                            minLength={8}
                            className="w-full h-11 pl-10 pr-11 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                        <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors?.password_confirmation && <p className="text-xs text-destructive">{errors.password_confirmation[0]}</p>}
                </div>

                {/* Terms */}
                <p className="text-xs text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                        Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                        Privacy policy
                    </Link>
                    .
                </p>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] hover:cursor-pointer"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
                </Button>
            </form>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                </Link>
            </p>
        </motion.div>
    );
}
