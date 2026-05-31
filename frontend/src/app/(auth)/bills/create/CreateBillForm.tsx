"use client";

import { useStoreBill } from "@/features/bills/hooks/useBills";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { StepBillDetails } from "./_components/StepBillDetails";
import { StepIndicator } from "./_components/StepIndicator";
import { StepParticipants } from "./_components/StepParticipants";
import { StepReview } from "./_components/StepReview";
import { StepUploadBill } from "./_components/StepUploadBill";

export interface Participant {
    id: number;
    name: string;
    email: string;
    phone: string;
    amount_owed: string;
}

export const STEPS = [
    { number: 1, title: "Upload Bill" },
    { number: 2, title: "Bill Details" },
    { number: 3, title: "Participants" },
    { number: 4, title: "Review" },
];

export default function CreateBillForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Step 1
    const [billFile, setBillFile] = useState<File | null>(null);

    // Step 2
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [splitType, setSplitType] = useState<"equal" | "custom">("equal");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [autoConfirm, setAutoConfirm] = useState(false);

    // Step 3
    const [participants, setParticipants] = useState<Participant[]>([{ id: 1, name: "", email: "", phone: "", amount_owed: "" }]);

    const router = useRouter();
    const { mutateAsync: createBill, isPending: loading } = useStoreBill();

    const clearError = (key: string) => {
        setErrors((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        setErrors({});
        try {
            await createBill({
                title,
                description,
                total_amount: totalAmount,
                split_type: splitType,
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
                // go back to the step that has errors
                if (Object.keys(flattened).some((k) => k === "title" || k === "total_amount" || k === "due_date" || k === "split_type")) {
                    setCurrentStep(2);
                } else if (Object.keys(flattened).some((k) => k.startsWith("participants"))) {
                    setCurrentStep(3);
                }
            } else {
                toast.error(err?.response?.data?.message ?? "Something went wrong.");
            }
        }
    };

    const stepProps = {
        errors,
        clearError,
        nextStep,
        prevStep,
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Create a new bill</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Fill in the details and add participants.</p>
            </div>

            <StepIndicator steps={STEPS} currentStep={currentStep} />

            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                        <StepUploadBill billFile={billFile} setBillFile={setBillFile} {...stepProps} />
                    </motion.div>
                )}
                {currentStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                        <StepBillDetails
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            totalAmount={totalAmount}
                            setTotalAmount={setTotalAmount}
                            splitType={splitType}
                            setSplitType={setSplitType}
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                            autoConfirm={autoConfirm}
                            setAutoConfirm={setAutoConfirm}
                            {...stepProps}
                        />
                    </motion.div>
                )}
                {currentStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                        <StepParticipants participants={participants} setParticipants={setParticipants} splitType={splitType} totalAmount={totalAmount} {...stepProps} />
                    </motion.div>
                )}
                {currentStep === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                        <StepReview
                            billFile={billFile}
                            title={title}
                            description={description}
                            totalAmount={totalAmount}
                            splitType={splitType}
                            dueDate={dueDate}
                            autoConfirm={autoConfirm}
                            participants={participants}
                            loading={loading}
                            onSubmit={handleSubmit}
                            {...stepProps}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
