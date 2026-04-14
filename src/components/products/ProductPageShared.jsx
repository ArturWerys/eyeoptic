"use client";

import NextLink from "next/link";
import { Box, Button, Typography } from "@mui/material";

import colors from "@/data/colors";
import { formatDisplayText } from "@/lib/text";
import {
  bodyTextSx,
  cardTitleSx,
  ctaButtonSx,
  interactiveCardHoverSx,
} from "./productPageStyles";

export function ProductImageCard({
  src,
  alt,
  sx,
  imageSx,
  objectPosition = "center 50%",
  loading = "lazy",
  fetchPriority = "auto",
}) {
  return (
    <Box
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.surfaceAlt,
        boxShadow: colors.shadowSm,
        position: "relative",
        aspectRatio: "7/5",
        ...interactiveCardHoverSx,
        ...sx,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          filter: "contrast(1.02) saturate(1.02)",
          ...imageSx,
        }}
      />
    </Box>
  );
}

export function ProductSectionEyebrow({ children, sx }) {
  return (
    <Typography
      sx={{
        mb: 1.15,
        color: colors.accent,
        fontSize: { xs: 13, md: 14 },
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

export function ProductBulletItem({ children, sx, dotSx, textSx }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.2,
        ...sx,
      }}
    >
      <Box
        sx={{
          mt: "10px",
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: colors.accent,
          flex: "0 0 auto",
          ...dotSx,
        }}
      />
      <Typography
        sx={{
          color: colors.textSoft,
          fontSize: { xs: 15.5, md: 16 },
          fontWeight: 600,
          lineHeight: 1.7,
          ...textSx,
        }}
      >
        {formatDisplayText(children)}
      </Typography>
    </Box>
  );
}

export function ProductBenefitLine({
  title,
  desc,
  titleSx,
  descSx,
  sx,
  dotSx,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.2,
        ...sx,
      }}
    >
      <Box
        sx={{
          mt: "10px",
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: colors.accent,
          flex: "0 0 auto",
          ...dotSx,
        }}
      />
      <Box>
        <Typography
          sx={{
            ...cardTitleSx,
            letterSpacing: "0.01em",
            ...titleSx,
          }}
        >
          {formatDisplayText(title)}
        </Typography>
        <Typography
          sx={{
            mt: 0.45,
            ...bodyTextSx,
            maxWidth: { xs: "100%", md: "40ch" },
            ...descSx,
          }}
        >
          {formatDisplayText(desc)}
        </Typography>
      </Box>
    </Box>
  );
}

export function ProductConsultationSection({
  title,
  description,
  buttonLabel,
  sx,
  titleSx,
  descriptionSx,
  buttonSx,
  href = "/contact",
}) {
  return (
    <Box
      sx={{
        pt: 2.6,
        borderTop: "1px solid rgba(15,23,42,0.08)",
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: colors.text,
          fontSize: { xs: 28, md: 34 },
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: "-0.03em",
          maxWidth: { xs: "100%", md: "14ch" },
          ...titleSx,
        }}
      >
        {formatDisplayText(title)}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          ...bodyTextSx,
          maxWidth: { xs: "100%", md: "42ch" },
          ...descriptionSx,
        }}
      >
        {formatDisplayText(description)}
      </Typography>

      <Button
        component={NextLink}
        href={href}
        variant="contained"
        disableElevation
        sx={{
          ...ctaButtonSx,
          mt: 1.8,
          ...buttonSx,
        }}
      >
        {formatDisplayText(buttonLabel)}
      </Button>
    </Box>
  );
}
