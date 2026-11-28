# Emigisha brand guide

Chosen on 28 Nov 2026: website option G, "Sunrise with the Orbit sky". The reference mockup is `docs/proposals/website/07-sunrise-orbit.html`. It replaces the 14 Nov direction (C, "The Name", green with diamonds).

Emigisha has its own identity. Amber `#FFAA2B` and Manrope belong to chrisbalola.com and Meneja and are not used here.

## Positioning and voice

- The line: "Software that gives back." Under it, "Emigisha means blessings."
- The name is the standard for the work: a product should leave the person using it better off.
- Built for everyone: cheap phones, slow networks, mobile money and local languages come first.
- First person plural, plain and warm. Short sentences. No adjectives that sell.

## Logo

Concept P, "Full bowl": a gold sun settling into a bowl held out to receive. The name is set in Outfit SemiBold at `-0.03em`.

- Files (SVG and PNG, all colourways, app icon, favicon, social image) and usage rules: `docs/brand/logo/`.
- In code, `BrandSymbol` (`src/shared/presentation/components/misc/brand-symbol.tsx`) draws the symbol. The site icon, Apple icon and favicon in `src/app/` and `public/og.png` come from the logo pack.
- Clear space equals the height of the sun. Never recolour, stretch or rotate it.

## Colour

Tokens live in `src/app/globals.css`.

| Token                | Light     | Dark      | Use                                                 |
| -------------------- | --------- | --------- | --------------------------------------------------- |
| `--navy`             | `#0E2A47` | `#0E2A47` | Brand blocks: principles band, phone frame, buttons |
| `--navy-deep`        | `#081B30` | `#06162A` | Footer                                              |
| `--accent` (gold)    | `#F2B33D` | `#F2B33D` | The sun, buttons, headline emphasis, focus rings    |
| `--gold-soft`        | `#F8D58C` | `#F8D58C` | Small labels on navy                                |
| `--on-navy`          | `#FFFFFF` | `#FFFFFF` | Text on navy                                        |
| `--on-navy-soft`     | `#A9B8CA` | `#A9B8CA` | Secondary text on navy                              |
| `--navy-line`        | `#1F4167` | `#1F4167` | Hairlines and outlines on navy                      |
| `--background`       | `#F5F7FA` | `#0E1013` | Page                                                |
| `--card`             | `#FFFFFF` | `#17191D` | Product tiles                                       |
| `--muted`            | `#F2F5F8` | `#202328` | Chips, the plain page in the StyledDoc drawing      |
| `--foreground`       | `#0E2A47` | `#F2F4F7` | Text                                                |
| `--muted-foreground` | `#4D6079` | `#9BA3AE` | Secondary text                                      |
| `--border`           | `#DCE3EC` | `#2A2E34` | Hairlines                                           |
| `--live`             | `#FBE7BD` | `#3A3122` | Background of the "Live" chip                       |

- The hero, the principles band and the footer stay navy in both themes. Dark mode turns the light sections neutral charcoal, never blue, so the navy blocks keep their contrast.
- Gold is never body text on a light background. It is fine for large headline words on navy.
- The hero sky is a radial navy gradient with a star field (`.hero-sky`). Gradients are for backgrounds and light only, never inside text.

## Type

- Display: Outfit, weights 400 to 600. Wordmark, headlines, product names. Headlines are tight (`-0.045em` for the hero, `-0.04em` for section titles).
- Text: Inter, weights 400 to 600. Base size `1.0625rem`, line height `1.6`.

Both are loaded with `next/font` in `src/app/layout.tsx`.

## Layout

- Hero: a night sky, centred. The symbol (the sun drops into the bowl on load), the eyebrow, the headline with "gives back." in gold, the lede and two buttons, over a soft gold glow and a faint gold horizon arc.
- Products: a bento grid. The first product is the large tile with a drawing of its app; the others sit beside it. A gold tile underneath lists what "built for everyone" means.
- Principles: a navy band with three numbered principles.
- About: the title on the left; the story, the meaning of the name and the founder on the right.
- Footer: the contact email set very large on deep navy, the other addresses, and the legal line and links.
- Content column: 1200px. One column under `860px`.

## Motion

- On load: the sun settles into the bowl, then the eyebrow, headline, lede and buttons fade up in turn. The glow in the hero breathes slowly. The bars in Meneja's chart grow.
- Hover: tiles lift by 4px, buttons by 1px.
- Everything stops under `prefers-reduced-motion`.
