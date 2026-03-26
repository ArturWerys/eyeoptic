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

const sectionHeadingSx = {
  fontSize: { xs: 28, md: 40 },
  fontWeight: 800,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  color: colors.text,
};

const bodyTextSx = {
  color: colors.textSoft,
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.75,
};

const cardTitleSx = {
  color: colors.text,
  fontWeight: 700,
  fontSize: { xs: 16, md: 17 },
  lineHeight: 1.35,
};

const compactCardTitleSx = {
  color: colors.text,
  fontWeight: 700,
  fontSize: 15,
  lineHeight: 1.35,
};

const accentNoteSx = {
  color: colors.accent,
  fontSize: 15,
  fontWeight: 800,
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
};

const statValueSx = {
  color: colors.accent,
  fontWeight: 800,
  fontSize: { xs: 28, md: 34 },
  lineHeight: 1,
  letterSpacing: "-0.03em",
};

export default function HomeClient() {
  const { home } = content;
  const heroSlides = home.hero.slides;
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDirection, setHeroDirection] = useState("next");
  const [heroInteracted, setHeroInteracted] = useState(false);

  const heroTextAnimation = `${heroDirection === "prev" ? "heroTextInPrev" : "heroTextInNext"} 700ms cubic-bezier(0.16, 1, 0.3, 1) 120ms both`;
  const heroImageAnimation = `${heroDirection === "prev" ? "heroImageInPrev" : "heroImageInNext"} 560ms cubic-bezier(0.16, 1, 0.3, 1) both`;
  const activeHero = heroSlides[heroIndex];
  const activeHeroImageLayout = activeHero.imageLayout ?? {};
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

  const goToHero = (nextIndex, direction = "next", interacted = true) => {
    setHeroDirection(direction);
    if (interacted) setHeroInteracted(true);
    setHeroIndex(nextIndex);
  };

  const prevHero = (interacted = true) => {
    goToHero(
      heroIndex === 0 ? heroSlides.length - 1 : heroIndex - 1,
      "prev",
      interacted,
    );
  };

  const nextHero = (interacted = true) => {
    goToHero(
      heroIndex === heroSlides.length - 1 ? 0 : heroIndex + 1,
      "next",
      interacted,
    );
  };

  const handleHeroTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  };

  const handleHeroTouchMove = (event) => {
    if (touchStartXRef.current === null) return;

    touchDeltaXRef.current =
      (event.touches[0]?.clientX ?? touchStartXRef.current) -
      touchStartXRef.current;
  };

  const handleHeroTouchEnd = () => {
    const swipeThreshold = 42;

    if (touchDeltaXRef.current <= -swipeThreshold) {
      nextHero();
    } else if (touchDeltaXRef.current >= swipeThreshold) {
      prevHero();
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  const heroArrowSx = {
    minWidth: 44,
    width: 44,
    height: 44,
    borderRadius: "50%",
    color: "rgba(15,23,42,0.72)",
    backgroundColor: "rgba(15,23,42,0.03)",
    border: "1px solid rgba(15,23,42,0.05)",
    boxShadow: "none",
    backdropFilter: "none",
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
              xs: "calc(100svh - 76px)",
              md: "calc(100svh - 118px)",
            },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "39% 61%" },
            alignItems: { xs: "start", md: "center" },
            gap: { xs: 0.5, sm: 3.5, md: 1.5 },
            position: "relative",
            width: "100%",
            mx: "auto",
            px: { xs: 0.5, md: 4, lg: 5 },
            pt: { xs: 0, md: 2, lg: 3 },
            pb: { xs: 0.6, md: 2 },
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
              alignItems: { xs: "flex-start", md: "flex-start" },
              textAlign: { xs: "left", md: "left" },
              width: "100%",
              maxWidth: { xs: "100%", md: "100%" },
              minWidth: 0,
              minHeight: { md: 460 },
              mx: { xs: "auto", md: 0 },
              order: { xs: 2, md: 1 },
              animation: heroTextAnimation,
              transformOrigin: { xs: "center top", md: "left center" },
              "@keyframes heroTextIn": {
                "0%": { opacity: 0, transform: "translateY(10px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
              "@keyframes heroTextInNext": {
                "0%": {
                  opacity: 0,
                  transform: "translate3d(12px, 8px, 0)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                },
              },
              "@keyframes heroTextInPrev": {
                "0%": {
                  opacity: 0,
                  transform: "translate3d(-12px, 8px, 0)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
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
                display: { xs: "none", md: "block" },
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
                display: { xs: "none", md: "block" },
              }}
            >
              {activeHero.title}
            </Typography>

            <Typography
              sx={{
                mt: { xs: -12, md: 1.4 },
                fontSize: { xs: 15, sm: 16, md: 18 },
                fontWeight: 400,
                lineHeight: 1.6,
                color: colors.textSoft,
                maxWidth: { xs: "36ch", md: "34ch" },
                minHeight: { md: 84 },
                display: "block",
                position: "relative",
                zIndex: 1,
                textAlign: { xs: "center", md: "left" },
                marginInline: { xs: "auto", md: 0 },
              }}
            >
              {activeHero.subtitle}
            </Typography>

            <Box
              sx={{
                mt: { xs: 1.95, md: 2.4 },
                width: { xs: "100%", sm: "auto" },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                component={NextLink}
                href={activeHero.href}
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 2.6,
                  backgroundColor: colors.accent,
                  color: colors.white,
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 800,
                  lineHeight: 1,
                  minHeight: { xs: 46, md: 56 },
                  px: { xs: 2.05, md: 3.75 },
                  py: 0,
                  textTransform: "none",
                  width: { xs: "auto", sm: "auto" },
                  minWidth: { xs: "unset", sm: 250 },
                  maxWidth: { xs: 360, sm: "none" },
                  whiteSpace: "nowrap",
                  boxShadow: {
                    xs: "0 6px 12px rgba(15,23,42,0.08)",
                    md: "none",
                  },
                  "&:hover": { backgroundColor: colors.accent },
                }}
              >
                {activeHero.buttonLabel}
              </Button>
            </Box>

            <Box
              sx={{
                mt: 1.55,
                display: { xs: "flex", md: "none" },
                alignSelf: { xs: "center", md: "auto" },
                alignItems: "center",
                justifyContent: "center",
                gap: 0.55,
                px: 0.45,
                py: 0.38,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.26)",
                border: "1px solid rgba(15,23,42,0.04)",
                boxShadow: "0 3px 10px rgba(15,23,42,0.02)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  justifyContent: "center",
                  px: 0.2,
                  width: "100%",
                }}
              >
                {heroSlides.map((slide, index) => (
                  <Box
                    key={`${slide.title}-${index}`}
                    onClick={() =>
                      goToHero(index, index < heroIndex ? "prev" : "next")
                    }
                    sx={{
                      cursor: "pointer",
                      width: index === heroIndex ? 18 : 7,
                      height: 7,
                      borderRadius: 999,
                      backgroundColor:
                        index === heroIndex
                          ? "rgba(14,165,164,0.72)"
                          : "rgba(15,23,42,0.09)",
                      transition:
                        "width 220ms ease, background-color 220ms ease, transform 220ms ease",
                      transform:
                        index === heroIndex ? "scale(1)" : "scale(0.94)",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              order: { xs: 1, md: 2 },
              position: "relative",
              pr: { md: 1, lg: 1.5 },
            }}
            onTouchStart={handleHeroTouchStart}
            onTouchMove={handleHeroTouchMove}
            onTouchEnd={handleHeroTouchEnd}
          >
            <Typography
              sx={{
                mt: { xs: 7.5, sm: 2.25, md: 0 },
                display: { xs: "block", md: "none" },
                color: colors.accent,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Eye Optic - precyzja, ergonomia, komfort
            </Typography>

            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                mt: 1.35,
                mb: -1.2,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.96,
                fontSize: {
                  xs: "clamp(2rem, 8.2vw, 3.35rem)",
                },
                color: colors.text,
                textAlign: "center",
                whiteSpace: "nowrap",
                position: "relative",
                zIndex: 1,
              }}
            >
              {activeHero.title}
            </Typography>

            <Box
              key={`hero-image-frame-${heroIndex}`}
              sx={{
                mt: { xs: -0.75, md: 0 },
                width: "100%",
                maxWidth: { xs: 570, sm: 620, md: 1320 },
                aspectRatio: { xs: "4 / 3", sm: "16 / 10" },
                height: { md: 580 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 0, sm: 2, md: 0.5 },
                py: { xs: "-0.2rem 0", sm: 1.5, md: 2 },
                position: "relative",
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
                "@keyframes heroImageInNext": {
                  "0%": {
                    opacity: 0,
                    transform: "translate3d(8px, 4px, 0) scale(0.996)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0) scale(1)",
                  },
                },
                "@keyframes heroImageInPrev": {
                  "0%": {
                    opacity: 0,
                    transform: "translate3d(-8px, 4px, 0) scale(0.996)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0) scale(1)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={activeHero.img}
                alt={activeHero.title}
                sx={{
                  width: { xs: "120%", md: "auto" },
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
                  transform: { xs: "scale(1.12)", md: "none" },
                  transformOrigin: "center center",
                }}
              />
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

        <Box sx={{ maxWidth: 1260, mx: "auto", mt: { xs: -15, sm: 4, md: 0 } }}>
          <RevealSection delay={0}>
            {/* PROCESS */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Proces doboru</SectionEyebrow>

              <Typography
                sx={{
                  ...sectionHeadingSx,
                  maxWidth: { xs: "100%", md: "18ch" },
                }}
              >
                {home.process.heading}
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  ...bodyTextSx,
                  maxWidth: { xs: "100%", md: 760 },
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

          <RevealSection delay={80}>
            {/* WHY */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Korzyści</SectionEyebrow>

              <Typography
                sx={{
                  ...sectionHeadingSx,
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

          {/* ABOUT */}
          <RevealSection delay={110}>
            <Box sx={{ mt: 8 }}>
              <SectionEyebrow>O nas</SectionEyebrow>
              <Typography
                sx={{
                  ...sectionHeadingSx,
                  maxWidth: { xs: "100%", md: "18ch" },
                  mb: { xs: 2.5, md: 3.5 },
                }}
              >
                Tworzymy rozwiązania, które wspierają komfort
                <br />i precyzję pracy.
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                  gap: { xs: 3, md: 4 },
                  alignItems: { xs: "start", md: "stretch" },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    p: { xs: 2.5, md: 4 },
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 100%)",
                    border: `1px solid ${colors.border}`,
                    boxShadow: colors.shadowSm,
                  }}
                >
                  <Typography
                    sx={{
                      ...cardTitleSx,
                      maxWidth: { xs: "100%", md: "52ch" },
                    }}
                  >
                    Eye Optic to marka stworzona przez specjalistów, którzy od
                    ponad dwudziestu lat dostarczają nowoczesne technologie dla
                    stomatologii.
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2.5,
                      ...bodyTextSx,
                      maxWidth: { xs: "100%", md: "62ch" },
                    }}
                  >
                    Doświadczenie w dziedzinie optyki zabiegowej pozwoliło nam
                    stworzyć linię produktów łączących wysoką jakość z
                    atrakcyjną ceną. Lupy stomatologiczne oraz systemy
                    oświetlenia Eye Optic spełniają rygorystyczne normy dla
                    wyrobów medycznych, a każdy produkt przed dostarczeniem do
                    klienta przechodzi indywidualną kontrolę jakości.
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1.8,
                      ...bodyTextSx,
                      maxWidth: { xs: "100%", md: "62ch" },
                    }}
                  >
                    Nasze rozwiązania są kompatybilne z produktami innych
                    producentów dostępnych na rynku, łatwe w konfiguracji i
                    trwałe w codziennym użytkowaniu. Naszym celem jest
                    wspieranie sukcesów klinicznych klientów poprzez ergonomię,
                    komfort i najwyższą efektywność pracy.
                  </Typography>

                  <Typography
                    sx={{
                      mt: 3,
                      ...accentNoteSx,
                    }}
                  >
                    Poczuj różnicę z Eye Optic.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gap: 1.5,
                    height: "100%",
                    gridTemplateRows: { xs: "auto", md: "repeat(3, 1fr)" },
                  }}
                >
                  <AboutStat
                    value="20+"
                    title="lat doświadczenia"
                    desc="w dostarczaniu nowoczesnych technologii dla stomatologii"
                  />
                  <AboutStat
                    value="100%"
                    title="kontroli jakości"
                    desc="każdy produkt przechodzi indywidualną weryfikację przed dostawą"
                  />
                  <AboutStat
                    value="360°"
                    title="ergonomia i kompatybilność"
                    desc="łatwa konfiguracja i współpraca z rozwiązaniami innych producentów"
                  />
                </Box>
              </Box>
            </Box>
          </RevealSection>

          <RevealSection delay={140}>
            {/* COMPARE */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Porównanie systemów</SectionEyebrow>
              <Typography
                sx={{
                  ...sectionHeadingSx,
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
                          fontWeight: 700,
                          fontSize: { xs: 16, md: 17 },
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
                  ...sectionHeadingSx,
                  maxWidth: { xs: "100%", md: "18ch" },
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
                        ...cardTitleSx,
                      }}
                    >
                      {it.q}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        ...bodyTextSx,
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
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
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
          ...compactCardTitleSx,
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
          ...cardTitleSx,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          ...bodyTextSx,
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

function AboutStat({ value, title, desc }) {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 3,
        p: 2.5,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowSm,
      }}
    >
      <Typography
        sx={{
          ...statValueSx,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          ...cardTitleSx,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.8,
          ...bodyTextSx,
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        {desc}
      </Typography>
    </Box>
  );
}
