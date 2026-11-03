import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navigation } from "./navigation";

export default function DesktopNavigation() {
  return (
    <ul className="m-0 hidden list-none items-center gap-8 p-0 xl:flex">
      {navigation.map((item) => {
        const hasChildren = !!item.children?.length;
        // const isWide = (item.children?.length ?? 0) > 6;

        return (
          <li key={item.href} className="group relative">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 py-2 font-medium text-foreground no-underline transition-colors duration-300 hover:text-primary"
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 text-content-secondary transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary group-focus-within:rotate-180"
                />
              )}
            </Link>

            {/* {hasChildren && (
              <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <ul
                  className={`m-0 grid list-none gap-x-2 rounded-lg border border-border bg-card p-2 shadow-lg ${
                    isWide ? "grid-cols-2 min-w-95" : "min-w-55"
                  }`}
                >
                  {item.children!.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block whitespace-nowrap rounded-md px-3 py-2 text-small text-foreground no-underline transition-colors duration-200 hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </li>
        );
      })}
    </ul>
  );
}
