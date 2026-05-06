import About from "@/components/About/About";
import { WhatWeDo } from "@/components/WhatWeDo/WhatWeDo";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import ShaderAnimation from "@/components/ShaderAnimation/ShaderAnimation";
import Navbar from "@/components/Navbar/Navbar";
import Principles from "@/components/WhyUs/WhyUs";
import MeasuredImpact from "@/components/MeasuredImpact/MeasuredImpact";
import LoadingWrapper from "@/components/LoadingWrapper";
import { Hero } from "@/components/Hero/Hero";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <div className="w-full h-full antialiased">
      <LoadingWrapper>
        <Navbar />
        <ShaderAnimation />
        <Hero />
        <About />
        <MeasuredImpact />
        <WhatWeDo />
        <Expertise />
        <Principles />
        <CTA />
        <Footer />
      </LoadingWrapper>
    </div>
  );
}
