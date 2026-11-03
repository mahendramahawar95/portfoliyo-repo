// import Image from "next/image";
// import { Hero, Button } from "@repo/ui";

import { Button } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="relative overflow-hidden glass-panel w-full">
      <Image
        src="/bg-banner-2.png"
        alt=""
        fill
        priority
        className="object-cover object-top top-0! bottom-auto! h-[86%]!"
      />
      <div className="container relative z-10 grid grid-cols-1 gap-2xl py-2xl pb-0 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left column — copy + CTAs */}
        <div className="flex flex-col items-start">
          {/* <Badge className="inline-flex items-center rounded-xs text-primary p-2 text-md font-bold bg-white">
            <Activity className="size-icon" aria-hidden="true" /> Fast treatment
          </Badge> */}
          <span className="block text-sm uppercase font  mt-0 font-semibold  text-primary ">
            hello, I'am
          </span>

          <h2 className="text-display mb-3 font-bold tracking-tight text-foreground">
            Mahendra kumar
          </h2>
          <h2 className="block text-h2  mt-0 font-bold bg-linear-to-r from-primary via-secondary to-primary-light bg-clip-text text-transparent">
            Full-Stack Developer & Digital Solutions Partner
          </h2>

          <p className="max-w-[46ch] text-body-lg text-content-secondary">
            I build fast, scalable, SEO-friendly web applications that turn
            ideas into reliable digital products.
          </p>

          <div className="mt-sm flex flex-wrap items-center gap-sm">
            <Button variant={"primary"} className="text-background">
              Book an Appointment
              <ArrowRight className="size-icon" aria-hidden="true" />
            </Button>
            {/* <Button className="text-background" variant="primary" href="#book">Book an Appointment  <ArrowRight className="size-icon" aria-hidden="true" /></Button> */}
            <Button variant={"outline"}>Explore Departments</Button>
          </div>

          {/* Trust row */}
          {/* <div className="mt-lg flex items-center gap-sm border-t border-border pt-md">
            <div className="flex -space-x-3" aria-hidden="true">
              {["A", "B", "C", "D"].map((seed) => (
                <span
                  key={seed}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-gradient-primary text-xs font-semibold text-foreground"
                >
                  {seed}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-small text-foreground">
              <Star
                className="size-4 fill-warning text-warning"
                aria-hidden="true"
              />
              <span className="font-semibold">4.9</span>
              <span className="text-content-secondary">·</span>
              <span className="text-content-secondary">
                200+ specialists online now
              </span>
            </div>
          </div> */}
        </div>
        <div className="right-colounm rounded-[20%_20%_40%_5%] shadow-xl shadow-primary/35">
          <Image
            src="/developer.png"
            alt="developer"
            height={200}
            width={200}
            className="  inset-0  object-fit "
          />
        </div>
      </div>
    </section>
  );
}
