import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import { LanguageProvider } from './context/LanguageContext';
import { useLayoutEffect } from 'react';

import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function ScrollManager() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (pathname.startsWith('/product/')) {
      window.scrollTo(0, 0);
    }

    if (pathname === '/' && navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem('homeScrollPosition');

      if (savedPosition !== null) {
        requestAnimationFrame(() => {
          window.scrollTo(0, Number(savedPosition));
        });
      }
    }
  }, [pathname, navigationType]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollManager />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}