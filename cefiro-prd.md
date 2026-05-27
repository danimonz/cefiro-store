# Cefiro Studios — Product Requirements Document

## Purpose
A personal portfolio and e-commerce storefront for Cefiro Studios. This is an artist's playground that also makes money. The goal is a captivating, immersive web experience that functions as both a creative showcase and a real store generating $10k/month in revenue selling prints, apparel, incense, and curated goods.

## Brand Identity
Cefiro Studios is a lifestyle brand at the intersection of tech, engineering, MMA, art, and Mexican-American culture. It's built by a Creator, Healer, and Athlete. The brand speaks to independent thinkers who are equal parts intellectual and street — people who read philosophy and also train to fight.

## Target Audience
- Action Bronson energy — cultured, physical, creative, doesn't give a fuck
- Independent thinkers who buy with intention, not trends
- Gen Z skaters and streetwear kids who also read books
- Shia LaBeouf types — intense, artistic, unpredictable
- Lovers and fighters — people who feel deeply and act boldly
- The kind of person who has a tattoo of flowers on their legs and a bookshelf full of Camus

## Design Direction

### Overall Vibe
Minimal luxury meets street culture meets Mexican heritage meets intellectual edge. The store should feel like walking into a dimly lit gallery in East London where the owner is playing vinyl and burning incense.

### Visual References
1. **Yeezy.com** — Brutalist minimalism. Massive negative space. Stark typography. Monochrome with occasional warm earth tones. Nothing unnecessary exists on screen.
2. **The Gentleman (Guy Ritchie)** — Refined British menswear energy. Dark color palette. Sharp, confident, a little dangerous. Gold and brass accents.
3. **Scientific/Academic Posters** — Clean information hierarchy. Diagrammatic layouts. Serif fonts mixed with sans-serif. The beauty of organized knowledge.
4. **Art Deco** — Geometric patterns, symmetry, luxury in the details. Gold lines, angular borders, the feeling of 1920s elegance remixed for now.
5. **Chicano Art** — Bold lettering, cultural pride, religious iconography mixed with street art. Lowrider aesthetic. Hand-drawn feeling in a digital space. Mexican muralism influence (Rivera, Orozco, Siqueiros). This is Daniel's heritage and it should breathe through the brand without being a costume.

### Color Palette
- Primary: Deep black (#0A0A0A), Off-white/cream (#F5F0E8)
- Accents: Warm gold (#C9A84C), Aged brass (#B5924C)
- Subtle touches: Burgundy (#6B1D2A), Forest green (#2D4A3E)
- Never: bright colors, neons, standard white (#FFFFFF)

### Typography
- Headlines: A strong serif or slab serif — something with weight and authority (Playfair Display, or similar)
- Body: Clean sans-serif — readable, modern (Inter, or similar)
- Accents/Special: Something with character for brand moments — hand-drawn or Art Deco inspired
- Import from Google Fonts

### Layout Principles
- Massive negative space — let things breathe (25%+ empty space, always)
- Grid-based product layout but not boring — stagger sizes occasionally
- Full-bleed images when showcasing products
- Scroll-driven experience — the homepage should feel like a journey, not a catalog
- Mobile-first — most customers will find this through Instagram

## Tech Stack
- **Framework**: Next.js (App Router) — already initialized
- **Styling**: Tailwind CSS — already included
- **Product Data**: Simple JSON file (products.json) — no database yet
- **Payments**: Stripe Checkout (Phase 2 — not yet, just build the cart for now)
- **Hosting**: Vercel (free tier) — deploy later
- **Images**: Local files in /public/images/ for now
- **Animations**: Subtle CSS transitions and scroll effects — nothing heavy, just enough to feel alive. Framer Motion if needed.

## Pages

### 1. Homepage
- Full-screen hero section with brand name "CEFIRO STUDIOS" in bold typography
- A single tagline that captures the brand (suggest options)
- Smooth scroll down to featured products
- Product grid — clean cards with image, name, price
- Hover effects on product cards — subtle, not flashy
- Footer with minimal info (Instagram link, copyright)

### 2. Product Page (/products/[slug])
- Large product image (or image gallery if multiple)
- Product name, price, description
- "Add to Cart" button — prominent but elegant
- Related products section at the bottom
- Clean, no clutter — the product is the star

### 3. Cart Page (/cart)
- List of items with thumbnail, name, quantity selector, price
- Remove item option
- Subtotal and total
- "Checkout" button (disabled for now with "Coming Soon" or links to Stripe later)
- "Continue Shopping" link back to products

### 4. About Page (/about)
- Brief brand story — who is Cefiro Studios
- The Creator behind it — keep it mysterious but real
- The ethos: "Learn clearly. Create honestly. Serve locally."

## Starter Products (placeholder)
Create a products.json with these to start:
1. **"Estructura" Art Print** — $25 — A surrealist black and white print. 12x18 inches.
2. **Cefiro Essentials Tee** — $35 — Heavyweight cotton, minimal logo, black.
3. **Copal Incense Pack** — $12 — Traditional Mexican copal incense, 10 sticks.
4. **"La Máquina" Poster** — $30 — Art Deco meets Chicano typography. 18x24.
5. **Cefiro Lighter** — $8 — Matte black, gold logo.

## Interactions & Animations
- Smooth page transitions
- Product cards: subtle scale on hover (1.02), slight shadow lift
- Add to cart: brief confirmation animation
- Scroll-triggered fade-ins for content sections
- Nothing that feels like a template — every animation should feel intentional

## What NOT to Build (yet)
- No payment processing (Phase 2 — Stripe)
- No user accounts or login
- No admin panel
- No database
- No search functionality
- No newsletter signup
- Keep it lean. A beautiful storefront with a working cart. That's Phase 1.

## Quality Standards
- Lighthouse score: aim for 90+ on performance
- Fully responsive — phone, tablet, desktop
- No visible template energy — this should feel custom-made
- Every pixel intentional — if it doesn't serve the vibe, remove it
