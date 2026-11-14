import { Suspense } from 'react';
import Contact from '../../../src/components/Contact';

export const metadata = {
  title: 'Contact — Elvis Odhiambo',
  description: 'Tell me what you are building and I will come back with a clear next step.',
};

const ContactPage = () => (
  <Suspense fallback={null}>
    <Contact />
  </Suspense>
);

export default ContactPage;
