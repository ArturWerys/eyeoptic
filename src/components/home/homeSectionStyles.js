import colors from "@/data/colors";

export const sectionHeadingSx = {
  fontSize: { xs: 40, md: 44 },
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

export const cardTitleSx = {
  color: colors.text,
  fontWeight: 700,
  fontSize: { xs: 17, md: 18 },
  lineHeight: 1.35,
};

export const accentNoteSx = {
  color: colors.accent,
  fontSize: { xs: 16, md: 17 },
  fontWeight: 800,
  letterSpacing: "-0.015em",
  lineHeight: 1.1,
};

export const statValueSx = {
  color: colors.accent,
  fontWeight: 800,
  fontSize: { xs: 30, md: 38 },
  lineHeight: 1,
  letterSpacing: "-0.03em",
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
