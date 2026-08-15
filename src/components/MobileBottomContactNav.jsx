"use client";

import NextLink from "next/link";
import { Box, Button, GlobalStyles, IconButton } from "@mui/material";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import {
  getActionButtonSx,
  getActionIconButtonSx,
} from "@/components/ui/buttonStyles";

const mobileContactIconButtonSx = getActionIconButtonSx("neutral", {
  width: "100%",
  minHeight: 42,
  borderRadius: colors.buttonRadius,
  backgroundColor: "transparent",
  backgroundImage: "none",
  border: 0,
  boxShadow: "none",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  "&:hover": {
    backgroundColor: "rgba(38,176,173,0.07)",
    backgroundImage: "none",
    borderColor: "transparent",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "rgba(38,176,173,0.1)",
    backgroundImage: "none",
    borderColor: "transparent",
    boxShadow: "none",
  },
});

const mobilePresentationButtonSx = getActionButtonSx("primary", {
  minWidth: 0,
  width: "100%",
  minHeight: 42,
  borderRadius: colors.buttonRadius,
  fontSize: 12.35,
  lineHeight: 1.05,
  px: 0.8,
  textAlign: "center",
  whiteSpace: "normal",
});

const desktopContactSegmentSx = getActionButtonSx("neutral", {
  minWidth: 0,
  minHeight: 50,
  fontSize: 14,
  gap: 1,
  px: 2.2,
  borderRadius: colors.buttonRadius,
  backgroundColor: "transparent",
  backgroundImage: "none",
  border: 0,
  boxShadow: "none",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  "&:hover": {
    backgroundColor: "rgba(38,176,173,0.07)",
    backgroundImage: "none",
    borderColor: "transparent",
    color: colors.accentStrong,
    boxShadow: "none",
    transform: "none",
  },
  "&:active": {
    backgroundColor: "rgba(38,176,173,0.1)",
    backgroundImage: "none",
    borderColor: "transparent",
    boxShadow: "none",
    transform: "none",
  },
});

const desktopPresentationButtonSx = getActionButtonSx("primary", {
  minWidth: 0,
  minHeight: 52,
  borderRadius: colors.buttonRadius,
  fontSize: 14.5,
  fontWeight: 900,
  px: 3.1,
  whiteSpace: "nowrap",
  "&:hover": {
    transform: "none",
  },
  "&:active": {
    transform: "none",
  },
});

export default function MobileBottomContactNav() {
  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;

  return (
    <>
      <GlobalStyles
        styles={{
          "@media (max-width:899.95px)": {
            body: {
              paddingBottom: "calc(112px + env(safe-area-inset-bottom))",
            },
          },

          "@media (min-width:900px)": {
            body: {
              paddingBottom: "136px",
            },
          },
        }}
      />

      {/* MOBILE */}
      <Box
        component="nav"
        aria-label="Szybki kontakt"
        sx={{
          display: { xs: "block", md: "none" },

          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1090,

          px: 1.5,
          pb: "max(10px, env(safe-area-inset-bottom))",

          pointerEvents: "none",

          "&::before": {
            content: '""',
            position: "absolute",
            left: "7%",
            right: "7%",
            bottom: "-10px",
            height: 42,
            background:
              "radial-gradient(ellipse at center bottom, rgba(39,174,171,0.18) 0%, rgba(39,174,171,0.08) 42%, rgba(39,174,171,0) 74%)",
            filter: "blur(12px)",
            opacity: 0.72,
            pointerEvents: "none",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",

            gridTemplateColumns:
              "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 2fr)",

            gap: 0.55,

            width: "100%",
            maxWidth: 1440,
            mx: "auto",

            p: 0.45,

            borderRadius: "28px",

            backgroundColor: "rgba(255,255,255,0.76)",
            border: "1px solid rgba(39,174,171,0.11)",

            boxShadow:
              "0 10px 30px rgba(15,23,42,0.11), 0 6px 22px rgba(39,174,171,0.06)",

            backdropFilter: "blur(18px) saturate(115%)",
            WebkitBackdropFilter: "blur(18px) saturate(115%)",

            pointerEvents: "auto",
          }}
        >
          <IconButton
            component="a"
            href={`mailto:${contact.email}`}
            aria-label="Napisz maila"
            sx={mobileContactIconButtonSx}
          >
            <MailRoundedIcon sx={{ fontSize: 21 }} />
          </IconButton>

          <IconButton
            component="a"
            href={phoneHref}
            aria-label="Zadzwoń"
            sx={mobileContactIconButtonSx}
          >
            <PhoneRoundedIcon sx={{ fontSize: 21 }} />
          </IconButton>

          <Button
            component={NextLink}
            href="/contact"
            aria-label="Umów prezentację"
            sx={mobilePresentationButtonSx}
          >
            <Box component="span">
              Umów prezentację
            </Box>
          </Button>
        </Box>
      </Box>

      {/* DESKTOP */}
      <Box
        component="nav"
        aria-label="Szybki kontakt"
        sx={{
          display: { xs: "none", md: "flex" },

          position: "fixed",
          left: 0,
          right: 0,
          bottom: 42,

          zIndex: 1090,

          justifyContent: "center",

          px: 3,

          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns:
              "minmax(210px, 1.15fr) minmax(170px, 1fr) minmax(220px, 1.1fr)",

            alignItems: "center",

            gap: 0.8,

            width: "min(820px, calc(100vw - 64px))",
            minHeight: 66,

            p: 0.75,

            borderRadius: 999,

            backgroundColor: "rgba(255,255,255,0.86)",

            border: `1px solid ${colors.softGlassBorder}`,

            boxShadow:
              "0 -8px 30px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.035)",

            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",

            pointerEvents: "auto",
          }}
        >
          <Button
            component="a"
            href={`mailto:${contact.email}`}
            aria-label="Napisz maila"
            sx={desktopContactSegmentSx}
          >
            <MailRoundedIcon sx={{ fontSize: 20 }} />

            {contact.email}
          </Button>

          <Button
            component="a"
            href={phoneHref}
            aria-label="Zadzwoń"
            sx={desktopContactSegmentSx}
          >
            <PhoneRoundedIcon sx={{ fontSize: 20 }} />

            {contact.phone}
          </Button>

          <Button
            component={NextLink}
            href="/contact"
            aria-label="Umów prezentację"
            sx={desktopPresentationButtonSx}
          >
            Umów prezentację
          </Button>
        </Box>
      </Box>
    </>
  );
}
