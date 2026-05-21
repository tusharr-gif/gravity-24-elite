import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { n: "Aditya K.", r: "Cricket player", q: "Best turf in Pune by a mile. The lights, the surface, the vibe — feels like playing in a stadium every single time." },
  { n: "Sneha P.", r: "Member, 2 yrs", q: "Coaches actually care. I've never been this consistent at a gym. The 24/7 access is a lifesaver." },
  { n: "Vikram J.", r: "Powerlifter", q: "Premium plates, deep racks, no waiting. This is what a serious strength facility should look like." },
  { n: "Rohan D.", r: "Team captain", q: "Booked the turf for tournaments — flawless surface, easy slot booking, great staff. 10/10." },
  { n: "Anaya M.", r: "Member, 1 yr", q: "The boxing zone is unreal. Smashed every fitness goal I had within 4 months." },
  { n: "Karan S.", r: "CrossFit athlete", q: "Equipment is top-tier, community is electric. Easily the best club I've trained at." },
];

export function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Word On The Floor</span>
        <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
          LOVED BY <span className="text-neon">2,400+</span> ATHLETES.
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 marquee-track w-max">
          {[...reviews, ...reviews].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-[340px] sm:w-[400px] shrink-0 glass rounded-3xl p-6"
            >
              <div className="flex gap-0.5 text-neon">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" stroke="none" />)}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{r.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-neon text-black font-bold flex items-center justify-center">
                  {r.n[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.n}</div>
                  <div className="text-xs text-muted-foreground">{r.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
