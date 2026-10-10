import PageShell from "@/components/PageShell";
import TtlProductClient from "./TtlProductClient.jsx";

export const metadata = {
  title: "Lupy TTL Eye Optic",
  description:
    "Lupy TTL (Through The Lens): stabilność obrazu i ergonomia pracy. Umów dobór konfiguracji TTL w Eye Optic.",
};

export default function Page() {
  return (
    <PageShell product>
      <TtlProductClient />
    </PageShell>
  );
}
