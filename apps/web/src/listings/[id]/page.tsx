'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ListingDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  ];

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/listings">← Geri Dön</Link>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <img src={images[selectedImage]} alt="Main" style={{ width: '100%', borderRadius: '12px', maxHeight: '500px', objectFit: 'cover' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginTop: '1rem' }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Thumb"
                onClick={() => setSelectedImage(idx)}
                style={{
                  borderRadius: '8px',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: selectedImage === idx ? '3px solid var(--color-primary)' : '2px solid transparent',
                  opacity: selectedImage === idx ? 1 : 0.7,
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Boğaz Manzarası Modern Daire</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>⭐ 4.8 (156 yorum) • 📍 İstanbul</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Hakkında</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Boğaz manzarası olan lüks modern daire, tam donanım mutfak, 2 yatak odası, 2 banyo, yıkama makinesi ve balkon.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Olanaklar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {['WiFi', 'Mutfak', 'Çamaşır Makinesi', 'Klima', 'Deniz Manzarası', 'Balkon', 'TV', 'Isıtma'].map(amenity => (
                <div key={amenity} style={{ display: 'flex', gap: '0.5rem' }}>
                  <span>✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Yorumlar</h2>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 600,
                  }}>E</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Elif K.</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>İstanbul • 2 hafta önce</div>
                  </div>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  {'⭐'.repeat(5)} 5.0
                </div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Harika bir deneyim! Ev çok temiz ve konforlu. Manzara muhteşem. Kesinlikle tavsiye ederim. Bir dahaki seyahatimde tekrar kalacağım.</p>
              </div>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 600,
                  }}>M</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Mehmet A.</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Ankara • 1 ay önce</div>
                  </div>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  {'⭐'.repeat(4)} 4.0
                </div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Çok güzel bir yer. Ev sahibi çok yardımcı. Tek eksik olan şey biraz daha fazla mutfak eşyası olabilirdi ama genel olarak memnun kaldım.</p>
              </div>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 600,
                  }}>A</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Ayşe B.</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>İzmir • 3 hafta önce</div>
                  </div>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  {'⭐'.repeat(5)} 5.0
                </div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Mükemmel konum! Her yere yürüyerek gidebilirsiniz. Ev çok şık ve modern. Ev sahibi mesajlarımıza çok hızlı cevap verdi.</p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--color-bg-secondary)',
            borderRadius: '12px',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '90px',
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₺250</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>gece başına</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Gidiş Tarihi</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Dönüş Tarihi</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>

            {nights > 0 && (
              <div style={{
                background: 'var(--color-bg)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>₺250 × {nights} gece</span>
                  <span>₺{250 * nights}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                  <span>Hizmet ücreti</span>
                  <span>₺50</span>
                </div>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Toplam</span>
                  <span>₺{250 * nights + 50}</span>
                </div>
              </div>
            )}

            <Link href={nights > 0 ? '/checkout' : '#'}>
              <button
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  opacity: nights > 0 ? 1 : 0.5,
                }}
                disabled={nights === 0}
              >
                Rezervasyon Yap
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}