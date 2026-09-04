import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageSource = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const styleSource = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
const headerSource = await readFile(new URL('../app/site-header.tsx', import.meta.url), 'utf8');

test('renders every PRD landing-page section', () => {
  for (const id of ['features', 'models', 'how-to', 'faq']) {
    assert.match(pageSource, new RegExp(`id=["']${id}["']`));
  }

  for (const heading of [
    'The Ultimate AI Video Generator',
    'What is Pollo.ai',
    'Featured AI Video Models on Pollo AI',
    'How to Use',
    'Frequently Asked Questions',
  ]) {
    assert.match(pageSource, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('keeps the optimized header navigation and page CTA density', () => {
  assert.match(pageSource, /<SiteHeader\s*\/>/);
  assert.match(headerSource, /href: '#models'/);
  assert.match(headerSource, /href: '#how-to'/);
  assert.match(headerSource, /href: '#faq'/);
  assert.equal((pageSource.match(/<AffiliateButton/g) ?? []).length, 3);
  assert.match(styleSource, /\.mobile-nav/);
});

test('includes affiliate semantics and the required structured data', () => {
  assert.match(pageSource, /sponsored noopener noreferrer/);
  assert.match(pageSource, /independent affiliate website/i);
  assert.match(pageSource, /FAQPage/);
  assert.match(pageSource, /HowTo/);
  assert.match(pageSource, /application\/ld\+json/);
  assert.match(pageSource, /className="model-link-list"/);
});
