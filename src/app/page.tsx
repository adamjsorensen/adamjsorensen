"use client";

import { useEffect, useRef } from "react";

const cities = [
  { name: "New York", venues: 12, nextEvent: "Jan 15" },
  { name: "Los Angeles", venues: 8, nextEvent: "Jan 18" },
  { name: "Chicago", venues: 6, nextEvent: "Jan 22" },
  { name: "San Francisco", venues: 7, nextEvent: "Jan 20" },
  { name: "Boston", venues: 5, nextEvent: "Jan 25" },
  { name: "Austin", venues: 4, nextEvent: "Feb 2" },
];

const upcomingEvents = [
  {
    id: 1,
    title: "The Neuroscience of Decision-Making",
    speaker: "Dr. Elena Vasquez",
    role: "Cognitive Neuroscientist, MIT",
    city: "New York",
    venue: "The Velvet Hours",
    date: "Jan 15, 2026",
    time: "8:00 PM",
    spotsLeft: 12,
  },
  {
    id: 2,
    title: "Quantum Computing for the Curious",
    speaker: "Prof. James Chen",
    role: "Quantum Physics, Stanford",
    city: "San Francisco",
    venue: "The Philosopher's Pour",
    date: "Jan 18, 2026",
    time: "7:30 PM",
    spotsLeft: 8,
  },
  {
    id: 3,
    title: "The Art of Storytelling in the Digital Age",
    speaker: "Maya Thompson",
    role: "Author & Narrative Designer",
    city: "Los Angeles",
    venue: "Midnight Ink",
    date: "Jan 20, 2026",
    time: "8:30 PM",
    spotsLeft: 24,
  },
];

