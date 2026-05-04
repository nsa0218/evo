-- PostGIS uzantısını etkinleştir
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'guest' CHECK (role IN ('guest', 'host', 'admin')),
    avatar_url VARCHAR(500),
    bio TEXT,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_id_verified BOOLEAN DEFAULT FALSE,
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    two_fa_secret VARCHAR(255),
    preferred_language VARCHAR(5) DEFAULT 'tr',
    preferred_currency VARCHAR(3) DEFAULT 'TRY',
    stripe_customer_id VARCHAR(255),
    stripe_connect_id VARCHAR(255),
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- AMENITIES (Olanaklar)
-- ============================================
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    name_tr VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    category VARCHAR(50) NOT NULL CHECK (category IN ('essentials', 'features', 'safety', 'accessibility')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LISTINGS (İlanlar)
-- ============================================
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(30) NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'room', 'hotel', 'unique')),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'suspended', 'archived')),
    
    -- Konum
    location GEOGRAPHY(POINT, 4326),
    address_line VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    
    -- Kapasite
    max_guests INTEGER NOT NULL DEFAULT 1,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    beds INTEGER NOT NULL DEFAULT 1,
    bathrooms DECIMAL(3,1) NOT NULL DEFAULT 1,
    
    -- Fiyat
    base_price_per_night DECIMAL(10,2) NOT NULL,
    cleaning_fee DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'TRY',
    
    -- Kurallar
    house_rules JSONB DEFAULT '{}',
    check_in_time TIME DEFAULT '14:00',
    check_out_time TIME DEFAULT '11:00',
    min_nights INTEGER DEFAULT 1,
    max_nights INTEGER DEFAULT 365,
    
    -- İstatistik
    avg_rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- İptal Politikası
    cancellation_policy VARCHAR(20) DEFAULT 'moderate' CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict')),
    
    instant_booking BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_listings_host ON listings(host_id);
CREATE INDEX idx_listings_location ON listings USING GIST(location);
CREATE INDEX idx_listings_status ON listings(status) WHERE status = 'active';
CREATE INDEX idx_listings_city ON listings(city, status);
CREATE INDEX idx_listings_price ON listings(base_price_per_night) WHERE status = 'active';
CREATE INDEX idx_listings_rating ON listings(avg_rating DESC) WHERE status = 'active';
CREATE INDEX idx_listings_type ON listings(property_type, status);

-- ============================================
-- LISTING IMAGES
-- ============================================
CREATE TABLE listing_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    caption VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_listing_images_listing ON listing_images(listing_id, sort_order);

-- ============================================
-- LISTING AMENITIES (M2M)
-- ============================================
CREATE TABLE listing_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    UNIQUE(listing_id, amenity_id)
);

CREATE INDEX idx_listing_amenities_listing ON listing_amenities(listing_id);

-- ============================================
-- AVAILABILITY CALENDAR
-- ============================================
CREATE TABLE availability_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    custom_price DECIMAL(10,2),
    note VARCHAR(255),
    source VARCHAR(20) DEFAULT 'manual' CHECK (source IN ('manual', 'ical_sync', 'reservation')),
    UNIQUE(listing_id, date)
);

CREATE INDEX idx_calendar_listing_date ON availability_calendar(listing_id, date);
CREATE INDEX idx_calendar_available ON availability_calendar(date, is_available) WHERE is_available = TRUE;

-- ============================================
-- PRICING RULES
-- ============================================
CREATE TABLE pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    rule_type VARCHAR(30) NOT NULL CHECK (rule_type IN ('weekly_discount', 'monthly_discount', 'seasonal', 'last_minute', 'early_bird')),
    adjustment_percent DECIMAL(5,2) NOT NULL,
    valid_from DATE,
    valid_to DATE,
    min_nights INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pricing_rules_listing ON pricing_rules(listing_id, is_active);

-- ============================================
-- RESERVATIONS
-- ============================================
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_id UUID NOT NULL REFERENCES users(id),
    listing_id UUID NOT NULL REFERENCES listings(id),
    host_id UUID NOT NULL REFERENCES users(id),
    
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_count INTEGER NOT NULL DEFAULT 1,
    
    -- Fiyat
    nightly_rate DECIMAL(10,2) NOT NULL,
    nights_count INTEGER NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    cleaning_fee DECIMAL(10,2) DEFAULT 0,
    service_fee DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    host_payout DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'TRY',
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'completed', 'cancelled_by_guest', 'cancelled_by_host', 'disputed', 'refunded')),
    
    special_requests TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reservations_guest ON reservations(guest_id, status);
CREATE INDEX idx_reservations_host ON reservations(host_id, status);
CREATE INDEX idx_reservations_listing ON reservations(listing_id, check_in, check_out);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out) WHERE status IN ('confirmed', 'checked_in');

