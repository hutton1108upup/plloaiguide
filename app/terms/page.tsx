import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | PlloAI Guide',
  description: 'Terms for using the independent PlloAI Guide website.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-card">
        <Link className="legal-back" href="/">← Back to PlloAI Guide</Link>
        <p className="eyebrow">Legal</p>
        <h1>Terms of Use</h1>
        <p className="legal-updated">Last updated: September 4, 2026</p>
        <section>
          <h2>Independent guide</h2>
          <p>PlloAI Guide is an independent informational and affiliate website. We are not Pollo.ai, and we are not owned, operated, or endorsed by Pollo.ai.</p>
        </section>
        <section>
          <h2>Affiliate disclosure</h2>
          <p>We may earn a commission when you register or purchase through links on this website. This does not change the price you pay.</p>
        </section>
        <section>
          <h2>Information accuracy</h2>
          <p>AI models, features, plans, prices, credit requirements, and usage rights can change. Check Pollo.ai for current information before making a purchase or commercial-use decision.</p>
        </section>
        <section>
          <h2>Third-party services</h2>
          <p>Your use of Pollo.ai and other linked services is governed by their own terms and policies. We do not control their availability, outputs, billing, or support.</p>
        </section>
      </div>
    </main>
  );
}
