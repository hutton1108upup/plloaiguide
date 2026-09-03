import Link from 'next/link';
import { SITE, affiliateUrl, faqs, features, models, steps } from '@/lib/site-content';

const affiliateRel = 'sponsored noopener noreferrer';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use Pllo AI (Pollo.ai)',
  description: "Getting started is easier than you think. You don't need any video editing skills.",
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
};

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" />
      <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </svg>
  );
}

function AffiliateButton({ children, path = '', variant = 'primary' }: {
  children: React.ReactNode;
  path?: string;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <a className={`cta-button cta-button--${variant}`} href={affiliateUrl(path)} target="_blank" rel={affiliateRel}>
      <span>{children}</span><ArrowIcon />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Pollo.ai Guide home">
            <span className="brand-mark"><SparkIcon /></span>
            <span><strong>Pollo.ai</strong> Guide</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="search-pill reveal reveal--one">
              <span aria-hidden="true">🔍</span>
              Did you mean Pollo.ai? <em>Often misspelled as Pllo AI</em>
            </div>
            <p className="hero-kicker reveal reveal--two">One studio. Multiple AI video models.</p>
            <h1 className="reveal reveal--two">The Ultimate AI Video Generator</h1>
            <p className="hero-copy reveal reveal--three">You are looking for Pollo AI. Turn your text and images into cinematic videos in seconds. The #1 rated generative video platform.</p>
            <div className="hero-actions reveal reveal--four">
              <AffiliateButton>Try Pollo.ai for Free</AffiliateButton>
              <span className="cta-note">No credit card required for free trial.</span>
            </div>
            <div className="hero-proof reveal reveal--four" aria-label="Pollo AI capabilities">
              <span><i />Text to video</span><span><i />Image to video</span><span><i />Multi-model access</span>
            </div>
          </div>
        </section>

        <section className="section section--intro">
          <div className="shell intro-grid">
            <div className="section-heading section-heading--bar">
              <span className="eyebrow">The correct destination</span>
              <h2>What is Pollo.ai <span>(and why people search “Pllo AI”)</span></h2>
            </div>
            <div className="intro-copy">
              <p>Many creators searching for “polo ai” are actually looking for Pollo.ai. It is a common typo for one of the most powerful AI video generation tools available in 2024.</p>
              <p>Pollo.ai is a multi-model video generation platform that rivals tools like Sora, Kling, and Runway. It is designed for filmmakers, content creators, and marketers who need high-quality video assets without the expense of a traditional production studio.</p>
              <p>Whether you are looking to create commercials, social media content for TikTok/Reels, or cinematic visualizations, Pollo AI provides a browser-based studio that makes it incredibly simple.</p>
            </div>
          </div>
        </section>

        <section className="section section--features" id="features">
          <div className="shell">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">Built for modern creators</span>
              <h2>Everything you need to bring ideas to motion</h2>
              <p>From a single sentence or still image to polished video—all inside your browser.</p>
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article className="feature-card" key={feature.title}>
                  <span className="feature-index">0{index + 1}</span>
                  <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
                  <h3>{feature.title}</h3><p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--models" id="models">
          <div className="shell">
            <div className="models-heading">
              <div className="section-heading"><span className="eyebrow">Choose your engine</span><h2>AI Video Models Available on Pollo AI</h2></div>
              <p>Pollo AI brings multiple video generation models into one browser-based workspace. You can choose a model based on your preferred workflow, output style, and the options currently available in your plan.</p>
            </div>
            <div className="model-table-wrap">
              <table className="model-table">
                <thead><tr><th scope="col">Model family</th><th scope="col">Models currently listed</th><th scope="col">Developer</th></tr></thead>
                <tbody>
                  {models.map((model, index) => (
                    <tr key={model.family}>
                      <td data-label="Model family"><span className="model-number">{String(index + 1).padStart(2, '0')}</span><a href={affiliateUrl(model.listed[0].path)} target="_blank" rel={affiliateRel}>{model.family}<span aria-hidden="true">↗</span></a></td>
                      <td data-label="Models currently listed">
                        <div className="model-link-list">
                          {model.listed.map((item) => <a className="model-chip" href={affiliateUrl(item.path)} key={`${model.family}-${item.name}`} target="_blank" rel={affiliateRel}>{item.name}</a>)}
                        </div>
                      </td>
                      <td data-label="Developer">{model.developer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="source-note">Model availability was checked against Pollo AI&apos;s official model pages in {SITE.modelVerifiedAt}. Versions, plan access, and credit requirements may change.{' '}<a href={affiliateUrl('/m')} target="_blank" rel={affiliateRel}>See the current model list on Pollo.ai.</a></p>
          </div>
        </section>

        <section className="section section--how" id="how-to">
          <div className="shell how-grid">
            <div className="how-intro">
              <span className="eyebrow">Three simple steps</span>
              <h2>How to Use “Pllo AI” <span>(Pollo.ai)</span></h2>
              <p>Getting started is easier than you think. You don&apos;t need any video editing skills.</p>
              <AffiliateButton>Start Creating Now</AffiliateButton>
            </div>
            <ol className="step-list">
              {steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="section section--faq" id="faq">
          <div className="shell faq-shell">
            <div className="section-heading section-heading--center"><span className="eyebrow">Questions, answered</span><h2>Frequently Asked Questions</h2></div>
            <div className="faq-list">
              {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{faq.question}</span><i aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-orb" aria-hidden="true" />
          <div className="shell final-cta-inner"><span className="eyebrow">Your next video starts here</span><h2>Turn your idea into motion.</h2><p>Explore Pollo.ai&apos;s models and start creating from text or images today.</p><AffiliateButton variant="secondary">Try Pollo.ai for Free</AffiliateButton></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div><a className="brand brand--footer" href="#top"><span className="brand-mark"><SparkIcon /></span><span><strong>Pollo.ai</strong> Guide</span></a><p>This is an independent affiliate website. We may earn a commission when you sign up through our links. We are not the official Pollo.ai website.</p></div>
          <div className="footer-links"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link><a href="#features">Features</a><a href="#faq">FAQ</a></div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span><span>Pollo.ai is a trademark of its respective owner.</span></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}
