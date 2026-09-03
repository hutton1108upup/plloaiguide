import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-card">
        <Link className="legal-back" href="/">← Back to PlloAI Guide</Link>
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 4, 2026</p>
        <section>
          <h2>Information we collect</h2>
          <p>This website does not provide user accounts or directly collect payment information. Standard hosting logs may record technical details such as IP address, browser type, requested pages, and timestamps for security and performance purposes.</p>
        </section>
        <section>
          <h2>Affiliate links</h2>
          <p>Links to Pollo.ai may contain an affiliate identifier. When you follow one of these links, Pollo.ai may use cookies or similar technologies to attribute a referral. Pollo.ai processes information under its own privacy policy.</p>
        </section>
        <section>
          <h2>External websites</h2>
          <p>We are not responsible for the privacy practices of external websites. Review their policies before providing personal information.</p>
        </section>
        <section>
          <h2>Changes</h2>
          <p>We may update this policy when the site, its analytics, or applicable requirements change. The date above identifies the current version.</p>
        </section>
      </div>
    </main>
  );
}
