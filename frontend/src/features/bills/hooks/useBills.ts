import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBills, getBill, getBillAttachment, getBills, storeBill } from "../api/bills";

export const useBills = () => {
    return useQuery({
        queryKey: ["bills"],
        queryFn: () => getBills(),
    });
};

export const useGetBill = (bill_uuid: string) => {
    return useQuery({
        queryKey: ["bills", bill_uuid],
        queryFn: () => getBill(bill_uuid),
        enabled: !!bill_uuid,
        retry: false,
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
        onSuccess: (_, bill_uuid) => {
            queryClient.removeQueries({ queryKey: ["bills", bill_uuid] });
            queryClient.invalidateQueries({ queryKey: ["bills"] });
        },
    });
};

export const useBillAttachment = (uuid: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["bill-attachment", uuid],
        queryFn: () => getBillAttachment(uuid),
        enabled,
        staleTime: Infinity,
    });
};
