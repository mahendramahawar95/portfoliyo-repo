import AnimatedGridBackground from "../../../components/animations/AnimatedGridBackground";
// import MainBackground from "../../../components/animations/MainBackground";
import { PreFooterBillboard } from "../../../components/home/billboard";
import { AiHero } from "./components/ai-hero";
import { AiPractice } from "./components/ai-practice";
import { AiSpotlight } from "./components/ai-spotlight/ai-spotlight";


export default function Page() {
 
  return (
<div className="relative">
<AnimatedGridBackground theme="dark" className="bg-transparent" cellSize={45} />
<AiHero/>
<AiSpotlight/>
<AiPractice/>
<PreFooterBillboard/>
</div>
  );
}
