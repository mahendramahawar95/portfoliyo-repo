"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "./navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="block xl:hidden h-11.5 w-11.5 cursor-pointer rounded-sm border-0 bg-primary text-white"
        onClick={() => setOpen(true)}
        aria-label="Open Menu"
      >
        ☰
      </button>

      {open && (
        <>
          <div
            className=" fixed inset-0 bg-overlay"
            onClick={() => setOpen(false)}
          />

          <aside className="fixed top-0 right-0 w-80 max-w-full h-screen p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3>Menu</h3>

              <button
                className="border-0 bg-transparent"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <ul className="margin-0 list-none padding-0">
              {navigation.map((item) => (
                <li className="border-b border-border" key={item.href}>
                  <Link
                    className="block py-3 text-base font-medium"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/appointment"
              className="flex mt-6 w-full justify-center height-12 text-center py-3 bg-primary text-white "
            >
              Book Appointment
            </Link>
          </aside>
        </>
      )}
    </>
  );
}
