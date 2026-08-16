import colors from "@/data/colors";
import { getActionButtonSx } from "@/components/ui/buttonStyles";

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

export const ctaButtonSx = getActionButtonSx("primary", {
  fontSize: { xs: 14.5, md: 15.5 },
  minHeight: { xs: 42, md: 46 },
  px: { xs: 2.1, md: 2.8 },
});

export const heroCardSx = {
  p: { xs: 0, md: 1 },
  boxSizing: "border-box",
  width: "100%",
  maxWidth: { xs: "100%", md: 540 },
  mx: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export const panelCardSx = {
  p: { xs: 2, md: 2.4 },
};
