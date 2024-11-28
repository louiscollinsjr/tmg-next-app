import Hero from '@/components/Hero';
import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-100">
      <NavigationWrapper forcePrelaunch={true} />
      <Hero />
      <Footer />
    </main>
  );
}
