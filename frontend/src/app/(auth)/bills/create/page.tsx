"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreBill } from "@/features/bills/hooks/useBills";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, ChevronDown, Plus, Receipt, Trash2, Upload, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Participant {
    id: number;
    name: string;
    email: string;
    phone: string;
    amount_owed: string;
}

const splitTypes = [
    { value: "equal", label: "Split equally" },
    { value: "custom", label: "Custom amount" },
];

export default function CreateBillPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [splitType, setSplitType] = useState("equal");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [autoConfirm, setAutoConfirm] = useState(false);
    const [billFile, setBillFile] = useState<File | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([{ id: 1, name: "", email: "", phone: "", amount_owed: "" }]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const { mutateAsync: createBill, isPending: loading } = useStoreBill();

    const clearError = (key: string) => {
        setErrors((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const addParticipant = () => {
        setParticipants((prev) => [...prev, { id: Date.now(), name: "", email: "", phone: "", amount_owed: "" }]);
    };

    const removeParticipant = (id: number) => {
        if (participants.length === 1) return;
        setParticipants((prev) => prev.filter((p) => p.id !== id));
    };

    const updateParticipant = (id: number, field: keyof Participant, value: string) => {
        setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    const getEqualShare = () => {
        const total = parseFloat(totalAmount);
        if (!total || participants.length === 0) return "0.00";
        return (total / participants.length).toFixed(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await createBill({
                title,
                description,
                total_amount: totalAmount,
                split_type: splitType as "equal" | "custom",
                due_date: dueDate ? format(dueDate, "yyyy-MM-dd") : "",
                auto_confirm: autoConfirm,
                bill_file: billFile,
                participants,
            });

            toast.success("Bill created successfully!", {
                description: "Share the link with your participants.",
            });

            router.push("/dashboard");
        } catch (err: any) {
            const serverErrors = err?.response?.data?.errors;
            if (serverErrors) {
                const flattened: Record<string, string> = {};
                Object.entries(serverErrors).forEach(([key, val]) => {
                    flattened[key] = Array.isArray(val) ? val[0] : (val as string);
                });
                setErrors(flattened);
            } else {
                toast.error(err?.response?.data?.message ?? "Something went wrong.");
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
                <button type="button" onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Create a new bill</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Fill in the details and add participants.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bill details card */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Receipt className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="font-semibold text-foreground">Bill details</h2>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            Bill title <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Dinner @ Pelita, Langkawi Trip"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                clearError("title");
                            }}
                            className={`w-full h-11 px-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                                errors.title ? "border-destructive focus:ring-destructive/30" : "border-border"
                            }`}
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            Description
                            <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                        </label>
                        <textarea
                            placeholder="Add any notes or details about this bill..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Total amount + split type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">
                                Total amount (RM) <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">RM</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={totalAmount}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
                                            setTotalAmount(value);
                                            clearError("total_amount");
                                        }
                                    }}
                                    min="0"
                                    step="0.01"
                                    className={`w-full h-11 pl-12 pr-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                                        errors.total_amount ? "border-destructive focus:ring-destructive/30" : "border-border"
                                    }`}
                                />
                            </div>
                            {errors.total_amount && <p className="text-xs text-destructive">{errors.total_amount}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Split type</label>
                            <div className="relative">
                                <select
                                    value={splitType}
                                    onChange={(e) => setSplitType(e.target.value)}
                                    className="w-full h-11 pl-4 pr-10 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    {splitTypes.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Due date + auto confirm */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">
                                Due date <span className="text-destructive">*</span>
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => clearError("due_date")}
                                        className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 text-left relative ${
                                            errors.due_date ? "border-destructive focus:ring-destructive/30" : "border-border"
                                        }`}
                                    >
                                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                        {dueDate ? format(dueDate, "d MMM yyyy") : <span className="text-muted-foreground">Pick a date</span>}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} disabled={(date) => date < new Date()} />
                                </PopoverContent>
                            </Popover>
                            {errors.due_date && <p className="text-xs text-destructive">{errors.due_date}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Auto confirm</label>
                            <button
                                type="button"
                                onClick={() => setAutoConfirm((p) => !p)}
                                className={`w-full h-11 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                    autoConfirm ? "bg-primary/10 border-primary/30 text-primary" : "bg-background border-border text-muted-foreground hover:border-border/80"
                                }`}
                            >
                                {autoConfirm ? "Enabled" : "Disabled"}
                            </button>
                            <p className="text-xs text-muted-foreground">Auto-approve payments without manual review</p>
                        </div>
                    </div>

                    {/* Bill file upload */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            Attach bill
                            <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-muted/30 hover:bg-primary/5 cursor-pointer transition-all duration-200 group">
                            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setBillFile(e.target.files?.[0] || null)} />
                            {billFile ? (
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <Receipt className="w-4 h-4 text-primary" />
                                    <span className="truncate max-w-50">{billFile.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setBillFile(null);
                                        }}
                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mb-1.5" />
                                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Click to upload bill image or PDF</p>
                                </>
                            )}
                        </label>
                        {errors.bill_file && <p className="text-xs text-destructive">{errors.bill_file}</p>}
                    </div>
                </motion.div>

                {/* Participants card */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                                <Users className="w-4 h-4 text-accent-foreground" />
                            </div>
                            <h2 className="font-semibold text-foreground">Participants</h2>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{participants.length}</span>
                        </div>
                        {splitType === "equal" && totalAmount && <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">RM {getEqualShare()} / person</span>}
                    </div>
                    {errors.participants && <p className="text-xs text-destructive">{errors.participants}</p>}

                    {/* Participant rows */}
                    <div className="space-y-3">
                        {participants.map((p, i) => (
                            <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }} className="relative bg-muted/30 rounded-xl p-4 border border-border">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Participant {i + 1}</span>
                                    {participants.length > 1 && (
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeParticipant(p.id)}
                                            className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </motion.button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="Full name *"
                                            value={p.name}
                                            onChange={(e) => {
                                                updateParticipant(p.id, "name", e.target.value);
                                                clearError(`participants.${i}.name`);
                                            }}
                                            className={`h-10 w-full px-3 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                                                errors[`participants.${i}.name`] ? "border-destructive focus:ring-destructive/30" : "border-border"
                                            }`}
                                        />
                                        {errors[`participants.${i}.name`] && <p className="text-xs text-destructive">{errors[`participants.${i}.name`]}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-1">
                                        <input
                                            type="tel"
                                            placeholder="Phone number"
                                            value={p.phone}
                                            onChange={(e) => {
                                                updateParticipant(p.id, "phone", e.target.value);
                                                clearError(`participants.${i}.phone`);
                                            }}
                                            className={`h-10 w-full px-3 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                                                errors[`participants.${i}.phone`] ? "border-destructive focus:ring-destructive/30" : "border-border"
                                            }`}
                                        />
                                        {errors[`participants.${i}.phone`] && <p className="text-xs text-destructive">{errors[`participants.${i}.phone`]}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1">
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={p.email}
                                            onChange={(e) => {
                                                updateParticipant(p.id, "email", e.target.value);
                                                clearError(`participants.${i}.email`);
                                            }}
                                            className={`h-10 w-full px-3 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                                                errors[`participants.${i}.email`] ? "border-destructive focus:ring-destructive/30" : "border-border"
                                            }`}
                                        />
                                        {errors[`participants.${i}.email`] && <p className="text-xs text-destructive">{errors[`participants.${i}.email`]}</p>}
                                    </div>

                                    {/* Amount owed */}
                                    {splitType === "custom" ? (
                                        <div className="space-y-1">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">RM</span>
                                                <input
                                                    type="number"
                                                    placeholder="Amount owed"
                                                    value={p.amount_owed}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
                                                            updateParticipant(p.id, "amount_owed", value);
                                                            clearError(`participants.${i}.amount_owed`);
                                                        }
                                                    }}
                                                    min="0"
                                                    step="0.01"
                                                    className={`h-10 pl-9 pr-3 w-full rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                                                        errors[`participants.${i}.amount_owed`] ? "border-destructive focus:ring-destructive/30" : "border-border"
                                                    }`}
                                                />
                                            </div>
                                            {errors[`participants.${i}.amount_owed`] && <p className="text-xs text-destructive">{errors[`participants.${i}.amount_owed`]}</p>}
                                        </div>
                                    ) : (
                                        <div className="h-10 px-3 rounded-lg border border-border/50 bg-muted/50 flex items-center">
                                            <span className="text-sm text-muted-foreground">RM {getEqualShare()} (auto)</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Add participant */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={addParticipant}
                        className="w-full h-11 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200"
                    >
                        <Plus className="w-4 h-4" />
                        Add participant
                    </motion.button>
                </motion.div>

                {/* Submit */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="flex gap-3 pb-8">
                    <Button type="submit" disabled={loading} className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Creating...
                            </div>
                        ) : (
                            "Create bill"
                        )}
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    );
}
