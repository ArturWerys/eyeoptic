import PageShell from "@/components/PageShell";
import FlipUpProductClient from "./FlipUpProductClient.jsx";

export const metadata = {
  title: "Lupy Flip-Up Eye Optic",
  description:
    "Lupy Flip-Up Eye Optic - wygodna regulacja i możliwość odchylenia optyki. Idealne jako pierwsze lupy lub do pracy mieszanej.",
};

export default function Page() {
  return (
    <PageShell product>
      <FlipUpProductClient />
    </PageShell>
  );
}
