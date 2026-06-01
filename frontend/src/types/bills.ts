export interface Bill {
    id: string;
    bill_uuid: string;
    title: string;
    total: number;
    collected: number;
    percent: number;
    participants: number;
    paid: number;
    due_date: string;
    status: "active" | "completed" | "cancelled" | "overdue";
}

export interface StoreBillPayload {
    title: string;
    description?: string;
    total_amount: string;
    split_type: "equal" | "custom";
    due_date: string;
    auto_confirm: boolean;
    bill_file?: File | null;
    participants: {
        name: string;
        email: string;
        phone: string;
        amount_owed?: string;
    }[];
}
