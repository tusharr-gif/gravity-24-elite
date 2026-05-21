import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";
import t1 from "@/assets/trainer1.jpg";
import t2 from "@/assets/trainer2.jpg";
import t3 from "@/assets/trainer3.jpg";

const trainers = [
  { img: t1, name: "Rohit Sharma", role: "Head Strength Coach", exp: "8 yrs" },
  { img: t2, name: "Priya Iyer", role: "Functional & HIIT", exp: "6 yrs" },
  { img: t3, name: "Arjun Mehta", role: "Boxing & MMA", exp: "10 yrs" },
];

export function Trainers() {
  return (
    <section id="trainers" className="relative py-28 sm:py-36 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Coaches</span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
              MEET THE <span className="text-neon">PROS.</span>
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neon">{t.role}</div>
                    <div className="font-display text-3xl mt-1">{t.name}</div>
                    <div className="text-xs text-muted-foreground">Experience · {t.exp}</div>
                  </div>
                  <div className="flex gap-1.5">
                    {[Instagram, Twitter, Youtube].map((Icon, idx) => (
                      <a key={idx} href="#" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-neon hover:text-black transition">
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
