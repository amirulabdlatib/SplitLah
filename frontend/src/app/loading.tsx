import { Wallet } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-background">
            {/* Logo mark */}
            <div className="relative flex items-center justify-center mb-6">
                {/* Ping ring */}
                <span className="absolute w-16 h-16 rounded-2xl bg-primary/20 animate-ping" />

                {/* Icon box */}
                <div className="relative w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                    <Wallet className="w-7 h-7 text-primary-foreground" />
                </div>
            </div>

            {/* App name */}
            <p className="font-bold text-xl text-foreground tracking-tight mb-1">
                Split<span className="text-primary">Lah</span>
            </p>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground mb-8">Split bills, not friendships.</p>

            {/* Progress bar */}
            <div className="w-40 h-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary animate-[loading_1.4s_ease-in-out_infinite]" />
            </div>

            <style>{`
                @keyframes loading {
                    0% { width: 0%; margin-left: 0%; }
                    50% { width: 60%; margin-left: 20%; }
                    100% { width: 0%; margin-left: 100%; }
                }
            `}</style>
        </div>
    );
}
