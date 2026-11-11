
import { AiSection } from "./components/ai-section";
import HeroSection  from "./components/hero-section";
import { HowWeWork } from "./components/how-we-work";
import { IndustriesSection } from "./components/industries-section";
import { PreFooter } from "./components/pre-footer";
import { ProcessSection } from "./components/process-section";
import { ServicesGrid } from "./components/ServicesGrid";
import { TechStack } from "./components/tech-stack";


export default function Page() {
 
  return (
<>
<HeroSection/>
<AiSection />
<ServicesGrid />
<HowWeWork/>
<ProcessSection/>
<IndustriesSection/>
<TechStack/>
<PreFooter/>
</>
  );
}
