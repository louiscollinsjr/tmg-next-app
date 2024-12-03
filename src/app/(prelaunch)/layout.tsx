import { Montserrat, Roboto, Courier_Prime, Tiro_Bangla, Luckiest_Guy } from "next/font/google";
import PrelaunchNavigation from "@/components/PrelaunchNavigation";
import PrelaunchFooter from "@/components/PrelaunchFooter";

// Font configurations
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
const courier = Courier_Prime({ weight: '400', subsets: ['latin'], variable: '--font-courier' });
const tiroBangla = Tiro_Bangla({ weight: '400', subsets: ['bengali'], variable: '--font-tiro-bangla' });
const luckiestGuy = Luckiest_Guy({ weight: '400', subsets: ['latin'], variable: '--font-luckiest-guy' });

export default function PrelaunchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-zinc-100 ${montserrat.variable} ${roboto.variable} ${courier.variable} ${tiroBangla.variable} ${luckiestGuy.variable} font-montserrat min-h-screen flex flex-col`}>
      <PrelaunchNavigation />
      <main className="flex-grow">{children}</main>
      <PrelaunchFooter />
    </div>
  );
}