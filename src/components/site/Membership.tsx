import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Membership() {
  const plan = {
    name: "Yearly Membership",
    price: "₹599*",
    sub: "/ month",
    desc: "Ultimate value. Built for champions.",
    features: [
      "Everything in Yearly",
      "Full gym access",
      "CrossFit + Strength",
      "Unlimited group classes",
      "Diet & nutrition planning",
    ],
    disclaimer: "*Conditions Apply",
  };

  return (
    <section id="membership" className="relative py-28 sm:py-36 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Membership</span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
            CHOOSE YOUR <span className="text-neon">EDGE.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Premium fitness access made affordable. Real results.
          </p>
        </div>

        <div className="mt-14 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 border border-neon/30 bg-surface/80 backdrop-blur-sm hover:border-neon transition-all duration-300 shadow-[0_0_50px_-12px_rgba(56,189,248,0.2)]"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon text-black text-xs px-4 py-1 font-semibold tracking-widest uppercase border border-black shadow-lg">
              LIMITED TIME OFFER
            </span>
            <div className="font-display text-3xl text-center text-white mt-2">{plan.name}</div>
            <div className="mt-2 text-sm text-center text-muted-foreground">{plan.desc}</div>
            
            <div className="mt-6 flex flex-col items-center justify-center bg-black/40 rounded-2xl py-6 border border-white/5">
              <div className="flex items-end gap-1">
                <span className="font-display text-6xl text-neon font-black">{plan.price}</span>
                <span className="mb-2 text-sm text-muted-foreground">{plan.sub}</span>
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground tracking-wider uppercase">
                {plan.disclaimer}
              </div>
            </div>

            <ul className="mt-7 space-y-3.5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div className="rounded-full bg-neon/10 p-1">
                    <Check size={16} className="text-neon" />
                  </div>
                  <span className="text-white/90">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/918482996616"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon text-black px-5 py-3.5 font-bold transition-transform hover:scale-[1.02] glow-neon"
            >
              Join Now
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
