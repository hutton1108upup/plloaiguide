import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

test('provides complete desktop and mobile navigation with active-section semantics', async () => {
  const [page, header] = await Promise.all([
    read('../app/page.tsx'),
    read('../app/site-header.tsx'),
  ]);

  assert.match(page, /<SiteHeader\s*\/>/);
  for (const href of ['#models', '#how-to', '#faq']) {
    assert.match(header, new RegExp(`href: ['"]${href}['"]`));
  }
  assert.match(header, /aria-current/);
  assert.match(header, /onNavigate\?\.\(item\.id\)/);
  assert.match(header, /setActiveId\(id\)/);
  assert.match(header, /mobile-nav/);
  assert.match(header, /Visit Pollo\.ai/);
});

test('reduces catalogue density while keeping the complete model list available', async () => {
  const page = await read('../app/page.tsx');

  assert.match(page, /const featuredModels = models\.slice\(0, 6\)/);
  assert.match(page, /const remainingModels = models\.slice\(6\)/);
  assert.match(page, /className="model-catalog"/);
  assert.match(page, /View all \{models\.length\} models/);
  assert.match(page, /Featured AI Video Models on Pollo AI/);
  assert.match(page, /Compare Current Models/);
});

test('uses current, qualified conversion copy and contextual calls to action', async () => {
  const [page, content] = await Promise.all([
    read('../app/page.tsx'),
    read('../lib/site-content.ts'),
  ]);

  assert.doesNotMatch(page, /No credit card required/i);
  assert.doesNotMatch(content, /available in 2024/i);
  assert.match(page, /Free credits available for new users/i);
  assert.match(page, /Open Pollo\.ai/);
  assert.match(page, /Try Text-to-Video/);
  assert.match(page, /Start with Free Credits/);
});

test('uses a consistent vector icon system and announces new-tab behavior', async () => {
  const [page, content] = await Promise.all([
    read('../app/page.tsx'),
    read('../lib/site-content.ts'),
  ]);

  assert.match(page, /function FeatureIcon/);
  assert.match(page, /function SparkIcon/);
  assert.match(page, /className="sr-only">opens in a new tab/);
  assert.doesNotMatch(page, /brand-mark--footer[^>]*>PL</);
  assert.doesNotMatch(content, /🎬|🖼️|⚡|🎨/u);
  assert.match(content, /icon: 'text-to-video'/);
});

test('enforces touch targets and avoids hover affordance on static cards', async () => {
  const css = await read('../app/globals.css');

  assert.match(css, /--tap-target:\s*2\.75rem/);
  assert.match(css, /\.brand\s*\{[^}]*?min-height:\s*var\(--tap-target\)/);
  assert.match(
    css,
    /\.model-chip\s*\{[\s\S]*?min-height:\s*var\(--tap-target\)/,
  );
  assert.match(
    css,
    /\.model-family-link\s*\{[^}]*?min-width:\s*var\(--tap-target\)/,
  );
  assert.match(
    css,
    /\.source-note a\s*\{[^}]*?min-height:\s*var\(--tap-target\)/,
  );
  assert.match(
    css,
    /\.footer-links a\s*\{[\s\S]*?min-height:\s*var\(--tap-target\)/,
  );
  assert.doesNotMatch(css, /\.feature-card:hover\s*\{[^}]*transform:/);
});

test('gives legal routes unique noindex metadata and removes them from the sitemap', async () => {
  const [privacy, terms, sitemap] = await Promise.all([
    read('../app/privacy/page.tsx'),
    read('../app/terms/page.tsx'),
    read('../public/sitemap.xml'),
  ]);

  for (const [source, canonical] of [
    [privacy, '/privacy'],
    [terms, '/terms'],
  ]) {
    assert.match(source, /export const metadata/);
    assert.match(
      source,
      /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/,
    );
    assert.match(source, new RegExp(`canonical: ['"]${canonical}['"]`));
  }
  assert.doesNotMatch(sitemap, /\/privacy|\/terms/);
});

test('publishes sourced Pollo AI evidence media in the workflow section', async () => {
  const page = await read('../app/page.tsx');
  const mediaFiles = [
    '../public/media/pollo-avatar-input.jpg',
    '../public/media/pollo-video-model-frame.png',
    '../public/media/pollo-avatar-output.jpg',
  ];

  for (const relativePath of mediaFiles) {
    const fileUrl = new URL(relativePath, import.meta.url);
    const fileStat = await stat(fileUrl);
    assert.ok(
      fileStat.size > 10_000,
      `${relativePath} should contain real media`,
    );
  }

  assert.match(page, /className="evidence-strip"/);
  assert.match(page, /Official Pollo\.ai sample imagery/);
});

test('keeps the redesign focused on navigation and removes unsupported hero claims', async () => {
  const page = await read('../app/page.tsx');

  assert.doesNotMatch(page, /#1 rated generative video platform/i);
  assert.match(page, /className="shell hero-inner"/);
  assert.doesNotMatch(page, /className="hero-visual[^"]*"/);
  assert.doesNotMatch(page, /className="text-link"/);
  assert.match(page, /className="evidence-strip"/);
  assert.doesNotMatch(page, /<input|<textarea|Upload your image|Generate now/i);
});

test('gives the mobile navigation an explicit close state and escape route', async () => {
  const header = await read('../app/site-header.tsx');

  assert.match(header, /menuOpen\s*\?\s*'Close navigation menu'/);
  assert.match(header, /event\.key === 'Escape'/);
  assert.match(header, /className="mobile-nav-scrim"/);
});
