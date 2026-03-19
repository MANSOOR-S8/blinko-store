import Link from "next/link";
import { Laptop, Home, Shirt, Sparkles, Dumbbell, Watch } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, href: "/shop?category=electronics", color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Home & Living", icon: Home, href: "/shop?category=home", color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Fashion", icon: Shirt, href: "/shop?category=fashion", color: "text-pink-500", bg: "bg-pink-50" },
  { name: "Beauty", icon: Sparkles, href: "/shop?category=beauty", color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Sports", icon: Dumbbell, href: "/shop?category=sports", color: "text-green-500", bg: "bg-green-50" },
  { name: "Accessories", icon: Watch, href: "/shop?category=accessories", color: "text-gray-700", bg: "bg-gray-100" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-8 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide range of categories to find exactly what you're looking for.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name} 
                href={category.href}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-full ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-gray-800 text-center">{category.name}</h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
