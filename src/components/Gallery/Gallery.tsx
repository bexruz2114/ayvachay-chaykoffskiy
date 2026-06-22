import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { atmosphereImages } from '../../data/menuData';

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? atmosphereImages.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === atmosphereImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  const getCaption = (image: typeof atmosphereImages[0]) => {
    return language === 'uz' ? image.captionUz : image.captionRu;
  };

  return (
    <section id="atmosphere" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
            {t('Kafe muhiti', 'Атмосфера кафе')}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('Atmosfera', 'Атмосфера')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t(
              'Bizning kafeda qulay va zamonaviy muhitda vaqt o\'tkazing',
              'Проведите время в уютной и современной атмосфере нашего кафе'
            )}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {atmosphereImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 || index === 5 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div
                className={`${
                  index === 0 || index === 5 ? 'aspect-square' : 'aspect-square'
                }`}
              >
                <img
                  src={image.image}
                  alt={getCaption(image)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">{getCaption(image)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 rounded-full text-white text-sm z-10">
            {selectedIndex + 1} / {atmosphereImages.length}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="max-w-5xl max-h-[80vh] w-full px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={atmosphereImages[selectedIndex].image}
              alt={getCaption(atmosphereImages[selectedIndex])}
              className="w-full h-full object-contain max-h-[80vh] rounded-lg"
            />
            <p className="text-center text-white mt-4 font-medium">
              {getCaption(atmosphereImages[selectedIndex])}
            </p>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {atmosphereImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-white scale-125' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
