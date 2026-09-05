import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/app/site-header';
import { BrandMark } from '@/app/brand-mark';
import {
  SITE,
  affiliateUrl,
  faqs,
  features,
  models,
  steps,
} from '@/lib/site-content';

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
  description:
    "Getting started is easier than you think. You don't need any video editing skills.",
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

function FeatureIcon({ icon }: { icon: (typeof features)[number]['icon'] }) {
  const paths = {
    'text-to-video': (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),
    'image-to-video': (
      <>
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="m6 16 3.5-4 2.5 2 2-2.5 3 3.5M16 8h5m-2-2 2 2-2 2" />
      </>
    ),
    'fast-generation': <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    'style-consistency': (
      <>
        <rect x="3" y="4" width="13" height="13" rx="2" />
        <rect x="8" y="9" width="13" height="11" rx="2" />
        <path d="m11 14 2-2 5 5" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {paths[icon]}
    </svg>
  );
}

function ExternalLinkHint() {
  return <span className="sr-only">opens in a new tab</span>;
}

function AffiliateButton({
  children,
  path = '',
  variant = 'primary',
}: {
  children: React.ReactNode;
  path?: string;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <a
      className={`cta-button cta-button--${variant}`}
      href={affiliateUrl(path)}
      target="_blank"
      rel={affiliateRel}
    >
      <span>{children}</span>
      <ArrowIcon />
      <ExternalLinkHint />
    </a>
  );
}

const featuredModels = models.slice(0, 6);
const remainingModels = models.slice(6);

function ModelRows({
  items,
  startIndex = 0,
}: {
  items: ReadonlyArray<(typeof models)[number]>;
  startIndex?: number;
}) {
  return items.map((model, index) => (
    <tr key={model.family}>
      <td data-label="Model family">
        <span className="model-number">
          {String(index + startIndex + 1).padStart(2, '0')}
        </span>
        <a
          className="model-family-link"
          href={affiliateUrl(model.listed[0].path)}
          target="_blank"
          rel={affiliateRel}
        >
          {model.family}
          <span aria-hidden="true">↗</span>
          <ExternalLinkHint />
        </a>
      </td>
      <td data-label="Models currently listed">
        <div className="model-link-list">
          {model.listed.map((item) => (
            <a
              className="model-chip"
              href={affiliateUrl(item.path)}
              key={`${model.family}-${item.name}`}
              target="_blank"
              rel={affiliateRel}
            >
              {item.name}
              <ExternalLinkHint />
            </a>
          ))}
        </div>
      </td>
      <td data-label="Developer">{model.developer}</td>
    </tr>
  ));
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="search-pill reveal reveal--one">
              <span>
                <SearchIcon />
              </span>
              Did you mean Pollo.ai? <em>Often misspelled as Pllo AI</em>
            </div>
            <p className="hero-kicker reveal reveal--two">
              One studio. Multiple AI video models.
            </p>
            <h1 className="reveal reveal--two">
              Pollo.ai: AI Video Generator Guide
            </h1>
            <p className="hero-copy reveal reveal--three">
              You are looking for Pollo AI—a browser-based creative studio that
              turns text and images into video with leading AI models in one
              place.
            </p>
            <div className="hero-actions reveal reveal--four">
              <AffiliateButton>Open Pollo.ai</AffiliateButton>
              <span className="cta-note">
                Check current free credits and model access on the official site.
              </span>
            </div>
            <div
              className="hero-proof reveal reveal--four"
              aria-label="Pollo AI capabilities"
            >
              <span>
                <i />
                Text to video
              </span>
              <span>
                <i />
                Image to video
              </span>
              <span>
                <i />
                Multi-model access
              </span>
            </div>
          </div>
        </section>

        <section
          className="workflow-section"
          id="workflow"
          aria-labelledby="workflow-title"
        >
          <div className="shell">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">From idea to moving image</span>
              <h2 id="workflow-title">
                A visual workflow, not another editing timeline.
              </h2>
              <p>
                Pollo AI brings prompts, source imagery, video models, and
                generated results into one browser-based workspace.
              </p>
            </div>
            <div className="evidence-strip">
              <article className="evidence-card evidence-card--prompt">
                <span className="evidence-step">01 / Brief</span>
                <blockquote>
                  “A cinematic portrait with subtle camera movement, warm
                  practical lighting, and a natural expression.”
                </blockquote>
              </article>
              <span className="evidence-arrow" aria-hidden="true">
                →
              </span>
              <article className="evidence-card evidence-card--models">
                <span className="evidence-step">02 / Model</span>
                <Image
                  src="/media/pollo-video-model-frame.png"
                  alt="Official Pollo AI graphic showing supported video model families"
                  width={1055}
                  height={540}
                />
              </article>
              <span className="evidence-arrow" aria-hidden="true">
                →
              </span>
              <article className="evidence-card evidence-card--result">
                <span className="evidence-step">03 / Result</span>
                <Image
                  src="/media/pollo-avatar-input.jpg"
                  alt="Portrait from Pollo AI's official sample gallery"
                  width={960}
                  height={1440}
                />
                <span className="evidence-caption">
                  Official Pollo.ai sample imagery
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--intro">
          <div className="shell">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">The correct destination</span>
              <h2>
                What is Pollo.ai <span>(and why people search “Pllo AI”)</span>
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                Many creators searching for “polo ai” are actually looking for
                Pollo.ai. It is a common typo for a multi-model AI video
                generation workspace.
              </p>
              <p>
                Pollo.ai is a multi-model video generation platform that rivals
                tools like Sora, Kling, and Runway. It is designed for
                filmmakers, content creators, and marketers who need
                high-quality video assets without the expense of a traditional
                production studio.
              </p>
              <p>
                Whether you are looking to create commercials, social media
                content for TikTok/Reels, or cinematic visualizations, Pollo AI
                provides a browser-based studio that makes it incredibly simple.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--features" id="features">
          <div className="shell">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">Built for modern creators</span>
              <h2>Everything you need to bring ideas to motion</h2>
              <p>
                From a single sentence or still image to polished video—all
                inside your browser.
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article
                  className={`feature-card ${index < 2 ? 'feature-card--visual' : 'feature-card--compact'}`}
                  key={feature.title}
                >
                  <span className="feature-index">0{index + 1}</span>
                  <div className="feature-icon">
                    <FeatureIcon icon={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  {index === 0 && (
                    <div className="feature-still">
                      <Image
                        src="/media/pollo-avatar-output.jpg"
                        alt="Official Pollo AI sample portrait illustrating text-led video creation"
                        width={960}
                        height={1440}
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="feature-still">
                      <Image
                        src="/media/pollo-avatar-input.jpg"
                        alt="Official Pollo AI sample portrait illustrating image-led video creation"
                        width={960}
                        height={1440}
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--models" id="models">
          <div className="shell">
            <div className="models-heading">
              <div className="section-heading">
                <span className="eyebrow">Choose your engine</span>
                <h2>Featured AI Video Models on Pollo AI</h2>
              </div>
              <p>
                This curated list highlights widely used model families
                available in Pollo AI. Choose based on your workflow, output
                style, and the options currently available in your plan.
              </p>
            </div>
            <div className="model-table-wrap">
              <table className="model-table">
                <thead>
                  <tr>
                    <th scope="col">Model family</th>
                    <th scope="col">Models currently listed</th>
                    <th scope="col">Developer</th>
                  </tr>
                </thead>
                <tbody>
                  <ModelRows items={featuredModels} />
                </tbody>
              </table>
            </div>
            <details className="model-catalog">
              <summary aria-label={`View all ${models.length} models`}>
                <span>
                  <strong>View all {models.length} models</strong>
                  <small>{remainingModels.length} more model families</small>
                </span>
                <i aria-hidden="true" />
              </summary>
              <div className="model-table-wrap model-table-wrap--expanded">
                <table className="model-table">
                  <thead>
                    <tr>
                      <th scope="col">Model family</th>
                      <th scope="col">Models currently listed</th>
                      <th scope="col">Developer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ModelRows
                      items={remainingModels}
                      startIndex={featuredModels.length}
                    />
                  </tbody>
                </table>
              </div>
            </details>
            <p className="source-note">
              Featured list, not an exhaustive catalogue. Model availability was
              checked against Pollo AI&apos;s official model pages in{' '}
              {SITE.modelVerifiedAt}. Versions, plan access, and credit
              requirements may change.{' '}
              <a href={affiliateUrl('/m')} target="_blank" rel={affiliateRel}>
                Compare Current Models<span aria-hidden="true"> ↗</span>
                <ExternalLinkHint />
              </a>
            </p>
          </div>
        </section>

        <section className="section section--how" id="how-to">
          <div className="shell how-grid">
            <div className="how-intro">
              <span className="eyebrow">Three simple steps</span>
              <h2>
                How to Use “Pllo AI” <span>(Pollo.ai)</span>
              </h2>
              <p>
                Getting started is easier than you think. You don&apos;t need
                any video editing skills.
              </p>
              <AffiliateButton path="/text-to-video">
                Try Text-to-Video
              </AffiliateButton>
            </div>
            <ol className="step-list">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--faq" id="faq">
          <div className="shell faq-shell">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">Questions, answered</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>
                    <span>{faq.question}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-orb" aria-hidden="true" />
          <div className="shell final-cta-inner">
            <span className="eyebrow">Your next video starts here</span>
            <h2>Turn your idea into motion.</h2>
            <p>
              Explore Pollo.ai&apos;s models and start creating from text or
              images today.
            </p>
            <AffiliateButton>Start with Free Credits</AffiliateButton>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <a className="brand brand--footer" href="#top">
              <BrandMark />
              <span>
                <strong>Pollo.ai</strong> Guide
              </span>
            </a>
            <p>
              This is an independent affiliate website. We may earn a commission
              when you sign up through our links. We are not the official
              Pollo.ai website.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <a href="#models">Models</a>
            <a href="#how-to">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>Pollo.ai is a trademark of its respective owner.</span>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
