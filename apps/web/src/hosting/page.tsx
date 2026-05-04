'use client';

import Link from 'next/link';

export default function HostingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/">Konaklama</Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/auth/login" className="btn btn-secondary">Giriş</Link>
          <Link href="/auth/register" className="btn btn-primary">Kayıt</Link>
        </div>
      </nav>

      <section style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        background: 'var(--gradient-hero)',
        paddingTop: '72px', padding: '0 2rem',
      }}>
        <div style={{ maxWidth: 700 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Evinizi Paylaşın,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Kazanın</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Evinizi listeleyin ve dünya genelindeki misafirlerden ek gelir elde edin. Kolay yönetim araçları ile profesyonel ev sahibi olun.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/auth/register">
              <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600 }}>
                Ücretsiz Başla
              </button>
            </Link>
            <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600 }}>
              Nasıl Çalışır?
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: 'var(--color-bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Ev Sahiplerine Avantajlar</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
              Platformumuz ev sahiplerine sunduğu araçlarla kazancınızı maksimize eder
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '💰', title: 'Esnek Kazanç', desc: 'Kendi fiyatınızı belirleyin, minimum gecelik kiralama şartı yok' },
              { icon: '🛡️', title: 'Tam Korunma', desc: 'Host Protection Insurance ile mülkünüz güvende' },
              { icon: '📱', title: 'Kolay Yönetim', desc: 'Rezervasyonları, mesajları tek yerden yönetin' },
              { icon: '📊', title: 'Kazanç Analitiği', desc: 'Detaylı raporlar ve fiyat optimizasyonu' },
              { icon: '🎯', title: 'Hedefli Pazarlama', desc: 'Doğru misafirlere ulaşın' },
              { icon: '⚡', title: 'Hızlı Ödeme', desc: 'Kazançlarınızı haftalık olarak alın' },
            ].map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-bg)',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{benefit.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{benefit.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Başlamak Çok Kolay</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '3rem' }}>
            3 adımda evinizi listeye ekleyin
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 700, margin: '0 auto 1rem',
              }}>1</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Evinizi Tanıtın</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Fotoğraflar yükleyin, olanakları belirtin, açıklama yazın</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 700, margin: '0 auto 1rem',
              }}>2</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Fiyat Belirleyin</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Dinamik fiyatlandırma araçları ile rekabetçi fiyat koyun</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 700, margin: '0 auto 1rem',
              }}>3</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Misafirleri Karşılayın</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Rezervasyonları kabul edin ve kazanç elde etmeye başlayın</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
