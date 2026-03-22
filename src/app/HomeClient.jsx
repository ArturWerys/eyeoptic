"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";

import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import colors from "@/data/colors";
import content from "@/data/content";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";

export default function HomeClient() {
  const { home } = content;
  const heroSlides = home.hero.slides;

  const heroTextAnimation =
    "heroTextIn 1500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both";
  const heroImageAnimation =
    "heroImageIn 1300ms cubic-bezier(0.16, 1, 0.3, 1) both";

  const [heroIndex, setHeroIndex] = useState(0);
  const activeHero = heroSlides[heroIndex];
  const activeHeroImageLayout = activeHero.imageLayout ?? {};

  const prevHero = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextHero = () => {
    setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const heroArrowSx = {
    minWidth: 44,
    width: 44,
    height: 44,
    borderRadius: "50%",
    color: "rgba(15,23,42,0.72)",
    border: "1px solid rgba(15,23,42,0.06)",
    backgroundColor: "rgba(255,255,255,0.44)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 10px 28px rgba(15,23,42,0.05)",
    transition:
      "transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease, border-color 180ms ease, color 180ms ease",
    "&:hover": {
      color: "rgba(15,23,42,0.86)",
      backgroundColor: "rgba(255,255,255,0.62)",
      borderColor: "rgba(15,23,42,0.09)",
      boxShadow: "0 12px 30px rgba(15,23,42,0.07)",
    },
  };

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

        {/* HERO */}
        <Box
          sx={{
            minHeight: {
              xs: "calc(100svh - 96px)",
              md: "calc(100svh - 118px)",
            },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "39% 61%" },
            alignItems: { xs: "center", md: "center" },
            gap: { xs: 3, sm: 3.5, md: 1.5 },
            position: "relative",
            width: "100%",
            mx: "auto",
            px: { xs: 0, md: 4, lg: 5 },
            pt: { xs: 0.5, md: 2, lg: 3 },
            pb: { xs: 2.5, md: 2 },
          }}
        >
          <Button
            onClick={prevHero}
            aria-label="Poprzedni slajd"
            sx={{
              position: "absolute",
              left: { md: -30, lg: -38 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              display: { xs: "none", md: "inline-flex" },
              ...heroArrowSx,
              "&:hover": {
                ...heroArrowSx["&:hover"],
                transform: "translateY(-50%) scale(1.02)",
              },
            }}
          >
            <ChevronLeftRoundedIcon sx={{ fontSize: 21 }} />
          </Button>

          <Box
            key={`hero-text-${heroIndex}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              width: "100%",
              maxWidth: { xs: "100%", md: "100%" },
              minWidth: 0,
              minHeight: { md: 460 },
              mx: { xs: "auto", md: 0 },
              order: { xs: 2, md: 1 },
              animation: heroTextAnimation,
              transformOrigin: { xs: "center top", md: "left center" },
              "@keyframes heroTextIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(10px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Typography
              sx={{
                mb: { xs: 1.2, md: 1.4 },
                color: colors.accent,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Eye Optic - precyzja, ergonomia, komfort
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: { xs: 1.02, md: 0.95 },
                fontSize: {
                  xs: "clamp(2.2rem, 8.6vw, 4.2rem)",
                  md: "clamp(3.1rem, 4.9vw, 4.5rem)",
                },
                color: colors.text,
                whiteSpace: { xs: "normal", md: "nowrap" },
                maxWidth: "none",
                minHeight: { md: 88 },
              }}
            >
              {activeHero.title}
            </Typography>

            <Typography
              sx={{
                mt: { xs: 1.5, md: 1.4 },
                fontSize: { xs: 15, sm: 16, md: 18 },
                fontWeight: 400,
                lineHeight: 1.65,
                color: colors.textSoft,
                maxWidth: { xs: "100%", md: "34ch" },
                minHeight: { md: 84 },
              }}
            >
              {activeHero.subtitle}
            </Typography>

            <Box sx={{ mt: { xs: 2.5, md: 2.4 }, width: { xs: "100%", sm: "auto" } }}>
              <Button
                component={NextLink}
                href={activeHero.href}
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 3.5,
                  backgroundColor: colors.accent,
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1,
                  minHeight: 56,
                  px: 3.75,
                  py: 0,
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { xs: "100%", sm: 250 },
                  maxWidth: { xs: 360, sm: "none" },
                  whiteSpace: "nowrap",
                  "&:hover": { backgroundColor: colors.accent },
                }}
              >
                {activeHero.buttonLabel}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "center", md: "center" },
              alignItems: "center",
              order: { xs: 1, md: 2 },
              position: "relative",
              pr: { md: 1, lg: 1.5 },
            }}
          >
            <Box
              key={`hero-image-frame-${heroIndex}`}
              sx={{
                width: "100%",
                maxWidth: { xs: 380, sm: 620, md: 1320 },
                aspectRatio: { xs: "4 / 3", sm: "16 / 10" },
                height: { md: 580 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 1, sm: 2, md: 0.5 },
                py: { xs: 1, sm: 1.5, md: 2 },
                animation: heroImageAnimation,
                "@keyframes heroImageIn": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(8px) scale(0.992)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={activeHero.img}
                alt={activeHero.title}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  height: {
                    xs: "100%",
                    md: activeHeroImageLayout.desktopHeight ?? "88%",
                  },
                  maxWidth: {
                    xs: "100%",
                    md: activeHeroImageLayout.desktopMaxWidth ?? "96%",
                  },
                  maxHeight: "100%",
                  display: "block",
                  objectFit: "contain",
                  objectPosition:
                    activeHeroImageLayout.objectPosition ?? "center center",
                }}
              />
            </Box>

            <Box
              sx={{
                mt: 2,
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <Button
                onClick={prevHero}
                aria-label="Poprzedni slajd"
                sx={{
                  ...heroArrowSx,
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  backgroundColor: "rgba(255,255,255,0.56)",
                  boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
                  "&:hover": {
                    ...heroArrowSx["&:hover"],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 20 }} />
              </Button>

              <Button
                onClick={nextHero}
                aria-label="Następny slajd"
                sx={{
                  ...heroArrowSx,
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  backgroundColor: "rgba(255,255,255,0.56)",
                  boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
                  "&:hover": {
                    ...heroArrowSx["&:hover"],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 20 }} />
              </Button>
            </Box>
          </Box>

          <Button
            onClick={nextHero}
            aria-label="Następny slajd"
            sx={{
              position: "absolute",
              right: { md: -30, lg: -38 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              display: { xs: "none", md: "inline-flex" },
              ...heroArrowSx,
              "&:hover": {
                ...heroArrowSx["&:hover"],
                transform: "translateY(-50%) scale(1.02)",
              },
            }}
          >
            <ChevronRightRoundedIcon sx={{ fontSize: 21 }} />
          </Button>
        </Box>

        <Box sx={{ maxWidth: 1260, mx: "auto" }}>
          <RevealSection>
            {/* WHY */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Korzyści</SectionEyebrow>

              <Typography
                sx={{
                  fontSize: { xs: 28, md: 40 },
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: colors.text,
                  maxWidth: { xs: "100%", md: "18ch" },
                }}
              >
                {home.why.heading}
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  display: "grid",
                  gap: 1.5,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                }}
              >
                {home.why.tiles.map((t) => (
                  <GlassTile key={t} text={t} />
                ))}
              </Box>
            </Box>
          </RevealSection>

          <RevealSection delay={90}>
            {/* PROCESS */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Proces doboru</SectionEyebrow>

              <Typography
                sx={{
                  fontSize: { xs: 24, md: 34 },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: colors.text,
                }}
              >
                {home.process.heading}
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: colors.textSoft,
                  fontSize: 15,
                  fontWeight: 400,
                  maxWidth: { xs: "100%", md: 760 },
                  lineHeight: 1.75,
                }}
              >
                {home.process.text}
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  display: "grid",
                  gap: 1.5,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                }}
              >
                {home.process.steps.map((step) => (
                  <StepCard
                    key={step.n}
                    n={step.n}
                    title={step.title}
                    desc={step.desc}
                  />
                ))}
              </Box>
            </Box>
          </RevealSection>

          <RevealSection delay={140}>
            {/* COMPARE */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Porównanie systemów</SectionEyebrow>

              <Typography
                sx={{
                  fontSize: { xs: 24, md: 34 },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: colors.text,
                  maxWidth: { xs: "100%", md: "24ch" },
                }}
              >
                {home.compare.heading}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  borderRadius: 3,
                  overflow: "hidden",
                  border: `1px solid ${colors.border}`,
                  boxShadow: colors.shadowSm,
                  backgroundColor: colors.surface,
                }}
              >
                {home.compare.rows.map((r, idx) => (
                  <Box key={r.left}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        px: { xs: 2, md: 2.5 },
                        py: { xs: 1.6, md: 1.9 },
                      }}
                    >
                      <Typography
                        sx={{
                          color: colors.textSoft,
                          fontWeight: 600,
                          fontSize: 15,
                          lineHeight: 1.35,
                        }}
                      >
                        {r.left}
                      </Typography>
                      <WinnerPill label={r.right} />
                    </Box>

                    {idx !== home.compare.rows.length - 1 && (
                      <Divider sx={{ borderColor: "rgba(15,23,42,0.08)" }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </RevealSection>

          <RevealSection delay={180}>
            {/* FAQ */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Najczęstsze pytania</SectionEyebrow>

              <Typography
                sx={{
                  fontSize: { xs: 24, md: 34 },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: colors.text,
                }}
              >
                {home.faqPreview.heading}
              </Typography>

              <Box sx={{ mt: 2, display: "grid", gap: 1.5 }}>
                {home.faqPreview.items.map((it) => (
                  <Box
                    key={it.q}
                    sx={{
                      borderRadius: 3,
                      p: 2.5,
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`,
                      boxShadow: colors.shadowSm,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 16, md: 17 },
                        lineHeight: 1.35,
                        color: colors.text,
                      }}
                    >
                      {it.q}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        color: colors.textSoft,
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: 1.75,
                      }}
                    >
                      {it.a}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Link
                component={NextLink}
                href={home.faqPreview.moreHref}
                underline="none"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 2.5,
                  color: colors.accent,
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {home.faqPreview.moreLabel}
                <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
              </Link>
            </Box>
          </RevealSection>
        </Box>

        <Footer />
      </Container>
    </Box>
  );
}

function SectionEyebrow({ children }) {
  return (
    <Typography
      sx={{
        mb: 1,
        color: colors.accent,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );
}

function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Box>
  );
}

function GlassTile({ text }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2.5,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowSm,
      }}
    >
      <Typography
        sx={{
          color: colors.text,
          fontWeight: 600,
          fontSize: { xs: 15, md: 15 },
          lineHeight: 1.35,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function StepCard({ n, title, desc }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2.5,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowSm,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 999,
          backgroundColor: colors.accentSoft,
          color: colors.accent,
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          lineHeight: 1.1,
          fontSize: 13,
        }}
      >
        {n}
      </Box>

      <Typography
        sx={{
          mt: 2,
          fontWeight: 700,
          fontSize: { xs: 17, md: 18 },
          lineHeight: 1.3,
          color: colors.text,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: colors.textSoft,
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.75,
        }}
      >
        {desc}
      </Typography>
    </Box>
  );
}

function WinnerPill({ label }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.2,
        py: 0.55,
        fontWeight: 800,
        color: colors.accent,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <TrendingUpRoundedIcon sx={{ fontSize: 18, opacity: 0.75 }} />
    </Box>
  );
}
