"use client";

import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import colors from "@/data/colors";
import { formatDisplayText } from "@/lib/text";
import { getActionButtonSx } from "@/components/ui/buttonStyles";
import {
  compactMobileHeroQuery,
  mobileRevealBreakpoint,
  shortMobileHeroQuery,
} from "@/components/home/homeResponsive";

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

export default function HomeHeroCarousel({ home }) {
  const heroSlides = home.hero.slides;
  const compactDesktopTextInset = 52;
  const heroDesktopMaxWidth = 1320;
  const wideDesktopMinWidth = 1536;
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroContentVisible, setHeroContentVisible] = useState(true);
  const [heroTransitionProfile, setHeroTransitionProfile] = useState("auto");
  const [heroAutoplayHasAdvanced, setHeroAutoplayHasAdvanced] =
    useState(false);
  const [heroAutoplayPausedUntil, setHeroAutoplayPausedUntil] = useState(0);
  const [showHeroSwipeHint, setShowHeroSwipeHint] = useState(false);
  const activeHero = heroSlides[heroIndex];
  const activeHeroImageLayout = activeHero.imageLayout ?? {};
  const activeHeroMobileObjectPosition =
    activeHeroImageLayout.mobileObjectPosition ??
    activeHeroImageLayout.objectPosition ??
    "center center";
  const activeHeroMobileScale = activeHeroImageLayout.mobileScale ?? 1.48;
  const activeHeroTabletScale =
    activeHeroImageLayout.tabletScale ?? activeHeroMobileScale;
  const activeHeroCompactMobileScale =
    activeHeroImageLayout.mobileCompactScale ?? activeHeroMobileScale;
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
              minHeight: {
                xs: "clamp(620px, calc(100svh - 168px), 720px)",
                sm: "clamp(640px, calc(100svh - 148px), 760px)",
                md: "calc(100svh - 118px)",
              },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "39% 61%" },
              alignItems: { xs: "start", md: "center" },
              gap: { xs: "clamp(18px, 5vw, 28px)", sm: 3.2, md: 1.2, lg: 1.5 },
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
              [shortMobileHeroQuery]: {
                gap: "8px",
                pt: "calc(env(safe-area-inset-top) + 36px)",
                pb: "10px",
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
                mt: "2px",
              },
              [shortMobileHeroQuery]: {
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
                [shortMobileHeroQuery]: {
                  fontSize: 14.2,
                  lineHeight: 1.5,
                  minHeight: "auto",
                },
              }}
            >
              {formatDisplayText(activeHero.subtitle)}
            </Typography>

            <Box
              sx={{
                mt: { xs: "clamp(16px, 4.8vw, 24px)", sm: 1.5, md: 2.4 },
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "36ch", md: "none" },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                marginInline: { xs: "auto", md: 0 },
                [compactMobileHeroQuery]: {
                  mt: "12px",
                },
                [shortMobileHeroQuery]: {
                  mt: "6px",
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
                  [shortMobileHeroQuery]: {
                    minHeight: 40,
                    py: 0.75,
                    fontSize: 14,
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
              [shortMobileHeroQuery]: {
                pt: 0,
              },
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
                [shortMobileHeroQuery]: {
                  mt: 3.4,
                  fontSize: 13.8,
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
                [shortMobileHeroQuery]: {
                  mt: "6px",
                  fontSize: "clamp(1.75rem, 8vw, 2.25rem)",
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
                [shortMobileHeroQuery]: {
                  mt: "4px",
                  aspectRatio: "16 / 10.2",
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
                  "--hero-mobile-image-scale": activeHeroMobileScale,
                  "--hero-tablet-image-scale": activeHeroTabletScale,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "auto",
                  height: {
                    xs: activeHeroImageLayout.mobileHeight ?? "112%",
                    sm:
                      activeHeroImageLayout.tabletHeight ??
                      activeHeroImageLayout.mobileHeight ??
                      "110%",
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
                    xs: "translate(-50%, -50%) scale(var(--hero-mobile-image-scale))",
                    sm: "translate(-50%, -50%) scale(var(--hero-tablet-image-scale))",
                    md: "translate(-50%, -50%) scale(1)",
                  },
                  transformOrigin: "center center",
                  transition: heroContentTransition,
                  willChange: "opacity",
                  pointerEvents: "none",
                  [compactMobileHeroQuery]: {
                    "--hero-mobile-image-scale": activeHeroCompactMobileScale,
                    height:
                      activeHeroImageLayout.mobileCompactHeight ??
                      activeHeroImageLayout.mobileHeight ??
                      "110%",
                  },
                  [shortMobileHeroQuery]: {
                    height:
                      activeHeroImageLayout.mobileShortHeight ??
                      activeHeroImageLayout.mobileCompactHeight ??
                      activeHeroImageLayout.mobileHeight ??
                      "110%",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                mt: { xs: "clamp(16px, 4.8vw, 24px)", sm: 1.4, md: -2.65, lg: -2.95 },
                mb: { xs: 0, sm: 1.4, md: 2.2 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: "clamp(7px, 2vw, 10px)", md: 1.1 },
                position: "relative",
                transform: {
                  xs: "none",
                  sm: "none",
                  md: "translateY(-28px)",
                },
                zIndex: 2,
                [compactMobileHeroQuery]: {
                  mt: "10px",
                  gap: "6px",
                },
                [shortMobileHeroQuery]: {
                  mt: "10px",
                  gap: "5px",
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  alignItems: "center",
                  gap: 0.45,
                  minHeight: 15,
                  position: "relative",
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
                    ? "translateY(0) scale(1)"
                    : "translateY(4px) scale(0.98)",
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
  );
}
