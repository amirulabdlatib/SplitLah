// _components/StepBillDetails.tsx
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarDays, ChevronDown, Receipt } from "lucide-react";

interface StepBillDetailsProps {
    title: string;
    setTitle: (v: string) => void;
    description: string;
    setDescription: (v: string) => void;
    totalAmount: string;
    setTotalAmount: (v: string) => void;
    splitType: "equal" | "custom";
    setSplitType: (v: "equal" | "custom") => void;
    dueDate: Date | undefined;
    setDueDate: (v: Date | undefined) => void;
    autoConfirm: boolean;
    setAutoConfirm: (v: boolean) => void;
    errors: Record<string, string>;
    clearError: (key: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const splitTypes = [
    { value: "equal", label: "Split equally" },
    { value: "custom", label: "Custom amount" },
];

export function StepBillDetails({
    title,
    setTitle,
    description,
    setDescription,
    totalAmount,
    setTotalAmount,
    splitType,
    setSplitType,
    dueDate,
    setDueDate,
    autoConfirm,
    setAutoConfirm,
    errors,
    clearError,
    nextStep,
    prevStep,
}: StepBillDetailsProps) {
    return (
        <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">Bill Details</h2>
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
                        Description <span className="text-muted-foreground font-normal">(optional)</span>
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
                                onChange={(e) => setSplitType(e.target.value as "equal" | "custom")}
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
                            onClick={() => setAutoConfirm(!autoConfirm)}
                            className={`w-full h-11 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                autoConfirm ? "bg-primary/10 border-primary/30 text-primary" : "bg-background border-border text-muted-foreground hover:border-border/80"
                            }`}
                        >
                            {autoConfirm ? "Enabled" : "Disabled"}
                        </button>
                        <p className="text-xs text-muted-foreground">Auto-approve payments without manual review</p>
                    </div>
                </div>
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
