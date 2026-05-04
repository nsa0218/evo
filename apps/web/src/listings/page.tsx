import Link from 'next/link';
import { Suspense } from 'react';
import ListingsClientContent from './client-content';

export default function ListingsPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontWeight: '600', fontSize: '1.25rem' }}>🏠 Konaklama</Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={{
              padding: '0.5rem 1rem', borderRadius: '2rem',
              background: 'var(--color-primary)',
              color: 'white',
              border: '1px solid var(--color-border)', cursor: 'pointer',
            }}
          >
            📱 Liste
          </button>
          <button
            style={{
              padding: '0.5rem 1rem', borderRadius: '2rem',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)', cursor: 'pointer',
            }}
          >
            🗺️ Harita
          </button>
        </div>
      </nav>

      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>}>
        <ListingsClientContent />
      </Suspense>
    </div>
  );
}
