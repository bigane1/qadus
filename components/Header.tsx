"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TEL_DISPLAY, telHref } from "@/lib/contact";

const navLinks = [
  { href: "/debouchage", label: "Débouchage" },
  { href: "/curage", label: "Curage" },
  { href: "/chemisage", label: "Chemisage" },
  { href: "/inspection-camera", label: "Inspection caméra" },
  { href: "/assainissement", label: "Assainissement" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.png" alt="Qadus" width={120} height={40} style={{ width: "auto", height: "40px" }} priority />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA devis + tel */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/devis"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 border border-blue-200 hover:border-blue-400 px-3 py-2 rounded-xl transition-all"
            >
              Devis gratuit
            </Link>
          <a
            href={telHref}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 text-sm lg:text-base"
          >
            <span className="text-base">📞</span>
            <span>{TEL_DISPLAY}</span>
          </a>
          </div>

          {/* Burger mobile */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-current rounded transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-current rounded transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen border-t border-slate-100" : "max-h-0"
        } bg-white`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className="py-3 px-4 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/devis"
            onClick={handleNavClick}
            className="mt-2 flex items-center justify-center gap-2 bg-blue-700 text-white font-bold py-3 rounded-xl"
          >
            📋 Devis gratuit
          </Link>
          <a
            href={telHref}
            className="mt-2 flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 rounded-xl"
          >
            📞 {TEL_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  );
}
