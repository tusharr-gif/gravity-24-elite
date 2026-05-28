import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gallery1 from "@/assets/gallery1.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";
import gallery7 from "@/assets/gallery7.jpg";

const imgs = [
  { src: gallery1, alt: "Interactive Boxing & Turf Zone", span: "row-span-2" },
  { src: gallery3, alt: "Premium Strength & Conditioning", span: "" },
  { src: gallery5, alt: "Dumbbell Station & Motivation Wall", span: "" },
  { src: gallery7, alt: "Elite Cable Pulley Stations", span: "row-span-2" },
  { src: gallery4, alt: "Dynamic Multi-Sport Turf", span: "row-span-2" },
  { src: gallery6, alt: "Monkey Bars & Agility Track", span: "" },
];

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Gallery</span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
              INSIDE <span className="text-neon">GRAVITY.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">A cinematic look at where champions train and matches are won.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] sm:auto-rows-[230px] gap-3 sm:gap-4">
          {imgs.map((im, i) => (
            <motion.button
              key={im.src}
              type="button"
              onClick={() => setActive(im.src)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl ${im.span}`}
            >
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-xs">
                <span className="glass rounded px-2 py-1">{im.alt}</span>
                <span className="opacity-0 group-hover:opacity-100 transition text-neon">View →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              src={active}
              alt="Preview"
              className="max-h-[90vh] max-w-[92vw] rounded-2xl border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
