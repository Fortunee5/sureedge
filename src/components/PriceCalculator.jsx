import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, Sparkles, Check, Clock, Shield, ArrowRight, RefreshCw, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_TYPES = [
  { id: 'cards', name: 'Luxe Business Cards', basePrice: 180, perUnit: 0.35 },
  { id: 'packaging', name: 'Custom Rigid Packaging', basePrice: 450, perUnit: 2.80 },
  { id: 'brand', name: 'Corporate Brand Suite', basePrice: 1200, perUnit: 0 },
  { id: 'catalog', name: 'Catalog / Book Run', basePrice: 650, perUnit: 4.50 },
  { id: 'signage', name: '3D Spatial Signage', basePrice: 850, perUnit: 0 }
];

const PAPER_STOCKS = [
  { id: 'silk350', name: '350 GSM Silk Coated', multiplier: 1.0 },
  { id: 'cotton600', name: '600 GSM Cotton Duplex', multiplier: 1.35 },
  { id: 'triplex800', name: '800 GSM Triplex Luxe', multiplier: 1.65 },
  { id: 'kraft', name: 'Recycled Kraft Substrate', multiplier: 1.15 },
  { id: 'velvet', name: 'Soft-Touch Velvet Touch', multiplier: 1.45 }
];

const FINISH_OPTIONS = [
  { id: 'foil', name: 'Gold / Rose Gold Metallic Foil', addCost: 120 },
  { id: 'spotuv', name: 'Raised 3D Spot UV Gloss', addCost: 90 },
  { id: 'deboss', name: 'Blind Steel Die Debossing', addCost: 110 },
  { id: 'edges', name: 'Painted Metallic Edges', addCost: 75 },
  { id: 'diecut', name: 'Custom Die-Cut Contour', addCost: 130 }
];

const TURNAROUND_OPTIONS = [
  { id: 'standard', name: 'Standard Studio (5 Days)', multiplier: 1.0, icon: '🗓️' },
  { id: 'express', name: 'Express Priority (48 Hours)', multiplier: 1.25, icon: '⚡' },
  { id: 'rush', name: '24-Hour Rush Studio', multiplier: 1.5, icon: '🚀' }
];

