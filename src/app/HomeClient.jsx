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
import { formatDisplayText } from "@/lib/text";
import NavbarPill from "@/components/NavbarPill";
import Footer from "@/components/Footer";

import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";

const benefitCards = [
  {
    icon: CenterFocusStrongRoundedIcon,
    title: "Maksymalna kontrola pola zabiegowego",
    desc: "Lepsza widoczność obszaru pracy i większa pewność podczas precyzyjnych procedur.",
  },
  {
    icon: ZoomInRoundedIcon,
    title: "Lepsza ocena detali",
    desc: "Łatwiejsze dostrzeganie szczegółów, struktur i granic podczas codziennej pracy.",
  },
  {
    icon: AccessibilityNewRoundedIcon,
    title: "Mniejsze obciążenie odcinka szyjnego i lędźwiowego",
    desc: "Bardziej ergonomiczna pozycja pracy, która pomaga ograniczyć napięcie i zmęczenie.",
  },
  {
    icon: TrackChangesRoundedIcon,
    title: "Stabilna praca w powiększeniu",
    desc: "Większa precyzja ruchu i komfort działania nawet podczas dłuższych zabiegów.",
  },
];

const sectionHeadingSx = {
  fontSize: { xs: 40, md: 44 },
  fontWeight: 800,
  lineHeight: 1.04,
  letterSpacing: "-0.03em",
  color: colors.text,
};

const bodyTextSx = {
  color: colors.textSoft,
  fontSize: { xs: 15.5, md: 16 },
  fontWeight: 400,
  lineHeight: 1.75,
};

const cardTitleSx = {
  color: colors.text,
  fontWeight: 700,
  fontSize: { xs: 17, md: 18 },
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
  fontSize: { xs: 16, md: 17 },
  fontWeight: 800,
  letterSpacing: "-0.015em",
  lineHeight: 1.1,
};

const statValueSx = {
  color: colors.accent,
  fontWeight: 800,
  fontSize: { xs: 30, md: 38 },
  lineHeight: 1,
  letterSpacing: "-0.03em",
};

const interactiveCardHoverSx = {
  transition:
    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 16px 38px rgba(15,23,42,0.07)",
    borderColor: "rgba(15,23,42,0.09)",
  },
};

const mobileRevealBreakpoint = "(max-width: 899.95px)";
const mobileProcessRevealThreshold = 10;

