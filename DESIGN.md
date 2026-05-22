# Design System — SmartApt

## Color Strategy

**Dashboard/App (product register):** Restrained — emerald ≤10% of surface, tinted neutrals carry the rest.
**Landing page (brand register):** Committed — emerald heroes anchor key moments.

All colors in OKLCH. Never use raw `#000` or `#fff`.

## Color Tokens

| Token | OKLCH | Hex approx | Usage |
|-------|-------|------------|-------|
| `--bg` | oklch(0.985 0.006 155) | `#F7FAF8` | Page background (emerald-tinted white) |
| `--surface` | oklch(0.975 0.008 155) | `#EEF4F0` | Card, panel surfaces |
| `--surface-raised` | oklch(1 0 0) | `#FFFFFF` | Elevated cards, modals |
| `--border` | oklch(0.9 0.012 155) | `#D4E5D9` | Borders, dividers |
| `--border-strong` | oklch(0.82 0.018 155) | `#B0CCB8` | Focus rings, strong dividers |
| `--text-primary` | oklch(0.2 0.025 240) | `#0F1F2E` | Body text, headings |
| `--text-secondary` | oklch(0.48 0.022 240) | `#4A6070` | Labels, captions, secondary info |
| `--text-tertiary` | oklch(0.65 0.015 240) | `#7A95A5` | Placeholder, disabled |
| `--emerald` | oklch(0.54 0.155 162) | `#059669` | Primary CTA, active states, paid |
| `--emerald-hover` | oklch(0.48 0.145 162) | `#047857` | Button hover |
| `--emerald-light` | oklch(0.97 0.04 162) | `#ECFDF5` | Badge bg, tinted surfaces |
| `--emerald-mid` | oklch(0.78 0.1 162) | `#6EE7B7` | Charts, progress bars |
| `--amber` | oklch(0.72 0.16 75) | `#F59E0B` | Pending, warning |
| `--amber-light` | oklch(0.98 0.03 85) | `#FFFBEB` | Warning badge bg |
| `--red` | oklch(0.62 0.19 25) | `#EF4444` | Overdue, error, danger |
| `--red-light` | oklch(0.97 0.03 25) | `#FEF2F2` | Error badge bg |
| `--slate-hero` | oklch(0.15 0.028 240) | `#0B1929` | Landing hero bg |
| `--slate-dark` | oklch(0.22 0.032 240) | `#132333` | Dark sections |

## Typography

**Scene test passed:** "Property manager glancing at a dashboard at 9am — needs data clarity, not typographic drama."

### Font Stack

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| Display / Hero | Bricolage Grotesque | 400–800 | Structural, architectural — not on reject list |
| Body / UI | Manrope | 400–700 | Humanist sans, warm precision — not on reject list |
| Numbers / Mono | Geist Mono | 400–500 | Clean numeric tabular figures |

Load via Google Fonts (Bricolage Grotesque + Manrope) + Vercel CDN (Geist Mono).

```css
/* Tailwind config */
fontFamily: {
  display: ['Bricolage Grotesque', 'sans-serif'],
  body: ['Manrope', 'sans-serif'],
  mono: ['Geist Mono', 'monospace'],
}
```

### Type Scale (fluid with clamp)

| Role | Size | Weight | Line height |
|------|------|--------|-------------|
| `hero` | clamp(2.5rem, 5vw, 4.5rem) | 800 | 1.1 |
| `h1` | clamp(1.75rem, 3vw, 2.5rem) | 700 | 1.2 |
| `h2` | clamp(1.375rem, 2vw, 1.875rem) | 700 | 1.25 |
| `h3` | 1.25rem | 600 | 1.3 |
| `h4` | 1.0625rem | 600 | 1.35 |
| `body` | 0.9375rem | 400 | 1.6 |
| `body-sm` | 0.875rem | 400 | 1.55 |
| `label` | 0.75rem | 600 | 1.4 |
| `mono` | 0.875rem | 400–500 | 1.5 |

