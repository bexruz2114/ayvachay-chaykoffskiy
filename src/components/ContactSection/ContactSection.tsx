import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { cafeInfo } from '../../data/menuData';

export default function ContactSection() {
  const { language, t } = useLanguage();

  const getAddress = () => {
    return language === 'uz' ? cafeInfo.address.uz : cafeInfo.address.ru;
  };

  const getWorkingHours = () => {
    return language === 'uz' ? cafeInfo.workingHours.uz : cafeInfo.workingHours.ru;
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
            {t("Bog'lanish", "Связаться")}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t("Biz bilan bog'laning", "Свяжитесь с нами")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-[#1F5F3F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("Manzil", "Адрес")}
                </h3>
                <p className="text-gray-600">
                  {getAddress()}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-[#1F5F3F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("Telefon", "Телефон")}
                </h3>
                <a
                  href={`tel:${cafeInfo.phone}`}
                  className="text-[#1F5F3F] font-medium hover:underline"
                >
                  {cafeInfo.phone}
                </a>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-[#1F5F3F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("Ish vaqti", "Время работы")}
                </h3>
                <p className="text-gray-600">
                  {getWorkingHours()}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href={(cafeInfo as any).instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
              <a
                href={(cafeInfo as any).telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#2481cc] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.245c.115-.2.174-.36.154-.44-.04-.11-.162-.144-.34-.088l-8.085 3.095c-.34.116-.46.22-.46.395 0 .16.16.32.45.47l1.9.95 4.444-3.533c.19-.16.33-.19.37-.06.04.12.01.25-.12.42l-3.36 4.087 1.03 2.048c.252.51.613.76.99.76.364 0 .706-.198.887-.47l2.342-3.494c.23-.344.407-.762.54-1.26.138-.512.206-.98.206-1.4z"/>
                </svg>
                Telegram
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-[350px] lg:h-full min-h-[350px] border border-gray-200">
            <iframe
              src={cafeInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cafe Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}