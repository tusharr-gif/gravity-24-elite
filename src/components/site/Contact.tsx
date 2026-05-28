import { Instagram, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";

const phones = ["+91 84829 96616", "+91 72186 06616", "+91 70207 04956"];

export function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Visit Us</span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
            COME FEEL <br /> THE <span className="text-neon">GRAVITY.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md">
            Walk in any time. We're open 24/7 for members and turf bookings.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 glass rounded-2xl p-4">
              <MapPin className="text-neon shrink-0 mt-1" size={18} />
              <div className="text-sm">
                <div className="font-semibold">GRAVITY 24 Sport Gym</div>
                <div className="text-muted-foreground">
                  Bhadawale complex, S. No 37/2, Above Balaji Traders,<br />
                  Top floor, Shree Control Chowk, Narhe,<br />
                  Pune, Maharashtra 411041
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="group glass rounded-2xl p-4 flex items-center gap-3 hover:border-neon transition"
                >
                  <Phone size={16} className="text-neon" />
                  <span className="text-sm font-medium">{p}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/917020704956"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-3 font-semibold text-black glow-neon hover:scale-[1.02] transition"
              >
                <Send size={16} /> WhatsApp Us
              </a>
              <a
                href="https://instagram.com/gravityy_24"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
              >
                <Instagram size={16} /> @gravityy_24
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden border border-white/10 relative min-h-[420px] group/map"
        >
          <iframe
            title="Gravity 24 Sports Gym location"
            src="https://www.google.com/maps?q=Gravity+24+sport+Gym+Narhe+Pune&output=embed"
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.7) contrast(0.95)" }}
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Gravity+24+sport+Gym+Narhe+Pune"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-xl bg-black/80 hover:bg-black border border-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-neon"
          >
            <MapPin size={14} className="text-neon" />
            Open in Google Maps
          </a>
        </motion.div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/917020704956"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-neon text-black flex items-center justify-center glow-neon hover:scale-110 transition"
        aria-label="WhatsApp"
      >
        <Send size={20} />
      </a>
    </section>
  );
}
