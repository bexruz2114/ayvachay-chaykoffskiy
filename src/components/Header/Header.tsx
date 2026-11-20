import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
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
      const next = window.scrollY > 20;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (categoryId: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      window.location.href = `/#${categoryId}`;
      return;
    }

    window.setTimeout(() => {
      const el = document.getElementById(categoryId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 px-3 sm:px-6'
            : 'py-4 px-3 sm:px-6'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#133B27]/95 backdrop-blur-xl border border-white/15 shadow-2xl px-4 py-2'
              : 'bg-[#133B27]/75 backdrop-blur-md border border-white/10 px-4 py-2.5'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="flex items-center gap-3 min-w-0 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-amber-300/30 shrink-0">
                <img
                  src={img1}
                  alt="AYVACHAYKOFFSKIY"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-white font-bold text-sm sm:text-base tracking-wider truncate">
                AYVACHAYKOFFSKIY
              </span>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center p-1 rounded-xl bg-black/25 border border-white/10">
                <button
                  type="button"
                  onClick={() => setLanguage('uz')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    language === 'uz'
                      ? 'bg-amber-400 text-[#133B27]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  O'Z
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ru')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    language === 'ru'
                      ? 'bg-amber-400 text-[#133B27]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  РУ
                </button>
              </div>

              <button
                type="button"
                onClick={() => onSearchClick?.()}
                aria-label={t('Qidirish', 'Поиск')}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-300" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={t('Menyu', 'Меню')}
                aria-expanded={isMobileMenuOpen}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all active:scale-95 cursor-pointer ${
                  isMobileMenuOpen
                    ? 'bg-amber-400 text-[#133B27] border-amber-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                }`}
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

      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        aria-hidden={!isMobileMenuOpen}
        className={`fixed top-0 right-0 z-50 h-dvh w-[84vw] max-w-[330px] bg-[#133B27] text-white border-l border-white/10 shadow-2xl overflow-y-auto overscroll-contain touch-pan-y will-change-transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="min-h-full flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-amber-300/30 shrink-0">
                  <img
                    src={img1}
                    alt="AYVACHAY"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm tracking-wide truncate">
                    AYVACHAY
                  </div>
                  <div className="text-[11px] text-amber-300 tracking-widest uppercase truncate">
                    CHAYKOFFSKIY
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={t('Yopish', 'Закрыть')}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold mb-4 transition-colors ${
                location.pathname === '/'
                  ? 'bg-amber-400 text-[#133B27]'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <span className="flex items-center gap-3">
                <span>🏠</span>
                <span>{t('Bosh sahifa', 'Главная')}</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </Link>

            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToSection(category.id)}
                  className="group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white/90 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="text-base leading-none shrink-0">
                      {category.icon}
                    </span>
                    <span className="truncate font-medium">
                      {language === 'uz' ? category.nameUz : category.nameRu}
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/35 group-hover:text-amber-300 transition-colors shrink-0" />
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 sm:hidden">
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-black/25">
              <button
                type="button"
                onClick={() => setLanguage('uz')}
                className={`py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  language === 'uz'
                    ? 'bg-amber-400 text-[#133B27]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                O'Z
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ru')}
                className={`py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  language === 'ru'
                    ? 'bg-amber-400 text-[#133B27]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                РУ
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}