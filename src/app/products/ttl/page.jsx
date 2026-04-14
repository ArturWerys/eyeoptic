import { Box, Container } from "@mui/material";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";
import colors from "@/data/colors";
import TtlProductClient from "./TtlProductClient.jsx";

export const metadata = {
  title: "Lupy TTL Eye Optic",
  description:
    "Lupy TTL (Through The Lens): stabilność obrazu i ergonomia pracy. Umów dobór konfiguracji TTL w Eye Optic.",
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
          <TtlProductClient />
        </Box>

        <Footer />
      </Container>
    </Box>
  );
}
