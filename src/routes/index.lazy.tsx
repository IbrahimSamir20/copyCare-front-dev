import { createLazyFileRoute } from '@tanstack/react-router';
import FeaturesSection from './-components/FeaturesSection';
import Footer from './-components/Footer';
import HeroSection from './-components/HeroSection';
import TestimonialsSection from './-components/TestimonialsSection';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
