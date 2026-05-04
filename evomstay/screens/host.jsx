// evomstay — Host dashboard with listings, calendar, analytics

const HostDashboardScreen = ({ role, onRoleChange }) => {
  const [tab, setTab] = React.useState('Listings');
  return (
    <div style={{height: 980, overflow:'auto', borderRadius: 24, background: 'var(--bg)'}}
      data-screen-label="07 Host Dashboard" className="thin-scroll">
      <TopBar role={role} onRoleChange={onRoleChange} scrolled />
      <div style={{maxWidth: 1400, margin:'0 auto', padding: '32px 36px 64px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 28}}>
          <div>
            <h1 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 40, fontWeight: 500, letterSpacing:'-0.025em'}}>Host studio</h1>
            <p style={{margin: '6px 0 0', color:'var(--slate-500)', fontSize: 15}}>Selin K. · Member since 2020 · Top 1% host</p>
          </div>
          <button className="btn btn-primary"><Icon name="plus" size={14} stroke="white"/> New listing</button>
        </div>

        {/* KPI strip */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 18, marginBottom: 32}}>
          {[
            { l:'30-day earnings', v:'$22,880', d:'+18.2%', up: true },
            { l:'Occupancy', v:'89%', d:'+4.1%', up: true },
            { l:'Avg. nightly', v:'$612', d:'+$22', up: true },
            { l:'Open inquiries', v:'7', d:'2 new today', up: false },
          ].map(k => (
            <div key={k.l} className="card" style={{padding: 22, borderRadius: 20}}>
              <div style={{fontSize: 12, color:'var(--slate-500)', fontWeight: 600, letterSpacing:'.04em', textTransform:'uppercase'}}>{k.l}</div>
              <div style={{fontSize: 28, fontWeight: 700, marginTop: 10, fontFamily:'var(--font-display)', letterSpacing:'-0.02em'}}>{k.v}</div>
              <div style={{fontSize: 12, color: k.up ? 'var(--success)' : 'var(--slate-500)', marginTop: 6, display:'flex', alignItems:'center', gap: 4}}>
                {k.up && <Icon name="arrowUp" size={12} stroke="var(--success)"/>}
                {k.d}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex', gap: 4, padding: 4, borderRadius: 999, background:'var(--slate-100)', alignSelf:'flex-start', width:'fit-content', marginBottom: 22}}>
          {['Listings', 'Calendar', 'Analytics'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding:'8px 18px', borderRadius: 999, border: 0,
                background: tab === t ? 'var(--paper)' : 'transparent',
                fontFamily:'inherit', fontWeight: 600, fontSize: 13, cursor:'pointer',
                color: tab === t ? 'var(--ink)' : 'var(--slate-500)',
                boxShadow: tab === t ? 'var(--shadow-xs)' : 'none',
              }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Listings' && <HostListings />}
        {tab === 'Calendar' && <HostCalendar />}
        {tab === 'Analytics' && <HostAnalytics />}
      </div>
    </div>
  );
};

const HostListings = () => (
  <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 18}}>
    {window.EVOM.HOST_LISTINGS.map(h => (
      <div key={h.id} className="card" style={{padding: 18, borderRadius: 22, display:'flex', gap: 18}}>
        <div style={{width: 160, height: 170, borderRadius: 16, background:`center/cover url(${h.property.img})`, flexShrink:0, position:'relative'}}>
          <span className="glass-strong" style={{position:'absolute', top: 10, left: 10, padding:'4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing:'.04em', textTransform:'uppercase', color: h.status === 'Live' ? 'var(--success)' : 'var(--slate-600)'}}>
            {h.status === 'Live' ? '● Live' : '◯ Paused'}
          </span>
        </div>
        <div style={{flex: 1}}>
          <div style={{fontWeight: 600, fontSize: 16, lineHeight: 1.3}}>{h.property.title}</div>
          <div style={{color:'var(--slate-500)', fontSize: 13, marginTop: 4}}>{h.property.location}</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10, marginTop: 14, padding: '12px 0', borderTop:'1px solid var(--slate-100)', borderBottom:'1px solid var(--slate-100)'}}>
            <Metric l="Nightly" v={`$${h.nightly}`}/>
            <Metric l="Occupancy" v={`${h.occupancy}%`}/>
            <Metric l="Next stay" v={h.nextBooking}/>
            <Metric l="30d earnings" v={`$${h.earnings30.toLocaleString()}`}/>
          </div>
          <div style={{display:'flex', gap: 8, marginTop: 12}}>
            <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12}}><Icon name="edit" size={12}/> Edit</button>
            <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12}}><Icon name="calendar" size={12}/> Calendar</button>
            <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12}}><Icon name="eye" size={12}/> Preview</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Metric = ({ l, v }) => (
  <div>
    <div style={{fontSize: 11, color:'var(--slate-500)', fontWeight: 600, letterSpacing:'.04em', textTransform:'uppercase'}}>{l}</div>
    <div style={{fontSize: 15, fontWeight: 600, marginTop: 4}}>{v}</div>
  </div>
);

