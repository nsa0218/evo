// evomstay — sample data
// Real Unsplash hotlinks for hero/featured; placeholders for grids.

const CATEGORIES = [
  { name: 'Trending', icon: 'trending' },
  { name: 'Beachfront', icon: 'sailboat' },
  { name: 'Cabins', icon: 'tree' },
  { name: 'Pools', icon: 'pool' },
  { name: 'Lofts', icon: 'home' },
  { name: 'Castles', icon: 'castle' },
  { name: 'Treehouses', icon: 'tree' },
  { name: 'Tiny Homes', icon: 'home' },
  { name: 'Mountain', icon: 'mountain' },
  { name: 'Desert', icon: 'desert' },
  { name: 'Ski-in', icon: 'snowflake' },
  { name: 'Tropical', icon: 'sun2' },
  { name: 'Lakefront', icon: 'sailboat' },
  { name: 'Iconic', icon: 'star' },
  { name: 'Riads', icon: 'castle' },
];

// Featured properties — use real Unsplash images for the hero/featured sections.
const FEATURED = [
  {
    id: 'p1',
    title: 'Cliffside Villa with Infinity Pool',
    location: 'Bodrum, Türkiye',
    price: 624,
    rating: 4.97, reviews: 213,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Selin K.', verified: true, super: true },
    tags: ['Pool', 'Sea view', 'Whole place'],
    beds: 4, baths: 3, guests: 8,
    coords: [37.03, 27.43],
  },
  {
    id: 'p2',
    title: 'Restored Cappadocia Cave Suite',
    location: 'Göreme, Türkiye',
    price: 312,
    rating: 4.92, reviews: 488,
    img: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Mehmet A.', verified: true, super: false },
    tags: ['Iconic', 'Balloon view', 'Hot tub'],
    beds: 2, baths: 2, guests: 4,
    coords: [38.64, 34.83],
  },
  {
    id: 'p3',
    title: 'Modern Bosphorus Loft',
    location: 'Beşiktaş, İstanbul',
    price: 248,
    rating: 4.88, reviews: 162,
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Aylin D.', verified: true, super: true },
    tags: ['Loft', 'City view', 'Walkable'],
    beds: 1, baths: 1, guests: 3,
    coords: [41.04, 29.00],
  },
  {
    id: 'p4',
    title: 'Aegean Stone House',
    location: 'Çeşme, Türkiye',
    price: 184,
    rating: 4.95, reviews: 91,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Burak Y.', verified: true, super: false },
    tags: ['Stone', 'Garden', 'Quiet'],
    beds: 3, baths: 2, guests: 6,
    coords: [38.32, 26.30],
  },
  {
    id: 'p5',
    title: 'Yalıkavak Marina Penthouse',
    location: 'Bodrum, Türkiye',
    price: 880,
    rating: 4.99, reviews: 71,
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Deniz R.', verified: true, super: true },
    tags: ['Penthouse', 'Marina', 'Luxe'],
    beds: 4, baths: 4, guests: 8,
    coords: [37.10, 27.29],
  },
  {
    id: 'p6',
    title: 'Cedar A-Frame in the Woods',
    location: 'Bolu, Türkiye',
    price: 142,
    rating: 4.86, reviews: 256,
    img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Cem Ö.', verified: false, super: false },
    tags: ['Cabin', 'Forest', 'Fireplace'],
    beds: 2, baths: 1, guests: 4,
    coords: [40.74, 31.61],
  },
  {
    id: 'p7',
    title: 'Antalya Old Town Townhouse',
    location: 'Kaleiçi, Antalya',
    price: 196,
    rating: 4.91, reviews: 308,
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Lara T.', verified: true, super: true },
    tags: ['Historic', 'Walkable', 'Rooftop'],
    beds: 3, baths: 2, guests: 6,
    coords: [36.88, 30.71],
  },
  {
    id: 'p8',
    title: 'Lakefront Glass Cabin',
    location: 'Sapanca, Türkiye',
    price: 298,
    rating: 4.94, reviews: 117,
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=70',
    host: { name: 'Ece V.', verified: true, super: false },
    tags: ['Lake', 'Glass walls', 'Sauna'],
    beds: 2, baths: 2, guests: 4,
    coords: [40.69, 30.26],
  },
];

// Property gallery for the detail page hero
const DETAIL_GALLERY = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=70',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=70',
];

