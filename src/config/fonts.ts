import { Montserrat, Roboto, Courier_Prime, Tiro_Bangla, Luckiest_Guy, Playfair_Display, Lato, Source_Serif_4 } from "next/font/google";

// Font configurations
export const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
export const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
export const courier = Courier_Prime({ weight: '400', subsets: ['latin'], variable: '--font-courier' });
export const tiroBangla = Tiro_Bangla({ weight: '400', subsets: ['bengali'], variable: '--font-tiro-bangla' });
export const luckiestGuy = Luckiest_Guy({ weight: '400', subsets: ['latin'], variable: '--font-luckiest-guy' });
export const playfairDisplay = Playfair_Display({ weight: '400', subsets: ['latin'], variable: '--font-playfair-display' });
export const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
export const sourceSerif = Source_Serif_4({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-source-serif'
});

// Combined font variables for Tailwind
export const fontVariables = `${montserrat.variable} ${roboto.variable} ${courier.variable} ${tiroBangla.variable} ${luckiestGuy.variable} ${playfairDisplay.variable} ${lato.variable} ${sourceSerif.variable}`;
