interface CategoryBadgeProps {
  displayName: string;
  rating: number;
}

export function CategoryBadge({ displayName, rating }: CategoryBadgeProps) {
  const colorClass =
    rating >= 8
      ? 'bg-green-10 text-green-100'
      : rating >= 6
      ? 'bg-citrine-10 text-hazel'
      : 'bg-cienna-10 text-cienna-100';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}
    >
      {displayName}: {rating}/10
    </span>
  );
}
