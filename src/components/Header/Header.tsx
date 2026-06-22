import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/menuData';
import img1 from '../../assets/image.png';

interface HeaderProps {
  onSearchClick?: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (categoryId: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + categoryId;
      return;
    }

    const element = document.getElementById(categoryId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1F5F3F] shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/20 shadow-lg backdrop-blur-sm">
                <img
                  src={img1}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-white text-sm font-bold leading-tight">
                  AYVACHAY
                </h1>
                <p className="text-emerald-200 text-[10px] tracking-wider">
                  CHAYKOFFSKIY
                </p>
              </div>
            </Link>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSearchClick?.()}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isMobileMenuOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-[#1F5F3F] z-50 transition-transform ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="p-6">

          {/* TOP */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-white font-bold">
                AYVACHAY
              </h2>
              <p className="text-emerald-300 text-xs">
                CHAYKOFFSKIY
              </p>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <nav className="space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white"
            >
              🏠 {t('Bosh sahifa', 'Главная')}
            </Link>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white"
              >
                <span>{category.icon}</span>
                <span>
                  {language === 'uz'
                    ? category.nameUz
                    : category.nameRu}
                </span>
              </button>
            ))}
          </nav>

          {/* LANGUAGE */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('uz')}
                className={`flex-1 py-2 rounded-xl ${
                  language === 'uz'
                    ? 'bg-amber-400 text-[#1F5F3F]'
                    : 'bg-white/10 text-white'
                }`}
              >
                O'Z
              </button>

              <button
                onClick={() => setLanguage('ru')}
                className={`flex-1 py-2 rounded-xl ${
                  language === 'ru'
                    ? 'bg-amber-400 text-[#1F5F3F]'
                    : 'bg-white/10 text-white'
                }`}
              >
                РУ
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}