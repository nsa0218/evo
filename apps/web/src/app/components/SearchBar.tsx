import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

interface SearchBarProps {
  initial?: 'compact' | 'expanded';
  onSearch?: (params: any) => void;
  dark?: boolean;
  calendar?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initial = 'compact',
  onSearch,
  dark = false,
  calendar = true
}) => {
  const [mode, setMode] = useState(initial);
  const [field, setField] = useState<string | null>(null);
  const [where, setWhere] = useState('Bodrum, Türkiye');
  const [checkIn, setCheckIn] = useState(new Date(2026, 5, 12));
  const [checkOut, setCheckOut] = useState(new Date(2026, 5, 18));
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [pets, setPets] = useState(0);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-search-root]')) setField(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const totalGuests = adults + kids;

  if (mode === 'compact') {
    return (
      <button
        onClick={() => setMode('expanded')}
        className="glass"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 10px 10px 22px',
          borderRadius: 999,
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--slate-200)',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14 }}>Anywhere</span>
        <span style={{ width: 1, height: 20, background: 'var(--slate-200)' }} />
        <span style={{ fontWeight: 600, fontSize: 14 }}>Any week</span>
        <span style={{ width: 1, height: 20, background: 'var(--slate-200)' }} />
        <span style={{ color: 'var(--slate-500)', fontSize: 14 }}>Add guests</span>
        <span style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: 'var(--grad-cta)',
          color: 'white',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-cta)',
        }}>
          <Icon name="search" size={16} stroke="white" strokeWidth={2.2} />
        </span>
      </button>
    );
  }

  // Expanded mode
  const Field: React.FC<{
    id: string;
    label: string;
    value: string;
    placeholder: string;
    onClick?: () => void;
    flex?: number;
  }> = ({ id, label, value, placeholder, onClick, flex = 1 }) => (
    <div
      data-search-field={id}
      onClick={(e) => {
        e.stopPropagation();
        setField(id);
        onClick?.();
      }}
      style={{
        flex,
        padding: '14px 22px',
        borderRadius: 999,
        cursor: 'pointer',
        background: field === id ? 'var(--paper)' : 'transparent',
        boxShadow: field === id ? 'var(--shadow-md)' : 'none',
        transition: 'all .18s ease',
      }}
    >
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--slate-600)'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 14,
        marginTop: 4,
        color: value ? 'var(--ink)' : 'var(--slate-400)',
        fontWeight: value ? 500 : 400
      }}>
        {value || placeholder}
      </div>
    </div>
  );

  return (
    <div data-search-root style={{ position: 'relative', maxWidth: 880, width: '100%' }}>
      <div className="glass-strong" style={{
        display: 'flex',
        alignItems: 'center',
        padding: 6,
        borderRadius: 999,
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--glass-border)',
      }}>
        <Field id="where" label="Where" value={where} placeholder="Search destinations" />
        <Sep />
        <Field id="in" label="Check in" value={fmt(checkIn)} placeholder="Add dates" />
        <Sep />
        <Field id="out" label="Check out" value={fmt(checkOut)} placeholder="Add dates" />
        <Sep />
        <div style={{ flex: 1.2, display: 'flex', alignItems: 'center' }}>
          <Field
            id="who"
            label="Who"
            value={totalGuests ? `${totalGuests} guests${pets ? `, ${pets} pets` : ''}` : ''}
            placeholder="Add guests"
          />
          <button
            onClick={() => onSearch?.({ where, checkIn, checkOut, adults, kids, pets })}
            style={{
              margin: '0 6px 0 -8px',
              height: 52,
              padding: '0 22px',
              borderRadius: 999,
              border: 0,
              cursor: 'pointer',
              background: 'var(--grad-cta)',
              color: 'white',
              fontWeight: 600,
              fontSize: 14,
              fontFamily: 'inherit',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: 'var(--shadow-cta)',
            }}
          >
            <Icon name="search" size={16} stroke="white" strokeWidth={2.2} />
            Search
          </button>
        </div>
      </div>

      {/* Popovers */}
      {field === 'where' && <WherePopover onPick={(v: string) => { setWhere(v); setField('in'); }} />}
      {(field === 'in' || field === 'out') && calendar && (
        <CalendarPopover
          checkIn={checkIn}
          checkOut={checkOut}
          active={field}
          onPick={(d: Date) => {
            if (field === 'in') {
              setCheckIn(d);
              setField('out');
            } else {
              setCheckOut(d);
              setField('who');
            }
          }}
        />
      )}
      {field === 'who' && (
        <GuestsPopover
          adults={adults}
          kids={kids}
          pets={pets}
          setAdults={setAdults}
          setKids={setKids}
          setPets={setPets}
        />
      )}
    </div>
  );
};

