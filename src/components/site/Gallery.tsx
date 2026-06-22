import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";
import gallery7 from "@/assets/gallery7.jpg";

const imgs = [
  { src: gallery1, alt: "Self-Defence Activity Zone" },
  { src: gallery2, alt: "Premium Turf Ground & Night Spotlights" },
  { src: gallery3, alt: "Strength & Conditioning Arena" },
  { src: gallery7, alt: "Elite Cable Pulley Stations" },
  { src: gallery5, alt: "Dumbbell Station & Motivation Wall" },
  { src: gallery4, alt: "Dynamic Multi-Sport Turf" },
  { src: gallery6, alt: "Monkey Bars & Agility Track" },
];

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onScroll = useCallback((emblaApi: any) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    onScroll(emblaApi);

    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);

    return () => {
      if (emblaApi) {
        emblaApi.off("reInit", onSelect);
        emblaApi.off("reInit", onScroll);
        emblaApi.off("select", onSelect);
        emblaApi.off("scroll", onScroll);
      }
    };
  }, [emblaApi, onSelect, onScroll]);

  return (
    <section id="gallery" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Gallery</span>
            <h2 className="mt-3 font-sans font-medium tracking-wide text-5xl sm:text-6xl lg:text-7xl uppercase text-white">
              INSIDE <span className="text-neon">GRAVITY 24.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="hidden md:block max-w-xs text-muted-foreground text-sm leading-relaxed">
              A cinematic look at where champions train and matches are won.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  prevBtnEnabled
                    ? "border-white/15 hover:border-neon hover:bg-neon/5 text-white active:scale-95"
                    : "border-white/5 text-white/20 cursor-not-allowed"
                }`}
                aria-label="Previous slide"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  nextBtnEnabled
                    ? "border-white/15 hover:border-neon hover:bg-neon/5 text-white active:scale-95"
                    : "border-white/5 text-white/20 cursor-not-allowed"
                }`}
                aria-label="Next slide"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bleeding Slider Wrapper */}
      <div className="w-full pl-[max(1rem,calc((100vw-80rem)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-4 sm:pr-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 select-none">
            {imgs.map((im, i) => (
              <div
                key={im.src}
                className="flex-[0_0_82%] sm:flex-[0_0_55%] md:flex-[0_0_42%] lg:flex-[0_0_32%] min-w-0 shrink-0"
              >
                <motion.button
                  type="button"
                  onClick={() => setActive(im.src)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="w-full aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/5 group bg-surface cursor-pointer"
                >
                  <img
                    src={im.src}
                    alt={im.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-neon">
                        / Photo {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-white/95 text-left">{im.alt}</span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition duration-300 text-neon text-sm shrink-0">
                      View →
                    </span>
                  </div>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-10">
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-neon transition-all duration-300 ease-out rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
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

