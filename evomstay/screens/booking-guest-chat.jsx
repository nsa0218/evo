// evomstay — Booking flow (multi-step), Guest dashboard, Chat

const BookingFlowScreen = ({ property, onComplete, role, onRoleChange }) => {
  const p = property || window.EVOM.FEATURED[0];
  const [step, setStep] = React.useState(1);
  const steps = ['Trip', 'Pay', 'Confirm'];
  const subtotal = p.price * 6, cleaning = 120, fee = 384;
  const total = subtotal + cleaning + fee;

  return (
    <div style={{height: 980, overflow:'auto', borderRadius: 24, background: 'var(--bg)'}}
      data-screen-label="04 Booking Flow" className="thin-scroll">
      <TopBar role={role} onRoleChange={onRoleChange} scrolled />
      <div style={{maxWidth: 980, margin: '0 auto', padding: '32px 36px 64px'}}>
        <button onClick={() => step > 1 ? setStep(step - 1) : null}
          style={{display:'inline-flex', alignItems:'center', gap: 6, padding: 0, border: 0, background:'transparent', cursor:'pointer', color:'var(--slate-700)', fontFamily:'inherit', fontSize: 14, marginBottom: 18}}>
          <Icon name="chevronLeft" size={16}/> Back
        </button>
        {/* stepper */}
        <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 28}}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{display:'flex', alignItems:'center', gap: 8}}>
                <span style={{
                  width: 26, height: 26, borderRadius: 999,
                  background: step > i+1 ? 'var(--success)' : (step === i+1 ? 'var(--ink)' : 'var(--slate-200)'),
                  color: step >= i+1 ? 'white' : 'var(--slate-500)',
                  fontWeight: 700, fontSize: 12,
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                }}>
                  {step > i+1 ? <Icon name="check" size={12} stroke="white" strokeWidth={3} /> : i+1}
                </span>
                <span style={{fontSize: 13, fontWeight: step === i+1 ? 700 : 500, color: step >= i+1 ? 'var(--ink)' : 'var(--slate-500)'}}>{s}</span>
              </div>
              {i < steps.length - 1 && <span style={{flex:'0 0 28px', height: 1, background:'var(--slate-200)'}}/>}
            </React.Fragment>
          ))}
        </div>

        <h1 style={{margin: '0 0 28px', fontFamily:'var(--font-display)', fontSize: 34, fontWeight: 500, letterSpacing:'-0.025em'}}>
          {step === 1 && 'Confirm your trip'}
          {step === 2 && 'Pay with confidence'}
          {step === 3 && 'You\'re going to Bodrum.'}
        </h1>

        <div style={{display:'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, alignItems:'flex-start'}}>
          <div>
            {step === 1 && (
              <div style={{display:'flex', flexDirection:'column', gap: 18}}>
                <Row label="Dates" value="Jun 12 – 18, 2026 · 6 nights" action="Edit"/>
                <Row label="Guests" value="4 adults" action="Edit"/>
                <Row label="Trip purpose" value="Leisure" action="Edit"/>
                <div className="card" style={{padding: 20, borderRadius: 18, background: 'var(--cta-soft)', border: '1px solid #C8DAFF'}}>
                  <div style={{display:'flex', alignItems:'center', gap: 10}}>
                    <Icon name="shieldCheck" size={20} stroke="var(--cta)"/>
                    <div style={{fontWeight: 700, fontSize: 14, color:'var(--cta)'}}>AnyCancel Insurance</div>
                  </div>
                  <p style={{margin:'8px 0 12px', color:'var(--slate-700)', fontSize: 14, lineHeight: 1.6}}>
                    Cancel up to 24h before check-in for a full refund. We pay your host so the relationship stays intact.
                  </p>
                  <label style={{display:'flex', alignItems:'center', gap: 10, fontSize: 14}}>
                    <input type="checkbox" defaultChecked style={{width: 18, height: 18, accentColor:'var(--cta)'}}/>
                    <span>Add for $48 total</span>
                  </label>
                </div>
                <button onClick={() => setStep(2)} className="btn btn-primary" style={{height: 52, fontSize: 15, marginTop: 12, alignSelf:'flex-start'}}>
                  Continue to payment
                </button>
              </div>
            )}
            {step === 2 && (
              <div style={{display:'flex', flexDirection:'column', gap: 18}}>
                <div className="card" style={{padding: 22, borderRadius: 18}}>
                  <div style={{fontWeight: 700, fontSize: 16, marginBottom: 14, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span>Card details</span>
                    <span style={{display:'flex', gap: 8}}>
                      {['VISA', 'MC', 'AMEX'].map(b => (
                        <span key={b} style={{padding:'4px 8px', background:'var(--slate-100)', borderRadius: 6, fontSize: 10, fontWeight: 800}}>{b}</span>
                      ))}
                    </span>
                  </div>
                  <Field label="Card number" value="•••• •••• •••• 4242"/>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, marginTop: 12}}>
                    <Field label="Expiry" value="08 / 28"/>
                    <Field label="CVC" value="•••"/>
                  </div>
                </div>
                <div className="card" style={{padding: 22, borderRadius: 18}}>
                  <div style={{fontWeight: 700, fontSize: 16, marginBottom: 14}}>Billing address</div>
                  <Field label="Country" value="Türkiye"/>
                  <div style={{marginTop: 12}}><Field label="Postcode" value="34357"/></div>
                </div>
                <button onClick={() => setStep(3)} className="btn btn-primary" style={{height: 52, fontSize: 15, alignSelf:'flex-start', marginTop: 8}}>
                  <Icon name="lock" size={14} stroke="white"/> Confirm and pay ${(total + 48).toLocaleString()}
                </button>
                <div style={{fontSize: 12, color: 'var(--slate-500)', display:'flex', gap: 6, alignItems:'center'}}>
                  <Icon name="lock" size={12}/> Encrypted via Stripe · evomstay never sees full card details.
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="card" style={{padding: 36, borderRadius: 24, background: 'var(--paper)', textAlign:'center'}}>
                <div style={{width: 84, height: 84, borderRadius: 999, margin:'0 auto 20px', background:'var(--grad-brand)', display:'inline-flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 28px rgba(26,168,161,0.4)'}}>
                  <Icon name="check" size={40} stroke="white" strokeWidth={2.4}/>
                </div>
                <h2 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 28, fontWeight: 600}}>Reservation confirmed</h2>
                <p style={{color:'var(--slate-600)', fontSize: 15, marginTop: 8, marginBottom: 24}}>
                  Booking code <strong>EVM-2H81</strong> · Receipt sent to maria@example.com
                </p>
                <div style={{display:'flex', gap: 10, justifyContent:'center'}}>
                  <button className="btn btn-primary">View trip</button>
                  <button className="btn btn-outline">Message Selin</button>
                </div>
              </div>
            )}
          </div>

          {/* summary card */}
          <div className="card" style={{padding: 22, borderRadius: 22, position:'sticky', top: 24}}>
            <div style={{display:'flex', gap: 14, alignItems:'center', paddingBottom: 18, borderBottom:'1px solid var(--slate-200)'}}>
              <div style={{width: 88, height: 80, borderRadius: 14, background:`center/cover url(${p.img})`, flexShrink: 0}}/>
              <div>
                <div style={{fontWeight: 600, fontSize: 14, lineHeight: 1.3}}>{p.title}</div>
                <div style={{color:'var(--slate-500)', fontSize: 12, marginTop: 4}}>Whole villa · Bodrum</div>
                <StarRating value={p.rating} size={11}/>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap: 10, fontSize: 14, padding: '18px 0'}}>
              <Line l="$624 × 6 nights" r={`$${subtotal.toLocaleString()}`}/>
              <Line l="Cleaning fee" r="$120"/>
              <Line l="evomstay service" r="$384"/>
              <Line l="AnyCancel" r="$48"/>
            </div>
            <div style={{paddingTop: 14, borderTop:'1px solid var(--slate-200)', display:'flex', justifyContent:'space-between', fontWeight: 700, fontSize: 16}}>
              <span>Total · USD</span><span>${(total + 48).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Line = ({ l, r }) => <div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:'var(--slate-600)'}}>{l}</span><span style={{fontWeight: 500}}>{r}</span></div>;
