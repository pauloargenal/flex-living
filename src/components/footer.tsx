import Link from 'next/link';

interface FooterProps {
  properties: Record<string, string>;
  common: Record<string, string>;
}
export function Footer({ properties, common }: FooterProps) {
  return (
    <footer className="bg-black-100 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{common.brandShort}</span>
              </div>
              <span className="font-semibold">{common.brandName}</span>
            </div>
            <p className="text-white/60 text-sm">{properties['footer.tagline']}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold mb-4">{common.properties}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.areas.shoreditch']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.areas.canaryWharf']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.areas.kensington']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.areas.westminster']}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold mb-4">{properties['footer.company.title']}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.company.aboutUs']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.company.careers']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.company.blog']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.company.contact']}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold mb-4">{properties['footer.connect.title']}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.connect.instagram']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.connect.twitter']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.connect.linkedin']}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  {properties['footer.connect.facebook']}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <p className="text-sm text-white/40">{common.copyright}</p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">
              {common.privacy}
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              {common.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
