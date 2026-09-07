import assert from 'node:assert/strict';
import test from 'node:test';

async function loadContent() {
  try {
    return await import('../lib/site-content.ts');
  } catch {
    return null;
  }
}

test('exports the PRD site identity and affiliate URL contract', async () => {
  const content = await loadContent();

  assert.ok(content, 'site content module should exist');
  assert.equal(content.SITE.domain, 'https://plloai.pro');
  assert.equal(content.SITE.officialDomain, 'https://pollo.ai');
  assert.equal(content.SITE.affiliateRef, 'nguyodg');
  assert.equal(
    content.affiliateUrl('/pricing'),
    'https://pollo.ai/pricing?ref=nguyodg',
  );
});

test('affiliate links preserve destinations and replace existing referral parameters', async () => {
  const { affiliateUrl, models } = await loadContent();
  const paths = ['', 'ai-video', '/ai-image-generator', '/text-to-video', '/m',
    ...models.flatMap((model) => model.listed.map((item) => item.path))];
  for (const path of paths) {
    const url = new URL(affiliateUrl(path));
    assert.equal(url.origin, 'https://pollo.ai');
    assert.equal(url.pathname, path ? `/${path.replace(/^\//, '')}` : '/');
    assert.deepEqual(url.searchParams.getAll('ref'), ['nguyodg']);
  }
  const url = new URL(affiliateUrl('/ai-video?mode=text&ref=old&ref=duplicate#examples'));
  assert.equal(url.searchParams.get('mode'), 'text');
  assert.deepEqual(url.searchParams.getAll('ref'), ['nguyodg']);
  assert.equal(url.hash, '#examples');
});

test('exports every PRD collection', async () => {
  const content = await loadContent();

  assert.ok(content, 'site content module should exist');
  assert.equal(content.features.length, 4);
  assert.equal(content.models.length, 15);
  assert.equal(content.steps.length, 3);
  assert.equal(content.faqs.length, 5);
  assert.equal(content.faqs.at(-1).question, 'What is the official Pollo AI website?');
  assert.equal(content.SITE.ogImagePath, '/og-cover.svg');
  assert.deepEqual(content.models.at(0).modelNames, ['Pollo 2.5']);
  assert.ok(content.models.every((entry) => entry.modelNames.length >= 1));
});
