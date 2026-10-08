import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PANTONE_SWATCHES = [
  { code: 'PANTONE 871 C', name: 'Metallic Imperial Gold', hex: '#e6c687', rgb: '230, 198, 135' },
  { code: 'PANTONE 289 C', name: 'Geneva Midnight Navy', hex: '#00205b', rgb: '0, 32, 91' },
  { code: 'PANTONE 186 C', name: 'Royal Crimson Red', hex: '#c8102e', rgb: '200, 16, 46' },
  { code: 'PANTONE 3435 C', name: 'Alpine Forest Emerald', hex: '#114b3e', rgb: '17, 75, 62' },
  { code: 'PANTONE BLACK 6 C', name: 'Obsidian Soft Touch', hex: '#0f172a', rgb: '15, 23, 42' },
  { code: 'PANTONE 877 C', name: 'Sterling Metallic Silver', hex: '#8a9ea7', rgb: '138, 158, 167' },
];

export default function PantonePicker() {
  const [selectedSwatch, setSelectedSwatch] = useState(PANTONE_SWATCHES[0]);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pan-anim-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(`${selectedSwatch.code} (${selectedSwatch.hex})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        
        <div className="text-center pan-anim-item">
          <div className="badge-pill">
            <span className="dot" />
            <span>Interactive Color Studio</span>
          </div>
          <h2 className="section-title">
            Explore <span>Pantone® Spot Swatches</span>
          </h2>
          <p className="section-desc">
            Select an official studio Pantone swatch below to preview color intensity and copy specifications for your brand design system.
          </p>
        </div>

        {/* Swatch Picker Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginTop: '2.5rem' }} className="pan-grid pan-anim-item">
          {PANTONE_SWATCHES.map((swatch, idx) => {
            const isSelected = selectedSwatch.code === swatch.code;
            return (
              <button
                key={idx}
                onClick={() => setSelectedSwatch(swatch)}
                style={{
                  background: 'var(--bg-card)',
                  border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  transform: isSelected ? 'translateY(-6px)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '8px',
                    backgroundColor: swatch.hex,
                    marginBottom: '0.75rem',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                  }}
                />
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>
                  {swatch.code}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Swatch Big Display Card */}
        <div
          className="pan-anim-item swatch-detail-box"
          style={{
            marginTop: '2.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-gold)',
            borderRadius: '24px',
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                backgroundColor: selectedSwatch.hex,
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            />
            <div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                ACTIVE PRINT PROOF COLOR
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0' }}>
                {selectedSwatch.name}
              </h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                Spec: {selectedSwatch.code} • Hex: {selectedSwatch.hex} • RGB({selectedSwatch.rgb})
              </div>
            </div>
          </div>

          <button onClick={copyCode} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
            <span>{copied ? 'Copied Spec!' : 'Copy Color Code'}</span>
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .pan-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .swatch-detail-box {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 480px) {
          .pan-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
