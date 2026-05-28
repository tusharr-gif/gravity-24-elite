import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Check, Clock } from "lucide-react";

const slots = Array.from({ length: 24 }).map((_, i) => {
  const h = i.toString().padStart(2, "0");
  return `${h}:00`;
});

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
}

function formatSlotTo12Hour(s: string | null) {
  if (!s) return "—";
  const hour = parseInt(s.split(":")[0], 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${ampm}`;
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
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [duration, setDuration] = useState(1);

  const hourlyRate = useMemo(() => {
    if (!slot) return 375;
    const hour = parseInt(slot.split(":")[0], 10);
    // After 5 PM (17:00) or early morning before 6 AM (06:00) is night slot
    if (hour >= 17 || hour < 6) return 575;
    return 375;
  }, [slot]);

  const totalPrice = duration * hourlyRate;

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startOffset = firstDay.getDay(); // Sunday = 0
    
    const arr: (Date | null)[] = [];
    
    // Add empty slots for the offset
    for (let i = 0; i < startOffset; i++) {
      arr.push(null);
    }
    
    // Add dates
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(new Date(year, month, i));
    }
    
    return arr;
  }, [currentMonth]);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const canSubmit = slot && form.name.trim() && form.phone.trim().length >= 10;

  const handleBooking = () => {
    if (!slot) return;
    const formattedDate = formatDate(date);
    const priceText = `₹${totalPrice.toLocaleString("en-IN")}`;
    const message = `Hello Gravity 24, I would like to book a Turf Slot!\n\n*Name:* ${form.name}\n*Date & Day:* ${formattedDate}\n*Time Slot:* ${formatSlotTo12Hour(slot)}\n*Duration:* ${duration} ${duration === 1 ? 'Hour' : 'Hours'}\n*Price:* ${priceText}\n*Contact No:* ${form.phone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917020704956?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setDone(true);
  };

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon size={16} className="text-neon" />
                Select date
              </div>
              <button
                onClick={() => setShowFullCalendar(!showFullCalendar)}
                className="text-xs font-semibold text-neon hover:underline flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl border border-white/10 hover:border-neon transition"
              >
                {showFullCalendar ? "← Show 7-Day Quick View" : "📅 Show Full Calendar"}
              </button>
            </div>

            {showFullCalendar ? (
              <div className="mt-4 border border-white/10 rounded-2xl p-4 bg-background/40">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={prevMonth} 
                    className="p-1.5 rounded-lg border border-white/10 hover:border-neon text-muted-foreground hover:text-white transition"
                  >
                    ←
                  </button>
                  <h4 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-white">
                    {currentMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </h4>
                  <button 
                    onClick={nextMonth} 
                    className="p-1.5 rounded-lg border border-white/10 hover:border-neon text-muted-foreground hover:text-white transition"
                  >
                    →
                  </button>
                </div>
                
                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>
                
                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
                  {calendarDays.map((d, index) => {
                    if (!d) return <div key={`empty-${index}`} />;
                    
                    const active = d.toDateString() === date.toDateString();
                    const isPast = d.setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
                    
                    return (
                      <button
                        key={d.toISOString()}
                        disabled={isPast}
                        onClick={() => { setDate(d); setSlot(null); }}
                        className={`rounded-xl p-1.5 sm:p-2.5 text-xs sm:text-sm transition font-medium border ${
                          isPast
                            ? "border-transparent text-muted-foreground/20 cursor-not-allowed line-through"
                            : active
                              ? "bg-neon text-black border-neon font-bold glow-neon"
                              : "border-white/5 hover:border-neon/40 text-foreground"
                        }`}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
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
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} className="text-neon" />
                Select time slot (AM/PM)
              </div>
              <div className="text-[10px] flex items-center gap-3 text-muted-foreground bg-white/5 px-2.5 py-1 rounded-xl border border-white/5 w-fit">
                <span className="flex items-center gap-1">☀️ <strong className="text-foreground">₹375/hr</strong> (Day: 6am - 5pm)</span>
                <span className="h-3 w-px bg-white/10" />
                <span className="flex items-center gap-1">🌙 <strong className="text-foreground">₹575/hr</strong> (Night: 5pm - 6am)</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {slots.map((s) => {
                const active = s === slot;
                const taken = (s === "18:00" || s === "20:00") && date.getDate() % 2 === 0;
                return (
                  <button
                    key={s}
                    disabled={taken}
                    onClick={() => setSlot(s)}
                    className={`relative rounded-xl px-2 py-2.5 text-xs sm:text-sm border transition ${
                      taken
                        ? "border-white/5 text-muted-foreground/40 line-through cursor-not-allowed"
                        : active
                          ? "bg-neon text-black border-neon font-bold glow-neon"
                          : "border-white/10 hover:border-neon/40"
                    }`}
                  >
                    {formatSlotTo12Hour(s)}
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
              <div>Slot: <span className="text-foreground">{formatSlotTo12Hour(slot)}</span></div>
              <div>Duration: <span className="text-foreground">{duration} {duration === 1 ? "hour" : "hours"}</span></div>
              <div>
                Price: <span className="text-neon font-bold text-base">₹{totalPrice.toLocaleString("en-IN")}</span>
                {slot && (
                  <span className="text-[10px] ml-2 text-muted-foreground">
                    ({hourlyRate === 575 ? "Night Rate: ₹575/hr" : "Day Rate: ₹375/hr"})
                  </span>
                )}
              </div>
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
              
              <div className="pt-2 flex flex-col gap-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Select Duration</div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((hr) => (
                    <button
                      key={hr}
                      type="button"
                      onClick={() => setDuration(hr)}
                      className={`rounded-xl py-2 text-center text-xs font-semibold transition border ${
                        duration === hr
                          ? "bg-neon text-black border-neon font-bold glow-neon scale-[1.03]"
                          : "border-white/10 hover:border-neon/40 text-muted-foreground"
                      }`}
                    >
                      {hr} {hr === 1 ? "Hr" : "Hrs"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              disabled={!canSubmit}
              onClick={handleBooking}
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
              <h4 className="mt-5 font-display text-3xl">WhatsApp Opened!</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                We've opened WhatsApp to send your booking for {formatDate(date)} · {formatSlotTo12Hour(slot)} · {duration} {duration === 1 ? "hour" : "hours"}. Please send the pre-filled message to complete your reservation!
              </p>
              <button
                onClick={() => { setDone(false); setSlot(null); setForm({ name: "", phone: "" }); setDuration(1); }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-neon px-5 py-2.5 font-semibold text-black"
              >
                Okay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
