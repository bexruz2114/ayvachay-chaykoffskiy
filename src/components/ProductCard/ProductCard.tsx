import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../data/menuData';
import { Flame, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const name = language === 'uz' ? product.nameUz : product.nameRu;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-semibold rounded-md shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              {language === 'uz' ? 'Yangi' : 'Новинка'}
            </span>
          )}
          {product.isPopular && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-semibold rounded-md shadow-sm">
              <Flame className="w-2.5 h-2.5" />
              {language === 'uz' ? 'Mashhur' : 'Хит'}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#1F5F3F] transition-colors">
          {name}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#1F5F3F]">
            {formatPrice(product.price)}
          </span>

          {product.calories && (
            <span className="text-[10px] text-gray-400">
              {product.calories} kcal
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
