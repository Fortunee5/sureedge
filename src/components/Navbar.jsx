import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Menu, X, Sun, Moon, Zap, ArrowRight, Layers, PhoneCall, Award } from 'lucide-react';

export default function Navbar({ currentTheme, setTheme, onOpenQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation on load for header logo & nav links
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-anim-item', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // GSAP animation for mobile drawer toggle
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          clipPath: 'circle(150% at 100% 0%)',
          duration: 0.6,
          ease: 'power4.inOut'
        });
        gsap.fromTo('.mobile-nav-link', 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          clipPath: 'circle(0% at 100% 0%)',
          duration: 0.5,
          ease: 'power4.inOut'
        });
      }
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Finishes Lab', href: '#finishes' },
    { label: 'Services', href: '#services' },
    { label: 'Price Estimator', href: '#calculator' },
    { label: 'Showcase', href: '#portfolio' },
    { label: 'Craft Process', href: '#process' },
    { label: 'Reviews', href: '#testimonials' },
  ];

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo */}
          <a href="#" className="nav-anim-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, #a88132 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 4px 15px rgba(230, 198, 135, 0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>P</span>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', display: 'flex' }}>
                <div style={{ flex: 1, background: '#00aeef' }}></div>
                <div style={{ flex: 1, background: '#ec008c' }}></div>
                <div style={{ flex: 1, background: '#fff200' }}></div>
                <div style={{ flex: 1, background: '#000' }}></div>
              </div>
            </div>
            <div>
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800, 
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--text-primary)'
              }}>
                IMPRINT<span style={{ color: 'var(--accent-gold)' }}>.</span>CO
              </div>
              <div style={{ 
                fontSize: '0.65rem', 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '2px'
              }}>
                PRINT & BRAND STUDIO
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="nav-anim-item nav-hover-link"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  position: 'relative'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            {/* Theme Toggle */}
            <button
              className="nav-anim-item btn-icon"
              title="Change Color Theme"
              onClick={() => {
                if (currentTheme === 'dark') setTheme('light');
                else if (currentTheme === 'light') setTheme('cyber');
                else setTheme('dark');
              }}
              style={{ width: '38px', height: '38px' }}
            >
              {currentTheme === 'dark' && <Sun size={18} />}
              {currentTheme === 'light' && <Zap size={18} />}
              {currentTheme === 'cyber' && <Moon size={18} />}
            </button>

            {/* Instant Quote Button */}
            <button
              onClick={onOpenQuoteModal}
              className="nav-anim-item btn-primary shine-effect desktop-only-btn"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
            >
              <Sparkles size={16} />
              <span>Get Custom Quote</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>
      </header>

      {/* GSAP Fullscreen Animated Mobile Drawer */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--bg-secondary)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          clipPath: 'circle(0% at 100% 0%)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            /// IMPRINT & CO MENU
          </div>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                transition: 'color 0.2s ease',
                padding: '0.5rem 0'
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="btn-primary shine-effect"
              style={{ width: '100%' }}
            >
              <Sparkles size={18} />
              <span>Get Instant Custom Quote</span>
            </button>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              HQ: London • New York • Tokyo • Studio@imprintprint.com
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
        }
        .nav-hover-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--accent-gold);
          transition: width 0.3s ease;
        }
        .nav-hover-link:hover {
          color: var(--text-primary) !important;
        }
        .nav-hover-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
