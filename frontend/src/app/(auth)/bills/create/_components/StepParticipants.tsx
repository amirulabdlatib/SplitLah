// _components/StepParticipants.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Trash2, Users } from "lucide-react";
import { Participant } from "../CreateBillForm";

interface StepParticipantsProps {
    participants: Participant[];
    setParticipants: (p: Participant[]) => void;
    splitType: "equal" | "custom";
    totalAmount: string;
    errors: Record<string, string>;
    clearError: (key: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export function StepParticipants({ participants, setParticipants, splitType, totalAmount, errors, clearError, nextStep, prevStep }: StepParticipantsProps) {
    const addParticipant = () => {
        setParticipants([...participants, { id: Date.now(), name: "", email: "", phone: "", amount_owed: "" }]);
    };

    const removeParticipant = (id: number) => {
        if (participants.length === 1) return;
        setParticipants(participants.filter((p) => p.id !== id));
    };

    const updateParticipant = (id: number, field: keyof Participant, value: string) => {
        setParticipants(participants.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    const getEqualShare = () => {
        const total = parseFloat(totalAmount);
        if (!total || participants.length === 0) return "0.00";
        return (total / participants.length).toFixed(2);
    };

    return (
        <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
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

                <div className="space-y-3">
                    {participants.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-muted/30 rounded-xl p-4 border border-border">
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
            </div>

            <div className="flex gap-3 pb-8">
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-border font-medium" onClick={prevStep}>
                    Back
                </Button>
                <Button type="button" className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" onClick={nextStep}>
                    Next
                </Button>
            </div>
        </div>
    );
}