export default function HomeClient() {
  const { home } = content;
  const heroSlides = home.hero.slides;
  const compactDesktopArrowInset = 18;
  const compactDesktopArrowSize = 36;
  const compactDesktopTextInset = 52;
  const heroDesktopMaxWidth = 1320;
  const wideDesktopArrowOffset = -30;
  const wideDesktopMinWidth = 1536;
  const compactMobileHeroQuery =
    "@media (max-width:599.95px) and (max-height:760px)";
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDirection, setHeroDirection] = useState("next");
  const [heroInteracted, setHeroInteracted] = useState(false);
  const [showMobileProcessSection, setShowMobileProcessSection] =
    useState(false);

  const heroTextAnimationName =
    heroDirection === "prev" ? "heroTextInPrev" : "heroTextInNext";
  const heroTextAnimationMobileName =
    heroDirection === "prev" ? "heroTextInPrevMobile" : "heroTextInNextMobile";
  const heroImageAnimationName =
    heroDirection === "prev" ? "heroImageInPrev" : "heroImageInNext";
  const heroImageAnimationMobileName =
    heroDirection === "prev"
      ? "heroImageInPrevMobile"
      : "heroImageInNextMobile";
  const activeHero = heroSlides[heroIndex];
  const activeHeroImageLayout = activeHero.imageLayout ?? {};
  const activeHeroMobileObjectPosition =
    activeHeroImageLayout.mobileObjectPosition ??
    activeHeroImageLayout.objectPosition ??
    "center center";
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

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
                xs: "calc(100svh - 92px)",
                md: "calc(100svh - 118px)",
              },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "39% 61%" },
              alignItems: { xs: "start", md: "center" },
              gap: { xs: 0.5, sm: 3.5, md: 1.2, lg: 1.5 },
              position: "relative",
              width: "100%",
              maxWidth: { xs: "100%", md: heroDesktopMaxWidth, xl: 1360 },
              mx: "auto",
              px: { xs: 0.5, md: 2.5, lg: 3.5 },
              pt: { xs: 1.2, md: 2, lg: 3 },
              pb: { xs: 0.1, md: 2 },
              [compactMobileHeroQuery]: {
                minHeight: "calc(100svh - 92px)",
              gap: 1.25,
              pt: "calc(env(safe-area-inset-top) + 12px)",
              pb: 1.5,
            },
          }}
        >
          <Button
            onClick={prevHero}
            aria-label="Poprzedni slajd"
            sx={{
              position: "absolute",
              left: { md: compactDesktopArrowInset },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              ...heroArrowSx,
              minWidth: { md: compactDesktopArrowSize },
              width: { md: compactDesktopArrowSize },
              height: { md: compactDesktopArrowSize },
              display: { xs: "none", md: "inline-flex" },
              [`@media (min-width:${wideDesktopMinWidth}px)`]: {
                left: wideDesktopArrowOffset,
                minWidth: 44,
                width: 44,
                height: 44,
              },
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
              justifyContent: { xs: "flex-start", md: "flex-start", lg: "center" },
              alignItems: { xs: "flex-start", md: "flex-start" },
              textAlign: { xs: "left", md: "left" },
              width: "100%",
              maxWidth: { xs: "100%", md: "100%" },
              minWidth: 0,
              minHeight: { md: 0, lg: 460 },
              mt: { xs: -10, md: 0 },
              mx: { xs: "auto", md: 0 },
              pl: { xs: 0, md: `${compactDesktopTextInset}px` },
              pt: { md: 2.5, lg: 0 },
              order: { xs: 2, md: 1 },
              transformOrigin: { xs: "center top", md: "left center" },
              ...(heroInteracted
                ? {
                    animationName: {
                      xs: heroTextAnimationMobileName,
                      md: heroTextAnimationName,
                    },
                    animationDuration: {
                      xs: "440ms",
                      md: "700ms",
                    },
                    animationTimingFunction: {
                      xs: "ease-out",
                      md: "cubic-bezier(0.16, 1, 0.3, 1)",
                    },
                    animationDelay: {
                      xs: "0ms",
                      md: "120ms",
                    },
                    animationFillMode: "both",
                  }
                : {
                    animation: "none",
                  }),
              [`@media (min-width:${wideDesktopMinWidth}px)`]: {
                pl: 0,
              },
              [compactMobileHeroQuery]: {
                mt: 0,
              },
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
              "@keyframes heroTextInNextMobile": {
                "0%": {
                  opacity: 0,
                  transform: "translate3d(0, 2px, 0)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                },
              },
              "@keyframes heroTextInPrevMobile": {
                "0%": {
                  opacity: 0,
                  transform: "translate3d(0, 2px, 0)",
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
                mb: { xs: 1.4, md: 1.8 },
                color: colors.accent,
                fontSize: { xs: 18, md: 21 },
                fontWeight: 800,
                letterSpacing: "0.12em",
                display: { xs: "none", md: "block" },
              }}
            >
              Simply see perfectly!
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
                mt: { xs: -8.2, md: 1.4 },
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
                [compactMobileHeroQuery]: {
                  mt: 0.8,
                },
              }}
            >
              {formatDisplayText(activeHero.subtitle)}
            </Typography>

            <Box
              sx={{
                mt: { xs: 1.9, md: 2.4 },
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "36ch", md: "none" },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                marginInline: { xs: "auto", md: 0 },
                [compactMobileHeroQuery]: {
                  mt: 1.4,
                },
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
                  mx: { xs: "auto", md: 0 },
                  justifyContent: "center",
                  textAlign: "center",
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
                mt: 1.2,
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.8,
                px: 0.55,
                py: 0.42,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.34)",
                border: "1px solid rgba(15,23,42,0.05)",
                boxShadow: "0 4px 14px rgba(15,23,42,0.03)",
                backdropFilter: "blur(8px)",
                display: { xs: "flex", md: "none" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                  justifyContent: "center",
                  px: 0.28,
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
                      width: index === heroIndex ? 24 : 9,
                      height: 9,
                      borderRadius: 999,
                      backgroundColor:
                        index === heroIndex
                          ? "rgba(14,165,164,0.84)"
                          : "rgba(15,23,42,0.15)",
                      transition:
                        "width 220ms ease, background-color 220ms ease, transform 220ms ease",
                      transform:
                        index === heroIndex ? "scale(1)" : "scale(0.96)",
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
              pt: { xs: 0, sm: 2.5, md: 0 },
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
                mt: { xs: 5.9, sm: 4.6, md: 0 },
                display: { xs: "block", md: "none" },
                color: colors.accent,
                fontSize: { xs: 15, sm: 16 },
                fontWeight: 800,
                letterSpacing: { xs: "0.08em", sm: "0.1em" },
                textAlign: "center",
                position: "relative",
                zIndex: 2,
                transform: {
                  xs: "translateY(7px)",
                  sm: "translateY(4px)",
                  md: "none",
                },
                [compactMobileHeroQuery]: {
                  mt: 4.1,
                  transform: "none",
                },
              }}
            >
              Simply see perfectly!
            </Typography>

            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                mt: 1.95,
                mb: -0.7,
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
                [compactMobileHeroQuery]: {
                  mt: 1.1,
                  mb: 0.3,
                  whiteSpace: "normal",
                },
              }}
            >
              {activeHero.title}
            </Typography>

            <Box
              key={`hero-image-frame-${heroIndex}`}
              sx={{
                mt: { xs: -0.35, md: 0 },
                width: "100%",
                maxWidth: { xs: 570, sm: 620, md: 1180, lg: 1240 },
                aspectRatio: { xs: "4 / 3", sm: "16 / 10" },
                height: { md: 550, lg: 580 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 0, sm: 2, md: 0.5 },
                py: { xs: "-0.2rem 0", sm: 1.5, md: 2 },
                position: "relative",
                ...(heroInteracted
                  ? {
                      animationName: {
                        xs: heroImageAnimationMobileName,
                        md: heroImageAnimationName,
                      },
                      animationDuration: {
                        xs: "400ms",
                        md: "560ms",
                      },
                      animationTimingFunction: {
                        xs: "ease-out",
                        md: "cubic-bezier(0.16, 1, 0.3, 1)",
                      },
                      animationDelay: "0ms",
                      animationFillMode: "both",
                    }
                  : {
                      animation: "none",
                    }),
                [compactMobileHeroQuery]: {
                  mt: 0.35,
                  aspectRatio: "16 / 11",
                  maxWidth: 420,
                },
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
                "@keyframes heroImageInNextMobile": {
                  "0%": {
                    opacity: 0,
                    transform: "translate3d(0, 2px, 0)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
                  },
                },
                "@keyframes heroImageInPrevMobile": {
                  "0%": {
                    opacity: 0,
                    transform: "translate3d(0, 2px, 0)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={activeHero.img}
                alt={activeHero.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
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
                  objectPosition: {
                    xs: activeHeroMobileObjectPosition,
                    md: activeHeroImageLayout.objectPosition ?? "center center",
                  },
                  transform: { xs: "scale(1.12)", md: "none" },
                  transformOrigin: "center center",
                  [compactMobileHeroQuery]: {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </Box>
          </Box>

          <Button
            onClick={nextHero}
            aria-label="Następny slajd"
            sx={{
              position: "absolute",
              right: { md: compactDesktopArrowInset },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              ...heroArrowSx,
              minWidth: { md: compactDesktopArrowSize },
              width: { md: compactDesktopArrowSize },
              height: { md: compactDesktopArrowSize },
              display: { xs: "none", md: "inline-flex" },
              [`@media (min-width:${wideDesktopMinWidth}px)`]: {
                right: wideDesktopArrowOffset,
                minWidth: 44,
                width: 44,
                height: 44,
              },
              "&:hover": {
                ...heroArrowSx["&:hover"],
                transform: "translateY(-50%) scale(1.02)",
              },
            }}
          >
            <ChevronRightRoundedIcon sx={{ fontSize: 21 }} />
          </Button>
        </Box>

        <Box
          sx={{
            maxWidth: 1260,
            mx: "auto",
            mt: { xs: -18, sm: 3.2, md: 0 },
            [compactMobileHeroQuery]: {
              mt: 2.25,
            },
          }}
        >
          <Box
            sx={{
              display: { xs: showMobileProcessSection ? "block" : "none", md: "block" },
            }}
          >
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
                {formatDisplayText(home.process.text)}
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

              <Link
                component={NextLink}
                href="/contact"
                underline="none"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 2.3,
                  color: colors.accent,
                  fontWeight: 800,
                  fontSize: { xs: 15.5, md: 16.5 },
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  "&:hover": {
                    color: colors.text,
                  },
                }}
              >
                Widzisz, jakie to proste? Skontaktuj się z&nbsp;nami i&nbsp;zamów swoje
                lupy.
                <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
              </Link>
            </Box>
          </Box>

          <RevealSection delay={80}>
            {/* WHY */}
            <Box sx={{ mt: 7 }}>
              <SectionEyebrow>Korzyści</SectionEyebrow>

              <Typography
                sx={{
                  ...sectionHeadingSx,
                  maxWidth: { xs: "100%", md: "14ch" },
                }}
              >
                Co zyskujesz dzięki dobrze dobranym lupom?
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  display: "grid",
                  gap: 1.5,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                }}
              >
                {benefitCards.map((item) => (
                  <BenefitCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                  />
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
                    {formatDisplayText(
                      "Doświadczenie w dziedzinie optyki zabiegowej pozwoliło nam stworzyć linię produktów łączących wysoką jakość z atrakcyjną ceną. Lupy stomatologiczne oraz systemy oświetlenia Eye Optic spełniają rygorystyczne normy dla wyrobów medycznych, a każdy produkt przed dostarczeniem do klienta przechodzi indywidualną kontrolę jakości.",
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1.8,
                      ...bodyTextSx,
                      maxWidth: { xs: "100%", md: "62ch" },
                    }}
                  >
                    {formatDisplayText(
                      "Nasze rozwiązania są kompatybilne z produktami innych producentów dostępnych na rynku, łatwe w konfiguracji i trwałe w codziennym użytkowaniu. Naszym celem jest wspieranie sukcesów klinicznych klientów poprzez ergonomię, komfort i najwyższą efektywność pracy.",
                    )}
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
                        py: { xs: 1.8, md: 2.2 },
                        transition: "background-color 180ms ease",
                        "&:hover": {
                          backgroundColor: "rgba(15,23,42,0.02)",
                        },
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
                        {formatDisplayText(r.left)}
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
                      ...interactiveCardHoverSx,
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
                      {formatDisplayText(it.a)}
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
                {formatDisplayText(home.faqPreview.moreLabel)}
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
        mb: 1.15,
        color: colors.accent,
        fontSize: { xs: 13, md: 14 },
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );
}

function RevealSection({
  children,
  delay = 0,
  instantOnMobile = false,
  mobileDelay = 220,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 899.95px)").matches;

    if (instantOnMobile && isMobile) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, mobileDelay);

      return () => clearTimeout(timer);
    }

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
  }, [instantOnMobile, mobileDelay]);

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
        {formatDisplayText(text)}
      </Typography>
    </Box>
  );
}

