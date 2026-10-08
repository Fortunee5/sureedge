import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Sparkles, Eye, ShieldCheck, Sun, Compass, Info, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FINISHES = [
  {
    id: 'gold-foil',
    name: '24K Metallic Gold Foil',
    tag: 'Hot Stamp Foil',
    desc: 'Deep press metallic hot foil stamping with reflective mirror gold highlights that shine under light.',
    color: '#ffd700',
    gsm: '600 GSM Cotton Duplex',
    turnaround: '3 Days',
    moq: '100 pcs',
    bgTexture: 'linear-gradient(135deg, #181b22 0%, #0c0d10 100%)',
    stampStyle: {
      background: 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0px 2px 4px rgba(230, 198, 135, 0.4))'
    }
  },
  {
    id: 'spot-uv',
    name: 'Raised 3D Spot UV Gloss',
    tag: 'Tactile Polymer',
    desc: 'High-gloss polymer coating raised over deep matte black substrate for ultra-tactile contrast.',
    color: '#38bdf8',
    gsm: '400 GSM Soft-Touch Velvet',
    turnaround: '2 Days',
    moq: '250 pcs',
    bgTexture: 'linear-gradient(135deg, #0d0f14 0%, #161a24 100%)',
    stampStyle: {
      color: '#ffffff',
      textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(56, 189, 248, 0.6)',
      filter: 'brightness(1.4)'
    }
  },
  {
    id: 'deboss',
    name: 'Blind Deep Debossing',
    tag: 'Intaglio Press',
    desc: 'Traditional steel die heavy indentation creating tactile 3D paper reliefs and organic shadow depth.',
    color: '#a8a29e',
    gsm: '700 GSM Wild Cotton Substrate',
    turnaround: '4 Days',
    moq: '100 pcs',
    bgTexture: 'linear-gradient(135deg, #242834 0%, #12141c 100%)',
    stampStyle: {
      color: '#12141c',
      textShadow: '1px 1px 2px rgba(255, 255, 255, 0.15), -1px -1px 3px rgba(0, 0, 0, 0.9)',
      fontWeight: 900
    }
  },
  {
    id: 'holographic',
    name: 'Iridescent Holographic Foil',
    tag: 'Laser Prism Foil',
    desc: 'Multi-spectrum rainbow laser foil that changes light colors dynamically as angle shifts.',
    color: '#ec4899',
    gsm: '500 GSM Black Soft Touch',
    turnaround: '3 Days',
    moq: '150 pcs',
    bgTexture: 'linear-gradient(135deg, #0a0a0f 0%, #171824 100%)',
    stampStyle: {
      background: 'linear-gradient(90deg, #ff007f, #7f00ff, #00ffff, #00ff7f, #ff007f)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
    }
  },
  {
    id: 'edge-paint',
    name: 'Gold Painted Beveled Edges',
    tag: 'Triplex Sandwich',
    desc: 'Thick multi-layered card with hand-painted metallic gold gilded edges and sharp die-cut corners.',
    color: '#e6c687',
    gsm: '800 GSM Triplex Luxe',
    turnaround: '4 Days',
    moq: '100 pcs',
    bgTexture: 'linear-gradient(135deg, #1f232d 0%, #0f1117 100%)',
    stampStyle: {
      background: 'linear-gradient(135deg, #fff 0%, #e6c687 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }
];

export default function FinishSimulator() {
  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);
  const [rotatePos, setRotatePos] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.finish-anim-item', {
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

  // Handle card 3D tilt movement on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -18;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 18;
    
    setRotatePos({ x: rotX, y: rotY });
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotatePos({ x: 0, y: 0 });
    setLightPos({ x: 50, y: 50 });
  };

  return (
    <section
      id="finishes"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center finish-anim-item">
          <div className="badge-pill">
            <span className="dot" />
            <span>Interactive Tactile Simulator</span>
          </div>
          <h2 className="section-title">
            Test Physical Print <span>Finishes Live</span>
          </h2>
          <p className="section-desc">
            Interact with our 3D print simulator below. Tilt your cursor over the sample card to observe real-time light refraction on foils, spot UV gloss, and deep embossed debossing.
          </p>
        </div>

        {/* Simulator Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', marginTop: '3rem', alignItems: 'center' }} className="simulator-grid">
          
          {/* Left Interactive 3D Card Preview Canvas */}
          <div className="finish-anim-item" style={{ perspective: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                width: '100%',
                maxWidth: '480px',
                height: '290px',
                borderRadius: '24px',
                background: activeFinish.bgTexture,
                border: activeFinish.id === 'edge-paint' ? '4px solid var(--accent-gold)' : '1px solid var(--border-gold)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(230,198,135,0.1)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'grab',
                transform: `rotateX(${rotatePos.x}deg) rotateY(${rotatePos.y}deg)`,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Dynamic Refractive Light Glare Sweep */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)`,
                  pointerEvents: 'none',
                  mixBlendMode: 'overlay',
                  borderRadius: '24px'
                }}
              />

              {/* Card Top Brand Mark */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: 'translateZ(30px)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: activeFinish.color, letterSpacing: '0.15em' }}>
                    IMPRINT STUDIO • SPECIALTY FINISH
                  </div>
                  <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginTop: '4px', ...activeFinish.stampStyle }}>
                    LUXURY EDITION
                  </div>
                </div>
                <div style={{ 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '20px', 
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#fff'
                }}>
                  {activeFinish.tag}
                </div>
              </div>

              {/* Card Center Monogram Specimen */}
              <div style={{ textAlign: 'center', transform: 'translateZ(40px)', margin: '1rem 0' }}>
                <div style={{
                  fontSize: '2.8rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  lineHeight: 1,
                  ...activeFinish.stampStyle
                }}>
                  VANGUARD
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '4px' }}>
                  GENEVA • LONDON • TOKYO
                </div>
              </div>

              {/* Card Bottom Tech Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', transform: 'translateZ(25px)' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>Paper Substrate:</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activeFinish.gsm}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: activeFinish.color }}>
                    Move Cursor to Shimmer ✨
                  </div>
                </div>
              </div>

            </div>

            {/* Instruction Tip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Compass size={16} color="var(--accent-gold)" />
              <span>Hover and drag cursor over card to test light reflections</span>
            </div>

          </div>

          {/* Right Finish Selector & Technical Specs Panel */}
          <div className="finish-anim-item">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: '#fff' }}>
              Select Specialty Finish:
            </h3>

            {/* Finish Buttons List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {FINISHES.map((finish) => {
                const isSelected = activeFinish.id === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => setActiveFinish(finish)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(230, 198, 135, 0.12)' : 'var(--bg-card)',
                      border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                      transition: 'all 0.25s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: finish.color,
                          boxShadow: isSelected ? `0 0 12px ${finish.color}` : 'none'
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                          {finish.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {finish.tag}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--accent-gold)',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Finish Specifications Box */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <Info size={16} />
                <span>Production Specs & Lead Times</span>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {activeFinish.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RECOMMENDED GSM</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{activeFinish.gsm}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LEAD TIME</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{activeFinish.turnaround}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MIN ORDER (MOQ)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{activeFinish.moq}</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .simulator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
