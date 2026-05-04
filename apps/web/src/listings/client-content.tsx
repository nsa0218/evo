'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../components/Map'), { ssr: false });

function ListingsContent() {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000,
    type: '',
    minRating: 0,
    amenities: [] as string[],
  });
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  const listings = [
    {
      id: '1',
      title: 'Boğaz Manzarası Modern Daire',
      description: 'Boğaz manzarası olan lüks modern daire',
      price: 250,
      rating: 4.8,
      reviews: 156,
      location: 'İstanbul',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      lat: 41.0082,
      lng: 28.9784,
      amenities: ['WiFi', 'Mutfak', 'Çamaşır Makinesi'],
    },
    {
      id: '2',
      title: 'Antalya Deniz Kenarı Villa',
      description: 'Özel plaja erişimli lüks villa',
      price: 450,
      rating: 4.9,
      reviews: 89,
      location: 'Antalya',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      lat: 36.8969,
      lng: 30.7133,
      amenities: ['Havuz', 'WiFi', 'Mutfak'],
    },
    {
      id: '3',
      title: 'Ankara Modern Merkezi Daire',
      description: 'Merkez konumlarda geniş ve modern daire',
      price: 180,
      rating: 4.6,
      reviews: 234,
      location: 'Ankara',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      lat: 39.9334,
      lng: 32.8597,
      amenities: ['WiFi', 'Klima', 'TV'],
    },
    {
      id: '4',
      title: 'İzmir Konak Çiftlik Evi',
      description: 'Doğayla iç içe, ahşap çiftlik evi',
      price: 200,
      rating: 4.7,
      reviews: 145,
      location: 'İzmir',
      image: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=400',
      lat: 38.4192,
      lng: 27.1287,
      amenities: ['Bahçe', 'Mutfak', 'Şömine'],
    },
    {
      id: '5',
      title: 'Bodrum Lüks Dairepark',
      description: 'Havuzlu lüks dairepark kompleksi',
      price: 350,
      rating: 5.0,
      reviews: 198,
      location: 'Bodrum',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      lat: 37.0344,
      lng: 27.4305,
      amenities: ['Havuz', 'WiFi', 'Spa'],
    },
    {
      id: '6',
      title: 'Kahvaltı İçin Ideal Müze Yakın Ev',
      description: 'Tarihî bölgede butik ev',
      price: 220,
      rating: 4.5,
      reviews: 167,
      location: 'İstanbul',
      image: 'https://images.unsplash.com/photo-1494145904049-0dca7b0ec6d0?w=400',
      lat: 41.0082,
      lng: 28.9784,
      amenities: ['Tarihî', 'Mutfak', 'WiFi'],
    },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: viewMode === 'grid' ? '250px 1fr' : '250px 1fr 400px', gap: '2rem' }}>
      <div style={{ background: 'var(--color-bg-secondary)', borderRadius: '12px', padding: '1.5rem', height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Filtreler</h2>
        
        {location && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Konum</label>
            <div style={{ padding: '0.5rem', background: 'var(--color-bg)', borderRadius: '6px', fontSize: '0.875rem' }}>{location}</div>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Fiyat Aralığı</label>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}>
            <span>₺{filters.priceMin}</span>
            <span>-</span>
            <span>₺{filters.priceMax}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            value={filters.priceMax}
            onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Olanaklar</label>
          {['WiFi', 'Havuz', 'Mutfak', 'Klima', 'Bahçe'].map(amenity => (
            <button
              key={amenity}
              onClick={() => {
                const newAmenities = filters.amenities.includes(amenity)
                  ? filters.amenities.filter(a => a !== amenity)
                  : [...filters.amenities, amenity];
                setFilters({ ...filters, amenities: newAmenities });
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                background: filters.amenities.includes(amenity) ? 'var(--color-primary)' : 'transparent',
                color: filters.amenities.includes(amenity) ? 'white' : 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              {amenity}
            </button>
          ))}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Min. Rating</label>
          {[3, 4, 4.5].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters({ ...filters, minRating: filters.minRating === rating ? 0 : rating })}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                background: filters.minRating === rating ? 'var(--color-primary)' : 'transparent',
                color: filters.minRating === rating ? 'white' : 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              ⭐ {rating}+
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
              {location ? `${location} İçinde Konaklamalar` : 'Tüm Konaklamalar'}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>{listings.length} sonuç bulundu</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {listings.map(listing => (
              <Link key={listing.id} href={`/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--color-bg-secondary)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <img
                    src={listing.image}
                    alt={listing.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      transition: 'transform 0.2s',
                    }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{listing.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>📍 {listing.location}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{listing.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₺{listing.price}</span>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>/gece</span>
                      </div>
                      <div style={{ fontSize: '0.875rem' }}>
                        ⭐ {listing.rating} ({listing.reviews})
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
              {location ? `${location} Haritası` : 'Konaklama Haritası'}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>Haritada konaklama yerlerini keşfedin</p>
          </div>
          <DynamicMap listings={listings} height="600px" />
        </div>
      )}

      {viewMode === 'map' && (
        <div style={{ background: 'var(--color-bg-secondary)', borderRadius: '12px', padding: '1rem', height: '600px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Konaklamalar</h3>
          {listings.map(listing => (
            <Link key={listing.id} href={`/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', gap: '1rem', padding: '1rem', marginBottom: '1rem',
                background: 'var(--color-bg)', borderRadius: '8px',
                cursor: 'pointer', transition: 'background 0.2s',
              }}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  style={{ width: '80px', height: '60px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{listing.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>📍 {listing.location}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>₺{listing.price}/gece</span>
                    <span style={{ fontSize: '0.75rem' }}>⭐ {listing.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ListingsClientContent() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
