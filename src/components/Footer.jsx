import React, { useState } from 'react';
import { Sparkles, ArrowUp, Send, MapPin, Mail, Phone, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer({ onOpenQuoteModal }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#07080a',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        position: 'relative',
        color: 'var(--text-secondary)'
      }}
    >
      <div className="container">
        
        {/* Top Studio Status Bar */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-gold)',
            borderRadius: '20px',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              Studio Status: Heidelberg Presses Running • Accepting Q2 2026 Projects
            </span>
          </div>

          <button onClick={onOpenQuoteModal} className="btn-primary shine-effect" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
            <Sparkles size={16} />
            <span>Request Print Sample Pack</span>
          </button>
        </div>

        {/* Main Footer Columns */}
        <div className="grid-4" style={{ gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, #a88132 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.1rem'
              }}>
                P
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                IMPRINT<span style={{ color: 'var(--accent-gold)' }}>.</span>CO
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Award-winning printing and corporate brand identity studio. Specializing in foil stamping, 3D spot UV gloss, 800gsm cotton triplex cards, and rigid luxury packaging.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="#" className="btn-icon" style={{ width: '36px', height: '36px' }} aria-label="Website"><Globe size={16} /></a>
              <a href="#" className="btn-icon" style={{ width: '36px', height: '36px' }} aria-label="Share"><Share2 size={16} /></a>
              <a href="#" className="btn-icon" style={{ width: '36px', height: '36px' }} aria-label="Message"><MessageCircle size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Studio Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><a href="#finishes" style={{ transition: 'color 0.2s' }}>3D Finishes Simulator</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Print & Brand Services</a></li>
              <li><a href="#calculator" style={{ transition: 'color 0.2s' }}>Instant Price Estimator</a></li>
              <li><a href="#portfolio" style={{ transition: 'color 0.2s' }}>Case Studies Showcase</a></li>
              <li><a href="#process" style={{ transition: 'color 0.2s' }}>4-Step Craft Process</a></li>
            </ul>
          </div>

          {/* Global Studios */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Global Atelier Locations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 700 }}>LONDON STUDIO (HQ)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>45 Mayfair Craft Quarter, London W1J 8AQ</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700 }}>NEW YORK ATELIER</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>180 Soho Design District, NY 10012</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700 }}>GENEVA LAB</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rue du Rhône 42, 1204 Geneva</div>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              The Tactile Paper Journal
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              Subscribe to receive quarterly physical paper sample swatches and new foil trends.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter email..."
                style={{
                  flex: 1,
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1rem' }}>
                <Send size={16} />
              </button>
            </form>

            {subscribed && (
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginTop: '0.5rem' }}>
                ✓ Subscribed! Swatch pack shipping soon.
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright & CMYK bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
          <div>
            © 2026 IMPRINT & CO. Studio. All rights reserved. FSC® Certified Eco Printing.
          </div>

          <button onClick={scrollToTop} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>

      {/* CMYK Color Accent Bar at bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', display: 'flex' }}>
        <div style={{ flex: 1, background: '#00aeef' }}></div>
        <div style={{ flex: 1, background: '#ec008c' }}></div>
        <div style={{ flex: 1, background: '#fff200' }}></div>
        <div style={{ flex: 1, background: '#000000' }}></div>
      </div>
    </footer>
  );
}
