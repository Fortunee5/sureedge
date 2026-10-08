import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FinishSimulator from './components/FinishSimulator';
import Services from './components/Services';
import PriceCalculator from './components/PriceCalculator';
import Portfolio from './components/Portfolio';
import ProcessTimeline from './components/ProcessTimeline';
import PantonePicker from './components/PantonePicker';
import Testimonials from './components/Testimonials';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleOpenQuoteWithConfig = (config) => {
    setModalConfig(config);
    setQuoteModalOpen(true);
  };

  const handleOpenQuote = () => {
    setModalConfig(null);
    setQuoteModalOpen(true);
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* Navbar Header */}
      <Navbar
        currentTheme={theme}
        setTheme={setTheme}
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Hero Banner with GSAP Staggers & 3D Tilt Mockup */}
      <Hero onOpenQuoteModal={handleOpenQuote} />

      {/* 3D Print Finish Simulator Lab */}
      <FinishSimulator />

      {/* Services & Capabilities */}
      <Services onOpenQuoteModal={handleOpenQuote} />

      {/* Live Interactive Price Estimator / Configurator */}
      <PriceCalculator onOpenQuoteModalWithConfig={handleOpenQuoteWithConfig} />

      {/* Portfolio Showcase & Before/After Rebrand Slider */}
      <Portfolio />

      {/* Process & Craft Timeline */}
      <ProcessTimeline />

      {/* Pantone Swatch Color Picker Studio */}
      <PantonePicker />

      {/* Testimonials & Press Marquee */}
      <Testimonials />

      {/* Footer */}
      <Footer onOpenQuoteModal={handleOpenQuote} />

      {/* Quote & Artwork Upload Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialConfig={modalConfig}
      />

    </div>
  );
}
