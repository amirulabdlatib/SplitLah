import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBills, storeBill } from "../api/bills";

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
