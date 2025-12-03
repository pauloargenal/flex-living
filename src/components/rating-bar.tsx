interface RatingBarProps {
  rating: number;
  maxRating?: number;
}

export function RatingBar({ rating, maxRating = 10 }: RatingBarProps) {
  const percentage = (rating / maxRating) * 100;
  const color = rating >= 8 ? 'bg-green-100' : rating >= 6 ? 'bg-citrine-100' : 'bg-cienna-100';

  return (
    <div className="w-full bg-black-10 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
