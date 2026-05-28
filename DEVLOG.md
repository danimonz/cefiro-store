# Cefiro Studios — Dev Log

Project memory. One entry per session. Append, never delete.

---

## 2026-05-28 — Brutalist Redesign (Yeezy-inspired)

### What changed
Full visual overhaul. Every file from Phase 1 was rewritten except the cart context and data layer, which are unchanged.

**Files rewritten (11 total):**
- `app/globals.css` — Complete replacement. New palette tokens, `product-card` / `product-card-img` CSS hover classes, `fadeUp` keyframe with `animation-fill-mode: both` for staggered page-load animation. Removed: gold-rule, deco-border, all warm color references.
- `app/layout.js` — Removed Playfair Display entirely. Inter only, single font variable.
- `app/components/Navbar.js` — Now a Client Component (`'use client'`) for scroll detection. Background transitions from solid `#EFEFEF` → `rgba(239,239,239,0.97)` at scroll > 10px. Bottom border fades in the same way. Wordmark: Inter 500, 18px, 0.16em tracking. Nav links: Inter 400, 11px, hover via useState.
- `app/components/CartIcon.js` — Replaced text+SVG combo with the spec'd shopping bag SVG (15×17px). Badge: 14×14 circle, `#1a1a1a` bg, `#EFEFEF` text, 8px font.
- `app/components/Footer.js` — `© 2026 Cefiro Studios` left, Instagram SVG right. Both `rgba(26,26,26,0.22)`. Hairline top border.
- `app/components/ProductCard.js` — Square tile via `paddingBottom: 100%` trick. No category tags, no subtitles. Name uppercase 12px/400, price 12px/300 at 0.45 opacity. Hover handled entirely in CSS (`product-card` + `product-card-img` classes).
- `app/components/AddToCart.js` — `#1a1a1a` background, `#EFEFEF` text. Confirmed state flips to transparent + border.
- `app/page.js` — Hero section removed entirely. Page opens directly to 3-column product grid with staggered `fadeUp` animation (60ms per card) applied via inline `animationDelay` on Server Component wrappers.
- `app/products/page.js` — Same grid as homepage, identical padding spec. No decorative headers.
- `app/products/[slug]/page.js` — Colors updated throughout. Gold-rule and Art Deco elements removed. Image container: `#E2E2E2`. Dividers: `rgba(0,0,0,0.06)`. "You may also like" label replaces the decorated section header.
- `app/cart/CartPageClient.js` — Full palette swap. Thumbnails `#E2E2E2`, qty border `rgba(0,0,0,0.12)`, checkout button `rgba(26,26,26,0.15)`. Removed all gold references.

### Decisions made
- **Navbar as Client Component** — scroll detection requires `useEffect`. The full Navbar was made `'use client'` rather than splitting it, since it's small and already contains CartIcon (also a Client Component). This is acceptable per the docs pattern.
- **CSS classes for hover** — ProductCard is a Server Component. The image scale hover (`cubic-bezier(0.16,1,0.3,1)`) can't use `onMouseEnter` in a Server Component. Solved with `.product-card:hover .product-card-img` CSS rule in globals.css — no JS needed, works perfectly.
- **`animation-fill-mode: both`** — Used instead of `forwards` on the page-load `fadeUp`. `both` applies the `from` state (opacity 0) before the delay fires, preventing a flash of visible content before the animation starts. This technique works in Server Components via inline `style` props.
- **No hero** — Removed completely per spec. The homepage is now a pure product grid, opening at row 1, column 1 immediately below the navbar.
- **HeroCTA.js** — Left on disk (dead code), not deleted. Harmless.
- **FadeIn component** — Kept for product detail page scroll sections. Not used on homepage or listing page per spec.

### Build status
`npm run build` — clean. 11 pages, zero errors, all statically prerendered.

### Next steps
- [ ] **Mobile QA** — screenshot at 375px. 3-column grid likely collapses; need 2-col on mobile, 1-col on very small screens
- [ ] **About page** (`/about`) — still 404s, still in the PRD, still linked from navbar
- [ ] **Real product photography** — SVG placeholders holding but blocking the actual vision
- [ ] **Product image gallery** — `images[]` array in data model unused
- [ ] **Phase 2: Stripe** — checkout route, env vars, Vercel deploy

