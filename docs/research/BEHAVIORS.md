# Zafira Home Behavior Sweep

- Target: `https://www.zafiraorganics.com/`
- Page title: `ZAFIRA`
- Scroll height observed: `9968px`
- Fonts observed: `Inter`, `Poppins`, `Jitter`; local clone uses downloaded Inter plus serif display fallback.
- Dominant colors: `#d3f1d3`, `#035c05`, `#49934b`, `#f3fcf3`, `#fff7f5`, white.

## Interaction Model

- Header: sticky at top, white background, cart indicator; no major scroll state change observed.
- Hero CTA, product CTA, ingredient CTA, science CTA: anchor-style scroll to product section in clone.
- Product bundle selector: click-driven radio selection; no backend/cart side effect in clone.
- FAQ: accordion/details pattern. Original exposes collapsible FAQ rows; clone keeps same interaction model.
- Reviews/product galleries: original uses repeated carousel/gallery content; clone uses static responsive grids and review bands.
- Hover states: CTA buttons darken and lift; cards keep subtle shadow/border.

## Responsive Sweep

- Desktop: hero/product/science sections use two columns, product gallery uses two-column image grid.
- Tablet: columns compress with same spacing.
- Mobile: all major sections stack, section padding and shell gutters reduce, press bar wraps.

## Assets

- 48 assets downloaded into `public/zafira-assets/`.
- Original page had 59 image nodes, many repeated carousel images.
- No videos were observed.