## Spacing & Layout

- Base unit: 4px
- Content max-width: 1280px (`max-w-7xl`) with 24px gutters on desktop, 16px on mobile
- Section rhythm: 96px vertical (`py-24`) on landing; 24px page padding on app
- Card padding: 24px standard, 32px for featured/primary cards
- Sidebar width: 256px fixed
- Topbar height: 60px fixed

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 6px | Tags, small elements |
| `rounded` | 8px | Inputs, small cards |
| `rounded-md` | 10px | Buttons |
| `rounded-lg` | 14px | Cards, panels |
| `rounded-xl` | 18px | Large cards, modals |
| `rounded-2xl` | 24px | Feature cards, hero elements |
| `rounded-full` | 9999px | Badges, avatars, pills |

## Elevation / Shadow

```css
--shadow-sm: 0 1px 2px oklch(0.2 0.025 240 / 0.06), 0 1px 3px oklch(0.2 0.025 240 / 0.08);
--shadow: 0 2px 4px oklch(0.2 0.025 240 / 0.06), 0 4px 12px oklch(0.2 0.025 240 / 0.08);
--shadow-md: 0 4px 8px oklch(0.2 0.025 240 / 0.08), 0 8px 24px oklch(0.2 0.025 240 / 0.1);
--shadow-lg: 0 8px 16px oklch(0.2 0.025 240 / 0.1), 0 16px 40px oklch(0.2 0.025 240 / 0.12);
```

## Components

### Buttons

```
Primary: bg-emerald, text-white, py-2.5 px-5, rounded-md, font-semibold
         hover: bg-emerald-hover, shadow-sm
         focus: ring-2 ring-emerald/40
Outline: border border-border-strong, text-text-primary, same sizing
Ghost:   no border, text-text-secondary, hover:bg-surface
Danger:  bg-red, text-white
```

### Status Badges

```
Paid/Active:   bg-emerald-light, text-emerald, rounded-full, text-xs font-semibold
Pending:       bg-amber-light, text-amber
Overdue/Error: bg-red-light, text-red
Inactive/Void: bg-surface, text-text-tertiary
```

### Cards

```
Base:     bg-surface-raised, border border-border, rounded-lg, shadow-sm
Hover:    shadow-md, border-border-strong
Featured: border-emerald/30, shadow emerald-tinted
Stat:     p-6, with large number in Geist Mono
```

### Data Tables

```
Header:  bg-surface, text-label, font-semibold text-text-secondary, uppercase tracking-wide
Row:     border-b border-border, hover:bg-surface
Actions: appear on row hover, text-text-secondary
```

## App Layout

```
Sidebar: 256px, bg-slate-hero, fixed left
         Logo top, nav items middle, user/settings bottom
         Active item: bg-emerald/15, text-emerald, left border 2px emerald
Topbar:  60px, bg-surface-raised, border-b, breadcrumb + actions
Content: flex-1 ml-64, bg-bg, min-h-screen, p-6
```

## Landing Page Structure

```
1. Nav:        bg-transparent → bg-surface-raised/90 blur on scroll
2. Hero:       bg-slate-hero, Committed emerald accents
3. Stats bar:  bg-emerald/8, key numbers
4. Features:   bg-bg alternating
5. How it works: bg-surface
6. QR demo:    bg-slate-dark, feature highlight
7. Pricing:    bg-bg
8. CTA:        bg-emerald (full drench moment)
9. Footer:     bg-slate-hero
```

## Motion

- Page transitions: opacity + translateY(8px), 200ms ease-out-quart
- Hover: scale(1.01) on cards, 150ms ease-out
- Sidebar nav: bg transition 120ms
- Skeleton: shimmer from oklch(0.9 0.01 155) → oklch(0.95 0.01 155)
- Respect prefers-reduced-motion — disable transforms, keep opacity
- No bounce, no elastic, no spring on UI elements
