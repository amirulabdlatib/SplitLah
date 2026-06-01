"use client";

import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Camera, CreditCard, Loader2, Mail, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const banks = ["Maybank", "CIMB Bank", "Public Bank", "RHB Bank", "Hong Leong Bank", "AmBank", "Bank Islam", "Bank Rakyat", "BSN", "OCBC Bank", "Standard Chartered", "HSBC Bank", "Touch 'n Go eWallet", "Boost", "GrabPay", "ShopeePay"];

export default function SettingsPage() {
    const [name, setName] = useState("Ahmad Amirul");
    const [email] = useState("ahmad@example.com");
    const [bankName, setBankName] = useState("Maybank");
    const [accNo, setAccNo] = useState("1234 5678 9012");
    const [qrFile, setQrFile] = useState<File | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setProfileLoading(false);
        toast.success("Profile updated successfully!");
    };

    const handlePaymentSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setPaymentLoading(false);
        toast.success("Payment details updated!", {
            description: "Members will see these details when paying.",
        });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto space-y-6 pb-10">
            {/* Page header */}
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Manage your profile and payment details.</p>
            </div>
            {/* Profile card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">Profile</h2>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">{name.charAt(0)}</div>
                        <label className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                            <Camera className="w-3 h-3 text-primary-foreground" />
                            <input type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{name}</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Full name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Email — readonly */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            Email
                            <span className="text-muted-foreground font-normal ml-1">(cannot be changed)</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="email" value={email} readOnly className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground cursor-not-allowed" />
                        </div>
                    </div>

                    <Button type="submit" disabled={profileLoading} className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]">
                        {profileLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            "Save profile"
                        )}
                    </Button>
                </form>
            </motion.div>
            {/* Payment details card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <h2 className="font-semibold text-foreground">Payment details</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-5">This info is shown to members when they pay their share.</p>

                <form onSubmit={handlePaymentSave} className="space-y-4">
                    {/* Bank name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Bank / e-wallet</label>
                        <div className="relative">
                            <select
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full h-11 pl-4 pr-10 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 appearance-none cursor-pointer"
                            >
                                {banks.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>

                    {/* Account number */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Account number</label>
                        <input
                            type="text"
                            placeholder="e.g. 1234 5678 9012"
                            value={accNo}
                            onChange={(e) => setAccNo(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                        />
                    </div>

                    {/* QR code */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            QR code
                            <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                        </label>
                        <ImageDropzone value={qrFile} onChange={setQrFile} maxSizeMB={5} />
                    </div>

                    {/* Preview */}
                    {(accNo || bankName) && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-muted/40 rounded-xl p-4 space-y-2 border border-border">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Preview — what members will see</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Pay to</span>
                                <span className="font-medium text-foreground">{name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Bank</span>
                                <span className="font-medium text-foreground">{bankName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Account</span>
                                <span className="font-medium text-foreground">{accNo}</span>
                            </div>
                        </motion.div>
                    )}

                    <Button type="submit" disabled={paymentLoading} className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]">
                        {paymentLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            "Save payment details"
                        )}
                    </Button>
                </form>
            </motion.div>
            Danger zone
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="bg-card border border-destructive/20 rounded-2xl p-6">
                <h2 className="font-semibold text-foreground mb-1">Danger zone</h2>
                <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated bills.</p>
                <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl h-10 px-5 text-sm font-medium transition-all duration-200">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete account
                </Button>
            </motion.div>
        </motion.div>
    );
}
