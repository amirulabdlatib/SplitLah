import api from "@/lib/axios";

export const getPayment = async (token: string) => {
    const { data } = await api.get(`/api/v1/payments/${token}`);

    return data;
};

export const confirmPayment = async (token: string, receipt?: File) => {
    const formData = new FormData();

    if (receipt) {
        formData.append("receipt", receipt);
    }

    const { data } = await api.post(`/api/v1/payments/${token}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { _method: "PATCH" },
    });

    return data;
};
