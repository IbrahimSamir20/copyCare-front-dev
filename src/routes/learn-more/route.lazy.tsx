import { createLazyFileRoute } from '@tanstack/react-router';
import OverviewSection from './-components/OverviewSection';
import DetailedFeaturesSection from './-components/DetailedFeaturesSection';
import ContactSection from './-components/ContactSection';
import Footer from '../-components/Footer';

export const Route = createLazyFileRoute('/learn-more')({
  component: LearnMore,
});

function LearnMore() {
  return (
    <div>
      <OverviewSection />
      <DetailedFeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
