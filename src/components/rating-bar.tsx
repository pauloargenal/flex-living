import { useMemo } from 'react';

interface RatingBarProps {
  rating: number;
  maxRating?: number;
}

export function RatingBar({ rating, maxRating = 10 }: RatingBarProps) {
  const percentage = (rating / maxRating) * 100;
  const colorClass = useMemo(() => {
    if (rating >= 8) {
      return 'bg-green-100';
    }
    if (rating >= 6) {
      return 'bg-citrine-100';
    }
    return 'bg-cienna-100';
  }, [rating]);

  return (
    <div className="w-full bg-black-10 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${colorClass} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
