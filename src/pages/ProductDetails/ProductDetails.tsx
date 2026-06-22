import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Flame, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { products, categories, cafeInfo } from '../../data/menuData';
import img1 from '../../assets/image.png';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">{img1}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('Mahsulot topilmadi', 'Продукт не найден')}
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F5F3F] text-white rounded-xl font-medium hover:bg-[#1a4d33] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('Bosh sahifaga qaytish', 'Вернуться на главную')}
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const recommendedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const name = language === 'uz' ? product.nameUz : product.nameRu;
  const description = language === 'uz' ? product.descriptionUz : product.descriptionRu;
  const ingredients = language === 'uz' ? product.ingredientsUz : product.ingredientsRu;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] md:top-[80px] z-30">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1F5F3F] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('Orqaga', 'Назад')}</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Product Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-6">
            <div className="aspect-[16/10]">
              <img
                src={product.image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isNew && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  {t('Yangi', 'Новинка')}
                </span>
              )}
              {product.isPopular && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg">
                  <Flame className="w-4 h-4" />
                  {t('Mashhur', 'Популярное')}
                </span>
              )}
            </div>

            {/* Category Badge */}
            {category && (
              <div className="absolute bottom-4 left-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1F5F3F] text-sm font-medium rounded-xl shadow-lg">
                  {category.icon} {language === 'uz' ? category.nameUz : category.nameRu}
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{description}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#1F5F3F]">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              {product.weight && (
                <div className="px-4 py-3 bg-gray-100 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">{t('Vazni', 'Вес')}</p>
                  <p className="font-semibold text-gray-900">{product.weight}</p>
                </div>
              )}
              {product.calories && (
                <div className="px-4 py-3 bg-gray-100 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">{t('Kaloriya', 'Калории')}</p>
                  <p className="font-semibold text-gray-900">{product.calories} kcal</p>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('Tarkibi', 'Состав')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-emerald-50 text-[#1F5F3F] rounded-lg text-sm font-medium"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location Info */}
          <div className="bg-gradient-to-br from-[#1F5F3F] to-[#2a7a52] rounded-3xl p-6 md:p-8 text-white shadow-lg mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  {t('Bizning kafeda buyurtma bering', 'Закажите в нашем кафе')}
                </h3>
                <p className="text-emerald-100 text-sm mb-2">
                  {language === 'uz' ? cafeInfo.address.uz : cafeInfo.address.ru}
                </p>
                <a
                  href={`tel:${cafeInfo.phone}`}
                  className="inline-flex items-center gap-2 text-amber-300 font-medium hover:text-amber-200 transition-colors"
                >
                  <span>{cafeInfo.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('Tavsiya etamiz', 'Рекомендуем также')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedProducts.map((recProduct) => (
                  <Link
                    key={recProduct.id}
                    to={`/product/${recProduct.id}`}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={recProduct.image}
                        alt={language === 'uz' ? recProduct.nameUz : recProduct.nameRu}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#1F5F3F] transition-colors line-clamp-1">
                        {language === 'uz' ? recProduct.nameUz : recProduct.nameRu}
                      </h3>
                      <p className="text-sm font-bold text-[#1F5F3F] mt-1">
                        {formatPrice(recProduct.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
