import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  brandName: string;
  brandShort: string;
}

const sizeConfig = {
  sm: { container: 'w-8 h-8', text: 'text-sm', nameText: 'text-lg' },
  md: { container: 'w-10 h-10', text: 'text-base', nameText: 'text-xl' },
  lg: { container: 'w-12 h-12', text: 'text-lg', nameText: 'text-2xl' }
};

export function BrandLogo({
  variant = 'dark',
  size = 'md',
  brandName,
  brandShort
}: BrandLogoProps) {
  const { container, text, nameText } = sizeConfig[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-black-100';

  return (
    <Link href="/" className="flex items-center gap-3">
      <div className={`${container} bg-green-100 rounded-lg flex items-center justify-center`}>
        <span className={`text-white font-bold ${text}`}>{brandShort}</span>
      </div>
      <span className={`font-semibold ${nameText} ${textColor}`}>{brandName}</span>
    </Link>
  );
}
