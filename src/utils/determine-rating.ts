/**
 * Determines sentiment based on rating
 */
export function determineSentiment(rating: number | null): 'positive' | 'neutral' | 'negative' {
  if (rating === null) {
    return 'neutral';
  }
  if (rating >= 4) {
    return 'positive';
  }
  if (rating >= 3) {
    return 'neutral';
  }
  return 'negative';
}
