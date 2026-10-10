import PageShell from "@/components/PageShell";
import LedProductClient from "./LedProductClient.jsx";

export const metadata = {
  title: "Oświetlenie LED Eye Optic",
  description:
    "Oświetlenie LED Eye Optic do lup stomatologicznych. Równomierna wiązka w osi widzenia, większy komfort i widoczność detali.",
};

export default function Page() {
  return (
    <PageShell product>
      <LedProductClient />
    </PageShell>
  );
}
