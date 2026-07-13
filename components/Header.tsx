"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TEL_DISPLAY, telHref, whatsappHref } from "@/lib/contact";
import { navLinks, navServices } from "@/lib/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

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
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.png" alt="Qadus" width={130} height={44} style={{ width: "auto", height: "44px" }} priority />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}

            {/* Dropdown Nos services */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Nos services
                <svg
                  className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xl py-2 overflow-hidden">
                    {navServices.map((s) => (
                      <Link
                        key={s.href + s.label}
                        href={s.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <span className="text-lg">{s.icon}</span>
                        <span className="font-medium">{s.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link
                        href="/#services"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        Voir toutes nos prestations →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA devis + whatsapp + tel */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/devis"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 border border-blue-200 hover:border-blue-400 px-3 py-2 rounded-xl transition-all"
            >
              Devis gratuit
            </Link>
            <a
              href={whatsappHref("Bonjour Qadus, j'ai besoin d'un devis rapide.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-green-700 hover:text-green-900 border border-green-200 hover:border-green-400 px-3 py-2 rounded-xl transition-all"
            >
              WhatsApp
            </a>
            <a
              href={telHref}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 text-sm lg:text-base"
            >
              <span className="text-base">📞</span>
              <span>{TEL_DISPLAY}</span>
            </a>
          </div>

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
          menuOpen ? "max-h-[90vh] overflow-y-auto border-t border-slate-100" : "max-h-0"
        } bg-white`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          <Link
            href="/"
            onClick={handleNavClick}
            className="py-3 px-4 text-slate-700 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/qui-sommes-nous"
            onClick={handleNavClick}
            className="py-3 px-4 text-slate-700 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Qui sommes-nous
          </Link>

          <button
            type="button"
            onClick={() => setMobileServicesOpen((o) => !o)}
            className="flex items-center justify-between py-3 px-4 text-slate-700 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
            aria-expanded={mobileServicesOpen}
          >
            Nos services
            <svg
              className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileServicesOpen && (
            <div className="ml-4 mb-2 flex flex-col gap-1 border-l-2 border-blue-100 pl-3">
              {navServices.map((s) => (
                <Link
                  key={s.href + s.label}
                  href={s.href}
                  onClick={handleNavClick}
                  className="py-2 px-3 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </Link>
              ))}
              <Link
                href="/#services"
                onClick={handleNavClick}
                className="py-2 px-3 text-sm font-semibold text-blue-700"
              >
                Voir toutes nos prestations →
              </Link>
            </div>
          )}

          {navLinks.slice(2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={handleNavClick}
              className="py-3 px-4 text-slate-700 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
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
