'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📊 Genel Bakış', icon: '📊' },
    { id: 'reservations', label: '📅 Rezervasyonlar', icon: '📅' },
    { id: 'favorites', label: '❤️ Favoriler', icon: '❤️' },
    { id: 'messages', label: '💬 Mesajlar', icon: '💬' },
    { id: 'profile', label: '👤 Profil', icon: '👤' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingTop: '72px' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/">Konaklama</Link>
        <button
          className="btn btn-secondary"
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
        >
          Çıkış
        </button>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : 'none',
                cursor: 'pointer',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Dashboard</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>0</div>
                <div style={{ color: 'var(--color-text-secondary)' }}>Aktif Rezervasyon</div>
              </div>
              
              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>3</div>
                <div style={{ color: 'var(--color-text-secondary)' }}>Favori Yer</div>
              </div>
              
              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>2</div>
                <div style={{ color: 'var(--color-text-secondary)' }}>Yeni Mesaj</div>
              </div>
              
              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>4.8</div>
                <div style={{ color: 'var(--color-text-secondary)' }}>Ortalama Puan</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Son Aktiviteler</h3>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  Henüz aktivite yok. İlk rezervasyonunuzu yapın!
                </div>
              </div>

              <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Önerilen Yerler</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100" alt="Place" style={{ width: 50, height: 50, borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>İstanbul Daire</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>₺250/gece</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Rezervasyonlarım</h1>
            <div style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Henüz rezervasyonunuz yok</p>
              <Link href="/listings">
                <button className="btn btn-primary">Ev Ara</button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Favori Yerlerim</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[
                { id: '1', title: 'Boğaz Manzarası Modern Daire', location: 'İstanbul', price: 250, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' },
                { id: '2', title: 'Antalya Deniz Kenarı Villa', location: 'Antalya', price: 450, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400' },
                { id: '3', title: 'Ankara Modern Daire', location: 'Ankara', price: 180, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
              ].map(listing => (
                <Link key={listing.id} href={`/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}>
                    <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{listing.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>📍 {listing.location}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₺{listing.price}</span>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>/gece</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Mesajlar</h1>
            <div style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Yeni mesajınız yok</p>
              <Link href="/listings">
                <button className="btn btn-primary">Konaklama Bul</button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Profil Bilgilerim</h1>
            <div style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Ad Soyad</label>
                <input
                  type="text"
                  defaultValue="Kullanıcı Adı"
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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>E-posta</label>
                <input
                  type="email"
                  defaultValue="kullanici@email.com"
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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Telefon</label>
                <input
                  type="tel"
                  defaultValue="+90 555 123 4567"
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
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Bilgileri Güncelle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
