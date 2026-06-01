"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { useConfirmPayment, usePayment } from "@/features/payments/hooks/usePayments";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle, Clock, Copy, CopyCheck, ShieldCheck, Upload, Users, Wallet, X } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import { toast } from "sonner";

type Step = "view" | "upload" | "success";

export default function PaymentPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const { data, isLoading, isError } = usePayment(token);

    const [step, setStep] = useState<Step>("view");
    const [copied, setCopied] = useState(false);
    const [receipt, setReceipt] = useState<File | null>(null);
    const { mutateAsync: confirm, isPending } = useConfirmPayment(token);

    if (isLoading) {
        return <Loading />;
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="font-semibold text-foreground">Payment link not found</p>
                    <p className="text-sm text-muted-foreground">This link may be invalid or expired.</p>
                </div>
            </div>
        );
    }

    const { bill, current_participant, participants } = data;

    const collected = participants.filter((p: any) => p.status === "paid").reduce((sum: number, p: any) => sum + p.amount_owed, 0);
    const percent = Math.round((collected / bill.total_amount) * 100);
    const paidCount = participants.filter((p: any) => p.status === "paid").length;
    const isPaid = current_participant.status === "paid";
    const isPendingPaymentStatus = current_participant.status === "pending";

    const handleConfirm = async () => {
        try {
            await confirm(receipt ?? undefined);
            setStep("success");
            toast.success("Payment confirmed!", {
                description: "The organiser will be notified.",
            });
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(bill.organiser.payment_acc_no);
        setCopied(true);
        toast.success("Copied successfully.");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border bg-background/80 backdrop-blur-md">
                <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <Wallet className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-foreground tracking-tight text-sm">SplitLah</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Secure payment page
                    </span>
                </div>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 space-y-4">
                <AnimatePresence mode="wait">
                    {step === "view" && (
                        <motion.div key="view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="space-y-4">
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-medium">Bill from {bill.organiser.name}</p>
                                        <h1 className="text-xl font-bold text-foreground">{bill.title}</h1>
                                        {bill.description && <p className="text-sm text-muted-foreground mt-1">{bill.description}</p>}
                                    </div>
                                    <div className="text-right shrink-0 ml-4">
                                        <p className="text-2xl font-bold text-foreground">RM {current_participant.amount_owed}</p>
                                        <p className="text-xs text-muted-foreground">your share</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 text-xs text-muted-foreground mb-5">
                                    <span className="flex items-center gap-1">
                                        <CalendarDays className="w-3.5 h-3.5" />
                                        Due {bill.due_date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" />
                                        {participants.length} people
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {paidCount} paid
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                                        <span>Group progress</span>
                                        <span className="font-medium text-foreground">{percent}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ delay: 0.3, duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-primary" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {participants.map((p: any) => (
                                        <span
                                            key={p.id}
                                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                p.status === "paid"
                                                    ? "bg-accent text-accent-foreground"
                                                    : p.status === "pending"
                                                      ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/30"
                                                      : p.id === current_participant.id
                                                        ? "bg-primary/10 text-primary border border-primary/30"
                                                        : "bg-muted text-muted-foreground"
                                            }`}
                                        >
                                            {p.name} {p.status === "paid" ? "✓" : p.status === "pending" ? "⏳" : p.id === current_participant.id ? "(you)" : ""}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {!isPaid && !isPendingPaymentStatus && (
                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                                    <h2 className="font-semibold text-foreground">Payment details</h2>

                                    <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Pay to</span>
                                            <span className="font-medium text-foreground">{bill.organiser.name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Bank Name</span>
                                            <span className="font-medium text-foreground">{bill.organiser.bank_name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Account</span>
                                            <button onClick={handleCopy} className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors">
                                                {bill.organiser.payment_acc_no}
                                                {copied ? <CopyCheck className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                                            </button>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Amount</span>
                                            <span className="font-bold text-foreground text-base">RM {current_participant.amount_owed}</span>
                                        </div>
                                    </div>

                                    {bill.organiser.qr_file_path ? (
                                        <div className="flex justify-center">
                                            <Image src={bill.organiser.qr_file_path} alt="QR Code" className="w-40 h-40 rounded-xl object-cover" />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <div className="w-40 h-40 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
                                                <Wallet className="w-8 h-8 text-muted-foreground/40" />
                                                <span className="text-xs text-muted-foreground text-center px-4">No QR code — use account number above</span>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        onClick={() => setStep("upload")}
                                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                                    >
                                        <CheckCircle className="w-4 h-4" />I have paid — confirm now
                                    </Button>
                                </motion.div>
                            )}

                            {isPendingPaymentStatus && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <h2 className="font-bold text-foreground">Payment submitted!</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Your payment is awaiting confirmation from the <span className="uppercase">{bill.organiser.name}</span>.
                                    </p>
                                </motion.div>
                            )}

                            {isPaid && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-accent/30 border border-accent/40 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-accent-foreground" />
                                    </div>
                                    <h2 className="font-bold text-foreground">You&apos;re all paid up!</h2>
                                    <p className="text-sm text-muted-foreground">Your payment has been confirmed. Thanks for paying on time!</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {step === "upload" && (
                        <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="space-y-4">
                            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-foreground">Upload receipt</h2>
                                    <button onClick={() => setStep("view")} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <p className="text-sm text-muted-foreground">Upload your payment screenshot or bank slip as proof. This is optional but recommended.</p>

                                <label className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-muted/30 hover:bg-primary/5 cursor-pointer transition-all duration-200 group">
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setReceipt(e.target.files?.[0] || null)} />
                                    {receipt ? (
                                        <div className="flex flex-col items-center gap-2 text-center px-4">
                                            <CheckCircle className="w-8 h-8 text-primary" />
                                            <p className="text-sm font-medium text-foreground truncate max-w-55">{receipt.name}</p>
                                            <p className="text-xs text-muted-foreground">Tap to change</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-center px-4">
                                            <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Tap to upload screenshot</p>
                                            <p className="text-xs text-muted-foreground">JPG, PNG, JPEG 1MB</p>
                                        </div>
                                    )}
                                </label>

                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 h-11 rounded-xl border-border font-medium" onClick={handleConfirm} disabled={isPending}>
                                        Skip, confirm anyway
                                    </Button>
                                    <Button
                                        className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                                        onClick={handleConfirm}
                                        disabled={isPending || !receipt}
                                    >
                                        {isPending ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Submitting...
                                            </div>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center text-center py-12 space-y-4"
                        >
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }} className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-accent-foreground" />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Payment confirmed!</h2>
                                <p className="text-muted-foreground text-sm max-w-xs">
                                    Thanks {current_participant.name}! Your payment of <span className="font-semibold text-foreground">RM {current_participant.amount_owed}</span> has been submitted. The organiser will verify and confirm it.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }} className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 text-left space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Bill</span>
                                    <span className="font-medium text-foreground">{bill.title}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-bold text-foreground">RM {current_participant.amount_owed}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="text-accent-foreground font-medium">Pending confirmation</span>
                                </div>
                            </motion.div>

                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs text-muted-foreground pt-4">
                                SplitLah — Split bills, not friendships.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
