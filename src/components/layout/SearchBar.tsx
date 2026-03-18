"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/categories?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/categories`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex flex-1 items-center max-w-2xl bg-white rounded-full border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-400 transition-all shadow-sm"
    >
      <input
        type="text"
        placeholder="Search for products, brands and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-5 pr-3 py-2.5 outline-none text-gray-700 bg-transparent placeholder-gray-400"
      />
      <button 
        type="submit" 
        className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white transition-colors flex items-center justify-center"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
