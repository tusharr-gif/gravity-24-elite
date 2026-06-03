import { motion } from "framer-motion";
import gymImg from "@/assets/about-hero-night.jpg";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.3em] text-neon">/ About Us</span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl"
          >
            BUILT FOR <br /> <span className="text-neon">ATHLETES.</span><br />
            <span className="text-stroke">DESIGNED</span> FOR YOU.
          </motion.h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Gravity 24 isn't just a gym — it's a high-performance sports club. A premium turf,
            world-class fitness floor, boxing zone, and a community that pushes you forward
            every single rep, every single match.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {[
              "Premium Equipment",
              "Olympic-grade Turf",
              "Expert Coaches",
              "24/7 Access",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4 h-[520px] sm:h-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 overflow-hidden rounded-2xl relative group"
          >
            <img src={gymImg} alt="Premium gym interior" loading="lazy" className="h-full w-full object-cover hover-zoom" />
            <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 text-xs">
              Strength Floor
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="h-28 sm:h-36 rounded-2xl bg-neon text-black p-6 flex items-center justify-between glow-neon"
          >
            <div>
              <div className="font-display text-4xl sm:text-5xl">10+ Years</div>
              <div className="text-sm font-medium">Of building champions in Pune.</div>
            </div>
            <span className="text-5xl">→</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
