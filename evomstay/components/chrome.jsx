// evomstay — shared chrome (header, footer, search bar, property card)
// Uses globals from icons.jsx + data.jsx

const TopBar = ({ role = 'guest', onRoleChange, scrolled = false, transparent = false }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const bg = transparent ? 'transparent' : (scrolled ? 'var(--paper)' : 'transparent');
  const border = scrolled ? '1px solid var(--slate-200)' : '1px solid transparent';
  return (
    <header style={{
      position:'sticky', top: 0, zIndex: 50,
      background: bg,
      backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
      borderBottom: border,
      transition: 'all .25s ease',
    }}>
      <div style={{
        maxWidth: 1400, margin:'0 auto',
        padding: '18px 36px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap: 24,
      }}>
        <Logo size={32} />

        <nav style={{display:'flex', alignItems:'center', gap: 28, fontSize: 14, fontWeight: 500, color:'var(--slate-700)'}}>
          <a style={{cursor:'pointer'}}>Stays</a>
          <a style={{cursor:'pointer'}}>Experiences</a>
          <a style={{cursor:'pointer'}}>Long stays</a>
        </nav>

        <div style={{display:'flex', alignItems:'center', gap: 8}}>
          <button className="btn btn-ghost" style={{fontSize: 14, padding: '8px 14px'}}>
            Become a host
          </button>
          <button className="btn btn-ghost" style={{padding: 8, borderRadius: 999}}>
            <Icon name="bell" size={20} />
          </button>
          <button onClick={() => setOpenMenu(!openMenu)}
            style={{
              display:'inline-flex', alignItems:'center', gap: 8,
              padding: '6px 8px 6px 14px', border: '1px solid var(--slate-200)', borderRadius: 999,
              background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: 'var(--shadow-xs)',
            }}>
            <Icon name="menu" size={16} />
            <Avatar name="Selin K" size={28} verified />
          </button>
        </div>
      </div>
    </header>
  );
};

