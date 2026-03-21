"use client";

import NextLink from "next/link";
import { useRef, useState } from "react";
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

  // --- products carousel (prosta, solidna) ---
  const scrollerRef = useRef(null);
  const [drag, setDrag] = useState({ active: false, x: 0, left: 0 });

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    // przewiń o ~1 kartę (85% szerokości widoku na xs albo ~340 na md)
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

    // szukamy karty, której lewy brzeg jest najbliżej aktualnego scrollLeft
    const current = el.scrollLeft;

    let bestLeft = 0;
    let bestDist = Infinity;

    for (const c of cards) {
      const left = c.offsetLeft; // działa dobrze, bo karty są dziećmi scroller'a
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

  const bullets = [
    { a: "Indywidualny dobór", b: "pod specjalizację" },
    { a: "Systemy", b: "TTL oraz Flip-Up" },
    { a: "Możliwość", b: "korekcji wzroku" },
    { a: "Profesjonalne oświetlenie LED", b: "i akcesoria" },
  ];

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
            minHeight: { xs: "auto", md: "68vh" },
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

          {/* text */}
          <Box
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
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
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
                lineHeight: 1.6,
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
                  fontWeight: 900,
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

          {/* image */}
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

          {/* right arrow */}
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

        {/* bullets */}

        <Box
          sx={{
            mt: { xs: 3, md: 3.5 },
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            alignItems: "center",
          }}
        >
          {bullets.map((t) => (
            <Box
              key={t.a}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: "#1BA39C",
                  flex: "0 0 auto",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "rgba(15, 23, 42, 0.78)",
                  lineHeight: 1.25,
                }}
              >
                {t.a}
                {t.b && (
                  <>
                    <br />
                    {t.b}
                  </>
                )}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider
          sx={{
            mt: { xs: 4, md: 4 },
            mb: { xs: 1.25, md: 2 },
            borderColor: "rgba(15,23,42,0.08)",
          }}
        />
        {/* PRODUCTS */}
        {/* <Box
          id="products"
          sx={{
            mt: { xs: 4, md: 4 },
            mb: { xs: 1.25, md: 2 },
            scrollMarginTop: 110,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 28, md: 40 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            {home.products.heading}
          </Typography>

          <Box sx={{ mt: 3, position: "relative" }}>
            {/* desktop arrows */}
        {/* <Button
              onClick={() => scrollByCard(-1)}
              sx={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 3,
                minWidth: 46,
                width: 46,
                height: 46,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 8px 20px rgba(15,23,42,0.10)",
                color: colors.text,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.98)" },
                display: { xs: "none", md: "flex" },
              }}
            >
              <ChevronLeftRoundedIcon />
            </Button>

            <Button
              onClick={() => scrollByCard(1)}
              sx={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 3,
                minWidth: 46,
                width: 46,
                height: 46,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 8px 20px rgba(15,23,42,0.10)",
                color: colors.text,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.98)" },
                display: { xs: "none", md: "flex" },
              }}
            >
              <ChevronRightRoundedIcon />
            </Button>

            <Box
              ref={scrollerRef}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                py: 0.5,
                px: { xs: 1, md: 2 },
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                cursor: { xs: "auto", md: "grab" },
                scrollSnapStop: "always",

                WebkitMaskImage: {
                  xs: "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
                  md: "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                },
                maskImage: {
                  xs: "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
                  md: "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                },
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              {home.products.tiles.map((t) => ( */}
        {/* //       <ProductCard key={t.title} {...t} />
          //     ))}
          //   </Box>

          //   <Typography sx={{ mt: 1.25, color: colors.textSoft, fontSize: 13 }}>
          //     Przesuń w prawo, aby poznać pełną ofertę.
          //   </Typography>
          // </Box>
        </Box> */}
        {/* WHY */}
        <Box sx={{ mt: 7 }}>
          <Typography
            sx={{
              fontSize: { xs: 28, md: 40 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            {home.why.heading}
          </Typography>
          <Typography sx={{ mt: 2, color: colors.textSoft, fontSize: 15 }}>
            {home.why.text}
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

        {/* COMPARE */}
        <Box sx={{ mt: 7 }}>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 34 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: colors.text,
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
                      fontSize: 15,
                      lineHeight: 1.25,
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

          <Typography sx={{ mt: 2, color: colors.textSoft, fontSize: 14 }}>
            {home.compare.note}
          </Typography>

          <Button
            component={NextLink}
            href="/contact"
            variant="contained"
            disableElevation
            sx={{
              mt: 2.5,
              borderRadius: 3,
              fontWeight: 900,
              px: 3,
              py: 1.2,
              textTransform: "none",
            }}
          >
            Umów dobór
          </Button>
        </Box>

        {/* FAQ preview */}
        <Box sx={{ mt: 7 }}>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 34 },
              fontWeight: 800,
              letterSpacing: "-0.02em",
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
                <Typography sx={{ fontWeight: 800, color: colors.text }}>
                  {it.q}
                </Typography>
                <Typography
                  sx={{ mt: 1, color: colors.textSoft, fontSize: 14 }}
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
              color: colors.text,
              fontWeight: 900,
            }}
          >
            {home.faqPreview.moreLabel}{" "}
            <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
          </Link>
        </Box>

        <Footer />
      </Container>
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
      <Typography sx={{ color: colors.text, fontWeight: 900 }}>
        {text}
      </Typography>
    </Box>
  );
}

function Step({ n, title, desc }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "32px 1fr",
        gap: 1.6,
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 999,
          backgroundColor: colors.accentSoft,
          color: colors.accent,
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          fontSize: 13,
          mt: "2px",
        }}
      >
        {n}
      </Box>

      <Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 15,
            lineHeight: 1.25,
            color: colors.text,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 0.4,
            color: colors.textSoft,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          {desc}
        </Typography>
      </Box>
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
        color: "rgba(15,23,42,0.85)",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <TrendingUpRoundedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
    </Box>
  );
}

function ProductCard({ title, desc, href, cta, img }) {
  return (
    <Box
      component={NextLink}
      href={href}
      data-card="1"
      sx={{
        scrollSnapAlign: "start",
        flex: "0 0 auto",
        width: { xs: "85%", sm: 320, md: 340 },
        textDecoration: "none",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
        transition: "all 200ms ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.12)",
          borderColor: "rgba(15,23,42,0.12)",
        },
      }}
    >
      {/* image */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: "16/10",
          backgroundColor: colors.surfaceAlt,
        }}
      >
        <Box
          component="img"
          src={img || "/hero.jpg"}
          alt={title}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.30), rgba(0,0,0,0) 50%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* body */}
      <Box sx={{ p: 2.5 }}>
        <Typography
          sx={{ color: colors.textSoft, fontSize: 14, lineHeight: 1.6 }}
        >
          {desc}
        </Typography>

        <Box
          sx={{
            mt: 2.5,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: colors.accent,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {title} <NorthEastRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    </Box>
  );
}