const HostCalendar = () => {
  const month = new Date(2026, 5, 1); // June 2026
  const days = new Date(2026, 6, 0).getDate();
  const first = month.getDay();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  // some bookings + blocked
  const bookings = {
    3: 'b1', 4: 'b1', 5: 'b1',
    8: 'b2',
    12: 'b3', 13: 'b3', 14: 'b3', 15: 'b3', 16: 'b3', 17: 'b3', 18: 'b3',
    22: 'b4', 23: 'b4', 24: 'b4',
    27: 'block', 28: 'block',
  };
  const colors = {
    b1: { bg:'#E0F7F4', tx:'var(--teal-600)', label:'Patterson' },
    b2: { bg:'#FEF3C7', tx:'#92400E', label:'Inquiry' },
    b3: { bg:'var(--cta-soft)', tx:'var(--cta)', label:'López — confirmed' },
    b4: { bg:'#F3E8FF', tx:'#7C3AED', label:'Chen — confirmed' },
    block: { bg:'var(--slate-200)', tx:'var(--slate-600)', label:'Blocked' },
  };

  return (
    <div className="card" style={{padding: 24, borderRadius: 22}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 18}}>
        <div style={{display:'flex', alignItems:'center', gap: 12}}>
          <button style={{width: 32, height: 32, borderRadius: 999, border:'1px solid var(--slate-200)', background:'var(--paper)', cursor:'pointer'}}><Icon name="chevronLeft" size={14}/></button>
          <h3 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 600}}>June 2026</h3>
          <button style={{width: 32, height: 32, borderRadius: 999, border:'1px solid var(--slate-200)', background:'var(--paper)', cursor:'pointer'}}><Icon name="chevronRight" size={14}/></button>
        </div>
        <div style={{display:'flex', alignItems:'center', gap: 18, fontSize: 12, color:'var(--slate-600)'}}>
          <Legend c="var(--cta-soft)" l="Confirmed"/>
          <Legend c="#FEF3C7" l="Inquiry"/>
          <Legend c="var(--slate-200)" l="Blocked"/>
          <select style={{padding: '8px 14px', borderRadius: 12, border:'1px solid var(--slate-200)', fontFamily:'inherit', fontSize: 13, background:'var(--paper)', cursor:'pointer'}}>
            <option>Marina Penthouse</option>
            <option>Cliffside Villa</option>
          </select>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: 6, fontSize: 11, color:'var(--slate-500)', fontWeight: 700, letterSpacing:'.06em', textTransform:'uppercase', marginBottom: 8}}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} style={{padding: '6px 10px'}}>{d}</div>)}
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: 6}}>
        {cells.map((d, i) => {
          if (!d) return <div key={i}/>;
          const b = bookings[d];
          const col = b ? colors[b] : null;
          return (
            <div key={i} style={{
              minHeight: 78, padding: 10, borderRadius: 12,
              background: col ? col.bg : 'var(--slate-50)',
              border: '1px solid ' + (col ? 'transparent' : 'var(--slate-200)'),
              position:'relative', overflow:'hidden',
            }}>
              <div style={{fontSize: 12, fontWeight: 700, color: col ? col.tx : 'var(--ink)'}}>{d}</div>
              {col && col.label && <div style={{fontSize: 10, color: col.tx, marginTop: 6, fontWeight: 600, lineHeight: 1.3}}>{col.label}</div>}
              {!col && (
                <div style={{position:'absolute', bottom: 6, right: 6, fontSize: 10, color:'var(--slate-500)', fontWeight: 700, fontFamily:'var(--font-mono)'}}>$880</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const Legend = ({ c, l }) => (
  <div style={{display:'inline-flex', alignItems:'center', gap: 6}}>
    <span style={{width: 12, height: 12, borderRadius: 4, background: c}}/>
    {l}
  </div>
);

const HostAnalytics = () => {
  // simple SVG line + bars chart
  const earnings = [4200, 5800, 6300, 5100, 6800, 8400, 9200, 8800, 11200, 13400, 14976, 22880];
  const max = Math.max(...earnings);
  const months = ['J','A','S','O','N','D','J','F','M','A','M','J'];

  return (
    <div style={{display:'grid', gridTemplateColumns: '2fr 1fr', gap: 18}}>
      <div className="card" style={{padding: 28, borderRadius: 22}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 20}}>
          <div>
            <h3 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 600}}>Earnings · last 12 months</h3>
            <div style={{color:'var(--slate-500)', fontSize: 13, marginTop: 4}}>Compared to area average</div>
          </div>
          <div style={{display:'flex', gap: 8}}>
            {['12M', '6M', '3M', 'YTD'].map((t, i) => (
              <button key={t} style={{padding:'6px 12px', borderRadius: 999, border: 0, background: i === 0 ? 'var(--ink)' : 'var(--slate-100)', color: i === 0 ? 'white' : 'var(--slate-600)', fontFamily:'inherit', fontSize: 12, fontWeight: 600, cursor:'pointer'}}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{position:'relative', height: 280}}>
          <svg viewBox="0 0 600 280" style={{width: '100%', height: '100%'}}>
            <defs>
              <linearGradient id="hostFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0066FF" stopOpacity="0.25"/>
                <stop offset="1" stopColor="#0066FF" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0,1,2,3].map(i => (
              <line key={i} x1="40" x2="580" y1={50 + i*60} y2={50 + i*60} stroke="var(--slate-200)" strokeDasharray="3 4"/>
            ))}
            {/* area path */}
            {(() => {
              const pts = earnings.map((v, i) => [60 + i*45, 250 - (v / max) * 180]);
              const path = `M ${pts.map(([x,y]) => `${x},${y}`).join(' L ')}`;
              const area = `${path} L ${pts[pts.length-1][0]},250 L ${pts[0][0]},250 Z`;
              return (<>
                <path d={area} fill="url(#hostFill)"/>
                <path d={path} fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinejoin="round"/>
                {pts.map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt[0]} cy={pt[1]} r="4" fill="white" stroke="#0066FF" strokeWidth="2.5"/>
                    {i === pts.length - 1 && (
                      <g>
                        <rect x={pt[0]-44} y={pt[1]-40} width="88" height="28" rx="8" fill="var(--ink)"/>
                        <text x={pt[0]} y={pt[1]-22} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">$22,880</text>
                      </g>
                    )}
                  </g>
                ))}
              </>);
            })()}
            {months.map((m, i) => (
              <text key={i} x={60 + i*45} y="270" textAnchor="middle" fontSize="10" fill="var(--slate-500)" fontWeight="600">{m}</text>
            ))}
          </svg>
        </div>
      </div>

      <div className="card" style={{padding: 28, borderRadius: 22}}>
        <h3 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 20, fontWeight: 600, marginBottom: 18}}>Booking sources</h3>
        {[
          { l: 'Direct search', v: 56, c: '#0066FF' },
          { l: 'Trending feed', v: 22, c: 'var(--teal-500)' },
          { l: 'Repeat guests', v: 14, c: '#7C3AED' },
          { l: 'Editorial pick', v: 8,  c: '#F59E0B' },
        ].map(b => (
          <div key={b.l} style={{marginBottom: 16}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize: 13, fontWeight: 500, marginBottom: 6}}>
              <span>{b.l}</span><span style={{fontWeight: 700}}>{b.v}%</span>
            </div>
            <div style={{height: 8, background:'var(--slate-100)', borderRadius: 999, overflow:'hidden'}}>
              <div style={{width: `${b.v}%`, height:'100%', background: b.c, borderRadius: 999, transition: 'width 1s ease'}}/>
            </div>
          </div>
        ))}
        <div style={{borderTop: '1px solid var(--slate-200)', paddingTop: 16, marginTop: 6, fontSize: 13, color: 'var(--slate-600)', display:'flex', alignItems:'center', gap: 8}}>
          <Icon name="trending" size={14} stroke="var(--success)"/>
          Direct search up <strong style={{color:'var(--ink)'}}>+12%</strong> vs last quarter
        </div>
      </div>
    </div>
  );
};

window.HostDashboardScreen = HostDashboardScreen;