export default function PriceCalculator({ onOpenQuoteModalWithConfig }) {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_TYPES[0]);
  const [selectedPaper, setSelectedPaper] = useState(PAPER_STOCKS[1]);
  const [selectedFinishes, setSelectedFinishes] = useState(['foil', 'spotuv']);
  const [quantity, setQuantity] = useState(250);
  const [turnaround, setTurnaround] = useState(TURNAROUND_OPTIONS[0]);

  const [totalPrice, setTotalPrice] = useState(0);
  const priceDisplayRef = useRef(null);
  const animatedValRef = useRef({ val: 0 });
  const sectionRef = useRef(null);

  // Toggle Finish logic
  const toggleFinish = (finishId) => {
    if (selectedFinishes.includes(finishId)) {
      setSelectedFinishes(selectedFinishes.filter(id => id !== finishId));
    } else {
      setSelectedFinishes([...selectedFinishes, finishId]);
    }
  };

  // Calculate live total price
  useEffect(() => {
    let base = selectedProduct.basePrice;
    let unitTotal = selectedProduct.perUnit * quantity;

    // Apply bulk volume discount on quantity
    let volumeDiscount = 1.0;
    if (quantity >= 500) volumeDiscount = 0.9;
    if (quantity >= 1000) volumeDiscount = 0.8;
    if (quantity >= 2500) volumeDiscount = 0.7;

    let finishesCost = selectedFinishes.reduce((acc, fId) => {
      const finishObj = FINISH_OPTIONS.find(f => f.id === fId);
      return acc + (finishObj ? finishObj.addCost : 0);
    }, 0);

    let rawTotal = (base + (unitTotal * volumeDiscount) + finishesCost) * selectedPaper.multiplier * turnaround.multiplier;
    const finalCalculated = Math.round(rawTotal);

    setTotalPrice(finalCalculated);

    // Animate price counter with GSAP
    gsap.to(animatedValRef.current, {
      val: finalCalculated,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (priceDisplayRef.current) {
          priceDisplayRef.current.innerText = `$${Math.round(animatedValRef.current.val).toLocaleString()}`;
        }
      }
    });

  }, [selectedProduct, selectedPaper, selectedFinishes, quantity, turnaround]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.calc-anim-item', {
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

  const handleLaunchQuote = () => {
    onOpenQuoteModalWithConfig({
      product: selectedProduct.name,
      paper: selectedPaper.name,
      finishes: selectedFinishes.map(id => FINISH_OPTIONS.find(f => f.id === id)?.name).filter(Boolean),
      quantity: quantity,
      turnaround: turnaround.name,
      estimatedPrice: totalPrice
    });
  };

  return (
    <section id="calculator" ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center calc-anim-item">
          <div className="badge-pill">
            <span className="dot" />
            <span>Instant Estimator</span>
          </div>
          <h2 className="section-title">
            Configure & Estimate <span>Project Pricing</span>
          </h2>
          <p className="section-desc">
            Customize paper weights, luxury foil finishes, and order volume to calculate instant estimated pricing for your next print run or brand identity project.
          </p>
        </div>

        {/* Main Configurator Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem', marginTop: '3rem' }} className="calc-grid">
          
          {/* Left Inputs Column */}
          <div className="calc-anim-item" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 1. Product Type Selector */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '0.75rem' }}>
                1. Select Product or Service:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }} className="calc-product-grid">
                {PRODUCT_TYPES.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedProduct.id === prod.id ? 'rgba(230,198,135,0.15)' : 'var(--bg-card)',
                      border: selectedProduct.id === prod.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                      color: selectedProduct.id === prod.id ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {prod.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Paper Stock Selection */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '0.75rem' }}>
                2. Choose Substrate & Paper Stock:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }} className="calc-paper-grid">
                {PAPER_STOCKS.map(paper => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedPaper.id === paper.id ? 'rgba(230,198,135,0.15)' : 'var(--bg-card)',
                      border: selectedPaper.id === paper.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                      color: selectedPaper.id === paper.id ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{paper.name}</span>
                    {selectedPaper.id === paper.id && <Check size={16} color="var(--accent-gold)" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Specialty Finishes (Multi Select) */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '0.75rem' }}>
                3. Specialty Finishes & Treatments (Optional):
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {FINISH_OPTIONS.map(finish => {
                  const isChecked = selectedFinishes.includes(finish.id);
                  return (
                    <button
                      key={finish.id}
                      onClick={() => toggleFinish(finish.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? 'rgba(230,198,135,0.12)' : 'var(--bg-card)',
                        border: isChecked ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: isChecked ? 'none' : '1px solid var(--text-muted)',
                          background: isChecked ? 'var(--accent-gold)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000'
                        }}>
                          {isChecked && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: isChecked ? '#fff' : 'var(--text-secondary)', fontWeight: isChecked ? 700 : 500 }}>
                          {finish.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                        +${finish.addCost} setup
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Quantity Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                  4. Quantity / Print Run Volume:
                </label>
                <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-gold)' }}>
                  {quantity.toLocaleString()} pcs
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-gold)',
                  height: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <span>100 pcs</span>
                <span>500 (10% OFF)</span>
                <span>1,000 (20% OFF)</span>
                <span>5,000+ (30% OFF)</span>
              </div>
            </div>

            {/* 5. Turnaround Speed */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '0.75rem' }}>
                5. Production Speed & Turnaround:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }} className="calc-turn-grid">
                {TURNAROUND_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTurnaround(opt)}
                    style={{
                      padding: '0.85rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: turnaround.id === opt.id ? 'rgba(230,198,135,0.15)' : 'var(--bg-card)',
                      border: turnaround.id === opt.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                      color: turnaround.id === opt.id ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{opt.icon}</div>
                    <div>{opt.name}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Estimate Summary Box */}
          <div className="calc-anim-item">
            <div
              style={{
                position: 'sticky',
                top: '100px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-gold)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(230,198,135,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                <Calculator size={16} />
                <span>ESTIMATED PROJECT COST</span>
              </div>

              {/* Big Counter Number */}
              <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                <div
                  ref={priceDisplayRef}
                  style={{
                    fontSize: '3.5rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: '#fff'
                  }}
                >
                  ${totalPrice.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
                  Approx. ${selectedProduct.perUnit > 0 ? (totalPrice / quantity).toFixed(2) : '—'} / per item
                </div>
              </div>

              {/* Summary Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Product:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedProduct.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Substrate:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPaper.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Active Finishes:</span>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 600, textAlign: 'right' }}>
                    {selectedFinishes.length > 0 ? selectedFinishes.length + ' Applied' : 'Standard'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Quantity:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{quantity.toLocaleString()} units</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Turnaround:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{turnaround.name}</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={handleLaunchQuote}
                className="btn-primary shine-effect"
                style={{ width: '100%', padding: '1rem 1.5rem', fontSize: '1rem', marginBottom: '1rem' }}
              >
                <Sparkles size={18} />
                <span>Lock In This Configuration</span>
              </button>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                * Includes digital PDF soft proof & standard ground delivery. Official invoice prepared upon artwork verification.
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
          .calc-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .calc-turn-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
