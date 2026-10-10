"use client";

import { Box, Container } from "@mui/material";

import colors from "@/data/colors";
import content from "@/data/content";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomePageSections from "@/components/home/HomePageSections";

export default function HomeClient() {
  const { home } = content;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.pageBg,
        color: colors.text,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          py: { xs: 1.5, md: 2 },
          pt: { xs: "20px", sm: "16px", md: "2px" },
        }}
      >
        <NavbarPill />

        <HomeHeroCarousel home={home} />

        <HomePageSections home={home} />

        <Footer />
      </Container>
    </Box>
  );
}
