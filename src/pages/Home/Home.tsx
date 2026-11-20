
import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigationType } from 'react-router-dom';

import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProductCard from '../../components/ProductCard/ProductCard';
import Gallery from '../../components/Gallery/Gallery';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/SearchBar/SearchBar';

import { useLanguage } from '../../context/LanguageContext';
import { products, categories } from '../../data/menuData';

const SCROLL_KEY = 'homeScrollPosition';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, t } = useLanguage();
  const navigationType = useNavigationType();

  // ==========================================
  // SCROLL POSITION SAVE & RESTORE
  // ==========================================

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(
        SCROLL_KEY,
        String(window.scrollY)
      );
    };

    window.addEventListener('scroll', saveScroll, {
      passive: true,
    });

    // Sahifadan chiqishdan oldin oxirgi pozitsiyani saqlash
    return () => {
      saveScroll();
      window.removeEventListener('scroll', saveScroll);
    };
  }, []);

  // Home sahifasiga qaytganda oldingi joyni tiklash
  useLayoutEffect(() => {
    if (navigationType !== 'POP') return;

    const savedPosition = sessionStorage.getItem(SCROLL_KEY);

    if (savedPosition === null) return;

    const position = Number(savedPosition);

    const frame = requestAnimationFrame(() => {
      window.scrollTo({
        top: position,
        left: 0,
        behavior: 'instant',
      });

      sessionStorage.removeItem(SCROLL_KEY);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  // ==========================================
  // CATEGORY FUNCTIONS
  // ==========================================

  const getCategoryTitle = (categoryId: string) => {
    const category = categories.find(
      (c) => c.id === categoryId
    );

    if (!category) return '';

    return language === 'uz'
      ? category.nameUz
      : category.nameRu;
  };

  const liquidCategories = [
    'choylar',
    'cocktails',
    'mojitos',
    'kvas',
    'kampot',
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6]">

      <Header
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* HERO */}
      <HeroSection />

      {/* PRODUCTS */}
      <main className="py-8 sm:py-10">
        <div className="container mx-auto px-4 max-w-7xl">

          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );

            if (categoryProducts.length === 0) return null;

            // ======================================
            // DRINK CATEGORIES
            // ======================================

            if (liquidCategories.includes(category.id)) {
              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="mb-12 sm:mb-16 scroll-mt-24 max-w-5xl mx-auto"
                >
                  <div
                    className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-900/20 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://static.vecteezy.com/system/resources/previews/056/173/469/non_2x/sunlight-green-background-blur-photo.jpg')",
                    }}
                  >
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#092E20]/95 via-[#124B32]/95 to-[#071F17]/95" />

                    <div className="relative z-10 p-5 sm:p-9 lg:p-11 text-white">

                      {/* CATEGORY TITLE */}
                      <div className="text-center mb-8">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-emerald-200/70 font-semibold mb-3">
                            AYVA CHAY
                          </span>

                          <h2 className="text-xl sm:text-3xl font-extrabold tracking-wide text-amber-300 uppercase">
                            {getCategoryTitle(category.id)}
                          </h2>

                          <div className="w-16 h-[2px] bg-amber-400 mt-3 rounded-full" />
                        </div>

                        {/* SPECIAL NOTES */}
                        {category.id === 'choylar' && (
                          <p className="text-amber-200/80 text-xs sm:text-sm italic mt-4">
                            * {language === 'uz'
                              ? 'Ayrim choylar maxsus choynakda taqdim etiladi'
                              : 'Некоторые чаи подаются в специальном чайнике'}
                          </p>
                        )}

                        {category.id === 'cocktails' && (
                          <p className="text-amber-200/80 text-xs sm:text-sm italic mt-4">
                            * {language === 'uz'
                              ? 'Maxsus stakanda beriladi'
                              : 'Подается в специальном стакане'}
                          </p>
                        )}
                      </div>

                      {/* DRINK LIST */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">

                        {categoryProducts.map((product) => (
                          <div
                            key={product.id}
                            className="group flex items-end justify-between gap-2 py-3 px-2 rounded-xl border-b border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300"
                          >
                            {/* NAME */}
                            <div className="flex items-baseline gap-1.5 min-w-0">
                              <span className="text-sm sm:text-base font-medium text-gray-100 group-hover:text-amber-300 transition-colors truncate">
                                {language === 'uz'
                                  ? product.nameUz
                                  : product.nameRu}
                              </span>

                              {product.weight && (
                                <span className="text-[10px] sm:text-xs text-amber-300/70 italic whitespace-nowrap">
                                  ({product.weight})
                                </span>
                              )}
                            </div>

                            {/* DOTTED LINE */}
                            <span className="flex-1 min-w-3 border-b border-dotted border-white/30 mb-1 group-hover:border-amber-400/70 transition-colors" />

                            {/* PRICE */}
                            <span className="text-sm sm:text-base font-extrabold text-amber-400 whitespace-nowrap">
                              {product.price.toLocaleString()} {t("so'm", 'сум')}
                            </span>
                          </div>
                        ))}

                      </div>

                      {/* FOOTER */}
                      <div className="mt-7 pt-4 border-t border-white/10 flex justify-center">
                        <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                          AYVA CHAY • MENU
                        </span>
                      </div>

                    </div>
                  </div>
                </section>
              );
            }

            // ======================================
            // FOOD CATEGORIES
            // ======================================

            return (
              <section
                key={category.id}
                id={category.id}
                className="mb-12 sm:mb-14 scroll-mt-24"
              >

                {/* SECTION HEADER */}
                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#1F5F3F]/10 border border-[#1F5F3F]/10 shrink-0">
                    <span className="text-2xl">
                      {category.icon}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base sm:text-xl font-extrabold text-gray-900 tracking-tight">
                      {getCategoryTitle(category.id)}
                    </h2>

                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                      {language === 'uz'
                        ? 'Mazali taomlar siz uchun'
                        : 'Вкусные блюда для вас'}
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-[#1F5F3F] bg-[#1F5F3F]/[0.08] border border-[#1F5F3F]/10 px-3 py-1.5 rounded-full">
                      {categoryProducts.length} {t('ta', '')}
                    </span>
                  </div>

                </div>

                {/* DECORATIVE LINE */}
                <div className="h-px bg-gradient-to-r from-[#1F5F3F]/30 via-gray-200 to-transparent mb-5" />

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

              </section>
            );
          })}

        </div>
      </main>

      {/* GALLERY */}
      <Gallery />

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
