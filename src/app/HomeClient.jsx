"use client";

import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import colors from "@/data/colors";
import content from "@/data/content";
import { formatDisplayText } from "@/lib/text";
import { getActionButtonSx } from "@/components/ui/buttonStyles";
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
const heroSwipeHintShowDelayMs = 800;
const heroSwipeHintAutoDismissAfterAdvances = 2;
const heroInitialAutoplayDelayMs = 3300;
const heroAutoplayDelayMs = 7000;
const heroAutoplayPauseAfterInteractionMs = 8000;
const heroAutoTransition = {
  fadeOutMs: 500,
  switchPauseMs: 80,
  fadeInMs: 900,
};
const heroManualTransition = {
  fadeOutMs: 300,
  switchPauseMs: 50,
  fadeInMs: 550,
};

const getHeroTransitionTimings = (profile) =>
  profile === "manual" ? heroManualTransition : heroAutoTransition;

export default function HomeClient() {
  const { home } = content;
  const heroSlides = home.hero.slides;
  const compactDesktopTextInset = 52;
  const heroDesktopMaxWidth = 1320;
  const wideDesktopMinWidth = 1536;
  const compactMobileHeroQuery =
    "@media (max-width:599.95px) and (max-height:760px)";
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroContentVisible, setHeroContentVisible] = useState(true);
  const [heroTransitionProfile, setHeroTransitionProfile] = useState("auto");
  const [heroAutoplayHasAdvanced, setHeroAutoplayHasAdvanced] =
    useState(false);
  const [heroAutoplayPausedUntil, setHeroAutoplayPausedUntil] = useState(0);
  const [showHeroSwipeHint, setShowHeroSwipeHint] = useState(false);
  const [showMobileProcessSection, setShowMobileProcessSection] =
    useState(false);

  const activeHero = heroSlides[heroIndex];
  const activeHeroImageLayout = activeHero.imageLayout ?? {};
  const activeHeroMobileObjectPosition =
    activeHeroImageLayout.mobileObjectPosition ??
    activeHeroImageLayout.objectPosition ??
    "center center";
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);
  const heroFadeTimerRef = useRef(null);
  const heroRevealTimerRef = useRef(null);
  const heroSwipeHintShowTimerRef = useRef(null);
  const heroSwipeHintDismissedRef = useRef(false);
  const heroSwipeHintVisibleRef = useRef(false);
  const heroSwipeHintAutoAdvanceCountRef = useRef(0);

  const heroTransitionTimings =
    getHeroTransitionTimings(heroTransitionProfile);
  const heroContentTransition = `opacity ${
    heroContentVisible
      ? heroTransitionTimings.fadeInMs
      : heroTransitionTimings.fadeOutMs
  }ms cubic-bezier(0.33, 1, 0.68, 1)`;

  const pauseHeroAutoplay = () => {
    setHeroAutoplayPausedUntil(
      Date.now() + heroAutoplayPauseAfterInteractionMs,
    );
  };

  const dismissHeroSwipeHint = useCallback(() => {
    heroSwipeHintDismissedRef.current = true;
    window.clearTimeout(heroSwipeHintShowTimerRef.current);
    heroSwipeHintVisibleRef.current = false;
    setShowHeroSwipeHint(false);
  }, []);

  const transitionToHero = (nextIndex, transitionProfile = "auto") => {
    const transitionTimings = getHeroTransitionTimings(transitionProfile);

    window.clearTimeout(heroFadeTimerRef.current);
    window.clearTimeout(heroRevealTimerRef.current);

    setHeroTransitionProfile(transitionProfile);
    setHeroContentVisible(false);

    heroFadeTimerRef.current = window.setTimeout(() => {
      setHeroIndex(nextIndex);

      heroRevealTimerRef.current = window.setTimeout(() => {
        setHeroContentVisible(true);
      }, transitionTimings.switchPauseMs);
    }, transitionTimings.fadeOutMs);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileRevealBreakpoint);

    const clearHeroSwipeHintTimers = () => {
      window.clearTimeout(heroSwipeHintShowTimerRef.current);
    };

    const scheduleHeroSwipeHint = () => {
      clearHeroSwipeHintTimers();

      if (!mediaQuery.matches || heroSwipeHintDismissedRef.current) {
        heroSwipeHintVisibleRef.current = false;
        setShowHeroSwipeHint(false);
        return;
      }

      heroSwipeHintShowTimerRef.current = window.setTimeout(() => {
        if (!mediaQuery.matches || heroSwipeHintDismissedRef.current) return;

        heroSwipeHintVisibleRef.current = true;
        heroSwipeHintAutoAdvanceCountRef.current = 0;
        setShowHeroSwipeHint(true);
      }, heroSwipeHintShowDelayMs);
    };

    const handleHeroSwipeHintMediaChange = () => {
      scheduleHeroSwipeHint();
    };

    scheduleHeroSwipeHint();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleHeroSwipeHintMediaChange);
    } else {
      mediaQuery.addListener(handleHeroSwipeHintMediaChange);
    }

    return () => {
      clearHeroSwipeHintTimers();

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener(
          "change",
          handleHeroSwipeHintMediaChange,
        );
      } else {
        mediaQuery.removeListener(handleHeroSwipeHintMediaChange);
      }
    };
  }, []);

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

  useEffect(() => {
    if (heroSlides.length < 2) return;

    const pauseRemainingMs = Math.max(
      0,
      heroAutoplayPausedUntil - Date.now(),
    );
    const slideDelayMs = heroAutoplayHasAdvanced
      ? heroAutoplayDelayMs
      : heroInitialAutoplayDelayMs;
    const timeoutDelayMs = Math.max(pauseRemainingMs, slideDelayMs);

    const timer = window.setTimeout(() => {
      setHeroAutoplayHasAdvanced(true);
      transitionToHero(
        heroIndex === heroSlides.length - 1 ? 0 : heroIndex + 1,
        "auto",
      );

      if (
        heroSwipeHintVisibleRef.current &&
        !heroSwipeHintDismissedRef.current
      ) {
        heroSwipeHintAutoAdvanceCountRef.current += 1;

        if (
          heroSwipeHintAutoAdvanceCountRef.current >=
          heroSwipeHintAutoDismissAfterAdvances
        ) {
          dismissHeroSwipeHint();
        }
      }
    }, timeoutDelayMs);

    return () => window.clearTimeout(timer);
  }, [
    heroAutoplayHasAdvanced,
    heroAutoplayPausedUntil,
    heroIndex,
    heroSlides.length,
    dismissHeroSwipeHint,
  ]);

  useEffect(() => {
    return () => {
      window.clearTimeout(heroFadeTimerRef.current);
      window.clearTimeout(heroRevealTimerRef.current);
    };
  }, []);

  const goToHero = (nextIndex, interacted = true) => {
    if (nextIndex === heroIndex) return;

    if (interacted) {
      dismissHeroSwipeHint();
      pauseHeroAutoplay();
    }

    transitionToHero(nextIndex, interacted ? "manual" : "auto");
  };

  const prevHero = (interacted = true) => {
    goToHero(
      heroIndex === 0 ? heroSlides.length - 1 : heroIndex - 1,
      interacted,
    );
  };

  const nextHero = (interacted = true) => {
    goToHero(
      heroIndex === heroSlides.length - 1 ? 0 : heroIndex + 1,
      interacted,
    );
  };

  const handleHeroTouchStart = (event) => {
    pauseHeroAutoplay();
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
    display: { xs: "none", md: "inline-flex" },
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    width: 40,
    height: 40,
    flex: "0 0 40px",
    p: 0,
    borderRadius: "50%",
    opacity: 0.32,
    color: "rgba(15,23,42,0.46)",
    background: "transparent",
    border: "1px solid transparent",
    boxShadow: "none",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    transition:
      "opacity 180ms ease, transform 180ms ease, background 180ms ease, box-shadow 180ms ease, border-color 180ms ease, color 180ms ease",
    ".hero-carousel-region:hover &": {
      opacity: 0.76,
      color: "rgba(15,23,42,0.58)",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(247,251,250,0.64))",
      borderColor: "rgba(15,23,42,0.075)",
      boxShadow:
        "0 5px 14px rgba(15,23,42,0.035), inset 0 1px 0 rgba(255,255,255,0.74)",
      backdropFilter: "blur(10px) saturate(112%)",
      WebkitBackdropFilter: "blur(10px) saturate(112%)",
    },
    "&:hover": {
      opacity: 1,
      color: "rgba(20,145,143,0.9)",
      background:
        "linear-gradient(135deg, rgba(250,254,253,0.98), rgba(224,246,241,0.94))",
      borderColor: "rgba(38,176,173,0.22)",
      boxShadow:
        "0 9px 22px rgba(15,23,42,0.06), 0 3px 10px rgba(38,176,173,0.05)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      color: "rgba(20,145,143,0.9)",
      background:
        "linear-gradient(135deg, rgba(250,254,253,0.98), rgba(224,246,241,0.94))",
      borderColor: "rgba(38,176,173,0.22)",
      transform: "translateY(0)",
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.accent}`,
      outlineOffset: 4,
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
                xs: "clamp(620px, calc(100svh - 168px), 720px)",
                sm: "clamp(640px, calc(100svh - 148px), 760px)",
                md: "calc(100svh - 118px)",
              },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "39% 61%" },
              alignItems: { xs: "start", md: "center" },
              gap: { xs: "clamp(12px, 3.5vw, 20px)", sm: 3, md: 1.2, lg: 1.5 },
              position: "relative",
              width: "100%",
              maxWidth: { xs: "100%", md: heroDesktopMaxWidth, xl: 1360 },
              mx: "auto",
              px: { xs: 0.5, md: 2.5, lg: 3.5 },
              pt: {
                xs: "calc(env(safe-area-inset-top) + 22px)",
                md: 2,
                lg: 3,
              },
              pb: { xs: "clamp(26px, 7vw, 46px)", sm: 4.5, md: 4.5, lg: 5 },
              [compactMobileHeroQuery]: {
                minHeight: "auto",
                gap: "10px",
                pt: "calc(env(safe-area-inset-top) + 34px)",
                pb: "20px",
              },
          }}
        >
          <Box
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
              mt: { xs: 0, md: 0 },
              mx: { xs: "auto", md: 0 },
              pl: { xs: 0, md: `${compactDesktopTextInset}px` },
              pt: { md: 2.5, lg: 0 },
              order: { xs: 2, md: 1 },
              opacity: heroContentVisible ? 1 : 0,
              pointerEvents: heroContentVisible ? "auto" : "none",
              transition: heroContentTransition,
              [`@media (min-width:${wideDesktopMinWidth}px)`]: {
                pl: 0,
              },
              [compactMobileHeroQuery]: {
                mt: 0,
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
                mt: { xs: 0, md: 1.4 },
                fontSize: { xs: 15, sm: 16, md: 18 },
                fontWeight: 400,
                lineHeight: 1.6,
                color: colors.textSoft,
                maxWidth: { xs: "36ch", md: "34ch" },
                minHeight: { xs: "clamp(58px, 17vw, 72px)", sm: 52, md: 84 },
                display: "block",
                position: "relative",
                zIndex: 1,
                textAlign: { xs: "center", md: "left" },
                marginInline: { xs: "auto", md: 0 },
                [compactMobileHeroQuery]: {
                  mt: 0,
                },
              }}
            >
              {formatDisplayText(activeHero.subtitle)}
            </Typography>

            <Box
              sx={{
                mt: { xs: "clamp(10px, 3.2vw, 18px)", sm: 1.15, md: 2.4 },
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "36ch", md: "none" },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                marginInline: { xs: "auto", md: 0 },
                [compactMobileHeroQuery]: {
                  mt: "8px",
                },
              }}
            >
              <Button
                component={NextLink}
                href={activeHero.href}
                variant="text"
                disableRipple
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.15 },
                  minWidth: "unset",
                  minHeight: 44,
                  px: 1,
                  py: 1.5,
                  borderRadius: colors.buttonRadius,
                  backgroundColor: "transparent",
                  backgroundImage: "none",
                  border: 0,
                  boxShadow: "none",
                  color: colors.accentStrong,
                  fontSize: { xs: 14.5, sm: 15 },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: 0,
                  textTransform: "none",
                  justifyContent: "center",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  transition: "color 180ms ease, transform 180ms ease",
                  "& .hero-mobile-cta-arrow": {
                    fontSize: 18,
                    transition: "transform 180ms ease, color 180ms ease",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: colors.accent,
                    transform: "none",
                    "& .hero-mobile-cta-arrow": {
                      transform: "translateX(3px)",
                    },
                  },
                  "&:active": {
                    backgroundColor: "transparent",
                    color: colors.accent,
                    transform: "translateY(1px)",
                    "& .hero-mobile-cta-arrow": {
                      transform: "translateX(4px)",
                    },
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${colors.accent}`,
                    outlineOffset: 4,
                  },
                }}
              >
                {activeHero.buttonLabel}
                <ArrowForwardRoundedIcon className="hero-mobile-cta-arrow" />
              </Button>

              <Button
                component={NextLink}
                href={activeHero.href}
                variant="contained"
                disableElevation
                sx={getActionButtonSx("primary", {
                  display: { xs: "none", md: "inline-flex" },
                  fontSize: 16,
                  minHeight: 56,
                  px: 3.75,
                  py: 0,
                  width: "auto",
                  minWidth: 250,
                  maxWidth: "none",
                  mx: 0,
                  justifyContent: "center",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                })}
              >
                {activeHero.buttonLabel}
              </Button>
            </Box>
          </Box>

          <Box
            className="hero-carousel-region"
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
                mt: { xs: "clamp(12px, 4vw, 18px)" },
                mb: 0,
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
                opacity: heroContentVisible ? 1 : 0,
                transition: heroContentTransition,
                [compactMobileHeroQuery]: {
                  mt: "10px",
                  mb: 0.3,
                  whiteSpace: "normal",
                },
              }}
            >
              {activeHero.title}
            </Typography>

            <Box
              sx={{
                mt: { xs: "clamp(8px, 2.5vw, 14px)", md: 0 },
                width: "100%",
                maxWidth: { xs: 640, sm: 700, md: 1180, lg: 1240 },
                aspectRatio: { xs: "4 / 3", sm: "16 / 10" },
                height: { md: 550, lg: 580 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 0, sm: 2, md: 0.5 },
                py: { xs: 0, sm: 1.5, md: 2 },
                position: "relative",
                overflow: "hidden",
                [compactMobileHeroQuery]: {
                  mt: "8px",
                  aspectRatio: "16 / 11",
                  maxWidth: 500,
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
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: { xs: "132%", sm: "126%", md: "auto" },
                  height: {
                    xs: "106%",
                    sm: "104%",
                    md: activeHeroImageLayout.desktopHeight ?? "88%",
                  },
                  maxWidth: {
                    xs: "none",
                    md: activeHeroImageLayout.desktopMaxWidth ?? "96%",
                  },
                  maxHeight: { xs: "none", md: "100%" },
                  display: "block",
                  objectFit: "contain",
                  objectPosition: {
                    xs: activeHeroMobileObjectPosition,
                    md: activeHeroImageLayout.objectPosition ?? "center center",
                  },
                  opacity: heroContentVisible ? 1 : 0,
                  transform: {
                    xs: "translate(-50%, -50%) scale(1.32)",
                    sm: "translate(-50%, -50%) scale(1.28)",
                    md: "translate(-50%, -50%) scale(1)",
                  },
                  transformOrigin: "center center",
                  transition: heroContentTransition,
                  willChange: "opacity",
                  pointerEvents: "none",
                  [compactMobileHeroQuery]: {
                    height: "104%",
                    transform: "translate(-50%, -50%) scale(1.25)",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                mt: { xs: "clamp(6px, 2vw, 12px)", sm: 1, md: -2.65, lg: -2.95 },
                mb: { xs: "clamp(6px, 2.5vw, 14px)", sm: 1.2, md: 2.2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 1, md: 1.1 },
                position: "relative",
                transform: {
                  xs: "none",
                  sm: "none",
                  md: "translateY(-28px)",
                },
                zIndex: 2,
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  alignItems: "center",
                  gap: 0.45,
                  position: "absolute",
                  left: "50%",
                  bottom: "calc(100% + 8px)",
                  zIndex: 3,
                  color: "rgba(45,99,101,0.72)",
                  fontSize: { xs: 12, sm: 12.4 },
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  opacity: showHeroSwipeHint ? 0.52 : 0,
                  pointerEvents: "none",
                  filter: showHeroSwipeHint ? "blur(0)" : "blur(2px)",
                  transform: showHeroSwipeHint
                    ? "translate(-50%, 0) scale(1)"
                    : "translate(-50%, 6px) scale(0.98)",
                  transition:
                    "opacity 620ms cubic-bezier(0.22, 1, 0.36, 1), transform 620ms cubic-bezier(0.22, 1, 0.36, 1), filter 620ms cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "opacity, transform, filter",
                }}
              >
                <Box component="span">Przesuń aby poznać produkty</Box>
              </Box>

              <Button
                onClick={() => prevHero()}
                aria-label="Poprzedni slajd"
                sx={{
                  ...heroArrowSx,
                  "&:hover": {
                    ...heroArrowSx["&:hover"],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ChevronLeftRoundedIcon
                  sx={{ fontSize: 20, color: "inherit" }}
                />
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: 0.9, md: 1 },
                  minWidth: { xs: 62, md: 68 },
                }}
              >
                {heroSlides.map((slide, index) => (
                  <Box
                    key={`${slide.title}-${index}`}
                    component="button"
                    type="button"
                    aria-label={`Pokaż slajd ${index + 1}`}
                    aria-current={index === heroIndex ? "true" : undefined}
                    onClick={() => goToHero(index)}
                    sx={{
                      cursor: "pointer",
                      display: "block",
                      width: index === heroIndex ? 22 : 7,
                      height: 7,
                      p: 0,
                      border: 0,
                      borderRadius: 999,
                      backgroundColor:
                        index === heroIndex
                          ? "rgba(38,176,173,0.78)"
                          : "rgba(15,23,42,0.16)",
                      transition:
                        "width 260ms ease, background-color 220ms ease, transform 220ms ease",
                      transform:
                        index === heroIndex ? "scale(1)" : "scale(0.98)",
                      "&:hover": {
                        backgroundColor:
                          index === heroIndex
                            ? "rgba(38,176,173,0.92)"
                            : "rgba(15,23,42,0.24)",
                      },
                      "&:focus-visible": {
                        outline: `2px solid ${colors.accent}`,
                        outlineOffset: 4,
                      },
                    }}
                  />
                ))}
              </Box>

              <Button
                onClick={() => nextHero()}
                aria-label="Następny slajd"
                sx={{
                  ...heroArrowSx,
                  "&:hover": {
                    ...heroArrowSx["&:hover"],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ChevronRightRoundedIcon
                  sx={{ fontSize: 20, color: "inherit" }}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: 1260,
            mx: "auto",
            mt: { xs: 0, sm: 1, md: 0 },
            [compactMobileHeroQuery]: {
              mt: 0,
            },
          }}
        >
          <Box
            sx={{
              display: { xs: showMobileProcessSection ? "block" : "none", md: "block" },
            }}
          >
            <Box sx={{ mt: { xs: "clamp(30px, 8vw, 52px)", sm: 6, md: 7 } }}>
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
      sx={getActionButtonSx("secondary", {
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.4,
        py: 0.6,
        fontWeight: 800,
        fontSize: 13,
        lineHeight: 1,
        whiteSpace: "nowrap",
        textDecoration: "none",
        cursor: href ? "pointer" : "default",
        "&:hover": href
          ? {
              transform: "translateY(-1px)",
            }
          : undefined,
      })}
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
          boxShadow: "inset 0 0 0 1px rgba(38,176,173,0.08)",
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
