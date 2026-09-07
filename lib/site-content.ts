export const SITE = {
  name: 'PlloAI Guide',
  domain: 'https://plloai.pro',
  officialDomain: 'https://pollo.ai',
  affiliateRef: 'nguyodg',
  title:
    'Pollo.ai(PlloAI) GuideOfficial Access, Features & Review | PlloAI',
  description:
    'Looking for PlloAI? Explore Pollo.ai video/image features, free-plan limits, and how to get started. Visit the official site through"Pllo AI" guide.',
  modelVerifiedAt: 'August 2026',
  ogImagePath: '/og-cover.svg',
} as const;

export function affiliateUrl(path = '') {
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path;
  const url = new URL(`${SITE.officialDomain}${normalizedPath}`);
  url.searchParams.set('ref', SITE.affiliateRef);
  return url.toString();
}

export const features = [
  {
    icon: 'text-to-video',
    title: 'Text-to-Video',
    description:
      'Type a simple prompt like “A cyberpunk city in rain” and watch Pollo generate a high-definition clip in seconds.',
  },
  {
    icon: 'image-to-video',
    title: 'Image-to-Video',
    description:
      'Upload a static image. Pollo AI understands the depth and context, bringing your photo to life with realistic motion.',
  },
  {
    icon: 'fast-generation',
    title: 'Fast Generation',
    description:
      'Generation time depends on the model, selected settings, and current demand. Check the official workspace for live availability.',
  },
  {
    icon: 'style-consistency',
    title: 'Style Consistency',
    description:
      'Keep your characters and visual style consistent across multiple clips, perfect for storytelling.',
  },
] as const;

export const models = [
  {
    family: 'Pollo',
    developer: 'Pollo AI',
    modelNames: ['Pollo 2.5'],
    listed: [{ name: 'Pollo 2.5', path: '/m/pollo-ai' }],
  },
  {
    family: 'Seedance',
    developer: 'ByteDance',
    modelNames: ['Seedance 2.5', 'Seedance 2.0'],
    listed: [
      { name: 'Seedance 2.5', path: '/m/seedance' },
      { name: 'Seedance 2.0', path: '/m/seedance' },
    ],
  },
  {
    family: 'Veo',
    developer: 'Google',
    modelNames: ['Veo 3', 'Veo 3.1'],
    listed: [
      { name: 'Veo 3', path: '/m/veo' },
      { name: 'Veo 3.1', path: '/m/veo' },
    ],
  },
  {
    family: 'Sora',
    developer: 'OpenAI',
    modelNames: ['Sora 2'],
    listed: [{ name: 'Sora 2', path: '/m/sora' }],
  },
  {
    family: 'Kling AI',
    developer: 'Kuaishou',
    modelNames: ['Kling AI', 'Kling 3.0'],
    listed: [
      { name: 'Kling AI', path: '/m/kling-ai' },
      { name: 'Kling 3.0', path: '/m/kling-ai' },
    ],
  },
  {
    family: 'Hailuo AI',
    developer: 'MiniMax',
    modelNames: ['Hailuo AI', 'MiniMax H3 / Hailuo 3.0'],
    listed: [
      { name: 'Hailuo AI', path: '/m/hailuo-ai' },
      { name: 'MiniMax H3 / Hailuo 3.0', path: '/m/hailuo-ai' },
    ],
  },
  {
    family: 'PixVerse',
    developer: 'PixVerse',
    modelNames: ['PixVerse AI'],
    listed: [{ name: 'PixVerse AI', path: '/m/pixverse-ai' }],
  },
  {
    family: 'Runway',
    developer: 'Runway',
    modelNames: ['Runway video models'],
    listed: [{ name: 'Runway video models', path: '/m/runway' }],
  },
  {
    family: 'Happy Horse',
    developer: 'Happy Horse',
    modelNames: ['Happy Horse', 'Happy Horse 1.1'],
    listed: [
      { name: 'Happy Horse', path: '/m/happy-horse' },
      { name: 'Happy Horse 1.1', path: '/m/happy-horse' },
    ],
  },
  {
    family: 'Vidu',
    developer: 'ShengShu Technology',
    modelNames: ['Vidu AI'],
    listed: [{ name: 'Vidu AI', path: '/m/vidu-ai' }],
  },
  {
    family: 'Luma',
    developer: 'Luma AI',
    modelNames: ['Luma AI / Dream Machine'],
    listed: [{ name: 'Luma AI / Dream Machine', path: '/m/luma-ai' }],
  },
  {
    family: 'Pika',
    developer: 'Pika',
    modelNames: ['Pika AI'],
    listed: [{ name: 'Pika AI', path: '/m/pika-ai' }],
  },
  {
    family: 'Wan',
    developer: 'Alibaba',
    modelNames: ['Wan AI'],
    listed: [{ name: 'Wan AI', path: '/m/wan-ai' }],
  },
  {
    family: 'Hunyuan',
    developer: 'Tencent',
    modelNames: ['Hunyuan Video'],
    listed: [{ name: 'Hunyuan Video', path: '/m/hunyuan-video' }],
  },
  {
    family: 'Grok Imagine',
    developer: 'xAI',
    modelNames: ['Grok Imagine Video'],
    listed: [{ name: 'Grok Imagine Video', path: '/m/grok-imagine' }],
  },
] as const;

export const steps = [
  {
    title: 'Create a Free Account',
    description:
      'Click the button below to visit the official Pollo.ai site. Pollo AI currently lists a Free user tier, and generation uses credits. The available credits and plan limits can change, so confirm the current offer on the official site.',
  },
  {
    title: 'Choose Your Mode',
    description:
      'Decide if you want to start from scratch (Text-to-Video) or animate an existing asset (Image-to-Video). The interface is intuitive and drag-and-drop friendly.',
  },
  {
    title: 'Enter Your Prompt',
    description:
      'Be descriptive! Instead of “a cat”, try “a cinematic shot of a fluffy cat sitting on a windowsill during a golden hour sunset, 4k, highly detailed.”',
  },
] as const;

export const faqs = [
  {
    question: 'Is Polo AI the same as Pollo AI?',
    answer:
      'Yes. “Polo AI” is a common misspelling. The correct name of the platform is Pollo.ai. Other search variations include “PoloAI,” “PolloAI,” “Polio AI,” and “Polla AI.”',
  },
  {
    question: 'Is Pollo.ai free to use?',
    answer:
      'Pollo.ai currently lists a Free user tier. Credit usage depends on factors such as the selected tool or model, video duration, output quantity, and resolution. Check the official pricing page for the latest allowance and limits.',
  },
  {
    question: 'Can I use Pollo AI videos for commercial purposes?',
    answer:
      'Usage rights can depend on your plan, the selected tool or model, and the current Pollo AI terms. Review the official license and terms before using generated content commercially.',
  },
  {
    question: 'What models does Pollo use?',
    answer:
      'Pollo integrates state-of-the-art video diffusion models, optimizing them for coherence, motion fluidity, and resolution.',
  },
  {
    question: 'What is the official Pollo AI website?',
    answer:
      'The official website is pollo.ai. This site is an independent affiliate guide that helps users find and learn about Pollo AI; it is not the official Pollo AI website.',
  },
] as const;
