import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Palette, Flame, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    icon: Compass,
    title: 'Brand Strategy & Paper Curation',
    subtitle: 'Consultation & Tactile Tactile Selection',
    desc: 'We review your visual identity goals and curate paper substrates ranging from 350gsm silk to 800gsm wild cotton duplex options.'
  },
  {
    num: '02',
    icon: Palette,
    title: 'Pantone Calibration & Digital Proofing',
    subtitle: '100% Color Match Guarantee',
    desc: 'Our pre-press team calibrates exact Pantone® Spot colors and sends high-resolution 3D digital soft proofs before press setup.'
  },
  {
    num: '03',
    icon: Flame,
    title: 'Precision Foil & Die Stamping',
    subtitle: 'Hot Press Craftsmanship',
    desc: 'Using heated steel dies, we apply 24K metallic foils, raised spot UV gloss, and deep debossing with micro-metric precision.'
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Quality Inspection & White-Glove Shipping',
    subtitle: 'Hand Examined & Eco Packaging',
    desc: 'Every single sheet and box is hand inspected under studio loupes, packaged with custom tissue & wax seals, and shipped globally.'
  }
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-anim-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="text-center proc-anim-item">
          <div className="badge-pill">
            <span className="dot" />
            <span>The Production Craft</span>
          </div>
          <h2 className="section-title">
            Our 4-Step <span>Studio Workflow</span>
          </h2>
          <p className="section-desc">
            From initial paper stock selection to final white-glove inspection, here is how we bring your physical brand identity to life.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid-4" style={{ marginTop: '3.5rem', position: 'relative' }}>
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="proc-anim-item glow-card"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{
                      fontSize: '2.5rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 900,
                      color: 'rgba(230,198,135,0.25)',
                      lineHeight: 1
                    }}>
                      {step.num}
                    </span>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(230,198,135,0.1)',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-gold)'
                    }}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                    {step.subtitle}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
