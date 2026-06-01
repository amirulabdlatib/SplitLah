// _components/StepUploadBill.tsx
import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";
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

                <ImageDropzone value={billFile} onChange={setBillFile} error={errors.bill_file} />
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
