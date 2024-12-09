
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
 
      <main className="min-h-screen bg-zinc-100">
        {children}
      </main>
    </>
  );
}
