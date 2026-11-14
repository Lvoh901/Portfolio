import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';

const SiteLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-paper text-ink">
    <Navigation />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default SiteLayout;
