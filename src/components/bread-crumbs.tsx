import Link from 'next/link';

interface BreadCrumbsProps {
  locales: Record<string, string>;
  title: string;
}
export default function BreadCrumbs({ locales, title }: BreadCrumbsProps) {
  return (
    <div className="bg-black-5 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-black-50 hover:text-black-100">
            {locales.home}
          </Link>
          <span className="text-black-30">{locales.separator}</span>
          <Link href="/properties" className="text-black-50 hover:text-black-100">
            {locales.properties}
          </Link>
          <span className="text-black-30">{locales.separator}</span>
          <span className="text-black-100">{title}</span>
        </nav>
      </div>
    </div>
  );
}
