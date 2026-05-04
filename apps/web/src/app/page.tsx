'use client';

import React, { useState, useRef } from 'react';
import TopBar from './components/TopBar';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import Icon from './components/Icon';
import { FEATURED, CATEGORIES } from './lib/data';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState('Trending');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onScroll={(e) => setScrolled(e.target.scrollTop > 80)}
      style={{
        height: '100vh',
        overflow: 'auto',
        background: 'var(--bg)',
        position: 'relative'
      }}
      className="thin-scroll"
    >

      {/* HERO — compact */}
      <section style={{
        position: 'relative',
        minHeight: 460,
        background: `
          radial-gradient(700px 360px at 80% -10%, rgba(26, 168, 161, 0.16), transparent 60%),
          radial-gradient(540px 300px at 0% 30%, rgba(0, 102, 255, 0.08), transparent 60%),
          linear-gradient(180deg, #FBFCFE 0%, #F4F6FA 100%)
        `,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,168,161,0.5), transparent 70%)',
          filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute',
          top: 140,
          left: -120,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.25), transparent 70%)',
          filter: 'blur(50px)'
        }} />

        <TopBar scrolled={scrolled} transparent={!scrolled} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 36px 40px', position: 'relative', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px 5px 5px',
            borderRadius: 999,
            background: 'var(--paper)',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-sm)',
            fontSize: 12,
            color: 'var(--slate-700)'
          }}>
            <span style={{
              padding: '3px 9px',
              borderRadius: 999,
              background: 'var(--grad-brand)',
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}>NEW</span>
            <span>Verified hosts only · Identity-checked · Insured stays</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 4.2vw, 54px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: '18px 0 12px',
            textWrap: 'balance'
          }}>
            Stay safely,{' '}
            <span style={{
              background: 'var(--grad-brand)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontStyle: 'italic'
            }}>just like home.</span>
          </h1>
          <p style={{
            fontSize: 15,
            color: 'var(--slate-600)',
            maxWidth: 560,
            lineHeight: 1.55,
            margin: '0 auto'
          }}>
            A members-only platform for hand-picked stays in Türkiye and beyond — every host identity-verified, every property insured.
          </p>

          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <SearchBar initial="expanded" />
          </div>

          <div style={{
            marginTop: 24,
            display: 'flex',
            gap: 28,
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            color: 'var(--slate-500)',
            fontSize: 12
          }}>
            {[
              { i: 'shieldCheck', t: '128,000+ verified hosts' },
              { i: 'sparkle', t: '4.94 average across 1.2M reviews' },
              { i: 'lock', t: 'Encrypted in-app payments' },
              { i: 'flag', t: 'Available in 92 countries' }
            ].map((b) =>
              <div key={b.t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Icon name={b.i} size={16} stroke="var(--teal-600)" />
                <span>{b.t}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORY BAR — sticky-feel band */}
      <section style={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        background: 'var(--paper)',
        borderTop: '1px solid var(--slate-200)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '14px 36px'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <CategoryBar active={activeCat} onChange={setActiveCat} />
        </div>
      </section>

      {/* FEATURED GRID */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 36px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--teal-600)'
            }}>
              Featured · {activeCat}
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 36,
              letterSpacing: '-0.025em',
              margin: '8px 0 0'
            }}>
              Stays our editors love
            </h2>
          </div>

          <a style={{
            color: 'var(--ink)',
            fontSize: 14,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}>
            See all <Icon name="arrowRight" size={14} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {FEATURED.slice(0, 8).map((p) =>
            <PropertyCard key={p.id} p={p} size="md" />
          )}
        </div>
      </section>

      {/* INLINE TRUST CARDS */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 36px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 24 }}>
          <div className="card" style={{
            padding: 36,
            borderRadius: 24,
            background: 'var(--grad-brand)',
            color: 'white',
            border: 0,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)'
            }} />
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}>
              <Icon name="shieldCheck" size={14} stroke="white" />
              VERIFIED · ONLY ON EVOMSTAY
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 32,
              letterSpacing: '-0.02em',
              margin: '16px 0 12px',
              lineHeight: 1.1
            }}>
              The gold shield means a real person — and a real home.
            </h3>
            <p style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 460
            }}>
              Every verified host has passed a video identity check, a property inspection, and a deposit guarantee.
              Look for the glowing gold shield on profiles and listings.
            </p>
            <button style={{
              marginTop: 24,
              padding: '12px 20px',
              borderRadius: 999,
              border: 0,
              cursor: 'pointer',
              background: 'white',
              color: 'var(--navy-900)',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              How verification works <Icon name="arrowRight" size={14} stroke="var(--navy-900)" />
            </button>
          </div>

          {[
            { icon: 'sparkle', t: 'Concierge Layer', sub: '24/7 human support — average response time 90 seconds.' },
            { icon: 'creditCard', t: 'AnyCancel Insurance', sub: 'Cancel up to 24h before. We pay your host, you pay nothing.' }
          ].map((c) =>
            <div key={c.t} className="card" style={{ padding: 32, borderRadius: 24 }}>
              <span style={{
                display: 'inline-flex',
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'var(--teal-100)',
                color: 'var(--teal-600)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name={c.icon} size={22} stroke="var(--teal-600)" />
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: '-0.02em',
                margin: '18px 0 10px'
              }}>
                {c.t}
              </h3>
              <p style={{
                fontSize: 14.5,
                color: 'var(--slate-600)',
                lineHeight: 1.6,
                margin: 0
              }}>
                {c.sub}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* TURN STAYS INTO INCOME */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 36px 24px' }}>
        <div className="card" style={{
          padding: '48px 56px',
          borderRadius: 28,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          background: 'var(--paper)'
        }}>
          <div>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--cta)'
            }}>
              For hosts
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: '-0.025em',
              margin: '12px 0 16px',
              lineHeight: 1.05
            }}>
              Hosts on evomstay earn <span style={{ fontStyle: 'italic', color: 'var(--cta)' }}>2.4×</span> the average rate.
            </h2>
            <p style={{
              fontSize: 16,
              color: 'var(--slate-600)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 480
            }}>
              Members-only audience, dynamic pricing tuned to your area, and a concierge that handles guests on your behalf.
              List in eight minutes.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button className="btn btn-primary">Estimate my earnings</button>
              <button className="btn btn-outline">Read host stories</button>
            </div>
          </div>
          <div style={{
            position: 'relative',
            height: 320,
            borderRadius: 24,
            overflow: 'hidden',
            background: `center/cover url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70)`
          }}>
            <div className="glass-strong" style={{
              position: 'absolute',
              bottom: 18,
              left: 18,
              right: 18,
              padding: 16,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 14
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: 'var(--slate-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--slate-700)',
                fontSize: 14,
                fontWeight: 600
              }}>
                S K
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 600,
                  fontSize: 14
                }}>
                  Selin · Bodrum
                  <span style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: 'var(--gold-400)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon name="shieldCheck" size={8} stroke="white" />
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--slate-600)', marginTop: 2 }}>
                  $14,976 earned · last 30 days
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>Occupancy</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--success)' }}>86%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const CategoryBar: React.FC<{ active: string; onChange: (cat: string) => void }> = ({ active, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  React.useEffect(() => {
    update();
  }, []);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
    setTimeout(update, 320);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
      {canL && (
        <button
          onClick={() => scroll(-1)}
          style={{
            position: 'absolute',
            left: -8,
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: 999,
            border: '1px solid var(--slate-200)',
            background: 'var(--paper)',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="chevronLeft" size={14} />
        </button>
      )}
      <div
        ref={ref}
        onScroll={update}
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 28,
          overflowX: 'auto',
          flex: 1,
          padding: '6px 4px',
          scrollBehavior: 'smooth'
        }}
      >
        {CATEGORIES.map(c => (
          <button
            key={c.name}
            onClick={() => onChange(c.name)}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '6px 4px 12px',
              border: 0,
              background: 'transparent',
              borderBottom: active === c.name ? '2px solid var(--ink)' : '2px solid transparent',
              color: active === c.name ? 'var(--ink)' : 'var(--slate-600)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              opacity: active && active !== c.name ? 0.7 : 1,
              transition: 'all .15s ease',
            }}
          >
            <Icon name={c.icon} size={26} strokeWidth={1.4} />
            <span>{c.name}</span>
          </button>
        ))}
      </div>
      <button className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 13 }}>
        <Icon name="filter" size={14} /> Filters
      </button>
    </div>
  );
};
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'var(--gradient-hero)',
        position: 'relative', overflow: 'hidden',
        paddingTop: '72px',
      }}>
        {/* Background elements */}
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)',
          top: '-20%', right: '5%', opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%)',
          bottom: '5%', left: '0%', opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.06), transparent 70%)',
          top: '20%', left: '60%', opacity: 0.4,
        }} />

        <div style={{ width: '100%', position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: 700, marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Dünyanın{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ec4899, #f59e0b, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>her yerine</span>{' '}
              ait olun
            </h1>
            <p style={{
              fontSize: '1.25rem', color: 'var(--color-text-secondary)',
              lineHeight: 1.7, marginBottom: '2rem',
            }}>
              Benzersiz konaklama deneyimleri keşfedin. Ev sahipleriyle doğrudan bağlantı kurun, unutulmaz anılar biriktirin.
            </p>
          </div>

          {/* Advanced Search Bar - Airbnb Style */}
          <div style={{
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem', boxShadow: 'var(--shadow-lg)',
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0',
            maxWidth: '900px',
          }}>
            <div style={{
              padding: '1rem', borderRight: '1px solid rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000' }}>NEREYE</label>
              <input
                type="text"
                placeholder="Herhangi bir yer"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%', border: 'none', outline: 'none',
                  background: 'transparent', color: '#000', fontSize: '1rem',
                  fontWeight: 500,
                }}
              />
            </div>
            <div style={{
              padding: '1rem', borderRight: '1px solid rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000' }}>GİRİŞ</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{
                  width: '100%', border: 'none', outline: 'none',
                  background: 'transparent', color: '#000', fontSize: '1rem',
                  fontWeight: 500,
                }}
              />
            </div>
            <div style={{
              padding: '1rem', borderRight: '1px solid rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000' }}>ÇIKIŞ</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{
                  width: '100%', border: 'none', outline: 'none',
                  background: 'transparent', color: '#000', fontSize: '1rem',
                  fontWeight: 500,
                }}
              />
            </div>
            <div style={{
              padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000' }}>KONUK</label>
                <select style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  color: '#000', fontSize: '1rem', fontWeight: 500,
                }}>
                  <option>1 konuk</option>
                  <option>2 konuk</option>
                  <option>3 konuk</option>
                  <option>4+ konuk</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'var(--color-primary)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                }}
              >
                <span style={{ color: 'white', fontSize: '1.25rem' }}>🔍</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Özellikler</span>
            <h2>Neden Bizi Tercih Etmelisiniz?</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', maxWidth: 600, margin: '1rem auto 0' }}>
              Platform, misafirler ve ev sahipleri için güçlü araçlar sunar.
            </p>
          </div>

          <div className="grid grid-3">
            {[
              { icon: '🔒', title: 'Güvenli Ödeme', desc: 'Stripe altyapısı ile escrow modeli. Paranız check-in sonrası ev sahibine aktarılır.' },
              { icon: '💬', title: 'Anlık Mesajlaşma', desc: 'Ev sahibiyle gerçek zamanlı iletişim kurun. WebSocket tabanlı hızlı mesajlaşma.' },
              { icon: '🗺️', title: 'Harita Üzerinde Arama', desc: 'GPS tabanlı konum araması ile çevrenizdeki en iyi ilanları harita üzerinde görün.' },
              { icon: '📊', title: 'Kazanç Analitiği', desc: 'Ev sahipleri için detaylı kazanç raporları ve dinamik fiyatlandırma araçları.' },
              { icon: '✅', title: 'Doğrulanmış Profiller', desc: 'KYC ile kimlik doğrulaması. E-posta, telefon ve kimlik rozetleri.' },
              { icon: '📱', title: 'Her Cihazda', desc: 'Responsive web tasarımı ve mobil uygulama ile her yerden erişim.' },
            ].map((f, i) => (
              <div key={i} className="glass-card" style={{
                padding: '2rem',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-elevated)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', marginBottom: '1.25rem',
                }}>
                  {f.icon}
                </div>
                <h4 style={{ marginBottom: '0.75rem' }}>{f.title}</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
