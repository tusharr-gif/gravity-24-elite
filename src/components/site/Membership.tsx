import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "₹2,499",
    sub: "/ month",
    desc: "Try Gravity 24 with full club access.",
    features: [
      "Everything in Month",
      "Full gym access",
      "CrossFit + Strength",
      "Unlimited group classes",
      "Full body composition",
    ],
    popular: false,
  },
  {
    name: "Quarterly",
    price: "₹4,499",
    sub: "/ 3 months",
    desc: "Most chosen by serious athletes.",
    features: [
      "Everything in Quarterly",
      "Full gym access",
      "CrossFit + Strength",
      "Unlimited group classes",
      "Diet & nutrition planning",
    ],
    popular: true,
  },
  {
    name: "Half-Yearly",
    price: "₹5,999",
    sub: "/ 6 months",
    desc: "Great commitment for serious results.",
    features: [
      "Everything in Half Year",
      "Full gym access",
      "CrossFit + Strength",
      "Unlimited group classes",
      "Diet & nutrition planning",
    ],
    popular: false,
  },
  {
    name: "Yearly",
    price: "₹7,499",
    sub: "/ year",
    desc: "Ultimate value. Built for champions.",
    features: [
      "Everything in Yearly",
      "Full gym access",
      "CrossFit + Strength",
      "Unlimited group classes",
      "Diet & nutrition planning",
    ],
    popular: false,
  },
];

export function Membership() {
  return (
    <section id="membership" className="relative py-28 sm:py-36 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Membership</span>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
            CHOOSE YOUR <span className="text-neon">EDGE.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Transparent plans. No hidden fees. Cancel anytime. Real results.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 border transition-all ${
                p.popular
                   ? "bg-neon text-black border-neon glow-neon scale-[1.02] md:scale-105 z-10"
                  : "bg-surface border-white/10 hover:border-neon/40"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black text-neon text-xs px-3 py-1 font-semibold tracking-widest uppercase border border-neon">
                  Most Popular
                </span>
              )}
              <div className="font-display text-2xl">{p.name}</div>
              <div className={`mt-1 text-sm ${p.popular ? "text-black/70" : "text-muted-foreground"}`}>{p.desc}</div>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl">{p.price}</span>
                <span className={`mb-2 text-sm ${p.popular ? "text-black/70" : "text-muted-foreground"}`}>{p.sub}</span>
              </div>

              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className={`mt-0.5 shrink-0 ${p.popular ? "text-black" : "text-neon"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/918482996616"
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition-transform hover:scale-[1.02] ${
                  p.popular ? "bg-black text-neon" : "bg-neon text-black"
                }`}
              >
                Join Now
                <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
