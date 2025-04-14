
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const FormError = ({ message }: any) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-4 w-full rounded-[6px] flex items-start gap-x-4 text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p className="text-[#252C32] text-sm font-semibold">{message}</p>
    </div>
  );
};
