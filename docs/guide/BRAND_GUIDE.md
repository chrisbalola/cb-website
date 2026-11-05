# Chris Balola — Brand Guide

---

## Logo

The site uses a text-based wordmark: **Chris Balola** displayed in the brand accent color. No image logo is currently used.

---

## Brand Color

The brand's signature color is a **warm amber/orange**:

| Format            | Value                  |
| ----------------- | ---------------------- |
| Hex               | `#FFAA2B`              |
| OKLCH (CSS token) | `oklch(0.82 0.165 75)` |
| RGB               | `rgb(255, 170, 43)`    |

This color is used as the **`--accent`** CSS variable throughout the site. It appears in the wordmark, accent highlights, and branded elements.

The accent stays **identical in both light and dark modes**, ensuring consistent brand recognition regardless of theme.

---

## Color Palette

### Light Mode

| Token                | OKLCH                       | Approximate Hex | Role                  |
| -------------------- | --------------------------- | --------------- | --------------------- |
| `--background`       | `oklch(1 0 0)`              | `#FFFFFF`       | Page background       |
| `--foreground`       | `oklch(0.145 0 0)`          | `#1A1A1A`       | Primary text          |
| `--card`             | `oklch(1 0 0)`              | `#FFFFFF`       | Card surfaces         |
| `--primary`          | `oklch(0.205 0 0)`          | `#2B2B2B`       | Buttons, strong text  |
| `--secondary`        | `oklch(0.97 0 0)`           | `#F5F5F5`       | Subtle backgrounds    |
| `--muted-foreground` | `oklch(0.556 0 0)`          | `#8D8D8D`       | Secondary/helper text |
| **`--accent`**       | **`oklch(0.82 0.165 75)`**  | **`#FFAA2B`**   | **Brand accent**      |
| `--destructive`      | `oklch(0.577 0.245 27.325)` | `#DC2626`       | Error/delete actions  |
| `--border`           | `oklch(0.922 0 0)`          | `#E5E5E5`       | Borders, dividers     |

### Dark Mode

| Token                | OKLCH                      | Approximate Hex         | Role                         |
| -------------------- | -------------------------- | ----------------------- | ---------------------------- |
| `--background`       | `oklch(0.145 0 0)`         | `#1A1A1A`               | Page background              |
| `--foreground`       | `oklch(0.985 0 0)`         | `#FAFAFA`               | Primary text                 |
| `--card`             | `oklch(0.205 0 0)`         | `#2B2B2B`               | Card surfaces                |
| `--primary`          | `oklch(0.922 0 0)`         | `#E5E5E5`               | Buttons, strong text         |
| `--secondary`        | `oklch(0.269 0 0)`         | `#3A3A3A`               | Subtle backgrounds           |
| `--muted-foreground` | `oklch(0.708 0 0)`         | `#A0A0A0`               | Secondary/helper text        |
| **`--accent`**       | **`oklch(0.82 0.165 75)`** | **`#FFAA2B`**           | **Brand accent (unchanged)** |
| `--border`           | `oklch(1 0 0 / 10%)`       | `rgba(255,255,255,0.1)` | Borders, dividers            |

---

## Typography

### Font Family

**Manrope** — a modern geometric sans-serif with a warm, approachable character. Loaded from Google Fonts CDN with variable weights from 200 (ExtraLight) to 800 (ExtraBold).

```
font-family: 'Manrope', sans-serif;
weight range: 200–800 (variable)
```

### Type Scale

Follows Tailwind's default type scale:

| Context           | Typical Class                   | Size            |
| ----------------- | ------------------------------- | --------------- |
| Page title        | `text-2xl font-bold`            | 1.5rem / 24px   |
| Section heading   | `text-lg font-semibold`         | 1.125rem / 18px |
| Card title        | `text-base font-semibold`       | 1rem / 16px     |
| Body text         | `text-sm`                       | 0.875rem / 14px |
| Helper/muted text | `text-xs text-muted-foreground` | 0.75rem / 12px  |

---

## Theme System

- **Three modes:** Light, Dark, System (follows OS preference)
- **Default:** System
- **Persistence:** `localStorage` (key: `chrisbalola-theme`)

---

## Design Personality

| Trait            | Expression                                                    |
| ---------------- | ------------------------------------------------------------- |
| **Warm**         | Amber accent, Manrope's rounded forms, generous border radius |
| **Clean**        | Minimal shadows, monochrome neutrals, clear hierarchy         |
| **Professional** | Structured layouts, consistent spacing, restrained color use  |
| **Approachable** | Soft corners, friendly typography, no harsh contrasts         |

The overall aesthetic is **warm minimalism** — professional yet approachable.

---

## Brand Summary

| Attribute       | Value                                        |
| --------------- | -------------------------------------------- |
| **Name**        | Chris Balola                                 |
| **Site**        | chrisbalola.com                              |
| **Brand Color** | `#FFAA2B` — warm amber/orange                |
| **Font**        | Manrope (Google Fonts, 200–800 variable)     |
| **Radius**      | 10px base — soft, rounded                    |
| **Dark Mode**   | Full support, accent unchanged across themes |
| **Personality** | Warm, clean, professional, approachable      |
