# PrimalQueenOfferBoxes Specification

## Overview
- Target page to inspect: `https://primalqueen.com/`
- Target source section: `#join_pkg`
- Screenshots:
  - `docs/design-references/primalqueen/offer-boxes-desktop.png`
  - `docs/design-references/primalqueen/offer-boxes-mobile.png`
- Raw extraction:
  - `docs/research/primalqueen/offer-boxes-extract.json`
- Intended Zafira target:
  - Replace the current product selector in `public/new/index.html`
  - Keep existing Zafira product/gallery/title/bullets/add-to-cart context
  - Use the Primal Queen two-card offer layout only

## Interaction Model
- Static offer cards with quantity stepper and add-to-cart button.
- No tab switching found in the target offer card area.
- Desktop: two offer cards side by side.
- Mobile: cards stack vertically.
- CTA behavior still needs final decision because Zafira currently has one product variant and subscription frequencies, not explicit 3-bottle / 1-bottle bundle variants.

## Primal Queen Source Content

### Section Header
- `Join Primal Queen Today`
- `GET 1st MONTH FREE`
- Countdown timer
- Urgency line: `June has a high risk of selling out 4,110 purchases made today.`

### Card 1
- Ribbon: `Flash Sale`
- Offer label: `Get 1st Month FREE`
- Heading: `3 Month`
- Subheading: `AutoShip & Save`
- Supply line: `2 Month Supply (2 bags)`
- Price: `$132` crossed out, `$78`
- Value rows:
  - `Free 3rd Bag` / `$39`
  - `Free bamboo lid glass jar` / `$24`
  - `Free on-the-go pill case` / `$9`
  - `Free mystery gift` / `$9`
  - `Free USA Shipping!` / `$12`
- Quantity: `1`
- CTA price: `$132` crossed out, `$78`
- CTA: `ADD TO CART`
- Footer:
  - `Delivered every 3 months`
  - `365 Day Guarantee`
  - `Online portal for easy cancel, skip, or pause.`
  - `Ships tomorrow, June 17 if ordered within ...`

### Card 2
- Heading: `1 Month`
- Subheading: `AutoShip & Save`
- Supply line: `1 Month Supply Delivered Monthly`
- Price: `$39`
- Value rows:
  - `30% OFF for life` / `$20`
  - `Free bamboo lid glass jar` / `$24`
  - `Free on-the-go pill case` / `$9`
  - `Free mystery gift` / `$9`
  - `Free USA Shipping!` / `$12`
- Quantity: `1`
- CTA price: `$44` crossed out, `$39`
- CTA: `ADD TO CART`
- Footer:
  - `Delivered monthly`
  - `365 Day Guarantee`
  - `Online portal for easy cancel, skip, or pause.`
  - `Ships tomorrow, June 17 if ordered within ...`

## Computed Style Notes From Target

### Section
- Background image: `https://primalqueen.com/cdn/shop/files/new-year-bg-desk.png?v=1064599921049599925`
- Layout includes a centered wrapper and decorative sale marquee above the cards.
- The requested transplant is only the two offer boxes, not the full Primal section.

### Card Wrapper
- Card width: `420px`
- Card border radius: `10px`
- Card border width: `3px`
- Font: `Inter, sans-serif`
- Base font size: `16px`
- Base line height: `24px`
- Letter spacing: `0.6px`
- Desktop card gap: about `60px` at wide viewport, `15px` below that.

### Card 1 Visual Emphasis
- Border: `rgb(250, 150, 191)`
- Box shadow: `rgb(250, 150, 191) 0px 0px 200px 0px, rgba(0, 0, 0, 0.16) 0px 9px 32.3px 0px`
- Content background from inline CSS: `#eb3d7c`
- This is the featured offer.

### Card 2 Visual Emphasis
- Border: `rgb(47, 1, 71)`
- Content background from inline CSS: `#ffffffb3`
- No pink glow shadow on extracted state.

## Zafira Product Data Found Locally

From `public/new/index.html` embedded product JSON:
- Product: `Zafira Recovery Foundation Capsules`
- Variant ID: `57416851652982`
- One-time price: `$54.90`
- Compare-at price: `$59.90`
- Selling plan group: `Save 20% with Automatic Refills`
- Subscription price: `$43.92`
- Selling plans:
  - `Refill Every Month`, ID `712053195126`
  - `Refill Every 2 Months`, ID `712053227894`
  - `Refill Every 3 Months`, ID `712053260662`
- Product image/gallery area target for hero CTA anchor: `#zafira-product-photo`

## Proposed Zafira Mapping Draft

### Option A: literal subscription-frequency cards

#### Card 1
- Heading: `3 Month`
- Subheading: `AutoShip & Save`
- Supply line: `3 Month Supply Delivered Every 3 Months`
- Main price: `$43.92` per bottle, or `$131.76` total if quantity is 3
- Footer: `Delivered every 3 months`
- Selling plan ID: `712053260662`

#### Card 2
- Heading: `1 Month`
- Subheading: `AutoShip & Save`
- Supply line: `1 Month Supply Delivered Monthly`
- Main price: `$43.92`
- Footer: `Delivered monthly`
- Selling plan ID: `712053195126`

### Option B: marketing-bundle cards

#### Card 1
- Heading: `3 Month`
- Subheading: `AutoShip & Save`
- Supply line: `3 Month Supply (3 bottles)`
- Main price: likely `$131.76`
- Compare-at: likely `$164.70` versus one-time price, or `$179.70` versus compare-at price
- Quantity: `3`
- Selling plan ID: `712053260662`

#### Card 2
- Heading: `1 Month`
- Subheading: `AutoShip & Save`
- Supply line: `1 Month Supply Delivered Monthly`
- Main price: `$43.92`
- Compare-at: `$54.90` one-time, or `$59.90` compare-at
- Quantity: `1`
- Selling plan ID: `712053195126`

## Open Questions Before Build
1. Should the 3-month card add quantity `3`, or add quantity `1` with the `Refill Every 3 Months` selling plan?
2. Should we show prices as total order price (`$131.76`) or per-bottle price (`$43.92/bottle`) on the 3-month card?
3. Should we keep Primal's free-gift rows, rewritten for Zafira, or remove gifts and use benefit/value rows?
4. Should the featured card be the 3-month card with the pink/glow treatment, adapted to Zafira green, or should it keep the Primal pink?
5. Should this be wired to real Shopify add-to-cart behavior now, or visual-only until the copy/layout is approved?
