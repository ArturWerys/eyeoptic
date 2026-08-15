"use client";

import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import { getActionButtonSx } from "@/components/ui/buttonStyles";
import { formatDisplayText } from "@/lib/text";

const fontSizes = {
  title: { xs: 32, sm: 40, md: 46 },
  subtitle: { xs: 28, md: 34 },
};

const supportingTextSx = {
  color: colors.textSoft,
  lineHeight: 1.85,
};

const socialIconSize = 18;

const contactItems = [
  {
    id: "phone",
    featured: true,
    label: "Telefon",
    icon: <PhoneOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />,
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
  {
    id: "email",
    label: "E-mail",
    icon: <EmailOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />,
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    id: "address",
    label: "Adres",
    icon: <LocationOnOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />,
    value: contact.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      contact.address,
    )}`,
    external: true,
  },
  {
    id: "hours",
    label: "Godziny",
    icon: <AccessTimeOutlinedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />,
    value: "Poniedziałek - Piątek\n8:00 - 17:00",
  },
];

const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    icon: <InstagramIcon sx={{ fontSize: socialIconSize }} />,
    href: contact.social.instagram,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <FacebookRoundedIcon sx={{ fontSize: socialIconSize }} />,
    href: contact.social.facebook,
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: <YouTubeIcon sx={{ fontSize: socialIconSize }} />,
    href: contact.social.youtube,
  },
];

const sharedButtonLayoutSx = {
  minHeight: { xs: 58, md: 52 },
  px: { xs: 1.4, sm: 3 },
  width: { xs: "100%", md: 210 },
  fontSize: { xs: 13.5, md: 15.5 },
  whiteSpace: "nowrap",
};

const primaryButtonSx = getActionButtonSx("primary", sharedButtonLayoutSx);

const secondaryButtonSx = getActionButtonSx("secondary", sharedButtonLayoutSx);

function ContactInfoItem({ item }) {
  const content = (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: item.featured ? colors.text : colors.textMute,
          fontWeight: 700,
        }}
      >
        {item.label}
      </Typography>

      <Typography
        className="contact-item-value"
        sx={{
          mt: 0.55,
          color: colors.text,
          lineHeight: 1.7,
          fontWeight: item.featured ? 700 : 500,
          fontSize: item.featured ? { xs: 17, md: 18 } : "inherit",
          letterSpacing: item.featured ? "-0.01em" : "normal",
          whiteSpace: "pre-line",
          transition: "color 180ms ease",
        }}
      >
        {formatDisplayText(item.value)}
      </Typography>
    </Box>
  );

  return (
    <Box
      component={item.href ? "a" : "div"}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: { xs: 1.25, md: 1.5 },
        alignItems: "start",
        p: { xs: 1.65, sm: 1.8, md: 2 },
        borderRadius: { xs: 2.5, md: 3 },
        backgroundColor: item.featured
          ? "rgba(38,176,173,0.06)"
          : colors.surface,
        border: `1px solid ${item.featured ? "rgba(38,176,173,0.22)" : colors.border}`,
        textDecoration: "none",
        color: "inherit",
        cursor: item.href ? "pointer" : "default",
        transition:
          "background-color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
        WebkitTapHighlightColor: "transparent",
        "&:hover": item.href
          ? {
              backgroundColor: item.featured
                ? "rgba(38,176,173,0.1)"
                : colors.surfaceAlt,
              borderColor: colors.accent,
              boxShadow: colors.shadowSm,
            }
          : undefined,
        "&:active": item.href
          ? {
              backgroundColor: colors.accentSoft,
              transform: "scale(0.985)",
            }
          : undefined,
        "&:hover .contact-item-value": item.href
          ? {
              color: colors.accent,
            }
          : undefined,
      }}
    >
      <Box
        sx={{
          width: { xs: 38, md: 42 },
          height: { xs: 38, md: 42 },
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          color: colors.accent,
          backgroundColor: item.featured
            ? "rgba(38,176,173,0.13)"
            : colors.accentSoft,
          flex: "0 0 auto",
        }}
      >
        {item.icon}
      </Box>

      {content}
    </Box>
  );
}

function SocialFollowCard() {
  return (
    <Box
      sx={{
        mt: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: colors.textMute,
          fontWeight: 700,
        }}
      >
        Obserwuj nas
      </Typography>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        {socialLinks.map((link) => (
          <IconButton
            key={link.id}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Otwórz ${link.label}`}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              color: colors.accent,
              backgroundColor: colors.softGlassBg,
              border: `1px solid ${colors.accentGlassBorder}`,
              boxShadow: colors.softGlassShadow,
              backdropFilter: colors.softGlassBlur,
              transition:
                "background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                color: "#228F8C",
                backgroundColor: colors.softGlassBgHover,
                borderColor: colors.accentGlassBorderHover,
                boxShadow: colors.softGlassShadowHover,
              },
              "&:active": {
                backgroundColor: "rgba(38,176,173,0.18)",
              },
            }}
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default function ContactClient() {
  return (
    <Box sx={{ mt: { xs: 5, sm: 5.5, md: 6, lg: 6.5 } }}>
      <Typography
        sx={{
          py: { xs: 1.5, md: 2 },
          mb: { xs: 0.75, md: 1 },
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          fontSize: fontSizes.title,
          color: colors.text,
        }}
      >
        Skontaktuj się z nami
      </Typography>

      <Typography
        sx={{
          display: { xs: "block", md: "none" },
          mb: { xs: 2.5, md: 0 },
          maxWidth: 680,
          ...supportingTextSx,
          fontSize: { xs: 16, md: 17 },
        }}
      >
        Chętnie pomożemy dobrać odpowiednie lupy, konfigurację{" "}
        <Box component="span" sx={{ display: { xs: "inline", md: "block" } }}>
          i akcesoria do Twoich potrzeb.
        </Box>
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.92fr 1.08fr" },
          gridTemplateRows: { xs: "auto auto", md: "1fr auto auto 1fr" },
          overflow: "hidden",
          borderRadius: 5,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadowSm,
          background:
            "linear-gradient(135deg, rgba(247,250,252,0.96) 0%, rgba(255,255,255,1) 52%, rgba(236,253,245,0.72) 100%)",
        }}
      >
        <Box
          sx={{
            p: { xs: 2.5, md: 3.5 },
            gridColumn: { xs: "1", md: "1" },
            gridRow: { xs: "1", md: "1 / span 4" },
            borderTop: "none",
            borderBottom: "none",
            borderRight: { xs: "none", md: `1px solid ${colors.border}` },
            backgroundColor: "rgba(255,255,255,0.78)",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.textMute,
              fontWeight: 800,
            }}
          >
            Dane kontaktowe
          </Typography>

          <Box
            sx={{
              mt: { xs: 2, md: 2.5 },
              display: "grid",
              gap: { xs: 1, md: 1.2 },
            }}
          >
            {contactItems.map((item) => (
              <ContactInfoItem key={item.id} item={item} />
            ))}
            <SocialFollowCard />
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, md: 4 },
            pb: { xs: 2, md: 1 },
            gridColumn: { xs: "1", md: "2" },
            gridRow: { xs: "2", md: "2" },
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: { xs: "rgba(255,255,255,0.78)", md: "transparent" },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.accent,
              fontWeight: 800,
            }}
          >
            Indywidualny dobór
          </Typography>

          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              mt: 1.5,
              maxWidth: "none",
              fontSize: { md: fontSizes.subtitle.md },
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            Umów indywidualny dobór
          </Typography>

          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              mt: 2,
              maxWidth: 560,
              ...supportingTextSx,
              fontSize: { md: 17 },
            }}
          >
            Chętnie pomożemy dobrać odpowiednie lupy, konfigurację
            <Box component="span" sx={{ display: "block" }}>
              i akcesoria do Twoich potrzeb.
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 2, md: 4 },
            pt: { xs: 1.75, md: 0 },
            gridColumn: { xs: "1", md: "2" },
            gridRow: { xs: "2", md: "3" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1.5, md: 1.5 },
            alignItems: { xs: "stretch", md: "flex-start" },
            backgroundColor: { xs: "rgba(255,255,255,0.78)", md: "transparent" },
          }}
        >
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              color: colors.text,
              fontSize: 14,
              fontWeight: 800,
              lineHeight: 1.35,
            }}
          >
            Umów darmową prezentację
          </Typography>

          <Box
            className="contact-actions"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "repeat(2, 210px)",
              },
              gap: { xs: 1.5, md: 1.5 },
              width: "100%",
            }}
          >
            <Button
              component="a"
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              variant="contained"
              disableElevation
              sx={primaryButtonSx}
            >
              Zadzwoń
            </Button>

            <Button
              component="a"
              href={`mailto:${contact.email}`}
              variant="contained"
              disableElevation
              sx={secondaryButtonSx}
            >
              Napisz e-mail
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
