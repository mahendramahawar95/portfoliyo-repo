"use client";

import { useState } from "react";
import { Input } from "@repo/ui";
import { Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Subscribed:", email);
  };

  const columns = [
    {
      heading: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Blog & Insights",
        "Contact Us",
      ],
    },
    {
      heading: "Services",
      links: [
        "Full-Stack Development",
        "Web & Mobile Apps",
        "UI/UX Design",
        "Cloud & DevOps",
        "AI & Automation",
      ],
    },
    {
      heading: "Solutions",
      links: [
        "SaaS Platforms",
        "E-commerce",
        "Fintech Apps",
        "Enterprise Dashboards",
        "Legacy Modernization",
      ],
    },
    {
      heading: "Quick Links",
      links: [
        "Case Studies",
        "FAQs",
        "Privacy Policy",
        "Terms of Service",
        "Support",
      ],
    },
  ];

  return (
    <footer className="border-t w-full border-border bg-background rounded-xl ">
      <div className="container  py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Right: Subscribe - 30% */}
          <div className="w-full lg:w-[30%]">
            <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for engineering insights, product
              updates, and tips on building scalable software.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                leftIcon={<Mail size={16} />}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-primary text-white font-medium h-10 hover:bg-gradient-secondary transition-all duration-300"
              >
                Subscribe
              </button>
            </form>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
          {/* Left: Links - 70% */}
          <div className="w-full lg:w-[70%]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {columns.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-sm font-semibold mb-4">{col.heading}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