// Animated floating search bar
// modes: 'compact' (pill in nav), 'expanded' (big floating card with calendar/guests popovers)
const SearchBar = ({ initial = 'compact', onSearch, dark = false, calendar = true }) => {
  const [mode, setMode] = React.useState(initial);
  const [field, setField] = React.useState(null); // 'where' | 'in' | 'out' | 'who' | null
  const [where, setWhere] = React.useState('Bodrum, Türkiye');
  const [checkIn, setCheckIn] = React.useState(new Date(2026, 5, 12));
  const [checkOut, setCheckOut] = React.useState(new Date(2026, 5, 18));
  const [adults, setAdults] = React.useState(2);
  const [kids, setKids] = React.useState(0);
  const [pets, setPets] = React.useState(0);

  React.useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('[data-search-root]')) setField(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const totalGuests = adults + kids;

  if (mode === 'compact') {
    return (
      <button onClick={() => setMode('expanded')} className="glass"
        style={{
          display:'inline-flex', alignItems:'center', gap: 12,
          padding: '10px 10px 10px 22px', borderRadius: 999, cursor:'pointer',
          fontFamily: 'inherit', boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--slate-200)',
        }}>
        <span style={{fontWeight: 600, fontSize: 14}}>Anywhere</span>
        <span style={{width: 1, height: 20, background: 'var(--slate-200)'}}/>
        <span style={{fontWeight: 600, fontSize: 14}}>Any week</span>
        <span style={{width: 1, height: 20, background: 'var(--slate-200)'}}/>
        <span style={{color: 'var(--slate-500)', fontSize: 14}}>Add guests</span>
        <span style={{
          width: 36, height: 36, borderRadius: 999, background: 'var(--grad-cta)',
          color: 'white', display:'inline-flex', alignItems:'center', justifyContent:'center',
          boxShadow: 'var(--shadow-cta)',
        }}>
          <Icon name="search" size={16} stroke="white" strokeWidth={2.2} />
        </span>
      </button>
    );
  }

  // expanded
  const Field = ({ id, label, value, placeholder, onClick, flex = 1 }) => (
    <div data-search-field={id}
      onClick={(e) => { e.stopPropagation(); setField(id); onClick?.(); }}
      style={{
        flex, padding: '14px 22px', borderRadius: 999, cursor: 'pointer',
        background: field === id ? 'var(--paper)' : 'transparent',
        boxShadow: field === id ? 'var(--shadow-md)' : 'none',
        transition: 'all .18s ease',
      }}>
      <div style={{fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--slate-600)'}}>
        {label}
      </div>
      <div style={{fontSize: 14, marginTop: 4, color: value ? 'var(--ink)' : 'var(--slate-400)', fontWeight: value ? 500 : 400}}>
        {value || placeholder}
      </div>
    </div>
  );

  return (
    <div data-search-root style={{position:'relative', maxWidth: 880, width:'100%'}}>
      <div className="glass-strong" style={{
        display:'flex', alignItems:'center',
        padding: 6, borderRadius: 999,
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--glass-border)',
      }}>
        <Field id="where" label="Where" value={where} placeholder="Search destinations" />
        <Sep />
        <Field id="in" label="Check in" value={fmt(checkIn)} placeholder="Add dates" />
        <Sep />
        <Field id="out" label="Check out" value={fmt(checkOut)} placeholder="Add dates" />
        <Sep />
        <div style={{flex: 1.2, display:'flex', alignItems:'center'}}>
          <Field id="who" label="Who" value={totalGuests ? `${totalGuests} guests${pets ? `, ${pets} pets` : ''}` : ''} placeholder="Add guests" />
          <button onClick={() => onSearch?.({where, checkIn, checkOut, adults, kids, pets})}
            style={{
              margin: '0 6px 0 -8px',
              height: 52, padding: '0 22px',
              borderRadius: 999, border: 0, cursor: 'pointer',
              background: 'var(--grad-cta)', color: 'white',
              fontWeight: 600, fontSize: 14, fontFamily: 'inherit',
              display:'inline-flex', alignItems:'center', gap: 8,
              boxShadow: 'var(--shadow-cta)',
            }}>
            <Icon name="search" size={16} stroke="white" strokeWidth={2.2} />
            Search
          </button>
        </div>
      </div>

      {/* popovers */}
      {field === 'where' && <WherePopover onPick={(v) => { setWhere(v); setField('in'); }} />}
      {(field === 'in' || field === 'out') && calendar && (
        <CalendarPopover checkIn={checkIn} checkOut={checkOut} active={field}
          onPick={(d) => {
            if (field === 'in') { setCheckIn(d); setField('out'); }
            else { setCheckOut(d); setField('who'); }
          }}/>
      )}
      {field === 'who' && (
        <GuestsPopover adults={adults} kids={kids} pets={pets}
          setAdults={setAdults} setKids={setKids} setPets={setPets}/>
      )}
    </div>
  );
};

const Sep = () => <span style={{width: 1, height: 32, background: 'var(--slate-200)', flexShrink: 0}}/>;

const WherePopover = ({ onPick }) => {
  const sugg = [
    { label: 'Bodrum, Türkiye', sub: 'For sea views and infinity pools', icon: 'sailboat' },
    { label: 'Cappadocia, Türkiye', sub: 'Iconic balloon mornings', icon: 'mountain' },
    { label: 'İstanbul, Türkiye', sub: 'Bosphorus city stays', icon: 'home' },
    { label: 'Antalya, Türkiye', sub: 'Old town, beach, history', icon: 'castle' },
    { label: 'Çeşme, Türkiye', sub: 'Aegean stone houses', icon: 'home' },
  ];
  return (
    <Popover>
      <div style={{padding: '10px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--slate-500)'}}>
        Recent searches & suggestions
      </div>
      {sugg.map(s => (
        <div key={s.label} onClick={() => onPick(s.label)}
          style={{display:'flex', alignItems:'center', gap: 14, padding: '12px 16px', borderRadius: 14, cursor: 'pointer'}}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slate-100)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <span style={{width: 44, height: 44, borderRadius: 12, background: 'var(--slate-100)', display:'inline-flex', alignItems:'center', justifyContent:'center', color: 'var(--navy-800)'}}>
            <Icon name={s.icon} size={20} />
          </span>
          <div>
            <div style={{fontWeight: 600, fontSize: 14}}>{s.label}</div>
            <div style={{fontSize: 13, color: 'var(--slate-500)', marginTop: 2}}>{s.sub}</div>
          </div>
        </div>
      ))}
    </Popover>
  );
};

