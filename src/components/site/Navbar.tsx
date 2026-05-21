import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#facilities", label: "Facilities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#membership", label: "Membership" },
  { href: "#booking", label: "Book Turf" },
  { href: "#trainers", label: "Trainers" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all ${
            scrolled ? "glass" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-neon text-black font-black text-lg">
              G
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-neon glow-neon" />
            </span>
            <span className="font-display text-xl tracking-wide">
              GRAVITY <span className="text-neon">24</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-neon after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Book Turf
              <span className="text-base">→</span>
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg glass"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-neon px-3 py-3 text-center text-sm font-semibold text-black"
              >
                Book Turf
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
