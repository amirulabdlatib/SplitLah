import api from "@/lib/axios";

export const getPayment = async (token: string) => {
    const { data } = await api.get(`/api/v1/payments/${token}`);

    return data;
};
