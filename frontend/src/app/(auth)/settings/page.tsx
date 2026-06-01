import type { Metadata } from "next";
import SettingsClientPage from "./SettingsClientPage";

export const metadata: Metadata = {
    title: "Settings - SplitLah",
    description: "Track shared payments without the awkward chasing.",
};
export default function SettingsPage() {
    return <SettingsClientPage />;
}
