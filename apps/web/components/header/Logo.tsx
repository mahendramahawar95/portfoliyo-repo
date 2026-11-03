import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center  text-lg font-bold no-underline transition-colors duration-300 text-primary"
    >
      <Cpu className="size-10 mr-2 text-primary" /> Fullstack
      <span className="text-blue-500">Dev</span>
    </Link>
  );
}
