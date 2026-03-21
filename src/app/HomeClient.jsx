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

  const heroTextAnimation =
    "heroTextIn 1500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both";
  const heroImageAnimation =
    "heroImageIn 1300ms cubic-bezier(0.16, 1, 0.3, 1) both";

  const heroSlides = [
    {
      title: "Lupy TTL",
      subtitle:
        "Systemy TTL dopasowane do specjalizacji, stylu pracy i odległości roboczej.",
      href: "/products/ttl",
      buttonLabel: "Zobacz więcej",
      img: "/images/home_page/ttl.png",
    },
    {
      title: "Lupy Flip-Up",
      subtitle:
        "Regulowane rozwiązanie dla użytkowników, którzy cenią możliwość szybkiego dopasowania.",
      href: "/products/flip-up",
      buttonLabel: "Zobacz więcej",
      img: "/images/home_page/flip-up.png",
    },
    {
      title: "Oświetlenie LED",
      subtitle: "Lepsza widoczność pola zabiegowego i wygoda codziennej pracy.",
      href: "/products/oswietlenie-led",
      buttonLabel: "Zobacz więcej",
      img: "/images/home_page/led-free-2.png",
    },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const activeHero = heroSlides[heroIndex];

  const scrollerRef = useRef(null);
  const [drag, setDrag] = useState({ active: false, x: 0, left: 0 });

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector("[data-card='1']");
    const step = card ? card.getBoundingClientRect().width + 16 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onMouseDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDrag({ active: true, x: e.pageX, left: el.scrollLeft });
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    const el = scrollerRef.current;
    if (!el || !drag.active) return;
    const dx = e.pageX - drag.x;
    el.scrollLeft = drag.left - dx;
  };

  const snapToNearestCard = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll("[data-card='1']"));
    if (!cards.length) return;

    const current = el.scrollLeft;

    let bestLeft = 0;
    let bestDist = Infinity;

    for (const c of cards) {
      const left = c.offsetLeft;
      const dist = Math.abs(left - current);
      if (dist < bestDist) {
        bestDist = dist;
        bestLeft = left;
      }
    }

    el.scrollTo({ left: bestLeft, behavior: "smooth" });
  };

  const stopDrag = () => {
    const el = scrollerRef.current;
    if (el) el.style.cursor = "grab";

    if (drag.active) snapToNearestCard();

    setDrag((d) => ({ ...d, active: false }));
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextHero = () => {
    setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
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
          maxWidth: 1360,
          mx: "auto",
          py: { xs: 1.5, md: 2 },
          pt: { xs: "36px", sm: "28px", md: "30px" },
        }}
      >
        <NavbarPill />

        {/* HERO */}
        <Box
          sx={{
            minHeight: {
              xs: "calc(100svh - 110px)",
              md: "calc(100svh - 85px)",
            },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "33% 67%" },
            alignItems: "center",
            gap: { xs: 3, sm: 3.5, md: 2 },
            position: "relative",
            width: "100%",
            mx: "auto",
            px: { md: 7, lg: 9 },
          }}
        >
          <Button
            onClick={prevHero}
            aria-label="Poprzedni slajd"
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: 42,
              width: 42,
              height: 42,
              borderRadius: "50%",
              color: colors.text,
              zIndex: 3,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            <ChevronLeftRoundedIcon />
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
              height: { md: 540 },
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
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: { xs: 1.02, md: 0.95 },
                fontSize: "clamp(2rem, 8vw, 4rem)",
                color: colors.text,
                whiteSpace: "normal",
                maxWidth: "none",
                minHeight: { md: 122 },
              }}
            >
              {activeHero.title}
            </Typography>

            <Typography
              sx={{
                mt: 1.8,
                fontSize: { xs: 14, sm: 15, md: 16 },
                fontWeight: 400,
                lineHeight: 1.7,
                color: colors.textSoft,
                maxWidth: { xs: "100%", md: "34ch" },
                minHeight: { md: 86 },
              }}
            >
              {activeHero.subtitle}
            </Typography>

            <Box sx={{ mt: 3, width: { xs: "100%", sm: "auto" } }}>
              <Button
                component={NextLink}
                href={activeHero.href}
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 1.5,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  px: 3.2,
                  py: 1.2,
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: { xs: 320, sm: "none" },
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
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
              order: { xs: 1, md: 2 },
              position: "relative",
            }}
          >
            <Box
              key={`hero-image-frame-${heroIndex}`}
              sx={{
                width: "100%",
                maxWidth: { xs: 360, sm: 560, md: 1100 },
                aspectRatio: { xs: "4 / 3", sm: "16 / 10" },
                height: { md: 540 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 1, sm: 2, md: 3 },
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
                  height: { xs: "100%", md: "92%" },
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  objectFit: "contain",
                  objectPosition: "center",
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
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.surface,
                }}
              >
                <ChevronLeftRoundedIcon />
              </Button>

              <Button
                onClick={nextHero}
                aria-label="Następny slajd"
                sx={{
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.surface,
                }}
              >
                <ChevronRightRoundedIcon />
              </Button>
            </Box>
          </Box>

          <Button
            onClick={nextHero}
            aria-label="Następny slajd"
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: 42,
              width: 42,
              height: 42,
              borderRadius: "50%",
              color: colors.text,
              zIndex: 3,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            <ChevronRightRoundedIcon />
          </Button>
        </Box>

        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
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
      }
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
