import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Flame,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ProductCardItem {
  id: string;
  nameUz: string;
  nameRu: string;
  image: string;
  price: number;
  calories?: number;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ProductCardProps {
  product: ProductCardItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const name = language === 'uz' ? product.nameUz : product.nameRu;

  const isKalogenBuka =
    product.id === 'kalogen-buka' ||
    product.id === 'kalogen-buka-folga' ||
    product.id === 'tuyoq';

  const isTil =
    product.id === 'til' ||
    product.id === 'folgalangan-til';

  const isChaykoffskiy = product.id === 'kalogen-chaykoffskiy';

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('uz-UZ').format(price) +
    (language === 'uz' ? " so'm" : ' сум');

  // PORTION
  const portion = (
    title: string,
    price: number,
    featured = false
  ) => (
    <div
      className={`flex items-center justify-between gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border min-w-0 ${
        featured
          ? 'bg-[#EAF3ED] border-[#1F5F3F]/25'
          : 'bg-[#F7FAF8] border-emerald-950/8'
      }`}
    >
      <p
        className={`text-xs font-bold shrink-0 ${
          featured ? 'text-[#14422B]' : 'text-gray-800'
        }`}
      >
        {title}
      </p>

      <span
        className={`text-[10px] sm:text-xs font-extrabold tracking-tight whitespace-nowrap shrink-0 ${
          featured ? 'text-[#14422B]' : 'text-gray-900'
        }`}
      >
        {formatPrice(price)}
      </span>
    </div>
  );

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col min-w-0 bg-white rounded-[24px] overflow-hidden border border-emerald-950/10 shadow-[0_8px_26px_-10px_rgba(15,23,42,0.1)] hover:shadow-[0_22px_45px_-14px_rgba(20,66,43,0.24)] hover:border-[#1F5F3F]/30 hover:-translate-y-1.5 active:scale-[0.985] active:border-[#1F5F3F]/40 transition-all duration-300 ease-out animate-fade-in"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EDF2EE]">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-active:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#14422B] text-[10px] font-extrabold tracking-wide shadow-sm border border-emerald-950/10">
              <Sparkles size={11} className="text-[#1F5F3F]" />
              {language === 'uz' ? 'YANGI' : 'НОВИНКА'}
            </span>
          )}

          {product.isPopular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-[#D97706] text-white text-[10px] font-extrabold tracking-wide shadow-sm">
              <Flame size={11} />
              {language === 'uz' ? 'MASHHUR' : 'ХИТ'}
            </span>
          )}
        </div>

        {/* VIEW BUTTON */}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#14422B] shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:bg-[#1F5F3F] group-hover:text-white group-hover:rotate-12 group-active:bg-[#1F5F3F] group-active:text-white group-active:scale-95">
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col min-w-0">
        {/* TITLE */}
        <div className="flex items-start gap-2.5 mb-3">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#1F5F3F] to-amber-500 shrink-0 mt-0.5 transition-all duration-300 group-hover:h-6 group-active:h-6" />

          <h3 className="text-[14.5px] sm:text-[15px] font-extrabold text-gray-900 leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[#14422B] group-active:text-[#14422B]">
            {name}
          </h3>
        </div>

        {/* SPECIAL PORTIONS */}
        {isKalogenBuka ? (
          <div className="space-y-2 mt-auto min-w-0">
            {portion(
              language === 'uz' ? 'Kichik' : 'Маленькая',
              160000
            )}

            {portion(
              language === 'uz' ? 'Katta' : 'Большая',
              220000,
              true
            )}
          </div>
        ) : isTil ? (
          <div className="space-y-2 mt-auto min-w-0">
            {portion(
              language === 'uz' ? 'Kichik' : 'Маленькая',
              300000
            )}

            {portion(
              language === 'uz' ? 'Katta' : 'Большая',
              350000,
              true
            )}
          </div>
        ) : isChaykoffskiy ? (
          <div className="space-y-3 mt-auto pt-1 min-w-0">
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/[0.06] border border-emerald-900/12 text-[10px] font-bold text-[#14422B]">
                {language === 'uz' ? "Mol go'shti" : 'Говядина'}
              </span>

              <span className="px-2.5 py-1 rounded-lg bg-amber-500/12 border border-amber-500/25 text-[10px] font-bold text-amber-800">
                {language === 'uz' ? "Qo'y go'shti" : 'Баранина'}
              </span>
            </div>

            <div className="pt-1.5 border-t border-gray-100 min-w-0">
              <span className="text-[15px] sm:text-base font-extrabold text-[#14422B] tracking-tight whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-2.5 border-t border-gray-100 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
              {language === 'uz' ? 'Narxi' : 'Цена'}
            </p>

            <span className="text-base font-extrabold text-[#14422B] tracking-tight whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
          </div>
        )}
      </div>

      {/* BOTTOM ACCENT LINE */}
      <div className="h-[3px] w-0 bg-gradient-to-r from-[#1F5F3F] via-emerald-600 to-amber-500 transition-all duration-500 ease-out group-hover:w-full group-active:w-full" />
    </Link>
  );
}