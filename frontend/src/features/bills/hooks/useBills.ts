import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBills, getBills, storeBill } from "../api/bills";

export const useBills = () => {
    return useQuery({
        queryKey: ["bills"],
        queryFn: () => getBills(),
    });
};

export const useStoreBill = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: storeBill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bills"] });
        },
    });
};

export const useDeleteBills = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBills,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bills"] });
        },
    });
};
