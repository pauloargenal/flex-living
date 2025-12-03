import { Metadata } from 'next';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';

import { getLocale } from '@/utils/get-locales';
import { BrandLogo } from '@/components/brand-logo';
import { DashboardLayout } from '@/app/dashboard/dashboard-layout';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Reviews Dashboard | Flex Living',
  description: 'Manage and analyze guest reviews across all Flex Living properties'
};

export default async function DashboardPage() {
  const { common, dashboard, sentiment, trends, ratings, properties } = await getLocale();

  return (
    <div className="min-h-screen bg-grey-1">
      <header className="bg-white border-b border-black-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <BrandLogo
                variant="dark"
                size="sm"
                brandName={common.brandName}
                brandShort={common.brandShort}
              />
              <span className="text-black-30">{common.separator}</span>
              <h2 className="text-lg text-black-70">{dashboard.title}</h2>
            </div>

            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-black-60 hover:text-black-100 transition-colors"
              >
                {common.home}
              </Link>
              <Link
                href="/properties"
                className="text-sm text-black-60 hover:text-black-100 transition-colors"
              >
                {common.properties}
              </Link>
              <div className="w-8 h-8 bg-black-10 rounded-full flex items-center justify-center">
                <span className="text-black-60 text-sm">
                  <UserIcon className="w-4 h-4" />
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <DashboardLayout
        locale={dashboard}
        sentimentLabels={sentiment}
        trendsLocale={trends}
        ratingsLocale={ratings}
      />

      <Footer properties={properties} common={common} />
    </div>
  );
}
