import { Box, Container } from "@mui/material";

import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";
import colors from "@/data/colors";

export default function PageShell({ children, product = false }) {
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
        {product ? <Box sx={{ pt: 4 }}>{children}</Box> : children}
        <Footer />
      </Container>
    </Box>
  );
}
