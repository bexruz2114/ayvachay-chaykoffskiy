import { useLanguage } from '../../context/LanguageContext';
import { cafeInfo, categories } from '../../data/menuData';
import image from '../../assets/image.png';
import ats from '../../assets/atmasphere3.png';

export default function HeroSection() {
  const { language, t } = useLanguage();

  const scrollToMenu = () => {
    const firstCategoryId = categories[0]?.id;
    const target =
      document.getElementById('drinks') ||
      (firstCategoryId ? document.getElementById(firstCategoryId) : null) ||
      document.querySelector<HTMLElement>('section[id]');

    if (target) {
      const headerOffset = 84;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });
      return;
    }

    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden bg-[#1F5F3F]">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={ats}
          alt="Cafe Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F5F3F]/85 via-[#1F5F3F]/75 to-[#1F5F3F]/95" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-12 pb-16">
        {/* LOGO */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white/15 backdrop-blur-md shadow-2xl border border-white/20">
            <img
              src={image}
              alt="cafe logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
          AYVACHAYKOFFSKIY
        </h1>

        {/* SLOGAN */}
        <p className="text-sm md:text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed">
          {language === 'uz' ? cafeInfo.slogan.uz : cafeInfo.slogan.ru}
        </p>

        {/* CTA BUTTON */}
        <button
          type="button"
          onClick={scrollToMenu}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-[#1F5F3F] rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <span>{t("Menyuni ko'rish", 'Смотреть меню')}</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* BOTTOM WAVE */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-16 md:h-24 block"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          />
        </svg>
      </div>
    </section>
  );
}