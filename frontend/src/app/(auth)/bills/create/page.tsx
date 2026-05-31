import type { Metadata } from "next";
import CreateBillForm from "./CreateBillForm";

export const metadata: Metadata = {
    title: "Create Bill - SplitLah",
    description: "Track shared payments without the awkward chasing.",
};
export default function CreateBillPage() {
    return <CreateBillForm />;
}
