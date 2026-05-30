import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
    title: "Register - SplitLah",
    description: "Track shared payments without the awkward chasing.",
};
export default function RegisterPage() {
    return <RegisterForm />;
}
