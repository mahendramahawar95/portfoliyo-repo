import LightGradientMesh from "./LightGradientMesh";
import ParticleNetwork from "./ParticleNetwork";

export default function MainBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden"
    >
      <LightGradientMesh
        orangeX={0.0} // left circle position (0-1)
        blueX={0.78} // right circle position (0-1)
        drift={0.05} // how far they move; 0 = no horizontal movement
        size={0.5} // smaller = wider gap
      />
      <ParticleNetwork
        density={9} // particles per 100,000px²
        maxParticles={50}
        speed={0.4}
        connectionDistance={150}
        mouseRadius={190}
        interaction="attract" // or "repel"
      />
    </div>
  );
}