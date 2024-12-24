import Landing from "@/components/Landing";
import { getProfessionals } from "./actions";

export default async function HomePage() {
  const data = await getProfessionals();
  
  return (
    <main>
      <Landing initialData={data} />
    </main>
  );
}
