import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from 'lucide-react';

interface TrendIndicatorProps {
  trend: 'improving' | 'stable' | 'declining';
  labels: Record<string, string>;
}

const trendConfig: Record<
  'improving' | 'stable' | 'declining',
  { icon: React.ReactNode; color: string; bg: string }
> = {
  improving: {
    icon: <ArrowUpIcon className="w-4 h-4" />,
    color: 'text-green-100',
    bg: 'bg-green-10'
  },
  stable: {
    icon: <ArrowRightIcon className="w-4 h-4" />,
    color: 'text-citrine-100',
    bg: 'bg-citrine-10'
  },
  declining: {
    icon: <ArrowDownIcon className="w-4 h-4" />,
    color: 'text-cienna-100',
    bg: 'bg-cienna-10'
  }
};

export function TrendIndicator({ trend, labels }: TrendIndicatorProps) {
  const { icon, color, bg } = trendConfig[trend] || trendConfig.stable;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color} ${bg}`}
    >
      {icon} {labels[`trends.${trend}`]}
    </span>
  );
}
