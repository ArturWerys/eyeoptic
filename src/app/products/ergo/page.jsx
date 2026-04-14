import { Box, Container } from "@mui/material";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";
import colors from "@/data/colors";
import AccessoriesProductClient from "./ErgoProductClient.jsx";

export const metadata = {
  title: "Lupy Ergo Eye Optic",
  description:
    "Lupy Ergo Eye Optic to rozwiązanie dla osób, które oczekują maksymalnej stabilności obrazu i pracy bez konieczności korekty ustawień.",
};

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.pageBg,
        color: colors.text,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <NavbarPill />

        <Box sx={{ pt: { xs: 4, md: 4 } }}>
          <AccessoriesProductClient />
        </Box>

        <Footer />
      </Container>
    </Box>
  );
}
