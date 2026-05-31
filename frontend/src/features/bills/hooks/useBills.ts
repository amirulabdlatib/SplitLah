import { useQuery } from "@tanstack/react-query";
import { getBills } from "../api/bills";

export const useBills = () => {
    return useQuery({
        queryKey: ["bills"],
        queryFn: () => getBills(),
    });
};
