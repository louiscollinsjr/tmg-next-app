import { Montserrat, Roboto, Courier_Prime, Tiro_Bangla, Luckiest_Guy, Playfair_Display, Lato } from "next/font/google";

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-100 font-montserrat min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}