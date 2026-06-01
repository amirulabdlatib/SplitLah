// _components/StepUploadBill.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Receipt, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface StepUploadBillProps {
    billFile: File | null;
    setBillFile: (file: File | null) => void;
    errors: Record<string, string>;
    clearError: (key: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export function StepUploadBill({ billFile, setBillFile, errors, nextStep }: StepUploadBillProps) {
    const router = useRouter();

    return (
        <motion.div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">Upload Bill</h2>
                </div>

                <p className="text-sm text-muted-foreground">Upload a photo of your bill. This is optional — you can skip this step.</p>

                <label className="flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-muted/30 hover:bg-primary/5 cursor-pointer transition-all duration-200 group">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setBillFile(e.target.files?.[0] || null)} />
                    {billFile ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Receipt className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-foreground truncate max-w-xs">{billFile.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{(billFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setBillFile(null);
                                }}
                                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Click to upload</p>
                                <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG or JPEG — max 1MB</p>
                            </div>
                        </div>
                    )}
                </label>
                {errors.bill_file && <p className="text-xs text-destructive">{errors.bill_file}</p>}
            </div>

            <div className="flex gap-3 pb-8">
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-border font-medium" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="button" className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" onClick={nextStep}>
                    {billFile ? "Next" : "Skip"}
                </Button>
            </div>
        </motion.div>
    );
}
