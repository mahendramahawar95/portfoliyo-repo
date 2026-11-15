import { PreFooter } from "../services/components/pre-footer";
import { CareersBanner } from "./components/careers-banner";
import { CultureCards } from "./components/culture-cards";
import { OpeningsSection } from "./components/openings-section";
import { PerksSection } from "./components/perks-section";

export default function Page() {
 
  return (
    <>
    <CareersBanner/>
    <CultureCards/>
    <OpeningsSection/>
    <PerksSection/>
    <PreFooter/>
    </>
  )
}