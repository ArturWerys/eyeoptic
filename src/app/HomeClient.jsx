"use client";

import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

import colors from "@/data/colors";
import content from "@/data/content";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomePageSections from "@/components/home/HomePageSections";
import {
  compactMobileHeroQuery,
  mobileProcessRevealThreshold,
  mobileRevealBreakpoint,
} from "@/components/home/homeResponsive";

export default function HomeClient() {
  const { home } = content;
  const [showMobileProcessSection, setShowMobileProcessSection] =
    useState(false);

  useEffect(() => {
    if (showMobileProcessSection) return;

    const mediaQuery = window.matchMedia(mobileRevealBreakpoint);
    if (!mediaQuery.matches) return;

    const revealProcessSection = () => {
      if (window.scrollY > mobileProcessRevealThreshold) {
        setShowMobileProcessSection(true);
        window.removeEventListener("scroll", revealProcessSection);
      }
    };

    window.addEventListener("scroll", revealProcessSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", revealProcessSection);
    };
  }, [showMobileProcessSection]);

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

        <HomePageSections
          home={home}
          compactMobileHeroQuery={compactMobileHeroQuery}
          showMobileProcessSection={showMobileProcessSection}
        />

        <Footer />
      </Container>
    </Box>
  );
}