function StepCard({ n, title, desc }) {
  const imageSrc = `/images/three-steps/step-${Number(n)}.jpeg`;

  return (
    <Box
      sx={{
        borderRadius: 3,
        p: { xs: 1.45, md: 2.2 },
        width: "100%",
        maxWidth: { xs: 296, md: 332 },
        mx: "auto",
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowSm,
        ...interactiveCardHoverSx,
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            mb: { xs: 0.68, md: 1 },
            display: "inline-flex",
            px: { xs: 1.2, md: 1.35 },
            py: { xs: 0.58, md: 0.65 },
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.78)",
            color: colors.accent,
            border: "1px solid rgba(15,23,42,0.05)",
            boxShadow: "0 6px 16px rgba(15,23,42,0.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            sx={{
              color: "inherit",
              fontWeight: 800,
              fontSize: { xs: 12.8, md: 13 },
              lineHeight: 1,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Krok {String(n).padStart(2, "0")}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "68%", md: "74%" },
            maxWidth: { xs: 192, md: 248 },
            mx: "auto",
            aspectRatio: { xs: "10 / 9", md: "1 / 1" },
            overflow: "hidden",
            borderRadius: 2.75,
          }}
        >
          <Box
            component="img"
            src={imageSrc}
            alt={title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      <Typography
        sx={{
          mt: { xs: 1.45, md: 2.2 },
          ...cardTitleSx,
          fontSize: { xs: 14.8, md: cardTitleSx.fontSize?.md ?? 18 },
          letterSpacing: "0.01em",
        }}
      >
        {formatDisplayText(title)}
      </Typography>

      <Typography
        sx={{
          mt: 0.72,
          ...bodyTextSx,
          fontSize: { xs: 13.9, md: 16 },
        }}
      >
        {formatDisplayText(desc)}
      </Typography>
    </Box>
  );
}

