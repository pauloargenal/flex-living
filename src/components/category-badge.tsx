import { useMemo } from 'react';

interface CategoryBadgeProps {
  displayName: string;
  rating: number;
}

export function CategoryBadge({ displayName, rating }: CategoryBadgeProps) {
  const colorClass = useMemo(() => {
    if (rating >= 8) {
      return 'bg-green-10 text-green-100';
    }
    if (rating >= 6) {
      return 'bg-citrine-10 text-hazel';
    }
    return 'bg-cienna-10 text-cienna-100';
  }, [rating]);

  const ratingText = `${displayName}: ${rating}/10`;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}
    >
      {ratingText}
    </span>
  );
}
