// _components/StepReview.tsx
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarDays, CheckCircle2, FileText, Receipt, Users } from "lucide-react";
import { Participant } from "../CreateBillForm";

interface StepReviewProps {
    billFile: File | null;
    title: string;
    description: string;
    totalAmount: string;
    splitType: "equal" | "custom";
    dueDate: Date | undefined;
    autoConfirm: boolean;
    participants: Participant[];
    loading: boolean;
    onSubmit: () => void;
    errors: Record<string, string>;
    clearError: (key: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export function StepReview({ billFile, title, description, totalAmount, splitType, dueDate, autoConfirm, participants, loading, onSubmit, prevStep }: StepReviewProps) {
    const equalShare = participants.length > 0 ? (parseFloat(totalAmount || "0") / participants.length).toFixed(2) : "0.00";

    return (
        <div className="space-y-4">
            {/* Bill summary */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">Bill Summary</h2>
                </div>

                {billFile && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{billFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(billFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">Title</span>
                        <span className="text-sm font-medium text-foreground text-right max-w-48">{title || "—"}</span>
                    </div>
                    {description && (
                        <div className="flex justify-between items-start">
                            <span className="text-sm text-muted-foreground">Description</span>
                            <span className="text-sm text-foreground text-right max-w-48">{description}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Amount</span>
                        <span className="text-sm font-semibold text-foreground">RM {parseFloat(totalAmount || "0").toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Split Type</span>
                        <span className="text-sm font-medium text-foreground capitalize">{splitType === "equal" ? "Split equally" : "Custom amount"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Due Date</span>
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{dueDate ? format(dueDate, "d MMM yyyy") : "—"}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Auto Confirm</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${autoConfirm ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{autoConfirm ? "Enabled" : "Disabled"}</span>
                    </div>
                </div>
            </div>

            {/* Participants summary */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Users className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <h2 className="font-semibold text-foreground">Participants</h2>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{participants.length}</span>
                </div>

                <div className="space-y-2">
                    {participants.map((p, i) => (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-semibold text-primary">{i + 1}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{p.name || "—"}</p>
                                    <p className="text-xs text-muted-foreground">{p.email}</p>
                                    <p className="text-xs text-muted-foreground">{p.phone}</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-foreground">RM {splitType === "equal" ? equalShare : parseFloat(p.amount_owed || "0").toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* Total check for custom */}
                {splitType === "custom" && (
                    <div
                        className={`flex justify-between items-center p-3 rounded-xl border ${
                            Math.abs(participants.reduce((acc, p) => acc + parseFloat(p.amount_owed || "0"), 0) - parseFloat(totalAmount || "0")) > 0.01 ? "bg-destructive/5 border-destructive/30" : "bg-primary/5 border-primary/20"
                        }`}
                    >
                        <span className="text-sm font-medium text-foreground">Participants total</span>
                        <span className={`text-sm font-semibold ${Math.abs(participants.reduce((acc, p) => acc + parseFloat(p.amount_owed || "0"), 0) - parseFloat(totalAmount || "0")) > 0.01 ? "text-destructive" : "text-primary"}`}>
                            RM {participants.reduce((acc, p) => acc + parseFloat(p.amount_owed || "0"), 0).toFixed(2)} / RM {parseFloat(totalAmount || "0").toFixed(2)}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex gap-3 pb-8">
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-border font-medium" onClick={prevStep}>
                    Back
                </Button>
                <Button type="button" disabled={loading} onClick={onSubmit} className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Creating...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Confirm & Create Bill
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
}
