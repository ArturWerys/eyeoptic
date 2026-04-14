import { Box, Container } from "@mui/material";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";
import colors from "@/data/colors";
import ContactClient from "./ContactClient.jsx";

export const metadata = {
  title: "Kontakt z Eye Optic",
  description:
    "Strona kontaktowa Eye Optic. Skontaktuj się z nami w sprawie lup stomatologicznych, akcesoriów i usług.",
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

        <ContactClient />

        <Footer />
      </Container>
    </Box>
  );
}
