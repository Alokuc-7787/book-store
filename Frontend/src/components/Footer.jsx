import React from "react";

function Footer() {
  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Support", href: "/contact" },
    { label: "GitHub", href: "https://github.com/Alokuc-7787/book-store" },
  ];

  const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ];

  const connectLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alok-kumar-1882362a4/" },
    { label: "Email", href: "mailto:alokuc123@gmail.com" },
  ];

  const renderLinks = (links) =>
    links.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="text-sm text-slate-300 transition hover:text-pink-300"
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
      >
        {link.label}
      </a>
    ));

  return (
    <div className="mt-14 border-t border-slate-200 dark:border-slate-800">
      <footer className="bg-slate-950 text-white">
        <div className="max-w-screen-2xl container mx-auto px-4 py-10 md:px-20">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div>
              <h3 className="text-2xl font-black tracking-tight">bookStore</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                Premium online bookstore for academic books, AI recommendations,
                exchange, secure payment and faster reading.
              </p>
              <div className="mt-5 inline-flex rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-2 text-xs font-bold text-pink-200">
                AI Powered • Secure Razorpay • Student Friendly
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
                About
              </h4>
              <div className="flex flex-col gap-3">{renderLinks(companyLinks)}</div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
                Policies
              </h4>
              <div className="flex flex-col gap-3">{renderLinks(policyLinks)}</div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
                Connect
              </h4>
              <div className="flex flex-col gap-3">{renderLinks(connectLinks)}</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>Copyright 2026 BookStore. All rights reserved.</p>
            <p>500+ Books • Secure Payment • AI Powered</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
