import api from "@/lib/axios";

export interface SettingsData {
    bank_name: string;
    acc_no: string;
    qr_url: string | null;
}

export async function fetchSettings(): Promise<SettingsData> {
    const { data } = await api.get<SettingsData>("/api/v1/settings");
    return data;
}

export async function updateSettings(payload: { bank_name: string; acc_no: string; qr_file?: File | null }): Promise<SettingsData & { message: string }> {
    const form = new FormData();
    form.append("bank_name", payload.bank_name);
    form.append("acc_no", payload.acc_no);
    if (payload.qr_file) {
        form.append("qr_file", payload.qr_file);
    }

    form.append("_method", "PATCH");

    const { data } = await api.post("/api/v1/settings", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
}
