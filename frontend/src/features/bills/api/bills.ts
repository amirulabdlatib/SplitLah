import api from "@/lib/axios";
import { StoreBillPayload } from "@/types/bills";

export const getBills = async () => {
    const { data } = await api.get("/api/v1/bills");

    return data.bills;
};

export const getBill = async (bill_uuid: string) => {
    const { data } = await api.get(`/api/v1/bills/${bill_uuid}`);
    return data;
};

export const storeBill = async (payload: StoreBillPayload) => {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("description", payload.description ?? "");
    formData.append("total_amount", payload.total_amount);
    formData.append("split_type", payload.split_type);
    formData.append("due_date", payload.due_date);
    formData.append("auto_confirm", payload.auto_confirm ? "1" : "0");

    if (payload.bill_file) {
        formData.append("bill_file", payload.bill_file);
    }

    payload.participants.forEach((p, i) => {
        formData.append(`participants[${i}][name]`, p.name);
        formData.append(`participants[${i}][email]`, p.email);
        formData.append(`participants[${i}][phone]`, p.phone);
        if (payload.split_type === "custom" && p.amount_owed) {
            formData.append(`participants[${i}][amount_owed]`, p.amount_owed);
        }
    });

    const { data } = await api.post("/api/v1/bills", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
};

export const deleteBills = async (bill_uuid: string) => {
    await api.delete(`/api/v1/bills/${bill_uuid}`);
};

export const getBillAttachment = async (bill_uuid: string) => {
    const res = await api.get(`/api/v1/bills/${bill_uuid}/attachment`, { responseType: "blob" });
    return URL.createObjectURL(res.data);
};
