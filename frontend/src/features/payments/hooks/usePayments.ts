import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../api/payments";

export const usePayment = (token: string) => {
    return useQuery({
        queryKey: ["payments", token],
        queryFn: () => getPayment(token),
        enabled: !!token,
    });
};
