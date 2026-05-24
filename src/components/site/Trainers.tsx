import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star, ShieldCheck } from "lucide-react";
import certificateImg from "@/assets/certificate.jpg";

// Cinematic word-by-word animation helper
function AnimatedHeading({
  text,
  className,
  highlightWords = [],
  delay = 0,
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word);
        return (
          <motion.span
            key={i}
            className={`inline-block mr-[0.25em] ${isHighlight ? "text-neon" : ""}`}
            initial={{ opacity: 0, y: 60, filter: "blur(12px)", skewX: -5 }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)", skewX: 0 }
                : { opacity: 0, y: 60, filter: "blur(12px)", skewX: -5 }
            }
            transition={{
              duration: 0.65,
              delay: delay + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

// Cinematic character-by-character for the section title
function AnimatedChars({
  text,
  className,
  neonChars = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  neonChars?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const chars = text.split("");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => {
        const isNeon = neonChars.includes(char) && char !== " ";
        return (
          <motion.span
            key={i}
            className={`inline-block ${char === " " ? "mr-[0.3em]" : ""} ${isNeon ? "text-neon" : ""}`}
            initial={{ opacity: 0, y: 80, rotateX: -90, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 80, rotateX: -90, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.55,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
}

export function Trainers() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="trainers" className="relative py-28 sm:py-36 bg-surface/30 overflow-hidden">
      {/* Cinematic background glow */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-neon/5 blur-[120px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-neon/8 blur-[100px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header — cinematic char reveal */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              className="text-xs uppercase tracking-[0.4em] text-neon font-bold"
              initial={{ opacity: 0, x: -30 }}
              animate={sectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              ⚡ Head Coach
            </motion.span>

            <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-8xl leading-none font-black tracking-tighter">
              <AnimatedChars
                text="MEET THE PRO."
                neonChars="PRO."
                delay={0.2}
              />
            </h2>
          </div>

          {/* Animated neon line accent */}
          <motion.div
            className="h-[2px] flex-1 min-w-[60px] bg-gradient-to-r from-neon/60 to-transparent rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface flex flex-col lg:flex-row"
        >
          {/* Neon border glow on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_60px_rgba(0,255,200,0.05)]" />

          {/* Certificate / Profile Image */}
          <motion.div
            className="lg:w-5/12 bg-black/40 p-6 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative min-h-[300px] lg:min-h-0"
            initial={{ opacity: 0, x: -60 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={certificateImg}
                alt="Chetan Balasaheb Dhumane Certificate"
                loading="lazy"
                className="w-full h-auto max-h-[350px] lg:max-h-[500px] object-contain rounded-lg shadow-2xl border border-white/20 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Bio Section */}
          <div className="p-8 sm:p-12 lg:w-7/12 flex flex-col justify-center bg-gradient-to-br from-surface to-black/50">
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: 30 }}
              animate={sectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Award className="text-neon h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">
                Certified Expert
              </span>
            </motion.div>

            {/* Name — cinematic word reveal */}
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight font-black tracking-tight">
              <AnimatedHeading
                text="CHETAN BALASAHEB"
                delay={0.7}
              />
              <br />
              <AnimatedHeading
                text="DHUMANE"
                highlightWords={["DHUMANE"]}
                delay={0.95}
              />
            </h3>

            {/* Animated neon divider */}
            <motion.div
              className="h-[3px] w-0 bg-gradient-to-r from-neon to-neon/30 mb-8 rounded-full"
              animate={sectionInView ? { width: "5rem" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Bio paragraph */}
            <motion.p
              className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              With{" "}
              <span className="text-white font-bold">
                over 10+ years of dedicated experience
              </span>{" "}
              in professional fitness training and lifesaving instruction.
              Certified and recognized for excellence in resuscitation and
              advanced training methodologies, bringing unparalleled expertise
              to help you achieve peak physical condition safely and effectively.
            </motion.p>

            {/* Stats grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-auto">
              {[
                {
                  icon: <ShieldCheck className="text-neon h-6 w-6" />,
                  title: "Certified Lifesaver",
                  desc: "Astitva Lifesaving Training & H.R.S. India Pvt. Ltd. Resuscitation Certified.",
                  delay: 1.25,
                },
                {
                  icon: <Star className="text-neon h-6 w-6" />,
                  title: "10+ Years Experience",
                  desc: "A decade of transforming lives through disciplined training programs.",
                  delay: 1.35,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: item.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="h-12 w-12 rounded-full glass flex items-center justify-center shrink-0 border border-neon/20 group-hover:border-neon/50 transition-colors duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
