# Emigisha brand guide

Chosen on 14 Nov 2026: direction C, "The Name", in the Band layout. The reference mockup is `docs/proposals/brand/04-name-band.html`.

Emigisha has its own identity. Amber `#FFAA2B` and Manrope belong to chrisbalola.com and Meneja and are not used here.

## Positioning and voice

- The line: "Emigisha means blessings."
- The name is the standard for the work: a product should leave the person using it better off.
- First person plural, plain and warm. Short sentences. No adjectives that sell.

## Colour

Tokens live in `src/app/globals.css`.

| Token                | Light     | Dark      | Use                                        |
| -------------------- | --------- | --------- | ------------------------------------------ |
| `--leaf`             | `#17502F` | `#0F3A22` | The green band                             |
| `--leaf-mark`        | `#2C6E45` | `#1F5A37` | Unlit diamonds and the rule on the band    |
| `--on-leaf`          | `#F3F7EE` | `#F3F7EE` | Text on the band                           |
| `--accent` (sun)     | `#F2C230` | `#F2C230` | Lit diamonds, link underlines, focus rings |
| `--background`       | `#EFF4E9` | `#0C1A12` | Page                                       |
| `--foreground`       | `#12251A` | `#E9F1E5` | Text                                       |
| `--muted-foreground` | `#55695B` | `#9CB0A1` | Secondary text                             |
| `--border`           | `#CAD6C4` | `#24382B` | Hairlines                                  |

Yellow is for marks only: a lit diamond, an underline, a focus ring. Never for text on the pale page; the contrast is too low.

## Type

- Display: Syne, weights 600 and 700. Wordmark, headline, product names. Tight tracking on the headline (`-0.035em`).
- Text: Albert Sans, weights 400 to 600. Base size `1.0625rem`, line height `1.6`.

Both are loaded with `next/font` in `src/app/layout.tsx`.

## The diamond

A square rotated 45 degrees. It is the only graphic device.

- In the hero, a row of 28 diamonds is the product tally: one turns yellow for each product shipped.
- In the product list, a filled yellow diamond means live and an outlined one means building.
- The site icon is a yellow diamond on a green rounded square.

## Layout

- A green band on top holds the wordmark, the nav, the headline and the tally.
- Below it, on the pale page, two columns: the story on the left, the product rows on the right. One column under `52rem`.
- No load animation. Hover and focus states only.
