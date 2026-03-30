import { Loader2 } from "lucide-react";

export default function Loader({ size = 32, text = "Loading..." }: { size?: number, text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2 size={size} className="animate-spin text-[var(--primary-color)]" />
      {text && <p className="text-sm font-medium text-[var(--light-text)]">{text}</p>}
    </div>
  );
}
