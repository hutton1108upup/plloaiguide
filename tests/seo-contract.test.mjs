import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

test('sets the PRD title, description, canonical and Open Graph metadata', async () => {
  const [layout, content] = await Promise.all([
    read('../app/layout.tsx'),
    import('../lib/site-content.ts'),
  ]);

  assert.match(content.SITE.title, /Pollo\.ai \(PlloAI\) - Official Access, Features & Review/);
  assert.match(content.SITE.description, /Looking for PlloAI\?/);
  assert.equal(content.SITE.domain, 'https://plloai.pro');
  assert.match(layout, /title: SITE\.title/);
  assert.match(layout, /description: SITE\.description/);
  assert.match(layout, /metadataBase: new URL\(SITE\.domain\)/);
  assert.match(layout, /openGraph/);
  assert.match(layout, /images: \[SITE\.ogImagePath\]/);
  assert.match(layout, /twitter/);
  assert.match(layout, /images: \[SITE\.ogImagePath\]/);
  assert.match(layout, /index: true/);
  assert.match(layout, /follow: true/);
});

test('publishes canonical crawl files and minimal legal routes', async () => {
  const [robots, sitemap, privacy, terms, ogImage] = await Promise.all([
    read('../public/robots.txt'),
    read('../public/sitemap.xml'),
    read('../app/privacy/page.tsx'),
    read('../app/terms/page.tsx'),
    read('../public/og-cover.svg'),
  ]);

  assert.match(robots, /Sitemap: https:\/\/plloai\.pro\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/plloai\.pro\/<\/loc>/);
  assert.match(privacy, /Privacy Policy/);
  assert.match(terms, /Terms of Use/);
  assert.match(ogImage, /PlloAI Guide/);
});
