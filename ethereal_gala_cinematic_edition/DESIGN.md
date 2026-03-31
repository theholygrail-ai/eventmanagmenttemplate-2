# Design System Specification: High-End Editorial & Cinematic Immersion

## 1. Overview & Creative North Star
**The Creative North Star: "The Curated Gallery"**
This design system rejects the "template-ready" look of modern SaaS in favor of a high-end editorial experience. It is designed to feel like a digital gala—spacious, intentional, and quietly confident. 

We break the standard grid through **Intentional Asymmetry**. Elements should never feel "boxed in." Instead of rigid containers, we use tonal depth and cinematic motion to guide the eye. Every interaction is a performance; every page load is a choreographed reveal. This is not a utility; it is an atmosphere.

---

## 2. Colors & Surface Logic
The palette is a sophisticated arrangement of neutrals—bone, stone, and champagne—anchored by deep charcoal (`on-background`) for moments of high-contrast authority.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries are created through:
- **Tonal Shifts:** Placing a `surface-container-low` section against a `surface` background.
- **Negative Space:** Using the larger end of our spacing scale (Scale 16, 20, 24) to create separation.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-translucent materials.
- **Base:** `surface` (#fffbff)
- **Recessed:** `surface-container` (#f7f3ee) for large background sections.
- **Elevated:** `surface-container-lowest` (#ffffff) for primary cards or interactive modules.

### The Glass & Gradient Rule
To achieve the "Cinematic Immersion" tone, floating elements (modals, navigation, dropdowns) must use **Glassmorphism**. 
- **Token:** `surface-variant` at 60% opacity with a `backdrop-filter: blur(20px)`.
- **Gradients:** Use a subtle linear gradient from `primary-fixed` to `primary-container` for hero background overlays to add "soul" to the digital canvas.

---

## 3. Typography
The typographic pairing is designed to mimic a premium printed program.

*   **Display & Headlines (Noto Serif):** These are the "voice" of the brand. They require extreme letter-spacing (tracking) and generous line-height to feel editorial.
    *   *Usage:* `display-lg` for hero statements; `headline-md` for section entries.
*   **Functional Text (Manrope Sans-Serif):** Chosen for its clean, architectural structure. 
    *   *Usage:* `body-md` for descriptions; `label-sm` for metadata. 
    *   *Rule:* Always apply `letter-spacing: 0.05rem` to Manrope to maintain the "high-kerning" premium feel.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen. We move away from the "shadow-heavy" look of Material Design into **Tonal Layering**.

*   **The Layering Principle:** Use the `surface-container` tiers to "nest" importance. A `surface-container-highest` element sitting on a `surface-dim` background creates a natural focal point without a single drop shadow.
*   **Ambient Shadows:** If a floating element (like a CTA button or floating nav) requires a shadow, use:
    *   `box-shadow: 0 20px 40px rgba(57, 56, 52, 0.06);` (a 6% tint of our `on-surface` charcoal).
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. High-contrast borders are strictly prohibited.

---

## 5. Components & Interaction States

### Buttons (The Kinetic Signature)
*   **Primary:** `primary` background, `on-primary` text. Square corners (`0px` radius).
    *   *Hover State:* Background slides from `primary` to `secondary` using a CSS clip-path or GSAP transition. Text kerning widens by `0.1rem`.
*   **Tertiary (Editorial Link):** Text-only with a 1px `on-surface` underline. 
    *   *Hover State:* Underline scales from center-out to 100% width.

### Input Fields
*   **Base:** A single bottom border using `outline-variant`. No background color.
*   **Active State:** The label (Manrope, `label-md`) shifts upwards and the bottom border color transitions to `primary`.
*   **Error State:** Border transitions to `error` (#a54731).

### Cards & Staggered Reveals
*   **Architecture:** Cards are borderless. Use `surface-container-low` for the card body.
*   **Staggered Reveal:** Using GSAP, cards must enter the viewport with a `y: 40, opacity: 0` state, easing into place with a `power4.out` curve. Each card in a grid must have a `0.1s` stagger delay.

### The "Curated List"
*   Forbid horizontal dividers. Use Spacing Scale `8` (2.75rem) between items. Use `surface-container-highest` on hover to highlight the row.

---

## 6. Motion & Developer Handover (GSAP/Three.js)

### Layered Depth (Three.js)
For the "Immersion" factor, implement a background "Canvas" layer.
- **The Mesh:** A slow-moving, low-poly noise plane or a "Silk" shader using the `secondary-fixed` (#f1e0c3) and `surface` (#fffbff) colors.
- **Parallax:** Link the mouse position to the mesh rotation to create a "glass-tank" effect where the UI feels like it’s floating over a physical environment.

### Motion Cadence (GSAP)
- **The "High-End" Ease:** Avoid `elastic` or `bounce` effects. Use `expo.out` or `power4.out` for all entries.
- **Micro-interactions:** When a user hovers over an image, use a slight scale-up (`scale: 1.05`) coupled with a subtle desaturation to focus the eye.
- **Page Transitions:** Utilize a "Curtain Reveal" using a `surface-dim` overlay that slides vertically, revealing the new content already staged at `opacity: 1`.

---

## 7. Do's and Don'ts

### Do
- **Do** use whitespace as a functional element. If a section feels crowded, double the padding.
- **Do** align typography to a baseline grid, but allow images to break the container edges.
- **Do** use `0px` border radius everywhere. Sharp edges convey architectural precision.

### Don't
- **Don't** use pure black (#000000). Use our `on-surface` charcoal (#393834).
- **Don't** use standard "Slide In" animations. Use staggered, faded reveals.
- **Don't** add borders to cards. If the card isn't visible, your background color choice is too similar to the base surface. Adjust the `surface-container` tier.