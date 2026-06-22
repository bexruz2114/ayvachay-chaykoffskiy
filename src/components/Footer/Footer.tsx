import { useLanguage } from '../../context/LanguageContext';
import { cafeInfo } from '../../data/menuData';

export default function Footer() {
  const { language, t } = useLanguage();

  const getAddress = () => {
    return language === 'uz' ? cafeInfo.address.uz : cafeInfo.address.ru;
  };

  return (
    <footer className="bg-[#1F5F3F] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🍐</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{cafeInfo.name.split(' - ')[0]}</h3>
                <p className="text-emerald-200 text-xs tracking-widest">
                  {cafeInfo.name.split(' - ')[1]}
                </p>
              </div>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed">
              {language === 'uz' ? cafeInfo.slogan.uz : cafeInfo.slogan.ru}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('Tezkor havolalar', 'Быстрые ссылки')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#drinks"
                  className="text-emerald-100 hover:text-amber-400 transition-colors text-sm"
                >
                  {t('Ichimliklar', 'Напитки')}
                </a>
              </li>
              <li>
                <a
                  href="#soups"
                  className="text-emerald-100 hover:text-amber-400 transition-colors text-sm"
                >
                  {t('Sho\'rvalar', 'Супы')}
                </a>
              </li>
              <li>
                <a
                  href="#ayva-products"
                  className="text-emerald-100 hover:text-amber-400 transition-colors text-sm"
                >
                  {t('Ayva mahsulotlari', 'Айва продукты')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-emerald-100 hover:text-amber-400 transition-colors text-sm"
                >
                  {t('Bog\'lanish', 'Связаться')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('Bog\'lanish', 'Связаться')}
            </h4>
            <div className="space-y-3">
              <p className="text-emerald-100 text-sm">{getAddress()}</p>
              <a
                href={`tel:${cafeInfo.phone}`}
                className="block text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                {cafeInfo.phone}
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={cafeInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={cafeInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.245c.115-.2.174-.36.154-.44-.04-.11-.162-.144-.34-.088l-8.085 3.095c-.34.116-.46.22-.46.395 0 .16.16.32.45.47l1.9.95 4.444-3.533c.19-.16.33-.19.37-.06.04.12.01.25-.12.42l-3.36 4.087 1.03 2.048c.252.51.613.76.99.76.364 0 .706-.198.887-.47l2.342-3.494c.23-.344.407-.762.54-1.26.138-.512.206-.98.206-1.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-emerald-200 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {cafeInfo.name}. {t('Barcha huquqlar himoyalangan.', 'Все права защищены.')}
            </p>
            <div className="flex items-center gap-2 text-sm text-emerald-200">
              <span>{t('Ishlab chiqildi', 'Разработано')}</span>
              <span className="text-amber-400">♥</span>
              <span>{t('O\'zbekistonda', 'в Узбекистане')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
