export interface Bill {
    id: string;
    title: string;
    total: number;
    collected: number;
    percent: number;
    participants: number;
    paid: number;
    due_date: string;
    status: "active" | "completed" | "cancelled" | "overdue";
}
