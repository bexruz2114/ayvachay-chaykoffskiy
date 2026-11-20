import { useLanguage } from '../../context/LanguageContext';
import { cafeInfo } from '../../data/menuData';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  const getAddress = () => {
    return language === 'uz' ? cafeInfo.address.uz : cafeInfo.address.ru;
  };

  const brandParts = cafeInfo.name.split(' - ');
  const mainTitle = brandParts[0] || cafeInfo.name;
  const subTitle = brandParts[1] || '';

  const quickLinks = [
    { href: '#drinks', label: t('Ichimliklar', 'Напитки') },
    { href: '#soups', label: t("Sho'rvalar", 'Супы') },
    { href: '#ayva-products', label: t('Ayva mahsulotlari', 'Айва продукты') },
    { href: '#contact', label: t("Bog'lanish", 'Связаться') },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#15412C] via-[#113624] to-[#0B2318] text-white border-t border-white/10 overflow-hidden">
      {/* YUHQORI NOZIK TILLARANG CHIZIQ */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      {/* MAYIN YORUG'LIK FONDA */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-64 h-64 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="absolute -bottom-24 right-1/5 w-72 h-72 rounded-full bg-emerald-300/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* LOGO VA QISQACHA MA'LUMOT */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-amber-300/25 flex items-center justify-center shadow-lg shrink-0">
                <span className="text-2xl leading-none">🍐</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-extrabold tracking-wide text-white truncate">
                  {mainTitle}
                </h3>
                {subTitle && (
                  <p className="text-amber-300/90 text-[11px] font-bold tracking-[0.18em] uppercase truncate mt-0.5">
                    {subTitle}
                  </p>
                )}
              </div>
            </div>

            <p className="text-emerald-100/80 text-sm leading-relaxed max-w-md">
              {language === 'uz' ? cafeInfo.slogan.uz : cafeInfo.slogan.ru}
            </p>
          </div>

          {/* TEZKOR HAVOLALAR */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-300/85 mb-4">
              {t('Tezkor havolalar', 'Быстрые ссылки')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-emerald-100/80 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 group-hover:bg-amber-400 transition-colors" />
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-amber-300 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* BOG'LANISH VA IJTIMOIY TARMOQLAR */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-300/85 mb-4">
              {t("Bog'lanish", 'Связаться')}
            </h4>

            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5 text-sm text-emerald-100/85">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{getAddress()}</span>
              </div>

              <a
                href={`tel:${cafeInfo.phone}`}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-amber-300 hover:text-amber-200 text-sm font-bold transition-all duration-200 active:scale-98"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{cafeInfo.phone}</span>
              </a>

              <div className="flex items-center gap-2.5 pt-1.5">
                <a
                  href={cafeInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/8 hover:bg-amber-400 text-white hover:text-[#0B2318] border border-white/10 flex items-center justify-center transition-all duration-200 active:scale-95"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={cafeInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/8 hover:bg-amber-400 text-white hover:text-[#0B2318] border border-white/10 flex items-center justify-center transition-all duration-200 active:scale-95"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.245c.115-.2.174-.36.154-.44-.04-.11-.162-.144-.34-.088l-8.085 3.095c-.34.116-.46.22-.46.395 0 .16.16.32.45.47l1.9.95 4.444-3.533c.19-.16.33-.19.37-.06.04.12.01.25-.12.42l-3.36 4.087 1.03 2.048c.252.51.613.76.99.76.364 0 .706-.198.887-.47l2.342-3.494c.23-.344.407-.762.54-1.26.138-.512.206-.98.206-1.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PASTKI QATOR */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-emerald-100/70">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {cafeInfo.name}.{' '}
              {t('Barcha huquqlar himoyalangan.', 'Все права защищены.')}
            </p>
            <div className="flex items-center gap-1.5">
              <span>{t('Ishlab chiqildi', 'Разработано')}</span>
              <span className="text-amber-400">♥</span>
              <span>{t("O'zbekistonda", 'в Узбекистане')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}