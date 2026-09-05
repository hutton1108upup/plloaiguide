# P icon assets

Approved concept: variant 2, geometric gradient P with a play-shaped counter.
The exports crop presentation margins, preserve the generated artwork and use a dark navy background for predictable display.

- `public/icons/p-icon-{size}.png`: 16, 32, 48, 64, 128, 180, 192, 256, 512, 1024 pixels.
- `public/icons/p-icon-512.webp`: compressed large avatar.
- `public/favicon.ico`: 16, 32, 48, 64, 128, 256 pixel frames.
- `public/apple-touch-icon.png`: 180 pixels.
- `public/favicon.svg`: SVG container embedding a 256px PNG, not a true vector logo.
- `public/site.webmanifest`: standard 192px and 512px icon declarations; no offline functionality is added.

Header and footer share `app/brand-mark.tsx`. Page metadata provides browser and Apple icon links. Existing indexing, canonical and social-sharing metadata are unchanged.

To regenerate with Pillow installed:

```sh
python scripts/generate-brand-icons.py path/to/02-geometric.png
```
