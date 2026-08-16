"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

import colors from "@/data/colors";
import { formatDisplayText } from "@/lib/text";
import {
  bodyTextSx,
  cardTitleSx,
  interactiveCardHoverSx,
  statValueSx,
} from "@/components/home/homeSectionStyles";

export function SectionEyebrow({ children }) {
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

export function RevealSection({
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

export function StepCard({ n, title, desc }) {
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

export function WinnerPill({ label }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: { xs: 1.15, md: 1.35 },
        py: { xs: 0.62, md: 0.68 },
        borderRadius: 999,
        color: colors.accent,
        backgroundColor: "rgba(38,176,173,0.075)",
        border: "1px solid rgba(38,176,173,0.16)",
        fontWeight: 800,
        fontSize: { xs: 12.5, md: 13 },
        lineHeight: 1,
        whiteSpace: "nowrap",
        flex: "0 0 auto",
      }}
    >
      {label}
      <NorthEastRoundedIcon sx={{ fontSize: 15.5, opacity: 0.8 }} />
    </Box>
  );
}

export function AboutStat({ value, title, desc }) {
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

export function BenefitCard({ icon: Icon, title, desc }) {
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
