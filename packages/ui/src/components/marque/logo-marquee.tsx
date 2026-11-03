// packages/ui/src/components/logo-marquee.tsx
import Image from "next/image";
import { cn } from "../../lib/cn";

export interface PartnerLogo {
  name: string;
  src: string;
  href?: string;
}

interface LogoMarqueeProps {
  logos: PartnerLogo[];
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}

function LogoList({
  logos,
  hidden,
}: {
  logos: PartnerLogo[];
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-16 pe-16"
    >
      {logos.map((logo) => {
        const img = (
          <Image
            height={100}
            width={100}
            src={logo.src}
            alt={hidden ? "" : logo.name}
            loading="lazy"
            draggable={false}
            className="h-10 w-auto max-w-40 object-contain opacity-60 brightness-0 transition duration-300 group-hover/logo:opacity-100 group-hover/logo:brightness-100"
          />
        );

        return (
          <li key={logo.name} className="group/logo shrink-0">
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={hidden ? -1 : undefined}
              >
                {img}
              </a>
            ) : (
              img
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function LogoMarquee({
  logos,
  reverse = false,
  className,
  trackClassName,
}: LogoMarqueeProps) {
  return (
    <div
      dir="ltr"
      className={cn(
        "group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          trackClassName,
        )}
      >
        <LogoList logos={logos} />
        <LogoList logos={logos} hidden />
      </div>
    </div>
  );
}
