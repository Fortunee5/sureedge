import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Box, Layers, Building2, BookOpen, Smartphone, ArrowUpRight, CheckCircle, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: 'brand-identity',
    icon: Palette,
    title: 'Brand Identity Systems',
    tagline: 'Strategy, Visual Identity & Guidelines',
    desc: 'Complete brand suites engineered for recognition across physical print and digital ecosystems.',
    details: [
      'Logo design systems & vector master files',
      'Pantone®, CMYK & RGB color architecture',
      'Typography pairing & custom font licensing',
      'Comprehensive digital & print brand guidelines (PDF + Web)'
    ],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'luxe-stationery',
    icon: Layers,
    title: 'Luxury Print Stationery',
    tagline: '600gsm Duplexing & Specialty Foils',
    desc: 'Tactile executive stationery that leaves an indelible first impression in high-stakes meetings.',
    details: [
      'Hot foil stamped 600-800 GSM cotton cards',
      'Watermarked letterheads & heavy cotton envelopes',
      'Blind embossed presentation folders & sleeves',
      'Custom metallic gilded & painted card edges'
    ],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'custom-packaging',
    icon: Box,
    title: 'Custom Packaging & Boxes',
    tagline: 'Unboxing Experiences That Elevate',
    desc: 'Bespoke rigid boxes, luxury mailers, and custom retail packaging crafted to delight your customers.',
    details: [
      'Rigid magnetic boxes with spot-UV finish',
      'Eco-friendly recycled corrugated shipping mailers',
      'Custom printed tissue paper, ribbon & wax seals',
      'Precision structural foam inserts & product trays'
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'spatial-signage',
    icon: Building2,
    title: 'Spatial & Architectural Signage',
    tagline: 'Environmental Graphic Design',
    desc: 'Transform your physical office space or retail flagship store into a living brand landmark.',
    details: [
      '3D laser-cut brushed brass & acrylic wall logos',
      'Custom LED neon signage & lightboxes',
      'Frosted privacy window vinyl & architectural wraps',
      'Modular trade show exhibition booth displays'
    ],
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'editorial-publishing',
    icon: BookOpen,
    title: 'Editorial & Book Publishing',
    tagline: 'High-Density Offset CMYK Press',
    desc: 'Exquisite hardbound books, lookbooks, product catalogs, and luxury magazines.',
    details: [
      'Smyth-sewn lay-flat case binding',
      'Soft-touch matte laminated covers with foil details',
      'FSC® certified fine art coated & uncoated papers',
      'High-speed digital proofing & press sheet inspection'
    ],
    image: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'smart-hybrid',
    icon: Smartphone,
    title: 'Smart NFC Digital Cards',
    tagline: 'Physical Card + Instant Digital Tap',
    desc: 'Merge tactile metal or wood cards with tap-to-phone instant contact exchange technology.',
    details: [
      'Built-in encrypted NTAG213 / NTAG216 NFC chips',
      'Custom web profile landing page with social links & vCard',
      'Precision laser-engraved stainless steel or matte black PVC',
      'Zero app required for recipient tap scanning'
    ],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Services({ onOpenQuoteModal }) {
  const sectionRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <div className="text-center service-card-anim">
          <div className="badge-pill">
            <span className="dot" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="section-title">
            End-to-End <span>Print & Brand</span> Solutions
          </h2>
          <p className="section-desc">
            Whether launching a new corporate visual identity or manufacturing thousands of luxury foil-stamped product boxes, our studio delivers uncompromising precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid-3" style={{ marginTop: '3rem' }}>
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card-anim glow-card shine-effect"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => setSelectedService(service)}
              >
                <div>
                  {/* Service Icon Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(230, 198, 135, 0.1)',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-gold)'
                    }}>
                      <Icon size={26} />
                    </div>
                    
                    <button className="btn-icon" style={{ width: '36px', height: '36px' }}>
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                    {service.tagline}
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#fff' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    {service.desc}
                  </p>
                </div>

                {/* Micro Checklist */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {service.details.slice(0, 2).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={14} color="var(--accent-gold)" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedService(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '24px',
              maxWidth: '600px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', marginBottom: '4px' }}>
              {selectedService.tagline}
            </div>
            
            <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
              {selectedService.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
              {selectedService.desc}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                Included Capabilities & Specs:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {selectedService.details.map((detail, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <CheckCircle size={16} color="var(--accent-gold)" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenQuoteModal();
                }}
                className="btn-primary shine-effect"
                style={{ width: '100%' }}
              >
                <span>Request Quote for {selectedService.title}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