---

## 2026-05-27 — Phase 1: Storefront Foundation

### What was built
Complete Phase 1 storefront from scratch. No pre-existing pages — replaced the Next.js boilerplate entirely.

**Files created:**
- `public/data/products.json` — 5 starter products (Estructura print, Essentials Tee, Copal Incense, La Máquina poster, Cefiro Lighter)
- `public/images/*.svg` — Brand-consistent SVG placeholder images for each product (dark palette, gold accents, art deco details)
- `app/globals.css` — Full brand design system: CSS custom properties for colors, fonts, scroll animations, gold rule utility, Art Deco border utility, custom scrollbar, selection color
- `app/layout.js` — Root layout with Playfair Display + Inter via `next/font/google`, CartProvider wrapping the whole app
- `app/lib/cart-context.js` — Client-side cart via React Context + localStorage. Exposes: `items`, `count`, `subtotal`, `addItem`, `removeItem`, `updateQty`, `clearCart`
- `app/components/Navbar.js` — Fixed, gradient-faded navbar. Centered wordmark, nav links left, cart icon right
- `app/components/CartIcon.js` — Client component. Shows live item count badge from cart context
- `app/components/Footer.js` — Minimal: wordmark, ethos tagline, Instagram link, copyright
- `app/components/FadeIn.js` — Client component. Intersection Observer scroll-triggered fade-up animation with configurable delay
- `app/components/ProductCard.js` — Server component. Image with scale hover, category tag, name in Playfair, price in gold
- `app/components/AddToCart.js` — Client component. Gold button → confirmed state (border-only + checkmark) for 2s on click
- `app/components/HeroCTA.js` — Client component (extracted from page.js to allow hover state on Server Component page)
- `app/page.js` — Homepage: full-screen hero with Art Deco decorative lines, scroll indicator, staggered product grid with FadeIn, brand ethos quote section
- `app/products/page.js` — Shop listing page. All products in a 3-column grid
- `app/products/[slug]/page.js` — Dynamic product page. `generateStaticParams` + `generateMetadata`. Sticky info panel, related products
- `app/cart/page.js` — Thin server shell
- `app/cart/CartPageClient.js` — Full cart UI: empty state, item rows with qty controls, subtotal, disabled Stripe checkout button

### Decisions made
- **Next.js 16 App Router** — read `node_modules/next/dist/docs/` before writing any code per AGENTS.md. `params` is now a Promise in dynamic routes (`await params`).
- **Tailwind v4** — `@import "tailwindcss"` only, no `tailwind.config.js`. Custom tokens via `@theme inline` block in CSS.
- **Server/Client split** — pages and layouts are Server Components. Only interactive pieces are Client Components (cart context, add-to-cart, animations, cart icon count).
- **No database** — products served from a static JSON file in `/public/data/`. Read with `fs.readFile` in Server Components.
- **SVG placeholders** — no real product photography yet. SVGs carry the brand aesthetic (black background, gold accents, linework) so the store doesn't feel broken without photos.
- **Cart in localStorage** — simple, no auth needed, persists across refreshes. Will swap for Stripe cart session in Phase 2.
- **Playfair Display** confirmed available in this version of `next/font/google` via metadata inspection.

### Build status
`npm run build` — clean. 11 pages generated, zero errors. All product pages statically prerendered via `generateStaticParams`.

### Next steps
- [ ] **Real product photography** — replace SVG placeholders with actual images in `/public/images/`
- [ ] **About page** (`/about`) — brand story, the creator, the ethos. Phase 1 PRD includes it but was not prioritized
- [ ] **Mobile QA** — screenshot at 375px. Grid, hero font size, navbar need verification
- [ ] **Phase 2: Stripe** — add `stripe` + `@stripe/stripe-js`, create `/api/checkout` route handler, wire the disabled checkout button
- [ ] **Vercel deploy** — `vercel --prod` when ready. Free tier. Set `STRIPE_SECRET_KEY` env var at that point
- [ ] **Product image gallery** — `images` array already in the data model, product page only uses `images[0]` for now
