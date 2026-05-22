-- SmartApt — Initial Database Schema
-- Run this in Supabase SQL Editor

-- 1. UNITS
CREATE TABLE IF NOT EXISTS units (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_number TEXT UNIQUE NOT NULL,        -- e.g. "B-0502"
  floor       INT NOT NULL,
  tower       TEXT DEFAULT 'Tower A',
  type        TEXT NOT NULL,               -- Studio / 1BR / 2BR / 3BR
  area_sqm    NUMERIC(6,2),
  monthly_rent NUMERIC(12,2) NOT NULL,
  status      TEXT DEFAULT 'vacant',       -- vacant / occupied / maintenance
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TENANTS
CREATE TABLE IF NOT EXISTS tenants (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    TEXT NOT NULL,
  id_number    TEXT,                        -- KTP
  phone        TEXT NOT NULL,
  email        TEXT,
  unit_id      UUID REFERENCES units(id),
  lease_start  DATE NOT NULL,
  lease_end    DATE NOT NULL,
  monthly_rent NUMERIC(12,2) NOT NULL,
  deposit      NUMERIC(12,2) DEFAULT 0,
  status       TEXT DEFAULT 'active',       -- active / inactive
  qr_token     TEXT UNIQUE,                 -- for QR card portal access
  qr_active    BOOLEAN DEFAULT TRUE,
  qr_created_at TIMESTAMPTZ,
  qr_last_used  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PAYMENTS / INVOICES
CREATE TABLE IF NOT EXISTS payments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,      -- INV-2026-0001
  tenant_id      UUID REFERENCES tenants(id),
  unit_id        UUID REFERENCES units(id),
  period_month   INT NOT NULL,              -- 1-12
  period_year    INT NOT NULL,
  amount         NUMERIC(12,2) NOT NULL,
  breakdown      JSONB DEFAULT '[]',        -- [{label, amount}]
  method         TEXT,                      -- Transfer / QRIS / Cash
  status         TEXT DEFAULT 'unpaid',     -- unpaid / paid / overdue
  due_date       DATE NOT NULL,
  paid_at        TIMESTAMPTZ,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MAINTENANCE / WORK ORDERS
CREATE TABLE IF NOT EXISTS work_orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wo_number     TEXT UNIQUE NOT NULL,       -- WO-2026-001
  unit_id       UUID REFERENCES units(id),
  tenant_id     UUID REFERENCES tenants(id),
  category      TEXT NOT NULL,              -- Listrik/Air/AC/Lift/Kebersihan/Lainnya
  title         TEXT NOT NULL,
  description   TEXT,
  priority      TEXT DEFAULT 'normal',      -- urgent / high / normal / low
  status        TEXT DEFAULT 'new',         -- new / in_progress / done / cancelled
  assigned_to   TEXT,
  reported_at   TIMESTAMPTZ DEFAULT NOW(),
  resolved_at   TIMESTAMPTZ,
  notes         TEXT
);

-- 5. AMENITIES
CREATE TABLE IF NOT EXISTS amenities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,                -- Gym, Kolam Renang, dll
  icon        TEXT,
  capacity    INT DEFAULT 20,
  open_time   TEXT DEFAULT '06:00',
  close_time  TEXT DEFAULT '22:00',
  is_active   BOOLEAN DEFAULT TRUE,
  notes       TEXT
);

-- 6. AMENITY BOOKINGS
CREATE TABLE IF NOT EXISTS amenity_bookings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amenity_id    UUID REFERENCES amenities(id),
  tenant_id     UUID REFERENCES tenants(id),
  booking_date  DATE NOT NULL,
  start_time    TEXT NOT NULL,
  end_time      TEXT NOT NULL,
  status        TEXT DEFAULT 'confirmed',   -- confirmed / pending / cancelled
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 7. VISITORS
CREATE TABLE IF NOT EXISTS visitors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  id_number       TEXT,
  destination_unit UUID REFERENCES units(id),
  host_tenant_id  UUID REFERENCES tenants(id),
  purpose         TEXT,
  check_in        TIMESTAMPTZ DEFAULT NOW(),
  check_out       TIMESTAMPTZ,
  estimated_duration INT DEFAULT 60,        -- minutes
  status          TEXT DEFAULT 'inside',    -- inside / left
  registered_by   TEXT
);

-- 8. WHATSAPP LOG
CREATE TABLE IF NOT EXISTS wa_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient   TEXT NOT NULL,               -- phone number
  template    TEXT NOT NULL,               -- reminder_rent / payment_confirm / etc
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'sent',         -- sent / failed / pending
  sent_at     TIMESTAMPTZ DEFAULT NOW(),
  tenant_id   UUID REFERENCES tenants(id)
);

-- ── RLS Policies ──────────────────────────────────────────────
ALTER TABLE units           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants         ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders     ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities       ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenity_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors        ENABLE ROW LEVEL SECURITY;
ALTER TABLE wa_messages     ENABLE ROW LEVEL SECURITY;

-- Public read for tenant portal (via QR token — validated server-side)
CREATE POLICY "Service role full access" ON units           FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON tenants         FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON payments        FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON work_orders     FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON amenities       FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON amenity_bookings FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON visitors        FOR ALL TO service_role USING (true);
CREATE POLICY "Service role full access" ON wa_messages     FOR ALL TO service_role USING (true);

-- Public read amenities (for booking display)
CREATE POLICY "Public read amenities" ON amenities FOR SELECT TO anon USING (is_active = true);

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_tenants_unit      ON tenants(unit_id);
CREATE INDEX IF NOT EXISTS idx_tenants_qr_token  ON tenants(qr_token);
CREATE INDEX IF NOT EXISTS idx_payments_tenant   ON payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payments_status   ON payments(status);
CREATE INDEX IF NOT EXISTS idx_work_orders_unit  ON work_orders(unit_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_status ON work_orders(status);
CREATE INDEX IF NOT EXISTS idx_visitors_date     ON visitors(check_in);

-- ── Seed: generate QR token helper function ───────────────────
CREATE OR REPLACE FUNCTION generate_qr_token()
RETURNS TEXT AS $$
BEGIN
  RETURN 'SAT-' || upper(substring(gen_random_uuid()::text, 1, 4)) ||
         '-' || upper(substring(gen_random_uuid()::text, 1, 4)) ||
         '-' || upper(substring(gen_random_uuid()::text, 1, 4));
END;
$$ LANGUAGE plpgsql;

-- Auto-assign QR token on tenant insert
CREATE OR REPLACE FUNCTION auto_assign_qr_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.qr_token IS NULL THEN
    NEW.qr_token := generate_qr_token();
    NEW.qr_created_at := NOW();
    NEW.qr_active := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenant_qr_token_trigger
  BEFORE INSERT ON tenants
  FOR EACH ROW EXECUTE FUNCTION auto_assign_qr_token();
