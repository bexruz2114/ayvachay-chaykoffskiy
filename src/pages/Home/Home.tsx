import { useState } from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProductCard from '../../components/ProductCard/ProductCard';
import Gallery from '../../components/Gallery/Gallery';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useLanguage } from '../../context/LanguageContext';
import { products, categories } from '../../data/menuData';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, t } = useLanguage();

  const getCategoryTitle = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return '';
    return language === 'uz' ? category.nameUz : category.nameRu;
  };

  // Faqat shu ichimlik toifalarini premium minimalist (rasmsiz, faqat nom va narx) dizaynga o'tkazamiz
  const liquidCategories = ['choylar', 'cocktails', 'mojitos', 'kvas'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Hero Section */}
      <HeroSection />

      {/* Product Sections */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );

            if (categoryProducts.length === 0) return null;

            // =========================================================================
            // DIZAYN: FAQAT ICHIMLIKLAR (CHOYLAR, KOKTEYLLAR, MOXITOLAR, KVAS) UCHUN SECTION
            // =========================================================================
            if (liquidCategories.includes(category.id)) {
              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="mb-12 scroll-mt-20 max-w-5xl mx-auto"
                >
                  {/* bg-fixed va bg-no-repeat foni hamma blokda bir xil va qotgan holda turishini ta'minlaydi */}
                  <div 
                    className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed shadow-2xl border border-emerald-900/40"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop')` 
                    }}
                  >
                    {/* To'q yashil ton, gradient va backdrop-blur qatlami matnlarning bir xil chiroyli o'qilishini kafolatlaydi */}
                    <div className="bg-gradient-to-b from-emerald-950/95 via-emerald-950/92 to-emerald-950/95 backdrop-blur-[3px] p-6 sm:p-10 text-white">
                      
                      {/* Sarlavha bloki */}
                      <div className="text-center mb-6">
                        <span className="inline-block px-8 py-2 border-2 border-amber-400 rounded-full text-xl sm:text-2xl font-bold text-amber-400 tracking-wider bg-emerald-900/50 shadow-inner uppercase">
                          {getCategoryTitle(category.id)}
                        </span>
                        
                        {/* Choylar uchun sarlavha ostiga maxsus eslatma yozuvi */}
                        {category.id === 'choylar' && (
                          <p className="text-amber-300/90 text-xs sm:text-sm italic mt-2 font-medium tracking-wide">
                            * {language === 'uz' ? 'Ayrim choylar maxsus choynakda taqdim etiladi' : 'Некоторые чаи подаются в специальном чайнике'}
                          </p>
                        )}
                        {/* Kokteyllar uchun maxsus eslatma yozuvi */}
                        {category.id === 'cocktails' && (
                          <p className="text-amber-300/90 text-xs sm:text-sm italic mt-2 font-medium tracking-wide">
                            * {language === 'uz' ? 'Maxsus stakanda beriladi' : 'Подается в стакане'}
                          </p>
                        )}
                      </div>

                      {/* Ichimliklar ro'yxati (Faqat Nom va Narx - 2 ustunli chiroyli satrlar) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
                        {categoryProducts.map((product) => (
                          <div 
                            key={product.id} 
                            className="flex items-end justify-between py-1 px-2 rounded hover:bg-white/5 transition-all duration-150 group"
                          >
                            {/* Ichimlik nomi va yonida o'lchov birligi */}
                            <div className="flex items-baseline gap-1.5 min-w-0">
                              <span className="font-medium text-base sm:text-lg text-gray-100 group-hover:text-amber-300 transition-colors truncate">
                                {language === 'uz' ? product.nameUz : product.nameRu}
                              </span>
                              
                              {/* Faqat "1 choynak" yoki o'lchami bor mahsulotlarda qavs ichida chiqadi */}
                              {product.weight && (
                                <span className="text-xs text-amber-400/70 font-light italic whitespace-nowrap">
                                  ({product.weight})
                                </span>
                              )}
                            </div>
                            
                            {/* O'rtadagi nuqtali chiziq (Dotted Leader) */}
                            <span className="flex-1 border-b border-dotted border-gray-500/40 mx-2 mb-1.5 group-hover:border-amber-400/40"></span>
                            
                            {/* Narxi (so'mda) */}
                            <span className="font-bold text-base sm:text-lg text-amber-400 whitespace-nowrap">
                              {product.price.toLocaleString()} {t('so\'m', 'сум')}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </section>
              );
            }

            // =========================================================================
            // DIZAYN: TAOMLAR, SHO'RVALAR VA NONLAR UCHUN ESKI STANDART CARD (GRID) KO'RINISHI
            // =========================================================================
            return (
              <section
                key={category.id}
                id={category.id}
                className="mb-10 scroll-mt-20"
              >
                {/* Eski sarlavha ko'rinishi */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-lg font-bold text-gray-900">
                    {getCategoryTitle(category.id)}
                  </h2>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                    {categoryProducts.length} {t('ta', '')}
                  </span>
                </div>

                {/* Eski rasmli kartochkalar paneli */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}