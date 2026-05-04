'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingTop: '72px' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(15,15,20,0.95)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/">Konaklama</Link>
        <Link href="/listings">← Geri</Link>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: step >= s ? 'var(--gradient-primary)' : 'var(--color-bg-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, color: step >= s ? 'white' : 'var(--color-text-secondary)',
                  }}
                >
                  {s}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Adım {s}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: '12px',
              padding: '2rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              {step === 1 && 'Misafir Bilgileri'}
              {step === 2 && 'Ödeme Yöntemi'}
              {step === 3 && 'Onay'}
            </h2>

            {step === 1 && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Ad Soyad</label>
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    style={{
                      width: '100%', padding: '0.75rem',
                      background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                      borderRadius: '8px', color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
                  <input
                    type="email"
                    style={{
                      width: '100%', padding: '0.75rem',
                      background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                      borderRadius: '8px', color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Kart Numarası</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    style={{
                      width: '100%', padding: '0.75rem',
                      background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                      borderRadius: '8px', color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Rezervasyon Hazır</p>
                <p style={{ color: 'var(--color-text-secondary)' }}>Şimdi ödemesini tamamlayabilirsiniz.</p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  padding: '0.75rem 2rem', background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)', borderRadius: '8px',
                  color: 'var(--color-text-primary)', cursor: 'pointer', fontWeight: 600,
                }}
              >
                Geri
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : alert('Ödendi!')}
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem', flex: 1, fontWeight: 600 }}
            >
              {step < 3 ? 'Devam Et' : 'Öde'}
            </button>
          </div>
        </div>

        <div
          style={{
            background: 'var(--color-bg-secondary)',
            borderRadius: '12px',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '90px',
          }}
        >
          <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Rezervasyon Özeti</h3>
          <div style={{
            background: 'var(--color-bg)', borderRadius: '8px', padding: '1rem',
            fontSize: '0.875rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>₺250 × 5 gece</span>
              <span>₺1.250</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
              <span>Hizmet ücreti</span>
              <span>₺50</span>
            </div>
            <div style={{
              borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem',
              display: 'flex', justifyContent: 'space-between', fontWeight: 700,
            }}>
              <span>Toplam</span>
              <span>₺1.300</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
