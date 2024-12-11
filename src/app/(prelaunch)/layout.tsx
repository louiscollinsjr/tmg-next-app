import PrelaunchNavigation from "@/components/PrelaunchNavigation";
import PrelaunchFooter from "@/components/PrelaunchFooter";

export default function PrelaunchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-100 font-montserrat min-h-screen flex flex-col">
      <PrelaunchNavigation />
      <main className="flex-grow">{children}</main>
      <PrelaunchFooter />
    </div>
  );
}