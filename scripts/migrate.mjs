// Run: node scripts/migrate.mjs
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL)

console.log("Running SmartApt migrations...")

const statements = [
  // Units
  `CREATE TABLE IF NOT EXISTS units (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_number  TEXT UNIQUE NOT NULL,
    floor        INT NOT NULL,
    tower        TEXT DEFAULT 'Tower A',
    type         TEXT NOT NULL,
    area_sqm     NUMERIC(6,2),
    monthly_rent NUMERIC(12,2) NOT NULL,
    status       TEXT DEFAULT 'vacant',
    notes        TEXT,
    created_at   TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Tenants
  `CREATE TABLE IF NOT EXISTS tenants (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name     TEXT NOT NULL,
    id_number     TEXT,
    phone         TEXT NOT NULL,
    email         TEXT,
    unit_id       UUID REFERENCES units(id),
    lease_start   DATE NOT NULL,
    lease_end     DATE NOT NULL,
    monthly_rent  NUMERIC(12,2) NOT NULL,
    deposit       NUMERIC(12,2) DEFAULT 0,
    status        TEXT DEFAULT 'active',
    qr_token      TEXT UNIQUE,
    qr_active     BOOLEAN DEFAULT TRUE,
    qr_created_at TIMESTAMPTZ,
    qr_last_used  TIMESTAMPTZ,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Payments
  `CREATE TABLE IF NOT EXISTS payments (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    tenant_id      UUID REFERENCES tenants(id),
    unit_id        UUID REFERENCES units(id),
    period_month   INT NOT NULL,
    period_year    INT NOT NULL,
    amount         NUMERIC(12,2) NOT NULL,
    breakdown      JSONB DEFAULT '[]',
    method         TEXT,
    status         TEXT DEFAULT 'unpaid',
    due_date       DATE NOT NULL,
    paid_at        TIMESTAMPTZ,
    notes          TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Work Orders
  `CREATE TABLE IF NOT EXISTS work_orders (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wo_number   TEXT UNIQUE NOT NULL,
    unit_id     UUID REFERENCES units(id),
    tenant_id   UUID REFERENCES tenants(id),
    category    TEXT NOT NULL,
    title       TEXT NOT NULL,
    description TEXT,
    priority    TEXT DEFAULT 'normal',
    status      TEXT DEFAULT 'new',
    assigned_to TEXT,
    reported_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    notes       TEXT
  )`,

  // Amenities
  `CREATE TABLE IF NOT EXISTS amenities (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT NOT NULL,
    icon       TEXT,
    capacity   INT DEFAULT 20,
    open_time  TEXT DEFAULT '06:00',
    close_time TEXT DEFAULT '22:00',
    is_active  BOOLEAN DEFAULT TRUE,
    notes      TEXT
  )`,

  // Amenity Bookings
  `CREATE TABLE IF NOT EXISTS amenity_bookings (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amenity_id   UUID REFERENCES amenities(id),
    tenant_id    UUID REFERENCES tenants(id),
    booking_date DATE NOT NULL,
    start_time   TEXT NOT NULL,
    end_time     TEXT NOT NULL,
    status       TEXT DEFAULT 'confirmed',
    created_at   TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Visitors
  `CREATE TABLE IF NOT EXISTS visitors (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name              TEXT NOT NULL,
    id_number         TEXT,
    destination_unit  UUID REFERENCES units(id),
    host_tenant_id    UUID REFERENCES tenants(id),
    purpose           TEXT,
    check_in          TIMESTAMPTZ DEFAULT NOW(),
    check_out         TIMESTAMPTZ,
    estimated_duration INT DEFAULT 60,
    status            TEXT DEFAULT 'inside',
    registered_by     TEXT
  )`,

  // WhatsApp log
  `CREATE TABLE IF NOT EXISTS wa_messages (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient  TEXT NOT NULL,
    template   TEXT NOT NULL,
    message    TEXT NOT NULL,
    status     TEXT DEFAULT 'sent',
    sent_at    TIMESTAMPTZ DEFAULT NOW(),
    tenant_id  UUID REFERENCES tenants(id)
  )`,

  // Indexes
  `CREATE INDEX IF NOT EXISTS idx_tenants_unit       ON tenants(unit_id)`,
  `CREATE INDEX IF NOT EXISTS idx_tenants_qr_token   ON tenants(qr_token)`,
  `CREATE INDEX IF NOT EXISTS idx_payments_tenant    ON payments(tenant_id)`,
  `CREATE INDEX IF NOT EXISTS idx_payments_status    ON payments(status)`,
  `CREATE INDEX IF NOT EXISTS idx_work_orders_unit   ON work_orders(unit_id)`,
  `CREATE INDEX IF NOT EXISTS idx_work_orders_status ON work_orders(status)`,
  `CREATE INDEX IF NOT EXISTS idx_visitors_checkin   ON visitors(check_in)`,
]

let ok = 0, skip = 0, fail = 0
for (const stmt of statements) {
  try {
    await sql.query(stmt)
    ok++
    process.stdout.write("✓")
  } catch (err) {
    if (err.message?.includes("already exists")) {
      skip++
      process.stdout.write("s")
    } else {
      fail++
      console.error(`\n✗ FAILED: ${stmt.slice(0, 60)}...`)
      console.error("  Error:", err.message)
    }
  }
}

console.log(`\n\nDone — ${ok} created, ${skip} skipped, ${fail} failed`)
if (fail === 0) console.log("✅ All tables ready!")
