# LeBonResto — Landing Assets

This folder holds every visual the marketing site (`lebonresto-marketing`) loads at runtime. Generate the assets via the prompts in [`/docs/higgsfield-visual-prompts.md`](../../../../docs/higgsfield-visual-prompts.md) and drop the produced files here under the exact filenames listed below. Components show a brand teal -> cream gradient placeholder (with the `LeBonResto` watermark at low opacity) when assets are missing, so the site builds and renders correctly even before any image lands.

## Folder layout

```
public/assets/landing/
  cities/                # 7 city tiles consumed by /notre-solution + /a-propos
  team/                  # 4 leadership headshots consumed by /a-propos
  hero-*.jpg             # page hero backgrounds
  feature-*.jpg          # restaurant feature cards (/restaurateurs)
  video-poster.jpg       # poster for the autoplay hero video on /notre-solution
  pizza-decor.png        # transparent PNG used by the slow-spin pizza decor
```

## Expected files

The table below lists every asset path the components currently reference. The "Higgsfield prompt key" column points to the section in [`/docs/higgsfield-visual-prompts.md`](../../../../docs/higgsfield-visual-prompts.md) that produces it.

| Asset | Page | Higgsfield prompt key |
|-------|------|------------------------|
| `hero-solution.jpg` | `/notre-solution` | 1. Hero - Notre Solution |
| `hero-about.jpg` | `/a-propos` | 2. About - Cinematic Collage |
| `hero-investor.jpg` | `/investisseurs` | 3. Investor - Dashboard on Glass |
| `hero-restaurateurs.jpg` | `/restaurateurs` | 4. Restaurateur - Onboarding in Service |
| `video-poster.jpg` | `/notre-solution` | 10. Promo Video Concept (first-frame poster) |
| `feature-restaurant.jpg` | `/restaurateurs` | 4. Restaurateur - Onboarding in Service (crop) |
| `feature-reservation.jpg` | `/restaurateurs` | 4. Restaurateur - Onboarding in Service (tablet UI crop) |
| `feature-offers.jpg` | `/restaurateurs` | 5B. Plated Dish Top-Down (offer-of-the-evening framing) |
| `feature-menu.jpg` | `/restaurateurs` | 5B. Plated Dish Top-Down (menu close-up) |
| `feature-reviews.jpg` | `/restaurateurs` | 5C. Sommelier Hand (review / star moment) |
| `feature-map.jpg` | `/restaurateurs` | 8. Moroccan City Tiles (map context) |
| `feature-360.jpg` | `/restaurateurs` | 9. 360 Promo Visual |
| `pizza-decor.png` | `/notre-solution` (decor) | 6. Pizza Rotation Source (transparent PNG) |
| `cities/casablanca.jpg` | `/notre-solution`, `/a-propos` | 8A. Casablanca |
| `cities/rabat.jpg` | `/notre-solution`, `/a-propos` | 8B. Rabat |
| `cities/marrakech.jpg` | `/notre-solution`, `/a-propos` | 8C. Marrakech |
| `cities/tanger.jpg` | `/notre-solution`, `/a-propos` | 8D. Tanger |
| `cities/fes.jpg` | `/notre-solution`, `/a-propos` | 8E. Fes |
| `cities/agadir.jpg` | `/notre-solution`, `/a-propos` | 8F. Agadir |
| `cities/al-hoceima.jpg` | `/notre-solution`, `/a-propos` | 8. Moroccan City Tiles (Al Hoceima variant - blue-hour bay view) |
| `team/founder.jpg` | `/a-propos` | 2. About - Cinematic Collage (founder portrait crop) |
| `team/cofounder.jpg` | `/a-propos` | 2. About - Cinematic Collage (co-founder portrait crop) |
| `team/head-of-growth.jpg` | `/a-propos` | 2. About - Cinematic Collage (head of growth portrait crop) |
| `team/head-of-partnerships.jpg` | `/a-propos` | 2. About - Cinematic Collage (head of partnerships portrait crop) |

## Workflow

1. Open `/docs/higgsfield-visual-prompts.md` and run each prompt through Higgsfield (or any premium image gen of equivalent quality).
2. Crop / rename the output to match the filename column above exactly.
3. Drop the file in this folder (or the `cities/` / `team/` subfolder).
4. Reload the dev server (`npm run dev` from `lebonresto-marketing/`). The placeholder is replaced automatically; no code change required.

## Placeholder behavior

When a path above is missing, components render a `bg-brand-gradient bg-cream-gradient` block (teal -> cream diagonal with a faint `LeBonResto` Poppins watermark and a `ring-1 ring-primary/20` inset). This keeps spacing, shadow, and rounded-corner geometry identical to the final art so layout never shifts when you ship real assets.
