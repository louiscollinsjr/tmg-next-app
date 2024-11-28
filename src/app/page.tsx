import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <Hero />
      <Footer />
    </main>
  );
}