const Row = ({ label, value, action }) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: '20px 22px', background:'var(--paper)', border:'1px solid var(--slate-200)', borderRadius: 18}}>
    <div>
      <div style={{fontSize: 12, color:'var(--slate-500)', fontWeight: 600, letterSpacing:'.04em', textTransform:'uppercase'}}>{label}</div>
      <div style={{fontSize: 15, marginTop: 4, fontWeight: 600}}>{value}</div>
    </div>
    <button style={{border:0, background:'transparent', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit', fontSize: 14, fontWeight: 600}}>{action}</button>
  </div>
);
const Field = ({ label, value }) => (
  <div style={{display:'flex', flexDirection:'column', gap: 4, padding: '10px 14px', border: '1px solid var(--slate-200)', borderRadius: 12}}>
    <span style={{fontSize: 11, fontWeight: 700, color:'var(--slate-500)', letterSpacing:'.04em', textTransform:'uppercase'}}>{label}</span>
    <span style={{fontSize: 15, fontWeight: 500}}>{value}</span>
  </div>
);

// ───────── Guest dashboard (Trips) ─────────
const GuestDashboardScreen = ({ role, onRoleChange }) => (
  <div style={{height: 980, overflow:'auto', borderRadius: 24, background: 'var(--bg)'}} data-screen-label="05 Guest Dashboard" className="thin-scroll">
    <TopBar role={role} onRoleChange={onRoleChange} scrolled />
    <div style={{maxWidth: 1280, margin: '0 auto', padding: '32px 36px 64px'}}>
      <h1 style={{margin: '0 0 6px', fontFamily:'var(--font-display)', fontSize: 40, fontWeight: 500, letterSpacing:'-0.025em'}}>Welcome back, Maria</h1>
      <p style={{margin: 0, color:'var(--slate-500)', fontSize: 15}}>You have 2 upcoming trips.</p>

      <div style={{display:'flex', gap: 8, marginTop: 28, marginBottom: 20}}>
        {['Upcoming', 'Past', 'Cancelled', 'Wishlists'].map((t, i) => (
          <button key={t} className={i === 0 ? 'btn btn-primary' : 'btn btn-ghost'} style={{padding:'8px 16px', fontSize: 13, height: 'auto'}}>{t}</button>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 20}}>
        {window.EVOM.TRIPS.filter(t => t.status === 'Upcoming').map(t => (
          <TripCard key={t.id} t={t}/>
        ))}
      </div>

      <h2 style={{margin: '48px 0 16px', fontFamily:'var(--font-display)', fontSize: 24, fontWeight: 500}}>Past trips</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 20}}>
        {window.EVOM.TRIPS.filter(t => t.status === 'Past').map(t => (
          <TripCard key={t.id} t={t} past />
        ))}
      </div>
    </div>
  </div>
);

