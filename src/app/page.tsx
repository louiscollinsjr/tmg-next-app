import Hero from '@/components/Hero';
import PrelaunchNavigation from '@/components/PrelaunchNavigation';
import PrelaunchFooter from '@/components/PrelaunchFooter';

export default function Home() {
  return (
    <>
      <PrelaunchNavigation />
      <main>
        <Hero />
      </main>
      <PrelaunchFooter />
    </>
  );
}
