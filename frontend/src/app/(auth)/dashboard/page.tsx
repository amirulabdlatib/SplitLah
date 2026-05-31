import { Metadata } from "next";
import DashboardClientPage from "./DashboardClientPage";

export const metadata: Metadata = {
    title: "Dashboard - SplitLah",
    description: "Track shared payments without the awkward chasing.",
};

export default function DashboardPage() {
    return <DashboardClientPage />;
}
