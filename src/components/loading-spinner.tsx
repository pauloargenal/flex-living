import { Loader2Icon } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <Loader2Icon className="w-8 h-8 text-green-100 animate-spin" />
        {message && <h6 className="text-black-20">{message}</h6>}
      </div>
    </div>
  );
}
