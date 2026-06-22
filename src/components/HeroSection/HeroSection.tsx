import { useLanguage } from '../../context/LanguageContext';
import { cafeInfo } from '../../data/menuData';
import image from '../../assets/image.png'; 

export default function HeroSection() {
  const { language, t } = useLanguage();

  const scrollToMenu = () => {
    const element = document.getElementById('drinks');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Cafe Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F5F3F]/85 via-[#1F5F3F]/75 to-[#1F5F3F]/95" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-24 h-24 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/15 backdrop-blur-md shadow-2xl border border-white/20">
            <span className="text-4xl md:text-6xl"><img src={image} alt="cafe logo" style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none', borderRadius: '17px' }}  /></span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight animate-slide-up">
          AYVACHAY
        </h1>
        <p className="text-base md:text-xl text-emerald-200 font-light tracking-[0.2em] mb-5 animate-slide-up-delay">
          CHAYKOFFSKIY
        </p>

        {/* Slogan */}
        <p className="text-sm md:text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed animate-fade-in-delay">
          {language === 'uz' ? cafeInfo.slogan.uz : cafeInfo.slogan.ru}
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToMenu}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#1F5F3F] rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pop-in"
        >
          <span>{t('Menyuni ko\'rish', 'Смотреть меню')}</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-16 md:h-24" preserveAspectRatio="none">
          <path
            fill="#f9fafb"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          />
        </svg>
      </div>
    </section>
  );
}
