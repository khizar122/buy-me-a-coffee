
import { FaCheckCircle } from 'react-icons/fa';
export const FormSuccess = ({ message }: any) => {
  if (!message) return null;

  return (
    <div className="bg-green-100 border border-green-200 p-4 rounded-[6px] flex items-start gap-x-4 text-[#47D16C]">
      <FaCheckCircle size={20} />
      <p className="text-[#252C32] text-sm">{message}</p>
    </div>
  );
};
