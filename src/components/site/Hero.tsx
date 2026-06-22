import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";

const quotes = [
  { text: "NOT JUST A GYM. IT'S A PLAYGROUND.", author: "GRAVITY 24" },
  { text: "THE ONLY BAD WORKOUT IS THE ONE THAT DIDN'T HAPPEN.", author: "CHAMPIONS TRAIN HERE" },
  { text: "DON'T WISH FOR IT. WORK FOR IT.", author: "NO EXCUSES" },
  { text: "DISCIPLINE IS THE BRIDGE BETWEEN GOALS AND ACCOMPLISHMENT.", author: "STRENGTH & HONOR" },
  { text: "YOUR ONLY LIMIT IS YOU.", author: "GRAVITY 24" },
  { text: "PAIN IS TEMPORARY. PRIDE IS FOREVER.", author: "RISE & CONQUER" }
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for highly cinematic scroll parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);
  const textXLeft = useTransform(scrollYProgress, [0, 1], ["0vw", "-8vw"]);
  const textXRight = useTransform(scrollYProgress, [0, 1], ["0vw", "8vw"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="top" ref={containerRef} className="relative min-h-[100svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Floodlit cricket turf at night with stadium spotlights at Gravity 24"
          className="h-full w-full object-cover scale-105"
          width={1920}
          height={1080}
          style={{ y: bgY, scale: bgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_20%,rgba(56,189,248,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_100%,rgba(0,0,0,0.7),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_85%_85%,rgba(251,146,60,0.12),transparent_70%)]" />
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
        <h1 className="mt-6 font-display text-[12vw] sm:text-[10vw] lg:text-[8rem] leading-[0.85] tracking-tighter uppercase select-none overflow-hidden pb-4">
          <motion.span
            style={{ x: textXLeft, y: textY, opacity: textOpacity, display: "block" }}
            initial={{ opacity: 0, x: "-8vw" }}
            animate={{ opacity: 1, x: "0vw" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]"
          >
            TRAIN HARD.
          </motion.span>
          <motion.span
            style={{ x: textXRight, y: textY, opacity: textOpacity, display: "block" }}
            initial={{ opacity: 0, x: "8vw" }}
            animate={{ opacity: 1, x: "0vw" }}
            transition={{ duration: 1.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-stroke drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)] mt-1"
          >
            PLAY <span className="text-neon glow-text-neon font-black">HARDER.</span>
          </motion.span>
        </h1>

        <motion.p
          style={{ y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground"
        >
          Premium sports turf and elite fitness experience in Pune. Built for athletes,
          weekend warriors and everyone in between.
        </motion.p>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
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

        {/* Animated Motivational Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-14 relative overflow-hidden rounded-2xl glass border border-white/5 p-6 sm:p-8 min-h-[140px] flex flex-col justify-center"
        >
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIdx}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col gap-2"
            >
              <div className="font-display text-lg sm:text-2xl lg:text-3xl font-black italic tracking-wide text-white leading-relaxed uppercase">
                "{quotes[quoteIdx].text}"
              </div>
              <div className="text-xs font-semibold tracking-[0.2em] text-neon/80 uppercase">
                // {quotes[quoteIdx].author}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Glowing Progress bar */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden">
            <motion.div
              key={quoteIdx}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-neon glow-neon"
            />
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-y border-white/5 bg-black/50 py-4 overflow-hidden">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-2xl sm:text-3xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {["MINI SPORT TURF", "STRENGTH", "BOXING", "SELF-DEFENCE ACTIVITY", "CROSSFIT", "FUNCTIONAL", "PERSONAL TRAINING", "OPEN 24/7"].map(
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
