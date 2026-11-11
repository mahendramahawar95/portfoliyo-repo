// import AnimatedGridBackground from "../components/AnimatedGridBackground";
// import GradientMesh from "../components/GradientMesh";
// import Banner from "../components/home/banner";
// import TextReveal from "../components/TextReveal";
// import TiltCard from "../components/animations/TiltCard";
import Testimomials from "../../components/home/testimonials";
import { TrustSection } from "../../components/home/trust-section";
import Brands from "../../components/home/brands";
import { ImpactDelivery } from "../../components/home/impactdelivery";
import { ImpactTestimonials } from "../../components/home/impact-testimonials";
import { ScaleDock } from "../../components/home/scale-dock";
import { Faq } from "../../components/home/faq";
import { PreFooterBillboard } from "../../components/home/billboard";
import { HeroSection } from "../../components/home/hero-section";
import { OrbitCards } from "../../components/home/OrbitCards";


export default function Page() {
  // console.log("test");
  return (
    <main className="flex relative w-full flex-col items-center justify-between min-h-screen">


      <HeroSection />

      <Testimomials />
      <TrustSection />
      <Brands />
      <ImpactDelivery />
      <ImpactTestimonials />
      <ScaleDock />
      <Faq />
      <PreFooterBillboard />
  


      {/* <TiltCard className="tilt-card">
        <div className="tilt-card__icon">★</div>
        <h3 className="tilt-card__title">Card title</h3>
        <p className="tilt-card__text">Card content goes here.</p>
      </TiltCard> */}
    </main>
  );
}
