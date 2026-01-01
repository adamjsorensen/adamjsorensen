"use client";

import { useEffect, useRef } from "react";

interface EventDisplay {
  id: string;
  title: string;
  speaker: string;
  role: string;
  venue: string;
  date: string;
  time: string;
  spotsLeft: number;
  lumaUrl: string;
}

interface LandingPageClientProps {
  events: EventDisplay[];
}

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

export function LandingPageClient({ events }: LandingPageClientProps) {
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
            <a href="#faq" className="text-parchment/70 hover:text-amber-warm transition-colors">
              FAQ
            </a>
            <a href="#events" className="px-5 py-2.5 bg-amber-warm text-ink font-medium rounded hover:bg-amber-glow transition-colors">
              Get Tickets
            </a>
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
            40 minutes of revelation from world-class minds, delivered in the atmospheric glow of London&apos;s finest pubs and hidden bars.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-6">
            <a href="#events" className="group px-8 py-4 bg-amber-warm text-ink font-semibold text-lg rounded hover-lift glow-amber">
              <span className="flex items-center gap-2">
                Find Your Next Lecture
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
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
            {events.map((event, i) => (
              <a
                key={event.id}
                href={event.lumaUrl}
                target={event.lumaUrl.startsWith("http") ? "_blank" : undefined}
                rel={event.lumaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`animate-on-scroll stagger-${i + 1} group glass-card rounded-2xl p-8 hover-lift cursor-pointer block`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-amber-warm/10 text-amber-warm text-xs font-mono rounded-full">
                    {event.spotsLeft > 0 ? `${event.spotsLeft} spots left` : "Sold out"}
                  </span>
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
                    <p className="font-mono">{event.date} · {event.time}</p>
                    <p>{event.venue}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-parchment/20 flex items-center justify-center group-hover:bg-amber-warm group-hover:border-amber-warm transition-colors">
                    <svg className="w-4 h-4 text-parchment/60 group-hover:text-ink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-20 bg-gradient-to-r from-slate-charcoal via-slate-smoke to-slate-charcoal border-y border-amber-warm/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            { value: "50+", label: "Lectures Hosted" },
            { value: "2K+", label: "Curious Minds" },
            { value: "30+", label: "Expert Speakers" },
          ].map((stat, i) => (
            <div key={i} className={`animate-on-scroll stagger-${i + 1} text-center`}>
              <p className="font-display text-4xl md:text-5xl text-gradient font-medium mb-2">{stat.value}</p>
              <p className="text-parchment/50 text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
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
            <a href="#events" className="group px-10 py-5 bg-amber-warm text-ink font-semibold text-lg rounded glow-amber hover-lift">
              <span className="flex items-center gap-3">
                Browse Upcoming Lectures
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
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
                <li><a href="#events" className="hover:text-amber-warm transition-colors">Upcoming Events</a></li>
                <li><a href="#faq" className="hover:text-amber-warm transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-warm transition-colors">Become a Speaker</a></li>
                <li><a href="#" className="hover:text-amber-warm transition-colors">Host a Venue</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-parchment mb-4">Stay Curious</h4>
              <p className="text-parchment/50 text-sm mb-4">Get notified about new lectures in London.</p>
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
