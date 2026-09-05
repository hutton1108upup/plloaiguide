"""Export the approved generated P mark. Requires Pillow."""
import base64
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(sys.argv[1]).convert('RGBA')
# Crop the large presentation margins around the saturated P, keeping its glow.
pixels = source.load()
points = [(x, y) for y in range(source.height) for x in range(source.width)
          if pixels[x, y][3] > 200 and max(pixels[x, y][:3]) > 160
          and max(pixels[x, y][:3]) - min(pixels[x, y][:3]) > 80]
left, top = min(x for x, y in points), min(y for x, y in points)
right, bottom = max(x for x, y in points) + 1, max(y for x, y in points) + 1
side = round(max(right-left, bottom-top) / 0.78)
cx, cy = (left+right)/2, (top+bottom)/2
crop = source.crop((round(cx-side/2), round(cy-side/2), round(cx+side/2), round(cy+side/2)))
master = Image.new('RGBA', crop.size, '#142130')
master.alpha_composite(crop)
master = master.convert('RGB')
public = root / 'public'
icons = public / 'icons'
icons.mkdir(parents=True, exist_ok=True)
for size in (16, 32, 48, 64, 128, 180, 192, 256, 512, 1024):
    master.resize((size, size), Image.Resampling.LANCZOS).save(icons / f'p-icon-{size}.png', optimize=True)
master.resize((512, 512), Image.Resampling.LANCZOS).save(icons / 'p-icon-512.webp', quality=95)
master.resize((256, 256), Image.Resampling.LANCZOS).save(public / 'favicon.ico', sizes=[(s, s) for s in (16, 32, 48, 64, 128, 256)])
(public / 'apple-touch-icon.png').write_bytes((icons / 'p-icon-180.png').read_bytes())
# SVG wrapper preserves the approved raster artwork; this is not a vector tracing.
encoded = base64.b64encode((icons / 'p-icon-256.png').read_bytes()).decode()
(public / 'favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><image width="256" height="256" href="data:image/png;base64,{encoded}"/></svg>\n', encoding='utf-8')
print('Exported PNG, WebP, ICO, Apple touch icon and raster-backed SVG.')
