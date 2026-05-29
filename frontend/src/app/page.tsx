import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CTABanner from "@/components/sections/CTABanner";
import Features from "@/components/sections/Features";
import HeroSection from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <HowItWorks />
                <Features />
                <UseCases />
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
