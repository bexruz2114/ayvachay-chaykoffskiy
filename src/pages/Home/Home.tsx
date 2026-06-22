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

            return (
              <section
                key={category.id}
                id={category.id}
                className="mb-10 scroll-mt-20"
              >
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-lg font-bold text-gray-900">
                    {getCategoryTitle(category.id)}
                  </h2>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                    {categoryProducts.length} {t('ta', '')}
                  </span>
                </div>

                {/* Products Grid */}
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
