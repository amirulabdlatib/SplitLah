"use client";

import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { useAuthUser } from "@/stores/auth.selectors";
import { motion } from "framer-motion";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const banks = ["Maybank", "CIMB Bank", "Public Bank", "RHB Bank", "Hong Leong Bank", "AmBank", "Bank Islam", "Bank Rakyat", "BSN", "OCBC Bank", "Standard Chartered", "HSBC Bank", "Touch 'n Go eWallet", "Boost", "GrabPay", "ShopeePay"];

export default function SettingsPage() {
    const [bankName, setBankName] = useState("Maybank");
    const [accNo, setAccNo] = useState("1234 5678 9012");
    const [qrFile, setQrFile] = useState<File | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const user = useAuthUser();

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
                <p className="text-sm text-muted-foreground mt-0.5">Manage your payment details.</p>
            </div>
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
                        <Combobox items={banks} value={bankName} onValueChange={(val) => setBankName(val ?? "")}>
                            <ComboboxInput placeholder="Select bank or e-wallet..." />
                            <ComboboxContent>
                                <ComboboxEmpty>No results found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    {/* Account number */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Account number</label>
                        <input
                            type="text"
                            placeholder="e.g. 1234 5678 9012"
                            value={accNo}
                            onChange={(e) => setAccNo(e.target.value)}
                            className="w-full h-11 px-4 rounded-lg border border-input bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
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
                                <span className="font-medium text-foreground">{user?.name}</span>
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

                    <div className="flex justify-end pt-5">
                        <Button
                            type="submit"
                            disabled={paymentLoading}
                            className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            {paymentLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                "Save payment details"
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
