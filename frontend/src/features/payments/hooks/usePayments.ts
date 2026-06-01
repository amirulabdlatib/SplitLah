import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmPayment, getPayment } from "../api/payments";

export const usePayment = (token: string) => {
    return useQuery({
        queryKey: ["payments", token],
        queryFn: () => getPayment(token),
        enabled: !!token,
    });
};

export const useConfirmPayment = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (receipt?: File) => confirmPayment(token, receipt),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments", token] });
        },
    });
};
