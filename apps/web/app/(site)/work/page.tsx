import Marquee from "../../../components/home/brands";
import { HowWeWork } from "../services/components/how-we-work";
import { PreFooter } from "../services/components/pre-footer";
import { AboutCapRail } from "./components/about-cap-rail";
import { AboutContent } from "./components/about-content";
import HeroSection from "./components/hero-section";
import { MarketsHolo } from "./components/market-holo/markets-holo";



export default function Page() {
 
  return (
    <>
    <HeroSection/>
    <AboutContent/>
    <AboutCapRail/>
    <Marquee/>
    <HowWeWork/>
   <MarketsHolo/>
    <PreFooter/>
    </>
  )
}