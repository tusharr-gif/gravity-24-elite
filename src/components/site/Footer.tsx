import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Gravity 24 Sport Gym" className="h-14 w-auto object-contain drop-shadow-[0_0_22px_rgba(56,189,248,0.45)]" />
              <span className="font-display text-2xl">GRAVITY <span className="text-orange">24</span></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Premium sports turf & fitness experience in Pune. Train hard. Play harder. Open 24/7.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-neon">Explore</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {["About", "Facilities", "Gallery", "Membership"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-foreground transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-neon">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Shree Control Chowk, Narhe, Pune</li>
              <li>+91 84829 96616</li>
              <li>+91 72186 06616</li>
              <li>+91 70207 04956</li>
              <li>Open 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Gravity 24 Sports Gym. All rights reserved.</div>
          <div className="font-display tracking-widest text-neon">TRAIN HARD. PLAY HARDER.</div>
        </div>
      </div>
    </footer>
  );
}
