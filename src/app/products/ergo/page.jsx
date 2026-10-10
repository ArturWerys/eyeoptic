import PageShell from "@/components/PageShell";
import ErgoProductClient from "./ErgoProductClient.jsx";

export const metadata = {
  title: "Lupy Ergo Eye Optic",
  description:
    "Lupy Ergo Eye Optic to rozwiązanie dla osób, które oczekują maksymalnej stabilności obrazu i pracy bez konieczności korekty ustawień.",
};

export default function Page() {
  return (
    <PageShell product>
      <ErgoProductClient />
    </PageShell>
  );
}
