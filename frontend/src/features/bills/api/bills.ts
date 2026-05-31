import api from "@/lib/axios";

export const getBills = async () => {
    const { data } = await api.get("/api/v1/bills");
    return data.bills;
};