const TripCard = ({ t, past }) => (
  <div className="card" style={{padding: 20, borderRadius: 22, display:'flex', gap: 18}}>
    <div style={{width: 130, height: 150, borderRadius: 16, background: `center/cover url(${t.property.img})`, flexShrink: 0}}/>
    <div style={{flex: 1, display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <span className="chip" style={{background: past ? 'var(--slate-100)' : 'var(--cta-soft)', color: past ? 'var(--slate-600)' : 'var(--cta)', fontWeight: 700, fontSize: 11, letterSpacing:'.04em', textTransform:'uppercase'}}>
          {t.status === 'Upcoming' ? '· Upcoming' : 'Past trip'}
        </span>
        <button style={{border:0, background:'transparent', cursor:'pointer'}}><Icon name="options" size={18}/></button>
      </div>
      <div style={{fontWeight: 600, fontSize: 16, marginTop: 8, lineHeight: 1.3}}>{t.property.title}</div>
      <div style={{color:'var(--slate-500)', fontSize: 13, marginTop: 2}}>{t.property.location}</div>
      <div style={{fontSize: 13, marginTop: 'auto', color:'var(--slate-700)'}}>
        <div style={{display:'flex', alignItems:'center', gap: 6}}><Icon name="calendar" size={13}/> {t.dates}</div>
        <div style={{display:'flex', alignItems:'center', gap: 6, marginTop: 4}}><Icon name="users" size={13}/> {t.guests} guests · ${t.total.toLocaleString()} total</div>
      </div>
      {!past && (
        <div style={{display:'flex', gap: 8, marginTop: 14}}>
          <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12}}>Itinerary</button>
          <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12}}><Icon name="chat" size={12}/> Chat host</button>
        </div>
      )}
      {past && (
        <button className="btn btn-outline" style={{padding:'7px 12px', fontSize: 12, alignSelf:'flex-start', marginTop: 14}}>
          <Icon name="star" size={12}/> Leave review
        </button>
      )}
    </div>
  </div>
);