const Popover = ({ children, width = 'min(440px, 100%)' }) => (
  <div className="glass-strong" style={{
    position:'absolute', top: 'calc(100% + 14px)', left: 0,
    width, maxWidth: '100%',
    padding: 12, borderRadius: 24,
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--glass-border)',
    zIndex: 60,
    animation: 'popIn .22s cubic-bezier(.4,0,.2,1)',
  }}>
    {children}
  </div>
);

// Real calendar popover with range picking
const CalendarPopover = ({ checkIn, checkOut, active, onPick }) => {
  const [view, setView] = React.useState(new Date(checkIn.getFullYear(), checkIn.getMonth(), 1));
  const months = [view, new Date(view.getFullYear(), view.getMonth() + 1, 1)];

  return (
    <div className="glass-strong" style={{
      position:'absolute', top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)',
      width: 'min(720px, 100%)', padding: 24, borderRadius: 28,
      boxShadow: 'var(--shadow-xl)', border: '1px solid var(--glass-border)', zIndex: 60,
      animation: 'popIn .22s cubic-bezier(.4,0,.2,1)',
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: '0 8px 16px'}}>
        <button onClick={(e) => { e.stopPropagation(); setView(new Date(view.getFullYear(), view.getMonth() - 1, 1)); }}
          style={{width: 36, height: 36, borderRadius: 999, border: '1px solid var(--slate-200)', background:'var(--paper)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
          <Icon name="chevronLeft" size={16} />
        </button>
        <div style={{fontWeight: 600, fontSize: 14, color: 'var(--slate-600)'}}>
          {active === 'in' ? 'Pick check-in' : 'Pick check-out'}
        </div>
        <button onClick={(e) => { e.stopPropagation(); setView(new Date(view.getFullYear(), view.getMonth() + 1, 1)); }}
          style={{width: 36, height: 36, borderRadius: 999, border: '1px solid var(--slate-200)', background:'var(--paper)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: 32}}>
        {months.map((m, i) => (
          <MonthGrid key={i} month={m} checkIn={checkIn} checkOut={checkOut} onPick={onPick} />
        ))}
      </div>
    </div>
  );
};

const MonthGrid = ({ month, checkIn, checkOut, onPick }) => {
  const y = month.getFullYear(), mo = month.getMonth();
  const first = new Date(y, mo, 1).getDay();
  const days = new Date(y, mo + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, mo, d));

  const same = (a, b) => a && b && a.toDateString() === b.toDateString();
  const inRange = (d) => d > checkIn && d < checkOut;

  return (
    <div>
      <div style={{textAlign:'center', fontWeight: 600, fontSize: 15, marginBottom: 12}}>
        {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </div>
      <div style={{display:'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontSize: 11, color:'var(--slate-500)', fontWeight: 600, marginBottom: 6}}>
        {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} style={{textAlign:'center'}}>{d}</div>)}
      </div>
      <div style={{display:'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2}}>
        {cells.map((d, i) => {
          if (!d) return <div key={i}/>;
          const isStart = same(d, checkIn);
          const isEnd = same(d, checkOut);
          const isInRange = inRange(d);
          const past = d < today;
          const cls = isStart || isEnd ? 'sel' : isInRange ? 'rng' : '';
          return (
            <button key={i} disabled={past}
              onClick={(e) => { e.stopPropagation(); onPick(d); }}
              style={{
                aspectRatio: '1', border: 0, fontFamily: 'inherit',
                borderRadius: cls === 'sel' ? 999 : (cls === 'rng' ? 0 : 999),
                background: cls === 'sel' ? 'var(--ink)' : (cls === 'rng' ? 'var(--slate-100)' : 'transparent'),
                color: cls === 'sel' ? 'white' : (past ? 'var(--slate-300)' : 'var(--ink)'),
                fontWeight: cls === 'sel' ? 700 : 500, fontSize: 13,
                cursor: past ? 'not-allowed' : 'pointer',
                textDecoration: past ? 'line-through' : 'none',
                transition: 'all .12s ease',
              }}
              onMouseEnter={(e) => { if (!past && !cls) e.currentTarget.style.background = 'var(--slate-100)'; }}
              onMouseLeave={(e) => { if (!past && !cls) e.currentTarget.style.background = 'transparent'; }}
            >{d.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
};

const Stepper = ({ value, set, min = 0 }) => (
  <div style={{display:'inline-flex', alignItems:'center', gap: 12}}>
    <button onClick={(e) => { e.stopPropagation(); set(Math.max(min, value - 1)); }}
      disabled={value <= min}
      style={{width: 32, height: 32, borderRadius: 999, border: '1px solid var(--slate-300)', background: 'var(--paper)', cursor: value <= min ? 'not-allowed' : 'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', color: value <= min ? 'var(--slate-300)' : 'var(--slate-700)'}}>
      <Icon name="minus" size={14} />
    </button>
    <span style={{minWidth: 18, textAlign:'center', fontWeight: 600, fontSize: 14}}>{value}</span>
    <button onClick={(e) => { e.stopPropagation(); set(value + 1); }}
      style={{width: 32, height: 32, borderRadius: 999, border: '1px solid var(--slate-300)', background: 'var(--paper)', cursor: 'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
      <Icon name="plus" size={14} />
    </button>
  </div>
);

const GuestsPopover = ({ adults, kids, pets, setAdults, setKids, setPets }) => (
  <Popover width="min(420px, 100%)">
    <div style={{padding: 12}}>
      {[
        { lbl: 'Adults', sub: 'Ages 13+', val: adults, set: setAdults, min: 1 },
        { lbl: 'Children', sub: 'Ages 2–12', val: kids, set: setKids, min: 0 },
        { lbl: 'Pets', sub: 'Service animals always allowed', val: pets, set: setPets, min: 0 },
      ].map((row, i, arr) => (
        <div key={row.lbl} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: '14px 4px', borderBottom: i < arr.length - 1 ? '1px solid var(--slate-100)' : 'none'}}>
          <div>
            <div style={{fontWeight: 600, fontSize: 15}}>{row.lbl}</div>
            <div style={{fontSize: 13, color:'var(--slate-500)', marginTop: 2}}>{row.sub}</div>
          </div>
          <Stepper value={row.val} set={row.set} min={row.min} />
        </div>
      ))}
    </div>
  </Popover>
);

// ───────── Property card ─────────
const PropertyCard = ({ p, size = 'md', onClick }) => {
  const [favored, setFavored] = React.useState(false);
  const heights = { sm: 220, md: 280, lg: 360 };
  return (
    <div onClick={onClick} style={{cursor: onClick ? 'pointer' : 'default'}}>
      <div style={{
        position:'relative', borderRadius: 24, overflow:'hidden',
        height: heights[size],
        background: `center/cover no-repeat url(${p.img})`,
        boxShadow: 'var(--shadow-sm)',
      }}>
        {p.host?.super && (
          <span className="glass-strong" style={{
            position:'absolute', top: 14, left: 14,
            padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700,
            color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>Guest favourite</span>
        )}
        <button onClick={(e) => { e.stopPropagation(); setFavored(!favored); }}
          style={{
            position:'absolute', top: 14, right: 14,
            width: 36, height: 36, borderRadius: 999, border: 0, cursor: 'pointer',
            background: 'rgba(15,23,42,0.32)', backdropFilter: 'blur(8px)',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            color: favored ? '#FF385C' : 'white',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favored ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20s-7-4.5-9-9.5C1.5 6 5 3 8 4.5c1.6.8 2.5 2 4 4 1.5-2 2.4-3.2 4-4 3-1.5 6.5 1.5 5 6-2 5-9 9.5-9 9.5Z"/>
          </svg>
        </button>
        {/* dot indicators */}
        <div style={{position:'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display:'flex', gap: 4}}>
          {[0,1,2,3,4].map(i => (
            <span key={i} style={{
              width: 6, height: 6, borderRadius: 999,
              background: i === 0 ? 'white' : 'rgba(255,255,255,0.5)',
            }}/>
          ))}
        </div>
      </div>
      <div style={{padding: '14px 4px 0'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap: 12}}>
          <div style={{fontWeight: 600, fontSize: 15, lineHeight: 1.3, letterSpacing: '-0.01em'}}>{p.title}</div>
          <StarRating value={p.rating} size={13} />
        </div>
        <div style={{color:'var(--slate-500)', fontSize: 14, marginTop: 4}}>{p.location}</div>
        <div style={{marginTop: 8, fontSize: 14}}>
          <span style={{fontWeight: 600}}>${p.price.toLocaleString()}</span>
          <span style={{color:'var(--slate-500)'}}> / night</span>
        </div>
      </div>
    </div>
  );
};

// Category bar
const CategoryBar = ({ active, onChange }) => {
  const ref = React.useRef(null);
  const [canL, setCanL] = React.useState(false);
  const [canR, setCanR] = React.useState(true);
  const update = () => {
    const el = ref.current; if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };
  React.useEffect(() => { update(); }, []);
  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
    setTimeout(update, 320);
  };
  return (
    <div style={{position:'relative', display:'flex', alignItems:'center', gap: 16}}>
      {canL && (
        <button onClick={() => scroll(-1)}
          style={{position:'absolute', left: -8, zIndex: 2, width: 36, height: 36, borderRadius: 999, border: '1px solid var(--slate-200)', background: 'var(--paper)', boxShadow: 'var(--shadow-sm)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
          <Icon name="chevronLeft" size={14} />
        </button>
      )}
      <div ref={ref} onScroll={update} className="no-scrollbar"
        style={{display:'flex', gap: 28, overflowX:'auto', flex: 1, padding: '6px 4px', scrollBehavior: 'smooth'}}>
        {window.EVOM.CATEGORIES.map(c => (
          <button key={c.name} onClick={() => onChange?.(c.name)}
            style={{
              display:'inline-flex', flexDirection:'column', alignItems:'center', gap: 6,
              padding: '6px 4px 12px', border: 0, background: 'transparent',
              borderBottom: active === c.name ? '2px solid var(--ink)' : '2px solid transparent',
              color: active === c.name ? 'var(--ink)' : 'var(--slate-600)',
              cursor:'pointer', fontFamily:'inherit', fontSize: 12, fontWeight: 600, whiteSpace:'nowrap',
              opacity: active && active !== c.name ? 0.7 : 1,
              transition: 'all .15s ease',
            }}>
            <Icon name={c.icon} size={26} strokeWidth={1.4} />
            <span>{c.name}</span>
          </button>
        ))}
      </div>
      <button className="btn btn-outline" style={{padding: '8px 14px', fontSize: 13}}>
        <Icon name="filter" size={14} /> Filters
      </button>
    </div>
  );
};

// Footer
const Footer = ({ compact = false }) => (
  <footer style={{
    background: 'var(--navy-900)', color: 'white',
    padding: compact ? '40px 36px' : '64px 36px 48px',
    marginTop: 64,
  }}>
    <div style={{maxWidth: 1400, margin:'0 auto'}}>
      <div style={{display:'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 36}}>
        <div>
          <Logo size={28} mono />
          <div style={{maxWidth: 280, marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6}}>
            Eviniz gibi, güvenle kalın. A members-only platform for verified hosts and guests.
          </div>
        </div>
        {[
          { h: 'Stay', l: ['Find a stay', 'Long stays', 'Categories', 'Verified hosts'] },
          { h: 'Host', l: ['List your space', 'Hosting tools', 'Insurance', 'Help centre'] },
          { h: 'Company', l: ['About', 'Newsroom', 'Careers', 'Investors'] },
          { h: 'Legal', l: ['Terms', 'Privacy', 'Cookies', 'KVKK'] },
        ].map(c => (
          <div key={c.h}>
            <div style={{fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform:'uppercase', color: 'rgba(255,255,255,0.6)'}}>{c.h}</div>
            <div style={{display:'flex', flexDirection:'column', gap: 10, marginTop: 14}}>
              {c.l.map(x => <a key={x} style={{color: 'white', fontSize: 14, textDecoration:'none', opacity: 0.85}}>{x}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display:'flex', justifyContent:'space-between', fontSize: 13, color: 'rgba(255,255,255,0.55)'}}>
        <div>© 2026 evomstay · İstanbul</div>
        <div>EN · USD</div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { TopBar, SearchBar, PropertyCard, CategoryBar, Footer });
