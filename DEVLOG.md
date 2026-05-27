# Cefiro Studios — Dev Log

Project memory. One entry per session. Append, never delete.

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
