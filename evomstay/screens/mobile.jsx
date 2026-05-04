// evomstay — mobile views (iOS-frame styled, no actual iOS chrome)

const MobileFrame = ({ children, label }) => (
  <div data-screen-label={label} style={{
    width: 380, height: 780, borderRadius: 44,
    background: '#0B1220', padding: 8,
    boxShadow: '0 24px 60px -10px rgba(15,23,42,0.32), 0 8px 24px rgba(15,23,42,0.16), inset 0 0 0 2px rgba(255,255,255,0.08)',
    position:'relative',
  }}>
    <div style={{
      width:'100%', height:'100%', borderRadius: 36,
      background: 'var(--paper)',
      overflow:'hidden', position:'relative',
    }}>
      {/* status bar */}
      <div style={{position:'absolute', top: 0, left: 0, right: 0, height: 44, padding: '0 28px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 13, fontWeight: 600, zIndex: 10}}>
        <span>9:41</span>
        <div style={{position:'absolute', top: 12, left:'50%', transform:'translateX(-50%)', width: 110, height: 28, borderRadius: 999, background: '#0B1220'}}/>
        <span style={{display:'inline-flex', gap: 4, alignItems:'center'}}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><circle cx="2" cy="8" r="1.5"/><circle cx="6" cy="6" r="1.5"/><circle cx="10" cy="4" r="1.5"/><circle cx="14" cy="2" r="1.5"/></svg>
          <span style={{fontSize: 11}}>5G</span>
          <svg width="22" height="10" viewBox="0 0 22 10"><rect x="0.5" y="0.5" width="18" height="9" rx="2" fill="none" stroke="currentColor"/><rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor"/><rect x="19" y="3" width="2" height="4" rx="1" fill="currentColor"/></svg>
        </span>
      </div>
      <div style={{paddingTop: 44, height:'100%', overflow:'auto'}} className="thin-scroll">
        {children}
      </div>
    </div>
  </div>
);

const MobileLanding = () => (
  <MobileFrame label="10 Mobile · Search">
    <div style={{padding: '12px 18px 0'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Logo size={26}/>
        <Avatar name="Maria L" size={32} verified/>
      </div>
      <h1 style={{margin: '18px 0 6px', fontFamily:'var(--font-display)', fontSize: 30, fontWeight: 500, letterSpacing:'-0.025em', lineHeight: 1.05}}>
        Where to next, <em style={{fontStyle:'italic', color:'var(--teal-600)'}}>Maria</em>?
      </h1>
      <p style={{margin: 0, fontSize: 13, color:'var(--slate-500)'}}>Verified hosts only · Insured stays</p>

      <div className="glass-strong" style={{marginTop: 16, padding: 6, borderRadius: 28, boxShadow:'var(--shadow-md)', border:'1px solid var(--slate-200)'}}>
        <div style={{padding: '10px 16px', borderRadius: 22, display:'flex', alignItems:'center', gap: 10}}>
          <Icon name="search" size={16}/>
          <span style={{fontWeight: 600, fontSize: 14}}>Bodrum · Jun 12 – 18 · 4</span>
        </div>
      </div>
    </div>

    <div style={{padding: '18px 0 0 18px', display:'flex', gap: 22, overflowX:'auto'}} className="no-scrollbar">
      {window.EVOM.CATEGORIES.slice(0, 8).map((c, i) => (
        <div key={c.name} style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 4, opacity: i === 0 ? 1 : 0.7, paddingBottom: 8, borderBottom: i === 0 ? '2px solid var(--ink)' : '2px solid transparent', flexShrink: 0}}>
          <Icon name={c.icon} size={22} strokeWidth={1.4}/>
          <span style={{fontSize: 10, fontWeight: 600, whiteSpace:'nowrap'}}>{c.name}</span>
        </div>
      ))}
    </div>

    <div style={{padding: '20px 18px 90px', display:'flex', flexDirection:'column', gap: 22}}>
      {window.EVOM.FEATURED.slice(0, 4).map(p => (
        <div key={p.id}>
          <div style={{position:'relative', height: 240, borderRadius: 22, background:`center/cover url(${p.img})`}}>
            <button style={{position:'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 999, border: 0, background:'rgba(15,23,42,0.32)', color:'white', cursor:'pointer', backdropFilter:'blur(8px)'}}>
              <Icon name="heart" size={14} stroke="white"/>
            </button>
            {p.host?.super && (
              <span className="glass-strong" style={{position:'absolute', top: 12, left: 12, padding:'4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing:'.04em', textTransform:'uppercase'}}>Guest favourite</span>
            )}
          </div>
          <div style={{padding:'10px 4px 0'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div style={{fontWeight: 600, fontSize: 14}}>{p.location}</div>
              <StarRating value={p.rating} size={11}/>
            </div>
            <div style={{color:'var(--slate-500)', fontSize: 13, marginTop: 2}}>{p.title}</div>
            <div style={{marginTop: 4, fontSize: 13}}><strong>${p.price}</strong> <span style={{color:'var(--slate-500)'}}>night</span></div>
          </div>
        </div>
      ))}
    </div>

    <BottomNav active="search"/>
  </MobileFrame>
);

const MobileDetail = () => {
  const p = window.EVOM.FEATURED[0];
  return (
    <MobileFrame label="11 Mobile · Detail">
      <div style={{position:'relative', height: 320, background:`center/cover url(${p.img})`, borderRadius:'0 0 24px 24px', overflow:'hidden'}}>
        <div style={{position:'absolute', top: 8, left: 16, right: 16, display:'flex', justifyContent:'space-between'}}>
          <button className="glass-strong" style={{width: 36, height: 36, borderRadius: 999, border:'1px solid var(--glass-border)', cursor:'pointer'}}><Icon name="chevronLeft" size={16}/></button>
          <div style={{display:'flex', gap: 8}}>
            <button className="glass-strong" style={{width: 36, height: 36, borderRadius: 999, border:'1px solid var(--glass-border)', cursor:'pointer'}}><Icon name="upload" size={14}/></button>
            <button className="glass-strong" style={{width: 36, height: 36, borderRadius: 999, border:'1px solid var(--glass-border)', cursor:'pointer'}}><Icon name="heart" size={14}/></button>
          </div>
        </div>
        <div style={{position:'absolute', bottom: 14, left:'50%', transform:'translateX(-50%)', display:'flex', gap: 4}}>
          {[0,1,2,3,4].map(i => <span key={i} style={{width: 6, height: 6, borderRadius: 999, background: i === 0 ? 'white' : 'rgba(255,255,255,0.5)'}}/>)}
        </div>
      </div>
      <div style={{padding: '18px 20px 100px'}}>
        <h2 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing:'-0.02em', lineHeight: 1.2}}>{p.title}</h2>
        <div style={{display:'flex', alignItems:'center', gap: 6, marginTop: 8, fontSize: 13, color:'var(--slate-600)'}}>
          <Icon name="starFilled" size={12}/> {p.rating} · ({p.reviews}) · {p.location}
        </div>

        <div className="card" style={{marginTop: 18, padding: 14, borderRadius: 18, display:'flex', alignItems:'center', gap: 12}}>
          <Avatar name="Selin K" size={44} verified ring/>
          <div style={{flex:1}}>
            <div style={{display:'flex', alignItems:'center', gap: 6, fontWeight: 600, fontSize: 14}}>Hosted by Selin <VerifiedShield size={12}/></div>
            <div style={{fontSize: 12, color:'var(--slate-500)'}}>Verified · Top 1% host</div>
          </div>
          <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12}}><Icon name="chat" size={12}/></button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginTop: 18}}>
          {[['bed','4 bedrooms'],['bath','3 baths'],['users','8 guests'],['pool','Private pool']].map(([i, t]) => (
            <div key={t} style={{display:'flex', alignItems:'center', gap: 8, padding:'12px 14px', border:'1px solid var(--slate-200)', borderRadius: 14, fontSize: 13}}>
              <Icon name={i} size={16}/>{t}
            </div>
          ))}
        </div>

        <h3 style={{margin: '24px 0 8px', fontFamily:'var(--font-display)', fontSize: 18, fontWeight: 600}}>About this place</h3>
        <p style={{margin: 0, fontSize: 14, color:'var(--slate-700)', lineHeight: 1.6}}>
          A serene cliffside retreat overlooking Türkbükü Bay. Rebuilt in 2024 around its original stone walls, every room frames the sea.
        </p>
      </div>
      <div style={{position:'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 20px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(18px)', borderTop:'1px solid var(--slate-200)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight: 700, fontSize: 16}}>${p.price} <span style={{color:'var(--slate-500)', fontWeight: 500, fontSize: 12}}>/ night</span></div>
          <div style={{fontSize: 11, textDecoration:'underline', color:'var(--slate-600)'}}>Jun 12 – 18</div>
        </div>
        <button className="btn btn-primary" style={{padding:'12px 22px'}}>Reserve</button>
      </div>
    </MobileFrame>
  );
};

const MobileChat = () => (
  <MobileFrame label="12 Mobile · Chat">
    <div style={{padding: '12px 18px 0'}}>
      <div style={{display:'flex', alignItems:'center', gap: 12}}>
        <button style={{width: 36, height: 36, borderRadius: 999, border:'1px solid var(--slate-200)', background:'var(--paper)', cursor:'pointer'}}><Icon name="chevronLeft" size={14}/></button>
        <Avatar name="Maria L" verified size={38}/>
        <div style={{flex: 1}}>
          <div style={{display:'flex', alignItems:'center', gap: 4, fontWeight: 600, fontSize: 14}}>Maria López <VerifiedShield size={12}/></div>
          <div style={{fontSize: 11, color:'var(--success)'}}>● Active now</div>
        </div>
        <Icon name="info" size={20}/>
      </div>
    </div>
    <div style={{padding:'12px 18px', display:'flex', flexDirection:'column', gap: 8}}>
      <div style={{textAlign:'center', fontSize: 10, color:'var(--slate-500)', margin:'8px 0'}}>Today, 10:14 AM</div>
      {window.EVOM.CHAT_MESSAGES.slice(0, 5).map((m, i) => (
        <div key={i} style={{display:'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start'}}>
          <div style={{
            maxWidth: '78%', padding: '9px 13px', fontSize: 13, lineHeight: 1.45,
            borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            background: m.from === 'me' ? 'var(--grad-cta)' : 'var(--slate-100)',
            color: m.from === 'me' ? 'white' : 'var(--ink)',
          }}>{m.text}</div>
        </div>
      ))}
    </div>
    <div style={{position:'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px 20px', background:'var(--paper)', borderTop:'1px solid var(--slate-200)', display:'flex', gap: 8, alignItems:'center'}}>
      <Icon name="paperclip" size={20}/>
      <input placeholder="Message…" style={{flex:1, padding:'10px 14px', borderRadius: 999, border:'1px solid var(--slate-200)', fontFamily:'inherit', fontSize: 13, outline:'none'}}/>
      <button className="btn btn-primary" style={{padding:'10px 12px'}}><Icon name="send" size={14} stroke="white"/></button>
    </div>
  </MobileFrame>
);

const BottomNav = ({ active }) => (
  <div style={{position:'absolute', bottom: 0, left: 0, right: 0, padding: '12px 24px 18px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(16px)', borderTop:'1px solid var(--slate-200)', display:'flex', justifyContent:'space-between'}}>
    {[
      { i: 'search', l: 'Search' },
      { i: 'heart', l: 'Wishlist' },
      { i: 'cards', l: 'Trips' },
      { i: 'chat', l: 'Inbox' },
      { i: 'user', l: 'Profile' },
    ].map(n => (
      <button key={n.l} style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 3, border: 0, background:'transparent', cursor:'pointer', color: active === n.i ? 'var(--cta)' : 'var(--slate-500)'}}>
        <Icon name={n.i} size={20}/>
        <span style={{fontSize: 10, fontWeight: 600}}>{n.l}</span>
      </button>
    ))}
  </div>
);

window.MobileLanding = MobileLanding;
window.MobileDetail = MobileDetail;
window.MobileChat = MobileChat;
