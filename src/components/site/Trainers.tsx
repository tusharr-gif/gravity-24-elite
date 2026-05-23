import { motion } from "framer-motion";
import { Award, Star, ShieldCheck } from "lucide-react";
import t1 from "@/assets/trainer1.jpg";

export function Trainers() {
  return (
    <section id="trainers" className="relative py-28 sm:py-36 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Head Coach</span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
              MEET THE <span className="text-neon">PRO.</span>
            </h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface flex flex-col lg:flex-row"
        >
          {/* Certificate / Profile Image */}
          <div className="lg:w-2/5 aspect-[4/3] lg:aspect-auto overflow-hidden relative">
            <img
              src={t1}
              alt="Chetan Balasaheb Dhumane"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
          </div>

          {/* Bio Section */}
          <div className="p-8 sm:p-12 lg:w-3/5 flex flex-col justify-center bg-gradient-to-br from-surface to-black/50">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-neon h-6 w-6" />
              <span className="text-sm uppercase tracking-widest text-neon font-semibold">Certified Expert</span>
            </div>
            
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight">
              CHETAN BALASAHEB <br className="hidden sm:block" />
              <span className="text-neon">DHUMANE</span>
            </h3>
            
            <div className="h-1 w-20 bg-neon mb-8 rounded-full" />
            
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8">
              With <span className="text-white font-semibold">over 10+ years of dedicated experience</span> in professional fitness training and lifesaving instruction. 
              Certified and recognized for excellence in resuscitation and advanced training methodologies, bringing unparalleled expertise to help you achieve peak physical condition safely and effectively.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-auto">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full glass flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-neon h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Certified Lifesaver</h4>
                  <p className="text-sm text-muted-foreground mt-1">Astitva Lifesaving Training & H.R.S. India Pvt. Ltd. Resuscitation Certified.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full glass flex items-center justify-center shrink-0">
                  <Star className="text-neon h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">10+ Years Experience</h4>
                  <p className="text-sm text-muted-foreground mt-1">A decade of transforming lives through disciplined training programs.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
