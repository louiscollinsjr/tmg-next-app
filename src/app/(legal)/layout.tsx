import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
}