const faqItems = [
  {
    q: "What exactly happens at these events?",
    a: "Arrive, grab a drink, settle in. A captivating 40-minute lecture unfolds, followed by Q&A where ideas spark and conversations ignite. Most stay to discuss over drinks—that's where the magic really happens.",
  },
  {
    q: "Who are the speakers?",
    a: "Professors, researchers, authors, and thought leaders who know how to make complex ideas feel like intimate secrets shared over whiskey. We curate for brilliance and charisma equally.",
  },
  {
    q: "How do I get tickets?",
    a: "Each event has limited capacity—typically 30-50 seats to maintain intimacy. Book through our site. We don't sell at the door; when they're gone, they're gone.",
  },
  {
    q: "Can I become a speaker?",
    a: "We're always seeking minds that can illuminate and entertain. If you've got expertise and presence, pitch us your topic. The best bar lectures feel like the most fascinating conversation you've ever overheard.",
  },
];

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-ink">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-amber-warm/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display text-2xl font-semibold tracking-tight">
            <span className="text-gradient">The Knowledge</span>{" "}
            <span className="text-parchment">Parlour</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <a href="#events" className="text-parchment/70 hover:text-amber-warm transition-colors">
              Events
            </a>
            <a href="#cities" className="text-parchment/70 hover:text-amber-warm transition-colors">
              Cities
            </a>
            <a href="#faq" className="text-parchment/70 hover:text-amber-warm transition-colors">
              FAQ
            </a>
            <button className="px-5 py-2.5 bg-amber-warm text-ink font-medium rounded hover:bg-amber-glow transition-colors">
              Get Tickets
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-warm/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-warm/3 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-warm/5 rounded-full animate-glow-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-warm/10 rounded-full animate-glow-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-amber-warm/80 text-sm tracking-[0.3em] uppercase mb-8 animate-fade-in">
            Where Brilliance Meets Bourbon
          </p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] mb-8">
            <span className="block opacity-0 animate-fade-up stagger-1">Intimate</span>
            <span className="block text-gradient opacity-0 animate-fade-up stagger-2">Lectures</span>
            <span className="block opacity-0 animate-fade-up stagger-3 text-parchment/60">in Unexpected</span>
            <span className="block opacity-0 animate-fade-up stagger-4 italic">Places</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-parchment/60 leading-relaxed mb-12 opacity-0 animate-fade-up stagger-5">
            40 minutes of revelation from world-class minds, delivered in the atmospheric glow of the city&apos;s finest bars and speakeasies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-6">
            <button className="group px-8 py-4 bg-amber-warm text-ink font-semibold text-lg rounded hover-lift glow-amber">
              <span className="flex items-center gap-2">
                Find Your Next Lecture
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="px-8 py-4 border border-parchment/20 text-parchment font-medium text-lg rounded hover:border-amber-warm/50 hover:text-amber-warm transition-colors">
              Become a Speaker
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-parchment/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-parchment/40 to-transparent" />
        </div>
      </section>

      {/* City Marquee */}
      <section className="py-8 border-y border-amber-warm/10 overflow-hidden bg-slate-charcoal/50">
        <div className="marquee">
          {[...cities, ...cities].map((city, i) => (
            <span key={i} className="flex items-center gap-3 text-parchment/40 whitespace-nowrap">
              <span className="font-display text-2xl text-parchment/60">{city.name}</span>
              <span className="w-2 h-2 bg-amber-warm rounded-full" />
            </span>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="animate-on-scroll">
              <p className="font-mono text-amber-warm text-sm tracking-[0.2em] uppercase mb-3">Coming Soon</p>
              <h2 className="font-display text-5xl md:text-6xl font-medium">
                Upcoming<br /><span className="text-gradient">Lectures</span>
              </h2>
            </div>
            <a href="#" className="text-parchment/60 hover:text-amber-warm transition-colors flex items-center gap-2 animate-on-scroll">
              View all events
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <article
                key={event.id}
                className={`animate-on-scroll stagger-${i + 1} group glass-card rounded-2xl p-8 hover-lift cursor-pointer`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-amber-warm/10 text-amber-warm text-xs font-mono rounded-full">
                    {event.city}
                  </span>
                  <span className="text-parchment/40 text-sm">{event.spotsLeft} spots left</span>
                </div>

                <h3 className="font-display text-2xl font-medium mb-4 group-hover:text-gradient transition-all duration-300">
                  {event.title}
                </h3>

                <div className="mb-6">
                  <p className="text-parchment font-medium">{event.speaker}</p>
                  <p className="text-parchment/50 text-sm">{event.role}</p>
                </div>

                <div className="pt-6 border-t border-parchment/10 flex items-center justify-between text-sm">
                  <div className="text-parchment/50">
                    <p className="font-mono">{event.date}</p>
                    <p>{event.venue}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-parchment/20 flex items-center justify-center group-hover:bg-amber-warm group-hover:border-amber-warm transition-colors">
                    <svg className="w-4 h-4 text-parchment/60 group-hover:text-ink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-20 bg-gradient-to-r from-slate-charcoal via-slate-smoke to-slate-charcoal border-y border-amber-warm/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Lectures Hosted" },
            { value: "40K+", label: "Curious Minds" },
            { value: "6", label: "Cities & Growing" },
            { value: "200+", label: "Expert Speakers" },
          ].map((stat, i) => (
            <div key={i} className={`animate-on-scroll stagger-${i + 1} text-center`}>
              <p className="font-display text-4xl md:text-5xl text-gradient font-medium mb-2">{stat.value}</p>
              <p className="text-parchment/50 text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="font-mono text-amber-warm text-sm tracking-[0.2em] uppercase mb-3">Find Us</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium">
              Our <span className="text-gradient">Cities</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city, i) => (
              <div
                key={city.name}
                className={`animate-on-scroll stagger-${i + 1} group relative p-8 rounded-xl border border-parchment/10 hover:border-amber-warm/30 transition-all duration-500 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-warm/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="font-display text-3xl font-medium mb-2 group-hover:text-amber-warm transition-colors">
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-4 text-parchment/50 text-sm">
                    <span>{city.venues} venues</span>
                    <span className="w-1 h-1 bg-parchment/30 rounded-full" />
                    <span>Next: {city.nextEvent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-on-scroll">
            <p className="text-parchment/50 mb-4">Don&apos;t see your city?</p>
            <button className="px-6 py-3 border border-amber-warm/50 text-amber-warm rounded hover:bg-amber-warm/10 transition-colors">
              Request Your City
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-slate-charcoal/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 animate-on-scroll">
            <p className="font-mono text-amber-warm text-sm tracking-[0.2em] uppercase mb-3">The Experience</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium">
              How It <span className="text-gradient">Works</span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-warm/50 via-amber-warm/20 to-transparent hidden md:block" />

            {[
              {
                step: "01",
                title: "Choose Your Lecture",
                desc: "Browse upcoming talks across all cities. Each is curated for intellectual depth and speaker charisma.",
              },
              {
                step: "02",
                title: "Secure Your Spot",
                desc: "Grab your ticket before they vanish. Intimate capacity means every seat is the best seat.",
              },
              {
                step: "03",
                title: "Arrive & Unwind",
                desc: "Order a drink, find your perch. The venue sets the mood before the first word is spoken.",
              },
              {
                step: "04",
                title: "Be Illuminated",
                desc: "40 minutes of captivating insight, followed by Q&A and conversations that linger long after last call.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`animate-on-scroll stagger-${i + 1} relative flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <span className="font-mono text-amber-warm/60 text-sm">{item.step}</span>
                  <h3 className="font-display text-3xl font-medium mb-3">{item.title}</h3>
                  <p className="text-parchment/60 leading-relaxed max-w-md">{item.desc}</p>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-amber-warm bg-ink flex items-center justify-center z-10">
                  <span className="font-display text-2xl text-amber-warm">{item.step}</span>
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="font-mono text-amber-warm text-sm tracking-[0.2em] uppercase mb-3">Questions</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium">
              Frequently <span className="text-gradient">Asked</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className={`animate-on-scroll stagger-${i + 1} group glass-card rounded-xl overflow-hidden`}
              >
                <summary className="p-6 cursor-pointer flex items-center justify-between text-lg font-medium hover:text-amber-warm transition-colors list-none">
                  {item.q}
                  <span className="w-8 h-8 rounded-full border border-parchment/20 flex items-center justify-center flex-shrink-0 ml-4 group-open:rotate-45 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-parchment/60 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-warm/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-warm/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="font-display text-5xl md:text-7xl font-medium mb-6">
            Ready to <span className="text-gradient italic">Think Differently?</span>
          </h2>
          <p className="text-xl text-parchment/60 mb-10 max-w-2xl mx-auto">
            Join thousands of curious minds who&apos;ve discovered that the best ideas come with a drink in hand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group px-10 py-5 bg-amber-warm text-ink font-semibold text-lg rounded glow-amber hover-lift">
              <span className="flex items-center gap-3">
                Browse Upcoming Lectures
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="px-10 py-5 border border-parchment/20 text-parchment font-medium text-lg rounded hover:border-amber-warm/50 transition-colors">
              Host a Lecture
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-parchment/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="font-display text-3xl font-semibold mb-4">
                <span className="text-gradient">The Knowledge</span>{" "}
                <span className="text-parchment">Parlour</span>
              </div>
              <p className="text-parchment/50 max-w-md leading-relaxed">
                Intimate lectures in atmospheric venues. Where curiosity meets cocktails, and ideas flow as freely as the drinks.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-parchment mb-4">Quick Links</h4>
              <ul className="space-y-3 text-parchment/50">
                <li><a href="#" className="hover:text-amber-warm transition-colors">Upcoming Events</a></li>
                <li><a href="#" className="hover:text-amber-warm transition-colors">Cities</a></li>
                <li><a href="#" className="hover:text-amber-warm transition-colors">Become a Speaker</a></li>
                <li><a href="#" className="hover:text-amber-warm transition-colors">Host a Venue</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-parchment mb-4">Stay Curious</h4>
              <p className="text-parchment/50 text-sm mb-4">Get notified about new lectures in your city.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-slate-charcoal border border-parchment/20 rounded-l text-parchment placeholder-parchment/30 focus:outline-none focus:border-amber-warm/50"
                />
                <button className="px-4 py-3 bg-amber-warm text-ink font-medium rounded-r hover:bg-amber-glow transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-parchment/10 flex flex-col md:flex-row items-center justify-between gap-4 text-parchment/40 text-sm">
            <p>&copy; 2026 The Knowledge Parlour. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-amber-warm transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-warm transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-warm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
