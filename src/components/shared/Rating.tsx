import { Star } from "lucide-react";

export default function Rating({ value, total = 5, size = 16, className = "" }: { value: number, total?: number, size?: number, className?: string }) {
  return (
    <div className={`flex items-center text-[#f8bd19] ${className}`}>
      {[...Array(total)].map((_, i) => (
        <Star 
          key={i} 
          size={size} 
          fill={i < Math.floor(value) ? "currentColor" : "none"} 
          className={i >= Math.floor(value) ? "text-gray-300" : ""}
        />
      ))}
    </div>
  );
}
