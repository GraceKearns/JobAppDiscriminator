# 🎨 Design System

## 📌 Overview
This design system is built on a neutral, warm, and grounded palette combining greys, silvers, and earthy browns. It is ideal for modern SaaS, dashboards, or professional applications with a calm, premium feel.

---

## 🎨 Color Palette

### 🩶 Dim Grey (Primary Neutral)
| Token | Hex |
|------|-----|
| dim-grey-50  | #f3f3f1 |
| dim-grey-100 | #e8e6e3 |
| dim-grey-200 | #d1cdc7 |
| dim-grey-300 | #b9b4ac |
| dim-grey-400 | #a29b90 |
| dim-grey-500 | #8b8274 |
| dim-grey-600 | #6f685d |
| dim-grey-700 | #534e46 |
| dim-grey-800 | #38342e |
| dim-grey-900 | #1c1a17 |
| dim-grey-950 | #131210 |

---

### 🪙 Silver (Secondary Neutral)
| Token | Hex |
|------|-----|
| silver-50  | #f4f2f1 |
| silver-100 | #e8e5e3 |
| silver-200 | #d2cbc6 |
| silver-300 | #bbb1aa |
| silver-400 | #a4978e |
| silver-500 | #8e7d71 |
| silver-600 | #71645b |
| silver-700 | #554b44 |
| silver-800 | #39322d |
| silver-900 | #1c1917 |
| silver-950 | #141110 |

---

### 🍫 Toffee Brown (Primary Accent)
| Token | Hex |
|------|-----|
| toffee-brown-50  | #f6f2ef |
| toffee-brown-100 | #ece5df |
| toffee-brown-200 | #d9cbbf |
| toffee-brown-300 | #c6b19f |
| toffee-brown-400 | #b4967e |
| toffee-brown-500 | #a17c5e |
| toffee-brown-600 | #81634b |
| toffee-brown-700 | #604b39 |
| toffee-brown-800 | #403226 |
| toffee-brown-900 | #201913 |
| toffee-brown-950 | #16110d |

---

### 🐪 Camel (Warm Highlight)
| Token | Hex |
|------|-----|
| camel-50  | #f8f2ed |
| camel-100 | #f0e6db |
| camel-200 | #e1ccb7 |
| camel-300 | #d3b392 |
| camel-400 | #c4996e |
| camel-500 | #b5804a |
| camel-600 | #91663b |
| camel-700 | #6d4d2c |
| camel-800 | #48331e |
| camel-900 | #241a0f |
| camel-950 | #19120a |

---

### 🖤 Graphite (Dark Neutral)
| Token | Hex |
|------|-----|
| graphite-50  | #f3f2f2 |
| graphite-100 | #e7e4e5 |
| graphite-200 | #cecacb |
| graphite-300 | #b6afb1 |
| graphite-400 | #9d9597 |
| graphite-500 | #857a7c |
| graphite-600 | #6a6264 |
| graphite-700 | #50494b |
| graphite-800 | #353132 |
| graphite-900 | #1b1819 |
| graphite-950 | #131111 |

---

## 🧱 Semantic Color Usage

### Backgrounds
- Primary Background: `dim-grey-50`
- Secondary Background: `silver-50`
- Dark Background: `graphite-900`

### Text
- Primary Text: `graphite-900`
- Secondary Text: `dim-grey-600`
- Inverse Text: `#ffffff`

### Borders
- Light Border: `dim-grey-200`
- Default Border: `dim-grey-300`
- Strong Border: `dim-grey-500`

---

## 🎯 Accent & Brand Usage

### Primary Accent
- `toffee-brown-500` (main brand color)
- Hover: `toffee-brown-600`
- Active: `toffee-brown-700`

### Secondary Accent
- `camel-500`
- Hover: `camel-600`

---

## 🔘 Component Styling

### Buttons

**Primary Button**
- Background: `toffee-brown-500`
- Text: `#ffffff`
- Hover: `toffee-brown-600`

**Secondary Button**
- Background: `camel-500`
- Text: `#ffffff`

**Ghost Button**
- Background: transparent
- Text: `graphite-900`
- Border: `dim-grey-300`

---

### Inputs
- Background: `#ffffff`
- Border: `dim-grey-300`
- Focus Border: `toffee-brown-500`
- Placeholder: `dim-grey-400`

---

### Cards
- Background: `#ffffff`
- Border: `dim-grey-200`
- Shadow: subtle (use graphite tones at low opacity)

---

## 🌗 Dark Mode

### Backgrounds
- Primary: `graphite-950`
- Secondary: `graphite-900`

### Text
- Primary: `graphite-50`
- Secondary: `graphite-300`

### Accent Adjustments
- Primary Accent: `toffee-brown-400`
- Secondary Accent: `camel-400`

---

## 📏 Spacing & Radius

- Border Radius:
  - Small: `6px`
  - Medium: `10px`
  - Large: `16px`

- Spacing Scale:
  - xs: `4px`
  - sm: `8px`
  - md: `16px`
  - lg: `24px`
  - xl: `32px`

---

## 🧠 Design Principles

- **Calm & Professional** → rely on greys and muted tones
- **Warmth Through Accent** → use browns sparingly for emphasis
- **High Readability** → strong contrast with graphite
- **Minimal & Structured** → avoid overusing accent colors

---

## ✅ Example Usage

```css
:root {
  --color-bg: #f3f3f1;
  --color-text: #1b1819;
  --color-primary: #a17c5e;
  --color-primary-hover: #81634b;
}