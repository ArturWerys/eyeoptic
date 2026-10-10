import PageShell from "@/components/PageShell";
import ContactClient from "./ContactClient.jsx";

export const metadata = {
  title: "Kontakt z Eye Optic",
  description:
    "Strona kontaktowa Eye Optic. Skontaktuj się z nami w sprawie lup stomatologicznych, akcesoriów i usług.",
};

export default function Page() {
  return (
    <PageShell>
      <ContactClient />
    </PageShell>
  );
}
