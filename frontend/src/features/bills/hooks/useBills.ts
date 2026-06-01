import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBills, getBill, getBillAttachment, getBills, storeBill, toggleParticipantStatus } from "../api/bills";

type ToggleParticipantStatusPayload = {
    bill_uuid: string;
    participant_id: number;
    status: string;
};

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

export const useToggleParticipantStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ participant_id, status }: ToggleParticipantStatusPayload) => toggleParticipantStatus({ participant_id, status }),
        onSuccess: (_, { bill_uuid }) => {
            queryClient.invalidateQueries({ queryKey: ["bills", bill_uuid] });
        },
    });
};