const Sep: React.FC = () => (
  <span style={{ width: 1, height: 32, background: 'var(--slate-200)', flexShrink: 0 }} />
);

const Popover: React.FC<{ children: React.ReactNode; width?: string }> = ({
  children,
  width = 'min(440px, 100%)'
}) => (
  <div className="glass-strong" style={{
    position: 'absolute',
    top: 'calc(100% + 14px)',
    left: 0,
    width,
    maxWidth: '100%',
    padding: 12,
    borderRadius: 24,
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--glass-border)',
    zIndex: 60,
    animation: 'popIn .22s cubic-bezier(.4,0,.2,1)',
  }}>
    {children}
  </div>
);

const WherePopover: React.FC<{ onPick: (value: string) => void }> = ({ onPick }) => {
  const sugg = [
    { label: 'Bodrum, Türkiye', sub: 'For sea views and infinity pools', icon: 'sailboat' },
    { label: 'Cappadocia, Türkiye', sub: 'Iconic balloon mornings', icon: 'mountain' },
    { label: 'İstanbul, Türkiye', sub: 'Bosphorus city stays', icon: 'home' },
    { label: 'Antalya, Türkiye', sub: 'Old town, beach, history', icon: 'castle' },
    { label: 'Çeşme, Türkiye', sub: 'Aegean stone houses', icon: 'home' },
  ];
  return (
    <Popover>
      <div style={{
        padding: '10px 16px',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--slate-500)'
      }}>
        Recent searches & suggestions
      </div>
      {sugg.map(s => (
        <div
          key={s.label}
          onClick={() => onPick(s.label)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 16px',
            borderRadius: 14,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--slate-100)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--slate-100)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--navy-800)'
          }}>
            <Icon name={s.icon} size={20} />
          </span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 2 }}>{s.sub}</div>
          </div>
        </div>
      ))}
    </Popover>
  );
};

const CalendarPopover: React.FC<{
  checkIn: Date;
  checkOut: Date;
  active: string;
  onPick: (date: Date) => void;
}> = ({ checkIn, checkOut, active, onPick }) => {
  const [view, setView] = useState(new Date(checkIn.getFullYear(), checkIn.getMonth(), 1));
  const months = [view, new Date(view.getFullYear(), view.getMonth() + 1, 1)];

  return (
    <div className="glass-strong" style={{
      position: 'absolute',
      top: 'calc(100% + 14px)',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(720px, 100%)',
      padding: 24,
      borderRadius: 28,
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--glass-border)',
      zIndex: 60,
      animation: 'popIn .22s cubic-bezier(.4,0,.2,1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px 16px'
      }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: '1px solid var(--slate-200)',
            background: 'var(--paper)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="chevronLeft" size={16} />
        </button>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--slate-600)' }}>
          {active === 'in' ? 'Pick check-in' : 'Pick check-out'}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: '1px solid var(--slate-200)',
            background: 'var(--paper)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {months.map((m, i) => (
          <MonthGrid key={i} month={m} checkIn={checkIn} checkOut={checkOut} onPick={onPick} />
        ))}
      </div>
    </div>
  );
};

