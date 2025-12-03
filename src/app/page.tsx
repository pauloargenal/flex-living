import Link from 'next/link';
import { Metadata } from 'next';
import {
  AlertCircleIcon,
  ArrowRight,
  ChartBarIcon,
  Check,
  GlobeIcon,
  HouseIcon,
  SearchCheckIcon
} from 'lucide-react';

import { getLocale } from '@/utils/get-locales';
import { BrandLogo } from '@/components/brand-logo';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Flex Living | Reviews Dashboard',
  description:
    'A powerful dashboard for property managers to monitor, analyze, and curate guest feedback across all your Flex Living properties.'
};

interface featuresKeys {
  title: string;
  icon: React.ReactNode;
  description: string;
  bg: string;
}

export default async function IndexPage() {
  const locales = await getLocale();
  const { common, landing, properties } = locales;

  const features: featuresKeys[] = [
    {
      title: landing['features.analytics.title'],
      icon: <ChartBarIcon className="w-5 h-5" />,
      description: landing['features.analytics.description'],
      bg: 'bg-green-10'
    },
    {
      title: landing['features.filtering.title'],
      icon: <Check className="w-5 h-5" />,
      description: landing['features.curation.description'],
      bg: 'bg-citrine-10'
    },
    {
      title: landing['features.curation.title'],
      icon: <SearchCheckIcon className="w-5 h-5" />,
      description: landing['features.curation.description'],
      bg: 'bg-blue-10'
    },
    {
      title: landing['features.issues.title'],
      icon: <AlertCircleIcon className="w-5 h-5" />,
      description: landing['features.issues.description'],
      bg: 'bg-cienna-10'
    },
    {
      title: landing['features.multichannel.title'],
      icon: <HouseIcon className="w-5 h-5" />,
      description: landing['features.multichannel.description'],
      bg: 'bg-green-10'
    },
    {
      title: landing['features.publicDisplay.title'],
      icon: <GlobeIcon className="w-5 h-5" />,
      description: landing['features.publicDisplay.description'],
      bg: 'bg-blue-10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-100 via-black-90 to-black-100">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <BrandLogo
              variant="light"
              size="md"
              brandName={locales.common?.brandName}
              brandShort={locales.common?.brandShort}
            />

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/properties" className="text-white/70 hover:text-white transition-colors">
                {common.properties}
              </Link>
              <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
                {common.dashboard}
              </Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                {common.about}
              </Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                {common.contact}
              </Link>
            </nav>

            <Link
              href="/dashboard"
              className="px-4 py-2 bg-green-100 text-white rounded-lg text-sm font-medium hover:bg-green-80 transition-colors"
            >
              {common.dashboard}
            </Link>
          </div>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-100 rounded-full animate-pulse" />
            {landing.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {landing.heroTitle}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-green-60">
              {landing.heroTitleHighlight}
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">{landing.heroDescription}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-green-100 text-white rounded-xl font-medium text-lg 
                hover:bg-green-80 transition-all shadow-lg shadow-green-100/30 
                flex items-center gap-2"
            >
              {landing.openDashboard}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/properties"
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-medium text-lg 
                hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20
                flex items-center gap-2"
            >
              {landing.viewProperties}
              <HouseIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black-100 mb-4">{landing.featuresTitle}</h2>
            <p className="text-black-60 max-w-2xl mx-auto">{landing.featuresDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat: featuresKeys, idx: number) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${feat.title}-${idx}`}
                className="bg-black-5 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${feat.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <span className="text-2xl">{feat.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-black-100 mb-2">{feat.title}</h3>
                <p className="text-black-60 text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-green-100 to-green-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{landing.ctaTitle}</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">{landing.ctaDescription}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-100 rounded-xl font-medium text-lg 
              hover:bg-black-5 transition-all shadow-lg"
          >
            {landing.launchDashboard}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Footer properties={properties} common={common} />
    </div>
  );
}
