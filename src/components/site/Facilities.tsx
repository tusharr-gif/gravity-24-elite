import { motion } from "framer-motion";
import { Dumbbell, Activity, Zap, Target, Users, Trophy } from "lucide-react";

const items = [
  { icon: Trophy, t: "Mini Sport Turf", d: "Olympic-grade turf, floodlit, 24/7 bookable slots." },
  { icon: Activity, t: "Functional Training", d: "Sleds, ropes, plyo and mobility zones." },
  { icon: Dumbbell, t: "Strength Training", d: "Olympic platforms, racks and premium plates." },
  { icon: Zap, t: "Boxing Zone", d: "Heavy bags, speed bags and pad work ring." },
  { icon: Target, t: "CrossFit Area", d: "Rigs, kettlebells, wall balls and assault bikes." },
  { icon: Users, t: "Personal Training", d: "1-on-1 coaching tailored to your goals." },
];

export function Facilities() {
  return (
    <section id="facilities" className="relative py-28 sm:py-36 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Facilities</span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl max-w-2xl">
              EVERY <span className="text-neon">DISCIPLINE.</span><br /> ONE ROOF.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Six world-class zones engineered for serious athletes and weekend warriors alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.a
                key={it.t}
                href="#booking"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-7 transition-all hover:border-neon/60 hover:-translate-y-1"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(60%_60%_at_30%_0%,rgba(234,255,0,0.15),transparent)]" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon ring-1 ring-neon/30 transition-all group-hover:bg-neon group-hover:text-black">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-wide">{it.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-neon transition-colors">
                    Explore more
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
