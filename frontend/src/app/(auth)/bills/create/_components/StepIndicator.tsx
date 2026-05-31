// _components/StepIndicator.tsx
interface Step {
    number: number;
    title: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="flex items-center mb-8">
            {steps.map((step, i) => (
                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                                currentStep > step.number ? "bg-primary text-primary-foreground" : currentStep === step.number ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"
                            }`}
                        >
                            {currentStep > step.number ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step.number
                            )}
                        </div>
                        <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</span>
                    </div>
                    {i < steps.length - 1 && <div className={`h-px flex-1 mx-3 mb-5 transition-all duration-300 ${currentStep > step.number ? "bg-primary" : "bg-border"}`} />}
                </div>
            ))}
        </div>
    );
}
