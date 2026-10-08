import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Layers, ShieldCheck, Palette, Award, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenQuoteModal }) {
  const heroRef = useRef(null);
  const cardsGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero staggered entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-title-line', { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.3')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-stats-item', { scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.2')
        .from('.hero-float-card', { y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.4)' }, '-=0.8');

      // Floating card hover 3D tilt interaction
      const container = cardsGroupRef.current;
      if (container) {
        const handleMouseMove = (e) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to('.hero-float-card-main', {
            rotateY: x * 0.05,
            rotateX: -y * 0.05,
            duration: 0.5,
            ease: 'power1.out'
          });
          gsap.to('.hero-float-card-sec', {
            rotateY: x * 0.08,
            rotateX: -y * 0.08,
            x: x * 0.04,
            y: y * 0.04,
            duration: 0.6,
            ease: 'power1.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to('.hero-float-card-main, .hero-float-card-sec', {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 70% 20%, rgba(230, 198, 135, 0.08) 0%, rgba(10, 11, 14, 0) 60%)'
      }}
    >
      {/* Background Subtle Grid & CMYK Light Beams */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Hero Text Column */}
          <div>
            <div className="hero-badge badge-pill">
              <span className="dot" />
              <span>Tactile Craftsmanship & Digital Branding</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
              <div className="hero-title-line">Where Digital</div>
              <div className="hero-title-line" style={{ color: 'var(--accent-gold)' }}>
                Identity Meets
              </div>
              <div className="hero-title-line">Luxury Print Craft.</div>
            </h1>

            <p className="hero-desc" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '540px' }}>
              We transform ambitious corporate brands into tangible physical experiences. From 600gsm soft-touch cotton business stationery to foil-stamped luxury packaging and spatial signage.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <button onClick={onOpenQuoteModal} className="btn-primary shine-effect" style={{ padding: '1rem 2.2rem', fontSize: '1rem' }}>
                <Sparkles size={18} />
                <span>Start Project / Get Quote</span>
              </button>
              
              <a href="#finishes" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                <Layers size={18} />
                <span>Explore 3D Finishes Lab</span>
              </a>
            </div>

            {/* Quick Micro Trust Badges */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>FSC® Certified Eco Papers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>100% CMYK Pantone Proofing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>Global Express Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Column (Interactive 3D Stack Mockup) */}
          <div ref={cardsGroupRef} style={{ perspective: '1000px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            
            {/* Background Glow Ring */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 198, 135, 0.25) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0
              }}
            />

            {/* Main Luxury Business Card Mockup */}
            <div
              className="hero-float-card hero-float-card-main"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                height: '260px',
                borderRadius: '20px',
                background: 'linear-gradient(145deg, #1d212a 0%, #0d0e12 100%)',
                border: '1px solid var(--border-gold)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(230,198,135,0.15)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 2,
                transformStyle: 'preserve-3d',
                cursor: 'pointer'
              }}
            >
              {/* Gold Foil Metallic Accent Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-gold)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    PREMIUM 600 GSM DUPLEX
                  </div>
                  <div style={{
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(135deg, #fff 0%, var(--accent-gold) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ATELIER & CO.
                  </div>
                </div>

                {/* Spot UV Foil Emblem */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-gold) 0%, #b8974a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(230,198,135,0.4)'
                }}>
                  <Award size={24} color="#000" />
                </div>
              </div>

              {/* Card Body Mock Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Julian Vance</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Chief Executive Officer</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  <div>PARIS • NEW YORK</div>
                  <div style={{ color: 'var(--accent-gold)', marginTop: '2px' }}>ROSE GOLD FOIL 3D</div>
                </div>
              </div>

              {/* Holographic Refractive Light Strip */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '20px',
                  background: 'linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(230,198,135,0.15) 100%)',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Secondary Floating Card (Behind) */}
            <div
              className="hero-float-card hero-float-card-sec"
              style={{
                position: 'absolute',
                width: '90%',
                maxWidth: '380px',
                height: '240px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #11141c 0%, #1e2330 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                padding: '2rem',
                zIndex: 1,
                transform: 'translate(40px, -30px) rotate(8deg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 0.85
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  CUSTOM PACKAGING BOX
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SPOT UV GLOSS</span>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                  AURA PERFUMERY
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Custom Rigid Magnetic Box & Kraft Sleeve
                </div>
              </div>
            </div>

            {/* Floating Live Badge Tag */}
            <div
              className="hero-float-card"
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-10px',
                zIndex: 3,
                background: 'rgba(24, 27, 34, 0.95)',
                border: '1px solid var(--border-gold)',
                borderRadius: '16px',
                padding: '0.85rem 1.25rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Press Proof Status</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>99.9% Color Calibration</div>
              </div>
            </div>

          </div>

        </div>

        {/* Hero Bottom Stats Counter Bar */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            textAlign: 'center'
          }}
          className="hero-stats-grid"
        >
          <div className="hero-stats-item">
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--accent-gold)' }}>
              15,000+
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              COMPLETED PRINT RUNS
            </div>
          </div>
          <div className="hero-stats-item">
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#fff' }}>
              480+
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              BRAND IDENTITIES CREATED
            </div>
          </div>
          <div className="hero-stats-item">
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              99.8%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              PANTONE MATCH ACCURACY
            </div>
          </div>
          <div className="hero-stats-item">
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#fff' }}>
              24-48 HR
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              EXPRESS STUDIO TURNAROUND
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
