"use client";

import NextLink from "next/link";
import { Box, Divider, Link, Typography } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";

import colors from "@/data/colors";
import { formatDisplayText } from "@/lib/text";
import {
  AboutStat,
  BenefitCard,
  RevealSection,
  SectionEyebrow,
  StepCard,
  WinnerPill,
} from "@/components/home/HomeSectionPrimitives";
import {
  accentNoteSx,
  bodyTextSx,
  cardTitleSx,
  interactiveCardHoverSx,
  sectionHeadingSx,
} from "@/components/home/homeSectionStyles";

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

const compareProductHrefByLabel = {
  TTL: "/products/ttl",
  "Flip-Up": "/products/flipUp",
};

export default function HomePageSections({
  home,
  compactMobileHeroQuery,
  showMobileProcessSection,
}) {
  return (
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
              gap: { xs: 3.4, md: 6 },
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "58ch" },
              }}
            >
              <Typography
                sx={{
                  ...cardTitleSx,
                  maxWidth: { xs: "100%", md: "46ch" },
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
                  maxWidth: "100%",
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
                  maxWidth: "100%",
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
              borderRadius: 2.5,
              overflow: "hidden",
              border: "1px solid rgba(15,23,42,0.065)",
              boxShadow: "0 8px 24px rgba(15,23,42,0.035)",
              backgroundColor: "rgba(255,255,255,0.82)",
            }}
          >
            {home.compare.rows.map((r, idx) => (
              <Box key={r.left}>
                <Box
                  component={NextLink}
                  href={compareProductHrefByLabel[r.right]}
                  aria-label={`Przejdź do strony produktu ${r.right}: ${r.left}`}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: { xs: 1.5, md: 2 },
                    px: { xs: 1.6, sm: 2, md: 2.5 },
                    py: { xs: 1.25, sm: 1.45, md: 2.2 },
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition:
                      "background-color 200ms ease, transform 200ms ease, outline-color 200ms ease",
                    "&:hover": {
                      backgroundColor: "rgba(38,176,173,0.035)",
                      transform: "translateY(-1px)",
                    },
                    "&:focus-visible": {
                      outline: `2px solid ${colors.accent}`,
                      outlineOffset: -2,
                      backgroundColor: "rgba(38,176,173,0.045)",
                    },
                    "@media (max-width:339.95px)": {
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      flex: { xs: "1 1 0", md: "1 1 240px" },
                      minWidth: 0,
                      color: colors.textSoft,
                      fontWeight: 700,
                      fontSize: { xs: 16, md: 17 },
                      lineHeight: 1.35,
                      "@media (max-width:339.95px)": {
                        flexBasis: "100%",
                      },
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

          <Box sx={{ mt: { xs: 2.2, md: 2.6 } }}>
            {home.faqPreview.items.map((it, idx) => (
              <Box
                key={it.q}
                sx={{
                  py: { xs: 2.2, md: 2.65 },
                  borderBottom:
                    idx === home.faqPreview.items.length - 1
                      ? "none"
                      : "1px solid rgba(15,23,42,0.07)",
                }}
              >
                <Typography
                  sx={{
                    ...cardTitleSx,
                    fontSize: { xs: 18, md: 19 },
                  }}
                >
                  {it.q}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    ...bodyTextSx,
                    maxWidth: { xs: "100%", md: "68ch" },
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
  );
}