const REVIEWS = [
  { name: 'Maria L.', date: 'March 2026', rating: 5, verified: true,
    text: "Selin's villa is stunning. The infinity pool feels endless against the sea, and every room has been thought through. Communication was instant and warm." },
  { name: 'James P.', date: 'February 2026', rating: 5, verified: true,
    text: "Best stay we've had in Türkiye. Quiet, private, and the welcome basket was a beautiful touch. The staff prepared a private dinner that was exceptional." },
  { name: 'Yuki T.', date: 'January 2026', rating: 4, verified: false,
    text: 'Beautiful design and incredible views. Slightly windy in the evenings but blankets were provided. Would absolutely return.' },
  { name: 'Elena R.', date: 'December 2025', rating: 5, verified: true,
    text: 'Photos do not do it justice. The bathtub by the window facing the bay is unreal. Selin recommended local restaurants we never would have found.' },
];

const TRIPS = [
  { id: 't1', property: FEATURED[0], status: 'Upcoming', dates: 'Jun 12 – 18, 2026', guests: 4, total: 4368, code: 'EVM-2H81' },
  { id: 't2', property: FEATURED[2], status: 'Upcoming', dates: 'Aug 03 – 07, 2026', guests: 2, total: 992,  code: 'EVM-3K22' },
  { id: 't3', property: FEATURED[6], status: 'Past',     dates: 'Sep 20 – 24, 2025', guests: 6, total: 784,  code: 'EVM-1P09' },
  { id: 't4', property: FEATURED[1], status: 'Past',     dates: 'Apr 02 – 05, 2025', guests: 4, total: 936,  code: 'EVM-0R44' },
];

const HOST_LISTINGS = [
  { id: 'h1', property: FEATURED[0], status: 'Live',   nightly: 624, occupancy: 86, nextBooking: 'Jun 12', earnings30: 14976 },
  { id: 'h2', property: FEATURED[4], status: 'Live',   nightly: 880, occupancy: 92, nextBooking: 'Jun 04', earnings30: 22880 },
  { id: 'h3', property: FEATURED[3], status: 'Paused', nightly: 184, occupancy: 0,  nextBooking: '—',      earnings30: 0 },
];

const CHAT_THREADS = [
  { id: 'c1', name: 'Maria López',      lastMsg: 'Perfect — see you Friday!',         time: '2m',   unread: 2, verified: true,  property: 'Cliffside Villa', online: true },
  { id: 'c2', name: 'James Patterson',  lastMsg: 'Could we get a late checkout?',     time: '14m',  unread: 1, verified: true,  property: 'Bosphorus Loft',  online: true },
  { id: 'c3', name: 'Yuki Tanaka',      lastMsg: 'Thanks again for everything!',      time: '1h',   unread: 0, verified: false, property: 'Cappadocia Suite', online: false },
  { id: 'c4', name: 'Elena Rossi',      lastMsg: 'The wifi password worked, thanks',  time: '3h',   unread: 0, verified: true,  property: 'Aegean Stone',     online: false },
  { id: 'c5', name: 'Marcus Chen',      lastMsg: 'I just sent the deposit',           time: 'Yest', unread: 0, verified: true,  property: 'Marina Penthouse', online: false },
  { id: 'c6', name: 'Aisha Karim',      lastMsg: 'Looks beautiful in the photos!',    time: 'Mon',  unread: 0, verified: false, property: 'A-Frame Cabin',    online: true  },
];

const CHAT_MESSAGES = [
  { from: 'them', t: '10:14', text: 'Hi Selin! We just landed in Bodrum 🛬' },
  { from: 'them', t: '10:14', text: 'The driver you arranged was waiting — really appreciate it.' },
  { from: 'me',   t: '10:18', text: 'So happy to hear that, Maria! The villa is fully ready. Door code is 0612.' },
  { from: 'me',   t: '10:18', text: 'I left a small welcome basket on the kitchen island. Cold rosé in the fridge 🍷' },
  { from: 'them', t: '10:22', text: 'You think of everything! What time should we expect Erdem for dinner tomorrow?' },
  { from: 'me',   t: '10:25', text: '7:30pm. He will bring the menu but mentioned grilled levrek if you have no allergies?' },
  { from: 'them', t: '10:26', text: 'Perfect — see you Friday!' },
];

window.EVOM = { CATEGORIES, FEATURED, DETAIL_GALLERY, REVIEWS, TRIPS, HOST_LISTINGS, CHAT_THREADS, CHAT_MESSAGES };
