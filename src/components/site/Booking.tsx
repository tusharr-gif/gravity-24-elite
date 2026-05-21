import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Check, Clock } from "lucide-react";

const slots = [
  "06:00", "07:00", "08:00", "09:00", "10:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
];

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
}

export function Booking() {
  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  const [date, setDate] = useState<Date>(days[0]);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [done, setDone] = useState(false);

  const canSubmit = slot && form.name.trim() && form.phone.trim().length >= 10;

  return (
    <section id="booking" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon">/ Book Your Slot</span>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
              RESERVE THE <span className="text-neon">TURF.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Real-time slot availability. Confirm in seconds. Pay on arrival or online.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Date / Slot picker */}
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon size={16} className="text-neon" />
              Select date
            </div>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-7 gap-2">
              {days.map((d) => {
                const active = d.toDateString() === date.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => { setDate(d); setSlot(null); }}
                    className={`rounded-xl p-3 text-center text-sm transition border ${
                      active
                        ? "bg-neon text-black border-neon"
                        : "border-white/10 hover:border-neon/40 text-muted-foreground"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wider">{formatDate(d).split(",")[0]}</div>
                    <div className="font-display text-2xl mt-1">{d.getDate()}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} className="text-neon" />
              Select time slot
            </div>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((s) => {
                const active = s === slot;
                const taken = (s === "18:00" || s === "20:00") && date.getDate() % 2 === 0;
                return (
                  <button
                    key={s}
                    disabled={taken}
                    onClick={() => setSlot(s)}
                    className={`relative rounded-xl px-3 py-3 text-sm border transition ${
                      taken
                        ? "border-white/5 text-muted-foreground/40 line-through cursor-not-allowed"
                        : active
                          ? "bg-neon text-black border-neon"
                          : "border-white/10 hover:border-neon/40"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-surface p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-neon/10 blur-3xl" />
            <h3 className="font-display text-3xl">Booking Summary</h3>
            <div className="mt-4 text-sm text-muted-foreground space-y-1">
              <div>Date: <span className="text-foreground">{formatDate(date)}</span></div>
              <div>Slot: <span className="text-foreground">{slot ?? "—"}</span></div>
              <div>Duration: <span className="text-foreground">1 hour</span></div>
              <div>Price: <span className="text-neon">₹1,200</span></div>
            </div>

            <div className="mt-6 space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 outline-none focus:border-neon"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                placeholder="Phone (10 digits)"
                inputMode="numeric"
                className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 outline-none focus:border-neon"
              />
            </div>

            <button
              disabled={!canSubmit}
              onClick={() => setDone(true)}
              className={`mt-5 w-full rounded-full px-5 py-3.5 font-semibold transition ${
                canSubmit
                  ? "bg-neon text-black glow-neon hover:scale-[1.02]"
                  : "bg-white/10 text-muted-foreground cursor-not-allowed"
              }`}
            >
              Confirm Booking
            </button>
            <div className="mt-3 text-xs text-muted-foreground text-center">
              No card required. Pay on arrival or via UPI.
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setDone(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              className="glass rounded-3xl p-8 max-w-sm text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto h-14 w-14 rounded-full bg-neon text-black flex items-center justify-center glow-neon">
                <Check size={28} strokeWidth={3} />
              </div>
              <h4 className="mt-5 font-display text-3xl">Slot Reserved!</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatDate(date)} · {slot} · 1 hr. We'll text {form.phone} with details.
              </p>
              <button
                onClick={() => { setDone(false); setSlot(null); setForm({ name: "", phone: "" }); }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-neon px-5 py-2.5 font-semibold text-black"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
