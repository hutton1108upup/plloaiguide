import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageSource = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const styleSource = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

test('renders every PRD landing-page section', () => {
  for (const id of ['features', 'models', 'how-to', 'faq']) {
    assert.match(pageSource, new RegExp(`id=["']${id}["']`));
  }

  for (const heading of [
    'The Ultimate AI Video Generator',
    'What is Pollo.ai',
    'AI Video Models Available on Pollo AI',
    'How to Use',
    'Frequently Asked Questions',
  ]) {
    assert.match(pageSource, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('keeps the PRD header navigation and CTA density', () => {
  const headerNav = pageSource.match(
    /<nav aria-label="Primary navigation">[\s\S]*?<\/nav>/,
  )?.[0];

  assert.ok(headerNav, 'primary navigation should exist');
  assert.match(headerNav, /href="#features"/);
  assert.match(headerNav, /href="#faq"/);
  assert.doesNotMatch(headerNav, /href="#models"/);
  assert.equal((pageSource.match(/<AffiliateButton/g) ?? []).length, 3);
  assert.doesNotMatch(styleSource, /nav a:nth-child\(2\)\s*\{\s*display:\s*none;/);
});

test('includes affiliate semantics and the required structured data', () => {
  assert.match(pageSource, /sponsored noopener noreferrer/);
  assert.match(pageSource, /independent affiliate website/i);
  assert.match(pageSource, /FAQPage/);
  assert.match(pageSource, /HowTo/);
  assert.match(pageSource, /application\/ld\+json/);
  assert.match(pageSource, /className="model-link-list"/);
});
