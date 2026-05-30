import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
    title: "Login - SplitLah",
    description: "Track shared payments without the awkward chasing.",
};

export default function LoginPage() {
    return <LoginForm />;
}