const MonthGrid: React.FC<{
  month: Date;
  checkIn: Date;
  checkOut: Date;
  onPick: (date: Date) => void;
}> = ({ month, checkIn, checkOut, onPick }) => {
  const y = month.getFullYear(), mo = month.getMonth();
  const first = new Date(y, mo, 1).getDay();
  const days = new Date(y, mo + 1, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cells: (Date | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, mo, d));

  const same = (a: Date, b: Date) => a && b && a.toDateString() === b.toDateString();
  const inRange = (d: Date) => d > checkIn && d < checkOut;

  return (
    <div>
      <div style={{
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 15,
        marginBottom: 12
      }}>
        {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
        fontSize: 11,
        color: 'var(--slate-500)',
        fontWeight: 600,
        marginBottom: 6
      }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isStart = same(d, checkIn);
          const isEnd = same(d, checkOut);
          const isInRange = inRange(d);
          const past = d < today;
          const cls = isStart || isEnd ? 'sel' : isInRange ? 'rng' : '';
          return (
            <button
              key={i}
              disabled={past}
              onClick={(e) => {
                e.stopPropagation();
                onPick(d);
              }}
              style={{
                aspectRatio: '1',
                border: 0,
                fontFamily: 'inherit',
                borderRadius: cls === 'sel' ? 999 : (cls === 'rng' ? 0 : 999),
                background: cls === 'sel' ? 'var(--ink)' : (cls === 'rng' ? 'var(--slate-100)' : 'transparent'),
                color: cls === 'sel' ? 'white' : (past ? 'var(--slate-300)' : 'var(--ink)'),
                fontWeight: cls === 'sel' ? 700 : 500,
                fontSize: 13,
                cursor: past ? 'not-allowed' : 'pointer',
                textDecoration: past ? 'line-through' : 'none',
                transition: 'all .12s ease',
              }}
              onMouseEnter={(e) => {
                if (!past && !cls) e.currentTarget.style.background = 'var(--slate-100)';
              }}
              onMouseLeave={(e) => {
                if (!past && !cls) e.currentTarget.style.background = 'transparent';
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Stepper: React.FC<{
  value: number;
  set: (value: number) => void;
  min?: number;
}> = ({ value, set, min = 0 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        set(Math.max(min, value - 1));
      }}
      disabled={value <= min}
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        border: '1px solid var(--slate-300)',
        background: 'var(--paper)',
        cursor: value <= min ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: value <= min ? 'var(--slate-300)' : 'var(--slate-700)'
      }}
    >
      <Icon name="minus" size={14} />
    </button>
    <span style={{ minWidth: 18, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
      {value}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        set(value + 1);
      }}
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        border: '1px solid var(--slate-300)',
        background: 'var(--paper)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Icon name="plus" size={14} />
    </button>
  </div>
);

const GuestsPopover: React.FC<{
  adults: number;
  kids: number;
  pets: number;
  setAdults: (value: number) => void;
  setKids: (value: number) => void;
  setPets: (value: number) => void;
}> = ({ adults, kids, pets, setAdults, setKids, setPets }) => (
  <Popover width="min(420px, 100%)">
    <div style={{ padding: 12 }}>
      {[
        { lbl: 'Adults', sub: 'Ages 13+', val: adults, set: setAdults, min: 1 },
        { lbl: 'Children', sub: 'Ages 2–12', val: kids, set: setKids, min: 0 },
        { lbl: 'Pets', sub: 'Service animals always allowed', val: pets, set: setPets, min: 0 },
      ].map((row, i, arr) => (
        <div
          key={row.lbl}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 4px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--slate-100)' : 'none'
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{row.lbl}</div>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 2 }}>{row.sub}</div>
          </div>
          <Stepper value={row.val} set={row.set} min={row.min} />
        </div>
      ))}
    </div>
  </Popover>
);

export default SearchBar;