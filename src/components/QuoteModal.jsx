import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, UploadCloud, CheckCircle2, Sparkles, Send, FileText, Lock } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialConfig }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Luxe Foil Business Cards',
    paperStock: '600 GSM Cotton Duplex',
    quantity: '250',
    budget: '$500 - $1,500',
    notes: '',
    fileName: null
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setFormData(prev => ({
        ...prev,
        projectType: initialConfig.product || prev.projectType,
        paperStock: initialConfig.paper || prev.paperStock,
        quantity: initialConfig.quantity ? `${initialConfig.quantity} pcs` : prev.quantity,
        notes: `Pre-configured from Estimator: ${initialConfig.finishes ? initialConfig.finishes.join(', ') : ''} | Estimated Total: $${initialConfig.estimatedPrice}`
      }));
    }
  }, [initialConfig]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti trigger:', err);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, fileName: e.dataTransfer.files[0].name });
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-gold)',
          borderRadius: '24px',
          maxWidth: '680px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
          margin: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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

        {!submitted ? (
          <div>
            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', marginBottom: '4px' }}>
              IMPRINT STUDIO • FORMAL ESTIMATE
            </div>
            
            <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
              Request Custom Print & Brand Quote
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Fill in your project requirements below. Our print director will send an itemized PDF estimate and paper sample pack within 4 business hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@brandcompany.com"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Company / Studio Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Aura Haute Perfumery"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Artwork File Upload Zone */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Upload Vector Artwork or Design Spec (.PDF, .AI, .PSD - Optional):
                </label>
                
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  style={{
                    border: '2px dashed var(--border-gold)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: 'rgba(230,198,135,0.04)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.ai,.psd,.eps,.png"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  
                  <UploadCloud size={32} color="var(--accent-gold)" style={{ margin: '0 auto 0.5rem auto' }} />
                  
                  {formData.fileName ? (
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                      Selected File: {formData.fileName}
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                        Click or drag artwork PDF / AI file here
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Vector CMYK files with fonts converted to outlines preferred
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Additional Specifications / Pantone Color Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about special paper finishes, edge painting, delivery deadlines..."
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary shine-effect" style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                <Send size={18} />
                <span>Submit Quote Request</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Lock size={12} />
                <span>Your artwork files and specifications are strictly confidential under Studio NDA</span>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <CheckCircle2 size={42} />
            </div>

            <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
              Quote Request Received!
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem auto' }}>
              Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. Our studio pre-press director is preparing your official PDF estimate and physical paper swatch kit.
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '0.4rem' }}>REQUEST SUMMARY:</div>
              <div style={{ color: 'var(--text-secondary)' }}>Project: {formData.projectType}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Email: {formData.email}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Reference ID: #IMP-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-primary"
            >
              Return to Studio Website
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
