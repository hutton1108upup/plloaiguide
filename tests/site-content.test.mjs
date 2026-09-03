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
  assert.equal(content.SITE.affiliateRef, 'YOUR_AFFILIATE_ID');
  assert.equal(
    content.affiliateUrl('/pricing'),
    'https://pollo.ai/pricing?ref=YOUR_AFFILIATE_ID',
  );
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
