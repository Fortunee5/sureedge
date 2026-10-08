import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CLIENT_REVIEWS = [
  {
    quote: "IMPRINT & CO. transformed our brand collateral completely. The 600gsm cotton business cards with rose gold foil hot stamping generated compliments at every single executive dinner in Geneva.",
    author: "Elena Rostova",
    role: "Chief Brand Officer, Aura Perfumery",
    rating: 5,
    project: "Gold Foil Stationery & Rigid Packaging",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The 3D Spot UV detail on our custom rigid box packaging is unlike anything we've seen from standard print shops. Their Pantone color accuracy hit 100% on the first press trial.",
    author: "Marcus Vance",
    role: "Founder & Creative Director, Vance Wealth",
    rating: 5,
    project: "Executive Hardcover Brand Monograph",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Fastest 48-hour rush studio turnaround in London. They delivered 2,500 die-cut exhibition catalogs directly to our booth at London Design Week without a single flaw.",
    author: "Sophia Lindqvist",
    role: "Lead Event Designer, Nordic Architecture",
    rating: 5,
    project: "Exhibition Spatial Signage & Catalogs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
];

const PRESS_LOGOS = [
  'FORBES DESIGN', 'VOGUE LUXURY', 'WALLPAPER*', 'MONOCLE', 'DESIGN WEEK', 'PENTAGRAM PARTNERS', 'ARCHITECTURAL DIGEST'
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-anim-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextReview = () => {
    setActiveIdx((prev) => (prev + 1) % CLIENT_REVIEWS.length);
  };

  const prevReview = () => {
    setActiveIdx((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="text-center test-anim-item">
          <div className="badge-pill">
            <span className="dot" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="section-title">
            Trusted by <span>Global Luxury Brands</span>
          </h2>
          <p className="section-desc">
            Discover why leading creative directors, luxury founders, and corporate brand leaders choose IMPRINT & CO. for high-stakes print execution.
          </p>
        </div>

        {/* Marquee Press Logos */}
        <div className="test-anim-item" style={{ overflow: 'hidden', padding: '1.5rem 0', margin: '2rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 25s linear infinite', whiteSpace: 'nowrap' }}>
            {PRESS_LOGOS.concat(PRESS_LOGOS).map((logo, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.2em'
                }}
              >
                {logo} •
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial Card Slider */}
        <div className="test-anim-item" style={{ maxWidth: '800px', margin: '3rem auto 0 auto', position: 'relative' }}>
          <div
            className="glow-card"
            style={{
              padding: '3rem',
              position: 'relative',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '24px'
            }}
          >
            <Quote size={48} color="rgba(230,198,135,0.2)" style={{ position: 'absolute', top: '2rem', right: '2rem' }} />

            {/* Rating Stars */}
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
              {[...Array(CLIENT_REVIEWS[activeIdx].rating)].map((_, i) => (
                <Star key={i} size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />
              ))}
            </div>

            {/* Quote text */}
            <p style={{ fontSize: '1.2rem', color: '#fff', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>
              "{CLIENT_REVIEWS[activeIdx].quote}"
            </p>

            {/* Author info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={CLIENT_REVIEWS[activeIdx].avatar}
                  alt={CLIENT_REVIEWS[activeIdx].author}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{CLIENT_REVIEWS[activeIdx].author}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{CLIENT_REVIEWS[activeIdx].role}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                <CheckCircle2 size={16} />
                <span>Verified Studio Client</span>
              </div>
            </div>

            {/* Nav Arrows */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button onClick={prevReview} className="btn-icon" aria-label="Previous Review">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextReview} className="btn-icon" aria-label="Next Review">
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
