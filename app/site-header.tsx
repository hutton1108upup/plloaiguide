'use client';

import { useEffect, useRef, useState } from 'react';
import { affiliateUrl } from '@/lib/site-content';

const affiliateRel = 'sponsored noopener noreferrer';

const navigation = [
  { href: '#models', id: 'models', label: 'Models' },
  { href: '#how-to', id: 'how-to', label: 'How it works' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
] as const;

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </svg>
    </span>
  );
}

function NavigationLinks({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate?: (id: string) => void;
}) {
  return navigation.map((item) => (
    <a
      aria-current={activeId === item.id ? 'location' : undefined}
      href={item.href}
      key={item.id}
      onClick={() => onNavigate?.(item.id)}
    >
      {item.label}
    </a>
  ));
}

export function SiteHeader() {
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -62% 0px', threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileNavRef.current?.open) {
        mobileNavRef.current.open = false;
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const setCurrentSection = (id: string) => setActiveId(id);

  const closeMenu = () => {
    if (mobileNavRef.current) mobileNavRef.current.open = false;
    setMenuOpen(false);
  };

  const closeMobileNav = (id: string) => {
    setActiveId(id);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Pollo.ai Guide home">
          <BrandMark />
          <span>
            <strong>Pollo.ai</strong> Guide
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavigationLinks activeId={activeId} onNavigate={setCurrentSection} />
          <a
            className="nav-cta"
            href={affiliateUrl()}
            target="_blank"
            rel={affiliateRel}
          >
            Visit Pollo.ai
            <span aria-hidden="true">↗</span>
            <span className="sr-only">opens in a new tab</span>
          </a>
        </nav>

        {menuOpen && (
          <button
            className="mobile-nav-scrim"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
        )}

        <details
          className="mobile-nav"
          ref={mobileNavRef}
          onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        >
          <summary
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </summary>
          <div className="mobile-nav-panel">
            <nav aria-label="Mobile navigation">
              <NavigationLinks
                activeId={activeId}
                onNavigate={closeMobileNav}
              />
              <a
                href={affiliateUrl()}
                target="_blank"
                rel={affiliateRel}
                onClick={() => closeMobileNav(activeId)}
              >
                Visit Pollo.ai
                <span aria-hidden="true">↗</span>
                <span className="sr-only">opens in a new tab</span>
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
