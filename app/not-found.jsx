import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import NotFound from '../src/components/NotFound';

export const metadata = { title: 'Page not found — Elvis Odhiambo' };

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col bg-paper text-ink">
    <Navigation />
    <main className="flex-1">
      <NotFound />
    </main>
    <Footer />
  </div>
);

export default NotFoundPage;
