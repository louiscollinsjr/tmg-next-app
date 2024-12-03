import { Montserrat, Roboto, Courier_Prime, Tiro_Bangla, Luckiest_Guy, Playfair_Display, Lato } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Font configurations
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
const courier = Courier_Prime({ weight: '400', subsets: ['latin'], variable: '--font-courier' });
const tiroBangla = Tiro_Bangla({ weight: '400', subsets: ['bengali'], variable: '--font-tiro-bangla' });
const luckiestGuy = Luckiest_Guy({ weight: '400', subsets: ['latin'], variable: '--font-luckiest-guy' });
const playfairDisplay = Playfair_Display({ weight: '400', subsets: ['latin'], variable: '--font-playfair-display' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-zinc-100 ${montserrat.variable} ${roboto.variable} ${courier.variable} ${tiroBangla.variable} ${luckiestGuy.variable} ${playfairDisplay.variable} ${lato.variable} font-montserrat min-h-screen flex flex-col`}>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}