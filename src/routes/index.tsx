import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Facilities } from "@/components/site/Facilities";
import { Gallery } from "@/components/site/Gallery";
import { Membership } from "@/components/site/Membership";
import { Booking } from "@/components/site/Booking";
import { Trainers } from "@/components/site/Trainers";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gravity 24 Sports Gym — Premium Turf & Fitness in Pune" },
      {
        name: "description",
        content:
          "Premium sports turf and 24/7 fitness club in Narhe, Pune. Book cricket turf, join the gym, and train with certified coaches at Gravity 24.",
      },
      { property: "og:title", content: "Gravity 24 Sports Gym — Pune" },
      { property: "og:description", content: "Train hard. Play harder. Premium turf & fitness in Pune." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Gallery />
      <Membership />
      <Booking />
      <Trainers />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
