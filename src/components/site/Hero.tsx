import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";

const stats = [
  { v: "2,400+", l: "Active Members" },
  { v: "18K+", l: "Matches Played" },
  { v: "24/7", l: "Always Open" },
  { v: "20+", l: "Certified Coaches" },
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Floodlit cricket turf at night with stadium spotlights at Gravity 24"
          className="h-full w-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_20%,rgba(234,255,0,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_100%,rgba(0,0,0,0.7),transparent_70%)]" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-neon/60"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `pulseRing ${3 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 sm:px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex items-center gap-3"
        >
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon">
            <span className="absolute inset-0 rounded-full bg-neon pulse-ring" />
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Pune · Narhe · 24/7 Open
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-6 font-display text-[14vw] sm:text-[10vw] lg:text-[8.5rem] leading-[0.85]"
        >
          TRAIN HARD. <br />
          <span className="text-stroke">PLAY</span> <span className="text-neon">HARDER.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground"
        >
          Premium sports turf and elite fitness experience in Pune. Built for athletes,
          weekend warriors and everyone in between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03] glow-neon"
          >
            Book Turf Slot
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#membership"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-white/10"
          >
            Join the Gym
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl glass"
        >
          {stats.map((s) => (
            <div key={s.l} className="p-5 sm:p-6 bg-surface/40">
              <div className="font-display text-3xl sm:text-4xl text-neon">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-y border-white/5 bg-black/50 py-4 overflow-hidden">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-2xl sm:text-3xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {["CRICKET TURF", "STRENGTH", "BOXING", "CROSSFIT", "FUNCTIONAL", "PERSONAL TRAINING", "OPEN 24/7"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-12 text-muted-foreground">
                    {t}
                    <span className="text-neon">◆</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