-- ============================================
-- PAYMENTS
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID NOT NULL REFERENCES reservations(id),
    stripe_payment_intent_id VARCHAR(255),
    stripe_transfer_id VARCHAR(255),
    
    amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'TRY',
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'captured', 'in_escrow', 'released', 'refunded', 'partially_refunded', 'failed')),
    
    escrow_release_at TIMESTAMP WITH TIME ZONE,
    released_at TIMESTAMP WITH TIME ZONE,
    refund_amount DECIMAL(10,2),
    refunded_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payments_reservation ON payments(reservation_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_escrow ON payments(escrow_release_at) WHERE status = 'in_escrow';

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID UNIQUE NOT NULL REFERENCES reservations(id),
    author_id UUID NOT NULL REFERENCES users(id),
    listing_id UUID NOT NULL REFERENCES listings(id),
    
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    cleanliness_rating INTEGER CHECK (cleanliness_rating BETWEEN 1 AND 5),
    accuracy_rating INTEGER CHECK (accuracy_rating BETWEEN 1 AND 5),
    communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
    location_rating INTEGER CHECK (location_rating BETWEEN 1 AND 5),
    value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
    
    comment TEXT,
    host_response TEXT,
    host_responded_at TIMESTAMP WITH TIME ZONE,
    
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_listing ON reviews(listing_id, is_public);
CREATE INDEX idx_reviews_author ON reviews(author_id);

-- ============================================
-- CONVERSATIONS & MESSAGES
-- ============================================
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_1 UUID NOT NULL REFERENCES users(id),
    participant_2 UUID NOT NULL REFERENCES users(id),
    listing_id UUID REFERENCES listings(id),
    last_message_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(participant_1, participant_2, listing_id)
);

CREATE INDEX idx_conversations_p1 ON conversations(participant_1, last_message_at DESC);
CREATE INDEX idx_conversations_p2 ON conversations(participant_2, last_message_at DESC);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'system')),
    attachment_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);

-- ============================================
-- USER VERIFICATIONS (KYC)
-- ============================================
CREATE TABLE user_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    verification_type VARCHAR(30) NOT NULL CHECK (verification_type IN ('email', 'phone', 'id_document', 'selfie', 'address')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    document_url VARCHAR(500),
    rejection_reason VARCHAR(500),
    reviewed_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_verifications_user ON user_verifications(user_id, verification_type);
CREATE INDEX idx_verifications_pending ON user_verifications(status) WHERE status = 'pending';

-- ============================================
-- DISPUTES (Uyuşmazlıklar)
-- ============================================
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID NOT NULL REFERENCES reservations(id),
    raised_by UUID NOT NULL REFERENCES users(id),
    assigned_admin UUID REFERENCES users(id),
    
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('property_mismatch', 'cleanliness', 'safety', 'host_cancellation', 'payment', 'other')),
    description TEXT NOT NULL,
    evidence_urls JSONB DEFAULT '[]',
    
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'escalated', 'closed')),
    resolution_type VARCHAR(30) CHECK (resolution_type IN ('full_refund', 'partial_refund', 'no_refund', 'warning', 'account_suspension')),
    resolution_note TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_disputes_status ON disputes(status);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- ============================================
-- ADMIN SETTINGS
-- ============================================
CREATE TABLE admin_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description VARCHAR(500),
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FAVORITES (Favoriler)
-- ============================================
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, listing_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);

-- ============================================
-- AUDIT LOG
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- ============================================
-- SEED DATA
-- ============================================

-- Varsayılan admin kullanıcı (şifre: Admin123!)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_email_verified)
VALUES ('admin@platform.com', '$2b$12$placeholder_hash_replace_on_first_login', 'System', 'Admin', 'admin', TRUE);

-- Olanaklar
INSERT INTO amenities (name, name_tr, icon, category, sort_order) VALUES
('WiFi', 'WiFi', 'wifi', 'essentials', 1),
('Kitchen', 'Mutfak', 'kitchen', 'essentials', 2),
('Washing Machine', 'Çamaşır Makinesi', 'washing-machine', 'essentials', 3),
('Air Conditioning', 'Klima', 'snowflake', 'essentials', 4),
('Heating', 'Isıtma', 'flame', 'essentials', 5),
('TV', 'TV', 'tv', 'essentials', 6),
('Hair Dryer', 'Saç Kurutma', 'wind', 'essentials', 7),
('Iron', 'Ütü', 'iron', 'essentials', 8),
('Pool', 'Havuz', 'pool', 'features', 10),
('Hot Tub', 'Jakuzi', 'hot-tub', 'features', 11),
('Gym', 'Spor Salonu', 'dumbbell', 'features', 12),
('Free Parking', 'Ücretsiz Otopark', 'car', 'features', 13),
('EV Charger', 'Elektrikli Araç Şarj', 'zap', 'features', 14),
('BBQ Grill', 'Mangal', 'flame', 'features', 15),
('Garden', 'Bahçe', 'tree', 'features', 16),
('Balcony', 'Balkon', 'sun', 'features', 17),
('Sea View', 'Deniz Manzarası', 'waves', 'features', 18),
('Smoke Alarm', 'Duman Dedektörü', 'alert-triangle', 'safety', 20),
('Carbon Monoxide Alarm', 'Karbonmonoksit Alarm', 'alert-circle', 'safety', 21),
('Fire Extinguisher', 'Yangın Söndürücü', 'fire-extinguisher', 'safety', 22),
('First Aid Kit', 'İlk Yardım Kiti', 'plus-circle', 'safety', 23),
('Elevator', 'Asansör', 'arrow-up', 'accessibility', 30),
('Wheelchair Access', 'Tekerlekli Sandalye Erişimi', 'accessibility', 'accessibility', 31);

-- Varsayılan platform ayarları
INSERT INTO admin_settings (key, value, description) VALUES
('commission_percent', '10', 'Platform komisyon oranı (%)'),
('escrow_release_hours', '24', 'Check-in sonrası escrow serbest bırakma süresi (saat)'),
('max_images_per_listing', '20', 'İlan başına maksimum fotoğraf sayısı'),
('require_host_kyc', 'true', 'Ev sahipleri için KYC zorunluluğu'),
('auto_approve_listings', 'false', 'İlanların otomatik onaylanması'),
('min_payout_amount', '100', 'Minimum ödeme tutarı (TRY)');
