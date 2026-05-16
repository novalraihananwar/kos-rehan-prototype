# Design System — SmartKos

## Color Palette

Primary brand colors. All on-brand usage should draw from these tokens only.

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background dark | Navy 950 | `#050F19` | Footer, darkest surfaces |
| Brand primary | Navy 900 | `#0B1D2E` | Hero bg, headings, dark sections |
| Surface dark | Navy 700 | `#1A3552` | Sidebar hover, dark card variation |
| Accent primary | Blue 600 | `#2563EB` | CTAs, active states, links |
| Accent hover | Blue 700 | `#1D4ED8` | Button hover |
| Accent light | Blue 50 | `#EFF6FF` | Icon backgrounds, chip bg |
| Success | Emerald 600 | `#059669` | Paid status, positive indicators |
| Success light | Emerald 50 | `#ECFDF5` | Success badge bg |
| Warning | Amber 500 | `#F59E0B` | Booking/pending states |
| Danger | Red 500 | `#EF4444` | Overdue, errors |
| Body text | Gray 800 | `#1E293B` | Primary body copy |
| Secondary text | Gray 500 | `#64748B` | Subtitles, captions |
| Border | Gray 200 | `#E2E8F0` | Card borders, dividers |
| Surface light | Gray 50 | `#F8FAFC` | Section alternating background |

**Off-palette colors to avoid:** purple (`#7C3AED`), orange (`#EA580C`) — these break brand cohesion.

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Headings | Syne | 700–800 | `text-4xl`–`text-7xl` |
| Body | Plus Jakarta Sans | 400–700 | `text-sm`–`text-lg` |
| Monospace / Numbers | JetBrains Mono | 400–500 | `text-xs`–`text-sm` |

Font loading: all three via Google Fonts. Class shortcuts: `.fd` = Syne display.

## Spacing Scale

Section vertical rhythm: `py-24` (96px) consistently. Stats dark section: same `py-24`.  
Card padding: `28px` (feature, testimonial). Pricing card: `32px`.  
Content max-width: `max-w-7xl` (1280px) with `px-5` gutters.

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | 6px | Small elements |
| `--r` | 8px | Default |
| `--r-md` | 12px | Buttons, inputs |
| `--r-lg` | 16px | Cards (feature, testimonial) |
| `--r-xl` | 20px | Pricing cards |
| `--r-2xl` | 24px | Large containers |
| `--r-full` | 9999px | Chips, badges, pills |

## Buttons (Landing Page)

Two variants used on landing page. Both `border-radius: 12px`, `font-size: 14px`, `font-weight: 700`.

- **Primary** (`.btn-p`): `background: #2563EB`, `color: white`, `padding: 12px 24px`
- **Secondary** (`.btn-s`): `background: rgba(255,255,255,.1)`, `border: 1px solid rgba(255,255,255,.2)`, `color: white`, same padding — used on dark backgrounds only

App pages use `.btn`, `.btn-primary`, `.btn-outline` etc. from `main.css`.

## Component Inventory

### Section Chips
All section labels use `.chip`: `background: #EFF6FF`, `color: #2563EB`, `padding: 5px 13px`, `border-radius: 9999px`, `font-size: 12px`, `font-weight: 700`. Always include an SVG icon + text label.

### Feature Cards (`.card-f`)
`background: white`, `border: 1px solid #E2E8F0`, `border-radius: 16px`, `padding: 28px`. Hover: `translateY(-4px)` + shadow + blue border.

### Pricing Cards (`.card-p`)
`border-radius: 20px`, `padding: 32px`. Featured card (Pro): `background: #0B1D2E`, no border, white text. Scale featured: `transform: scale(1.04)`.

### Testimonial Cards (`.card-t`)
`background: white`, `border: 1px solid #E2E8F0`, `border-radius: 16px`, `padding: 28px`.

### Stats Cards (`.stat-c`)
`background: rgba(255,255,255,.08)`, `border: 1px solid rgba(255,255,255,.12)`, `backdrop-filter: blur(8px)`, `border-radius: 16px`, `padding: 28px`. Used on dark `#0B1D2E` bg only.

### Badges
`.bd` base + modifier: `.bd-g` (green), `.bd-b` (blue), `.bd-a` (amber), `.bd-r` (red), `.bd-s` (slate). All pill-shaped (`border-radius: 9999px`), `font-size: 12px`, `font-weight: 600`.

## Animations

- **Page entry** (hero): `.afiu` + `.d1`–`.d4` delay classes. `fadeInUp` 0.6s ease.
- **Scroll reveal**: `.reveal` + JS adds `.vis`. `opacity: 0 → 1`, `translateY(16px → 0)`, 0.55s ease.
- No bounce, no elastic easing anywhere.

## Section Backgrounds (Landing Page)

Alternating rhythm for visual separation:
1. Hero: dark gradient `#050F19 → #0B1D2E → #112840`
2. Features: `white`
3. Stats: `#0B1D2E` (dark break)
4. How it Works: `#F8FAFC`
5. Pricing: `white`
6. Testimonials: `#F8FAFC`
7. FAQ: `white`
8. CTA: gradient `#0B1D2E → #1A3552`
9. Footer: `#050F19`

## App Layout (Dashboard + inner pages)

Sidebar: `260px` wide, `#0B1D2E` bg, fixed. Topbar: `64px`, white. Content: `padding: 28px 24px`.
Uses `main.css` exclusively — no landing-page CSS on app pages.
