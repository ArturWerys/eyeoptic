import colors from "@/data/colors";

const buttonTransition =
  "transform 180ms ease, background-position 260ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease";

/* -------------------------------------------------------
   BACKGROUNDS
------------------------------------------------------- */

// Najważniejsze CTA „Umów prezentację”
// Delikatnie mocniejsze niż primary, ale nadal glass.
const ctaButtonBg =
  "linear-gradient(135deg, rgba(242,252,250,0.99) 0%, rgba(211,242,237,0.97) 100%)";

const ctaButtonBgHover =
  "linear-gradient(135deg, rgba(238,251,249,1) 0%, rgba(199,238,232,0.99) 100%)";

/* -------------------------------------------------------
   SHADOWS
------------------------------------------------------- */

const ctaButtonShadow =
  "0 9px 24px rgba(15,23,42,0.058), 0 3px 10px rgba(38,176,173,0.04), inset 0 1px 0 rgba(255,255,255,0.94)";

const ctaButtonShadowHover =
  "0 13px 30px rgba(15,23,42,0.07), 0 4px 12px rgba(38,176,173,0.055), inset 0 1px 0 rgba(255,255,255,0.98)";

/* -------------------------------------------------------
   BASE
------------------------------------------------------- */

const actionButtonBaseSx = {
  borderRadius: colors.buttonRadius,

  backdropFilter: colors.softGlassBlur,
  WebkitBackdropFilter: colors.softGlassBlur,

  backgroundSize: "125% 125%",
  backgroundPosition: "0% 50%",

  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: 0,
  textTransform: "none",

  transition: buttonTransition,

  "&:hover": {
    backgroundPosition: "100% 50%",
    transform: "translateY(-1px)",
  },

  "&:active": {
    transform: "translateY(0)",
  },

  "&:focus-visible": {
    outline: `2px solid ${colors.accent}`,
    outlineOffset: 4,
  },
};

/* -------------------------------------------------------
   VARIANTS
------------------------------------------------------- */

const actionButtonVariants = {
  // „Poznaj lupy TTL”
  primary: {
    backgroundColor: "rgba(38,176,173,0.1)",
    backgroundImage: "none",
    border: 0,
    color: colors.accentStrong,
    boxShadow: "none",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",

    "&:hover": {
      backgroundColor: "rgba(38,176,173,0.14)",
      backgroundImage: "none",
      borderColor: "transparent",
      color: colors.accentStrong,
      boxShadow: "none",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    },

    "&:active": {
      backgroundColor: "rgba(38,176,173,0.18)",
      backgroundImage: "none",
      borderColor: "transparent",
      boxShadow: "none",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    },
  },

  // „Umów prezentację”
  cta: {
    backgroundColor: "rgba(224,247,242,0.82)",
    backgroundImage: ctaButtonBg,

    border: "1px solid rgba(38,176,173,0.24)",

    color: colors.accentStrong,
    boxShadow: ctaButtonShadow,

    "&:hover": {
      backgroundColor: "rgba(214,243,238,0.92)",
      backgroundImage: ctaButtonBgHover,

      borderColor: "rgba(38,176,173,0.34)",

      color: colors.accentStrong,
      boxShadow: ctaButtonShadowHover,
    },
  },

  // Przyciski pomocnicze
  secondary: {
    backgroundColor: "rgba(255,255,255,0.68)",
    backgroundImage:
      "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(244,251,249,0.86) 100%)",

    border: "1px solid rgba(38,176,173,0.12)",

    color: colors.accentStrong,
    boxShadow:
      "0 8px 20px rgba(15,23,42,0.045), inset 0 1px 0 rgba(255,255,255,0.9)",

    "&:hover": {
      backgroundColor: "rgba(245,252,250,0.9)",
      backgroundImage:
        "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(234,249,246,0.92) 100%)",

      borderColor: "rgba(38,176,173,0.22)",
      color: colors.accentStrong,

      boxShadow:
        "0 11px 24px rgba(15,23,42,0.055), inset 0 1px 0 rgba(255,255,255,0.95)",
    },
  },

  // Mail / telefon w dolnym pasku
  neutral: {
    backgroundColor: "rgba(255,255,255,0.58)",
    backgroundImage:
      "linear-gradient(135deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.66) 100%)",

    border: "1px solid rgba(15,23,42,0.07)",

    color: colors.text,
    boxShadow: "none",

    "&:hover": {
      backgroundColor: "rgba(246,252,250,0.88)",
      backgroundImage:
        "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(239,250,247,0.88) 100%)",

      borderColor: "rgba(38,176,173,0.18)",
      color: colors.accentStrong,

      boxShadow: "none",
    },
  },
};

/* -------------------------------------------------------
   MERGE
------------------------------------------------------- */

const mergeInteractiveStyles = (...styles) =>
  styles.reduce((merged, style) => {
    if (!style) return merged;

    return {
      ...merged,
      ...style,

      "&:hover": {
        ...(merged["&:hover"] ?? {}),
        ...(style["&:hover"] ?? {}),
      },

      "&:active": {
        ...(merged["&:active"] ?? {}),
        ...(style["&:active"] ?? {}),
      },

      "&:focus-visible": {
        ...(merged["&:focus-visible"] ?? {}),
        ...(style["&:focus-visible"] ?? {}),
      },
    };
  }, {});

export const getActionButtonSx = (
  variant = "primary",
  overrides = {}
) =>
  mergeInteractiveStyles(
    actionButtonBaseSx,
    actionButtonVariants[variant],
    overrides
  );

export const getActionIconButtonSx = (
  variant = "secondary",
  overrides = {}
) =>
  getActionButtonSx(variant, {
    minWidth: 0,
    px: 1,
    ...overrides,
  });