function WinnerPill({ label }) {
  const normalizedLabel = formatDisplayText(label).toLowerCase();
  const href =
    normalizedLabel === "ttl"
      ? "/products/ttl"
      : normalizedLabel === "flip-up"
        ? "/products/flipUp"
        : null;

  return (
    <Box
      component={href ? NextLink : "div"}
      href={href ?? undefined}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.4,
        py: 0.6,
        fontWeight: 800,
        fontSize: 13,
        color: colors.accent,
        backgroundColor: colors.accentSoft,
        borderRadius: 999,
        border: "1px solid rgba(14,165,164,0.18)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        textDecoration: "none",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease",
        cursor: href ? "pointer" : "default",
        "&:hover": href
          ? {
              transform: "translateY(-1px)",
              boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
              borderColor: "rgba(14,165,164,0.28)",
              backgroundColor: "rgba(20,184,166,0.16)",
            }
          : undefined,
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
        ...interactiveCardHoverSx,
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
        {formatDisplayText(title)}
      </Typography>

      <Typography
        sx={{
          mt: 0.8,
          ...bodyTextSx,
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        {formatDisplayText(desc)}
      </Typography>
    </Box>
  );
}
function BenefitCard({ icon: Icon, title, desc }) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        p: { xs: 2.4, md: 3 },
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)",
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowSm,
        minHeight: { md: 196 },
        ...interactiveCardHoverSx,
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2.75,
          backgroundColor: colors.accentSoft,
          color: colors.accent,
          display: "grid",
          placeItems: "center",
          boxShadow: "inset 0 0 0 1px rgba(14,165,164,0.08)",
        }}
      >
        <Icon sx={{ fontSize: 25 }} />
      </Box>

      <Typography
        sx={{
          mt: 2.2,
          ...cardTitleSx,
          letterSpacing: "0.01em",
          maxWidth: { xs: "100%", md: "24ch" },
        }}
      >
        {formatDisplayText(title)}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          ...bodyTextSx,
          maxWidth: { xs: "100%", md: "42ch" },
        }}
      >
        {formatDisplayText(desc)}
      </Typography>
    </Box>
  );
}
