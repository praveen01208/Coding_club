# Design System Strategy: High-End Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Monochromatic Curator"**

This design system moves away from the utilitarian "web-as-a-tool" approach and toward the "web-as-a-gallery" experience. By utilizing a restricted monochromatic palette and high-contrast typography, we create an environment where human subjects (photography) are the undisputed focal points.

To break the "template" look, this system utilizes **intentional asymmetry** and **tonal layering**. We avoid traditional grid containers in favor of a circular carousel layout that implies a continuous, infinite loop of talent. The "Meet the Crew" section isn't just a list; it’s a curated exhibition. Depth is not achieved through shadows, but through the sophisticated interplay of greyscale values and motion.

## 2. Colors
Our palette is a study in grayscale, designed to remain invisible until the user interacts with the content.

*   **Primary Roles:** `primary` (#000000) and `on_primary` (#e2e2e2). These define our core identity—bold, definitive, and high-contrast.
*   **The "No-Line" Rule:** Boundaries are never defined by 1px solid borders. Use background shifts (e.g., a `surface_container_low` card on a `surface` background) to define edges. This mimics physical materials like thick cardstock rather than digital boxes.
*   **Surface Hierarchy & Nesting:** 
    *   **Level 0 (Base):** `surface` (#f9f9f9) for the global background.
    *   **Level 1 (Sections):** `surface_container_low` (#f3f3f4) for secondary content areas.
    *   **Level 2 (Active Cards):** `surface_container_lowest` (#ffffff) to provide a crisp "lift" for featured content.
*   **Glass & Gradient Rule:** For floating elements or navigation overlays, use a semi-transparent `surface` with a 20px backdrop blur. For primary CTAs, a subtle linear gradient from `primary` (#000000) to `primary_container` (#3b3b3b) adds a tactile, "satin" finish.

## 3. Typography
We use **Manrope** for its technical precision and wide apertures, which maintain legibility even at extreme weights.

*   **Display (The Statement):** `display-lg` (3.5rem) used for section headers. Tracking should be tightened (-0.02em) to create an editorial, "masthead" feel.
*   **Headline (The Narrative):** `headline-md` (1.75rem) for crew names. This weight commands attention without overpowering the portrait.
*   **Body (The Detail):** `body-md` (0.875rem) with increased line-height (1.6) for bios. The extra breathing room ensures a premium reading experience.
*   **Label (The Metadata):** `label-md` (0.75rem) in uppercase with generous letter-spacing (0.1em) for roles (e.g., "DIRECTOR OF PHOTOGRAPHY").

## 4. Elevation & Depth
In this system, depth is "baked-in" through tonal transitions rather than added on via effects.

*   **The Layering Principle:** Instead of shadows, stack containers. A featured crew card in the circular carousel should utilize `surface_container_lowest` (#ffffff) to naturally pop against a background of `surface_dim` (#dadada).
*   **Ambient Shadows:** Where a floating effect is required (e.g., the "Featured" middle card in the carousel), use an ultra-diffused shadow: `rgba(26, 28, 28, 0.06)` with a 40px blur and 10px Y-offset. It should feel like a soft glow, not a dark drop shadow.
*   **The Ghost Border:** If a boundary is required for a CTA, use `outline_variant` (#c6c6c6) at 20% opacity.
*   **Interaction States:** When a crew member's photo transitions from B&W to color, the card's elevation should subtly increase by shifting the background from `surface_container` to `surface_container_lowest`.

## 5. Components

### Crew Carousel Card
*   **State - Idle:** Image is desaturated (B&W) using a CSS `grayscale(100%)` filter. Typography is `on_surface_variant` (#474747).
*   **State - Hover/Featured:** Image transitions to full color over 400ms (Ease-out). The card uses `surface_container_lowest` and an Ambient Shadow.
*   **Geometry:** Use `md` (0.375rem) roundedness for portraits to maintain a modern, architectural edge.

### Navigation Controls (Carousel)
*   **Buttons:** Circular buttons using `full` roundedness. 
    *   **Background:** `surface_container_high` (#e8e8e8).
    *   **Icon:** `on_surface` (#1a1c1c).
    *   **Hover:** Transition to `primary` (#000000) with `on_primary` (#e2e2e2) icon.

### Text Inputs (Contact/Search)
*   **Style:** Minimalist underline using `outline_variant` (#c6c6c6) at 100% opacity. On focus, transition the underline to `primary` (#000000) with a 2px height. Forbid the use of four-sided "box" inputs.

### Chips (Specialties/Tags)
*   **Style:** Use `surface_container_highest` (#e2e2e2) with `label-md` typography. Avoid borders; use vertical whitespace for separation.

## 6. Do's and Don'ts

### Do
*   **Do** use extreme vertical white space (64px+) between the section headline and the carousel.
*   **Do** ensure that when a portrait transitions to color, the `on_surface` text color stays high-contrast against the image background.
*   **Do** utilize the circular carousel path to create a sense of three-dimensional depth, scaling the side cards down to 80% while the center featured card remains 100%.

### Don't
*   **Don't** use 1px solid black borders to separate cards; it breaks the "editorial gallery" aesthetic.
*   **Don't** use standard "Blue" links. All interactive text must be `primary` (#000000) with a `surface_tint` (#5e5e5e) hover state.
*   **Don't** use drop shadows on text. Let the Manrope typeface speak for itself against the clean neutral surfaces.