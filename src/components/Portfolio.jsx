import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, Eye, MoveHorizontal, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: 'Aura Haute Perfumery',
    category: 'packaging',
    client: 'Aura Fragrances Paris',
    year: '2026',
    paper: '500 GSM Soft-Touch Charcoal',
    finishes: ['24K Rose Gold Foil Stamping', 'Custom Rigid Magnetic Lid'],
    pantones: ['Pantone 871 C (Gold)', 'Pantone Black 6 C'],
    desc: 'Unboxing experience for luxury niche perfumery with gold foil stamped typography and velvet lined foam insert.',
    image: 'https://images.pexels.com/photos/4464879/pexels-photo-4464879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 2,
    title: 'Vanguard Capital Group',
    category: 'stationery',
    client: 'Vanguard Private Wealth',
    year: '2026',
    paper: '700 GSM Wild Cotton Triplex',
    finishes: ['Deep Steel Debossing', 'Gold Gilded Painted Edges'],
    pantones: ['Pantone 289 C (Navy)', 'Pantone Gold 871 C'],
    desc: 'Bespoke executive corporate business card suite for premier wealth management firm in Geneva and Zurich.',
    image: 'https://images.pexels.com/photos/9878733/pexels-photo-9878733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 3,
    title: 'Komorebi Botanical Gin',
    category: 'packaging',
    client: 'Komorebi Distillers Tokyo',
    year: '2025',
    paper: '350 GSM Textured Organic Hemp',
    finishes: ['Raised Spot UV Gloss', 'Holographic Laser Foil'],
    pantones: ['Pantone 3435 C (Forest Green)', 'Pantone Silver 877 C'],
    desc: 'Japanese craft gin bottle label system printed on organic waterproof hemp substrate with tactile spot UV drops.',
    image: 'https://images.pexels.com/photos/8489947/pexels-photo-8489947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 4,
    title: 'Solstice Architecture HQ',
    category: 'branding',
    client: 'Solstice Design London',
    year: '2025',
    paper: 'Comprehensive Brand Guide PDF + Hardbound Book',
    finishes: ['Smyth-Sewn Lay Flat', 'Brushed Brass Metal Plaque'],
    pantones: ['Pantone Cool Gray 11 C', 'Pantone 7540 C'],
    desc: 'Complete architectural studio identity system including spatial signage, Hardbound hardcover monograph, and vCards.',
    image: 'https://images.pexels.com/photos/6373865/pexels-photo-6373865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 5,
    title: 'Nordic Roast Coffee Roasters',
    category: 'packaging',
    client: 'Nordic Craft Oslo',
    year: '2025',
    paper: 'Recycled Matte Kraft Barrier Packaging',
    finishes: ['Copper Foil Stamping', 'Custom Die-Cut Zipper Valve'],
    pantones: ['Pantone 7516 C (Copper)', 'Pantone Warm Gray 1 C'],
    desc: 'Sustainable specialty coffee bag line with metallic copper accents and resealable aroma valve.',
    image: 'https://images.pexels.com/photos/8947634/pexels-photo-8947634.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 6,
    title: 'Apex Spatial Architecture',
    category: 'signage',
    client: 'Apex Group Dubai',
    year: '2026',
    paper: '12mm Clear Acrylic + Brushed Stainless Steel',
    finishes: ['3D Laser Engraved', 'Warm White 3000K LED Backlight'],
    pantones: ['Pantone Satin Gold', 'Pantone Matt Black'],
    desc: 'Illuminated 3D architectural signage installation in Dubai Financial District flagship tower lobby.',
    image: 'https://images.pexels.com/photos/6373925/pexels-photo-6373925.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-anim-item', {
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

  const filteredProjects = activeFilter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeFilter);

  // GSAP animation when filter changes
  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="section-padding" style={{ position: 'relative', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="text-center port-anim-item">
          <div className="badge-pill">
            <span className="dot" />
            <span>Studio Showcase</span>
          </div>
          <h2 className="section-title">
            Featured <span>Print & Identity</span> Projects
          </h2>
          <p className="section-desc">
            Explore our curated portfolio of corporate brand identity redesigns, luxury foil packaging, and tactile executive stationery.
          </p>
        </div>

        {/* Category Filters */}
        <div className="port-anim-item" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'packaging', label: 'Luxe Packaging' },
            { id: 'stationery', label: 'Executive Stationery' },
            { id: 'branding', label: 'Brand Systems' },
            { id: 'signage', label: 'Spatial Signage' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => handleFilterChange(btn.id)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                background: activeFilter === btn.id ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === btn.id ? '#000' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: activeFilter === btn.id ? 'none' : '1px solid var(--border-color)',
                transition: 'all 0.25s ease'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div ref={gridRef} className="grid-3" style={{ gap: '2rem' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glow-card shine-effect"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onClick={() => setSelectedProject(project)}
            >
              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid var(--border-gold)'
                  }}
                >
                  {project.category.toUpperCase()}
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {project.client} • {project.year}
                </div>
                
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {project.desc}
                </p>

                {/* Finishes Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.finishes.map((finish, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {finish}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* BEFORE & AFTER BRAND REBRAND SLIDER (Interactive Highlight!) */}
        <div style={{ marginTop: '6rem' }} className="port-anim-item">
          
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div className="badge-pill">
              <span className="dot" />
              <span>Interactive Brand Transformation</span>
            </div>
            <h3 style={{ fontSize: '2.2rem', color: '#fff' }}>
              Drag Handle: <span>Before vs After Rebrand</span>
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              Slide left and right to compare an outdated brand identity with our studio's custom luxury foil rebrand.
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              height: '420px',
              margin: '0 auto',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--border-gold)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
              userSelect: 'none'
            }}
          >
            {/* AFTER REBRAND (Bottom Layer) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #11141d 0%, #08090c 100%)',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', letterSpacing: '0.2em' }}>
                AFTER STUDIO REBRAND • 2026
              </div>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 900, color: '#fff', letterSpacing: '0.05em', margin: '1rem 0' }}>
                AURELIA & CO.
              </div>
              <div style={{
                padding: '0.5rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, #b8974a 100%)',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.1em'
              }}>
                GOLD FOIL + 600GSM COTTON
              </div>
            </div>

            {/* BEFORE REBRAND (Top Overlay Layer clipped by sliderPos) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#334155',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', letterSpacing: '0.2em' }}>
                BEFORE (OLD BRAND) • 2020
              </div>
              <div style={{ fontSize: '2.5rem', fontFamily: 'sans-serif', fontWeight: 400, color: '#e2e8f0', margin: '1rem 0', textTransform: 'lowercase' }}>
                aurelia prints inc.
              </div>
              <div style={{ padding: '0.4rem 1rem', background: '#475569', color: '#cbd5e1', fontSize: '0.8rem', borderRadius: '4px' }}>
                Standard Thin 250gsm Cardboard
              </div>
            </div>

            {/* SLIDER HANDLE BAR */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPos}%`,
                width: '4px',
                background: 'var(--accent-gold)',
                cursor: 'ew-resize',
                zIndex: 10,
                boxShadow: '0 0 15px var(--accent-gold)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(230,198,135,0.6)'
                }}
              >
                <MoveHorizontal size={20} />
              </div>
            </div>

            {/* Slider Input overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'ew-resize',
                zIndex: 20
              }}
            />

          </div>

        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
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
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '24px',
              maxWidth: '650px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }}
            />

            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
              {selectedProject.client}
            </div>

            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0.25rem 0 1rem 0' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {selectedProject.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SUBSTRATE STOCK</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{selectedProject.paper}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PANTONE SYSTEM</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{selectedProject.pantones.join(', ')}</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Close Project View
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
