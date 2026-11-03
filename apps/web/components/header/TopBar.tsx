import Link from "next/link";
import { FacebookIcon } from "../icons/FacebookIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { Clock, Mail, Phone } from "lucide-react";

export default function TopBar() {
  const socialClass =
    "flex h-[25px] w-[25px] items-center justify-center rounded-full bg-black text-white transition-all duration-500";
  return (
    <div
      className="bg-surface-secondary border-b border-border lg:flex hidden"
      aria-label="Top Bar"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="*:flex *:items-center *:gap-1  flex gap-4 items-center text-sm *:text-sm *:text-text-secondary *:no-underline">
            <a href="tel:+18001234567">
              <Phone className="size-4  text-primary" />
              +1 (800) 123 4567
            </a>

            <a href="mailto:info@fulstackdev.com">
              <Mail className="size-4  text-primary" />
              info@fulstack.com
            </a>

            <span>
              <Clock className="size-4  text-primary" />
              Mon - Sat : 8:00 AM - 8:00 PM
            </span>
          </div>

          <ul className="flex items-center gap-3.5">
            <li>
              <Link
                href="/"
                className={`${socialClass} hover:bg-blue-600 hover:text-white`}
              >
                <FacebookIcon className="size-3" />
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className={`${socialClass} hover:bg-sky-500 hover:text-white`}
              >
                <TwitterIcon className="size-3" />
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className={`${socialClass} hover:bg-blue-700 hover:text-white`}
              >
                <LinkedInIcon className="size-3" />
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className={`${socialClass} hover:bg-pink-500 hover:text-white`}
              >
                <InstagramIcon className="size-3" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
