import colors from "@/data/colors";

export const sectionHeadingSx = {
  fontSize: { xs: 34, sm: 40, md: 44 },
  fontWeight: 800,
  lineHeight: 1.04,
  letterSpacing: "-0.03em",
  color: colors.text,
};

export const bodyTextSx = {
  color: colors.textSoft,
  fontSize: { xs: 15.5, md: 16 },
  fontWeight: 400,
  lineHeight: 1.75,
};

export const heroAccentSx = {
  mt: 1.8,
  color: colors.accent,
  fontSize: { xs: 14, md: 15 },
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  "@media (max-width:359.95px)": {
    fontSize: 12.4,
    letterSpacing: "0.08em",
  },
};

export const cardTitleSx = {
  color: colors.text,
  fontWeight: 700,
  fontSize: { xs: 17, md: 18 },
  lineHeight: 1.35,
};

export const interactiveCardHoverSx = {
  transition:
    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 16px 38px rgba(15,23,42,0.07)",
    borderColor: "rgba(15,23,42,0.09)",
  },
};

export const ctaButtonSx = {
  borderRadius: 2.8,
  backgroundColor: "rgba(14,165,164,0.12)",
  color: colors.accent,
  border: "1px solid rgba(14,165,164,0.2)",
  fontSize: { xs: 14.5, md: 15.5 },
  fontWeight: 800,
  lineHeight: 1,
  minHeight: { xs: 42, md: 46 },
  px: { xs: 2.1, md: 2.8 },
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "rgba(14,165,164,0.16)",
    boxShadow: "none",
  },
};

export const heroCardSx = {
  borderRadius: 5,
  p: { xs: 2.5, md: 3.5 },
  width: "100%",
  maxWidth: { xs: "100%", md: 540 },
  mx: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)",
  border: `1px solid ${colors.border}`,
  boxShadow: colors.shadowSm,
};

export const panelCardSx = {
  borderRadius: 4,
  p: { xs: 2, md: 2.4 },
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.84) 100%)",
  border: `1px solid ${colors.border}`,
  boxShadow: colors.shadowSm,
};
