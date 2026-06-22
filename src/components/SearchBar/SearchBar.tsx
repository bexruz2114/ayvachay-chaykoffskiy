import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/menuData';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = products.filter((product) => {
      const nameUz = product.nameUz.toLowerCase();
      const nameRu = product.nameRu.toLowerCase();
      const searchQuery = query.toLowerCase();
      return nameUz.includes(searchQuery) || nameRu.includes(searchQuery);
    });

    setResults(searchResults.slice(0, 6));
  }, [query]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-down">
          {/* Search Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === 'uz'
                    ? 'Mahsulotlarni qidiring...'
                    : 'Поиск продуктов...'
                }
                className="w-full pl-12 pr-12 py-4 text-lg bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F5F3F] transition-all"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500">
                  {language === 'uz'
                    ? `"${query}" bo'yicha natija topilmadi`
                    : `По запросу "${query}" ничего не найдено`}
                </p>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={language === 'uz' ? product.nameUz : product.nameRu}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#1F5F3F] transition-colors truncate">
                        {language === 'uz' ? product.nameUz : product.nameRu}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {language === 'uz' ? product.descriptionUz : product.descriptionRu}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-[#1F5F3F]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!query && (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">AYVA</div>
                <p className="text-gray-600 font-medium mb-1">
                  {language === 'uz'
                    ? 'Mahsulotlarni qidiring'
                    : 'Поиск по продуктам'}
                </p>
                <p className="text-sm text-gray-400">
                  {language === 'uz'
                    ? 'Tea, soup, dessert va boshqalar'
                    : 'Чай, суп, десерт и другие'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
