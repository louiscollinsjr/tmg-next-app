import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-100 font-montserrat min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}