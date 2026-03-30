"use client";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export type ToastType = 'success' | 'error' | 'info';

interface Props {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

export default function Toast({ message, type = 'info', onClose }: Props) {
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-100',
    error: 'bg-red-50 border-red-100',
    info: 'bg-blue-50 border-blue-100'
  };

  return (
    <div className={`fixed bottom-4 right-4 flex items-center shadow-lg rounded-xl p-4 border animate-slideUp z-50 ${bgColors[type]}`}>
      <div className="mr-3">{icons[type]}</div>
      <p className="font-medium text-[var(--heading-color)] mr-6">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