// ───────── Chat ─────────
const ChatScreen = ({ role, onRoleChange }) => {
  const [active, setActive] = React.useState(window.EVOM.CHAT_THREADS[0]);
  const [draft, setDraft] = React.useState('');
  return (
    <div style={{height: 980, overflow:'hidden', borderRadius: 24, background: 'var(--paper)', display:'flex', flexDirection:'column'}}
      data-screen-label="06 Chat">
      <TopBar role={role} onRoleChange={onRoleChange} scrolled />
      <div style={{flex: 1, display:'grid', gridTemplateColumns: '320px 1fr 320px', minHeight: 0}}>
        {/* threads */}
        <div style={{borderRight: '1px solid var(--slate-200)', display:'flex', flexDirection:'column'}}>
          <div style={{padding: '20px 20px 12px'}}>
            <h2 style={{margin: 0, fontFamily:'var(--font-display)', fontSize: 24, fontWeight: 500}}>Messages</h2>
            <div style={{position:'relative', marginTop: 14}}>
              <input placeholder="Search conversations" style={{width:'100%', padding: '10px 14px 10px 38px', borderRadius: 999, border: '1px solid var(--slate-200)', background:'var(--slate-50)', fontFamily:'inherit', fontSize: 13, outline:'none'}}/>
              <span style={{position:'absolute', left: 14, top: '50%', transform:'translateY(-50%)', color:'var(--slate-400)'}}><Icon name="search" size={14}/></span>
            </div>
          </div>
          <div style={{flex: 1, overflow:'auto'}} className="thin-scroll">
            {window.EVOM.CHAT_THREADS.map(c => (
              <button key={c.id} onClick={() => setActive(c)}
                style={{
                  width:'100%', padding: '14px 20px', display:'flex', gap: 12, alignItems:'center',
                  border: 0, background: active.id === c.id ? 'var(--slate-100)' : 'transparent',
                  cursor:'pointer', textAlign:'left', fontFamily:'inherit',
                  borderLeft: active.id === c.id ? '3px solid var(--cta)' : '3px solid transparent',
                }}>
                <div style={{position:'relative'}}>
                  <Avatar name={c.name} verified={c.verified} size={42}/>
                  {c.online && <span style={{position:'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: 999, background:'var(--success)', border:'2px solid var(--paper)'}}/>}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <span style={{fontWeight: 600, fontSize: 14}}>{c.name}</span>
                    <span style={{fontSize: 11, color:'var(--slate-500)'}}>{c.time}</span>
                  </div>
                  <div style={{fontSize: 13, color:'var(--slate-500)', marginTop: 2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.lastMsg}</div>
                </div>
                {c.unread > 0 && <span style={{minWidth: 20, padding: '0 6px', height: 20, borderRadius: 999, background:'var(--cta)', color:'white', fontSize: 11, fontWeight: 700, display:'inline-flex', alignItems:'center', justifyContent:'center'}}>{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* conversation */}
        <div style={{display:'flex', flexDirection:'column', minHeight: 0, background:'var(--slate-50)'}}>
          <div style={{padding: '14px 24px', borderBottom:'1px solid var(--slate-200)', background:'var(--paper)', display:'flex', alignItems:'center', gap: 12}}>
            <Avatar name={active.name} verified={active.verified} size={40}/>
            <div style={{flex: 1}}>
              <div style={{display:'flex', alignItems:'center', gap: 6, fontWeight: 600}}>
                {active.name}
                {active.verified && <VerifiedShield size={14}/>}
              </div>
              <div style={{fontSize: 12, color:'var(--success)', display:'flex', alignItems:'center', gap: 4}}>
                <span style={{width: 6, height: 6, borderRadius:999, background:'var(--success)'}}/> Active now · {active.property}
              </div>
            </div>
            <button className="btn btn-ghost" style={{padding: 8}}><Icon name="info" size={18}/></button>
          </div>
          <div style={{flex: 1, overflow:'auto', padding: '24px 32px', display:'flex', flexDirection:'column', gap: 12}} className="thin-scroll">
            <div style={{textAlign:'center', fontSize: 11, color:'var(--slate-500)', margin:'8px 0'}}>Today, 10:14 AM</div>
            {window.EVOM.CHAT_MESSAGES.map((m, i) => (
              <div key={i} style={{display:'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start'}}>
                <div style={{
                  maxWidth: '70%', padding: '10px 14px',
                  borderRadius: m.from === 'me' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: m.from === 'me' ? 'var(--grad-cta)' : 'var(--paper)',
                  color: m.from === 'me' ? 'white' : 'var(--ink)',
                  border: m.from === 'me' ? 0 : '1px solid var(--slate-200)',
                  fontSize: 14, lineHeight: 1.5,
                  boxShadow: m.from === 'me' ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                }}>
                  {m.text}
                  <div style={{fontSize: 10, opacity: 0.7, marginTop: 4}}>{m.t}</div>
                </div>
              </div>
            ))}
            <div style={{display:'flex', alignItems:'center', gap: 8, color:'var(--slate-500)', fontSize: 12, marginTop: 4}}>
              <span style={{display:'inline-flex', gap: 3}}>
                {[0,1,2].map(n => <span key={n} style={{width: 6, height: 6, borderRadius: 999, background:'var(--slate-400)', animation:`bounce 1.4s ${n*0.15}s infinite ease-in-out`}}/>)}
              </span>
              Maria is typing…
            </div>
          </div>
          <div style={{padding: 14, background:'var(--paper)', borderTop:'1px solid var(--slate-200)', display:'flex', gap: 8, alignItems:'center'}}>
            <button className="btn btn-ghost" style={{padding: 10, borderRadius: 999}}><Icon name="paperclip" size={18}/></button>
            <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write a message…"
              style={{flex: 1, padding:'12px 18px', border:'1px solid var(--slate-200)', borderRadius: 999, background:'var(--slate-50)', fontFamily:'inherit', fontSize: 14, outline:'none'}}/>
            <button className="btn btn-ghost" style={{padding: 10, borderRadius: 999}}><Icon name="smile" size={18}/></button>
            <button className="btn btn-primary" style={{padding: '10px 16px'}}><Icon name="send" size={16} stroke="white"/></button>
          </div>
        </div>

        {/* booking context */}
        <div style={{borderLeft:'1px solid var(--slate-200)', padding: 24, overflow:'auto'}} className="thin-scroll">
          <div style={{height: 180, borderRadius: 18, background: `center/cover url(${window.EVOM.FEATURED[0].img})`, marginBottom: 14}}/>
          <div style={{fontWeight: 600, fontSize: 15}}>Cliffside Villa with Infinity Pool</div>
          <div style={{color:'var(--slate-500)', fontSize: 13, marginTop: 4}}>Bodrum · Jun 12 – 18, 2026</div>
          <div className="card" style={{padding: 14, borderRadius: 14, marginTop: 18, background:'var(--cta-soft)', border:'1px solid #C8DAFF'}}>
            <div style={{fontSize: 11, fontWeight: 700, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--cta)'}}>Booking</div>
            <div style={{fontSize: 13, marginTop: 6, color:'var(--slate-700)'}}>Confirmed · 4 guests · $4,368 total</div>
            <div style={{fontSize: 11, color:'var(--slate-500)', marginTop: 4, fontFamily:'var(--font-mono)'}}>EVM-2H81</div>
          </div>
          <div style={{marginTop: 18, fontSize: 12, fontWeight: 700, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--slate-500)'}}>Quick replies</div>
          <div style={{display:'flex', flexDirection:'column', gap: 6, marginTop: 10}}>
            {['Send check-in details', 'Share wifi password', 'Recommend restaurants', 'Late checkout request'].map(q => (
              <button key={q} className="btn btn-outline" style={{justifyContent:'flex-start', padding:'8px 14px', fontSize: 12, fontWeight: 500}}>{q}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.BookingFlowScreen = BookingFlowScreen;
window.GuestDashboardScreen = GuestDashboardScreen;
window.ChatScreen = ChatScreen;
