"use client";

import NextLink from "next/link";
import {
  Box,
  Container,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import { formatDisplayText } from "@/lib/text";

const footerSocialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    icon: <InstagramIcon sx={{ fontSize: 18 }} />,
    href: contact.social.instagram,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <FacebookRoundedIcon sx={{ fontSize: 18 }} />,
    href: contact.social.facebook,
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: <YouTubeIcon sx={{ fontSize: 18 }} />,
    href: contact.social.youtube,
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ mt: 8, py: 5, borderTop: `1px solid ${colors.border}` }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "1.2fr 1fr 1.2fr",
            },
            gap: { xs: 4, md: 5 },
            alignItems: "start",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 900, color: colors.text }}>
              Eye Optic
            </Typography>
            <Box sx={{ mt: 1.5, display: "grid", gap: 1 }}>
              <Typography
                sx={{
                  color: colors.textSoft,
                  fontSize: 13,
                  maxWidth: 360,
                  lineHeight: 1.7,
                }}
              >
                {formatDisplayText("Simply see perfectly!")}
              </Typography>
              <Box sx={{ ml: -0.6, display: "flex", gap: 0.55 }}>
                {footerSocialLinks.map((link) => (
                  <IconButton
                    key={link.id}
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Otwórz ${link.label}`}
                    sx={{
                      width: 28,
                      height: 28,
                      p: 0,
                      color: "rgba(15,23,42,0.58)",
                      backgroundColor: "transparent",
                      transition:
                        "color 180ms ease, opacity 180ms ease, transform 180ms ease",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: colors.accent,
                        opacity: 1,
                      },
                      "&:active": {
                        transform: "scale(0.96)",
                      },
                    }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: colors.text, fontSize: 13 }}
            >
              Produkty
            </Typography>
            <Box sx={{ mt: 1.5, display: "grid", gap: 1 }}>
              <FooterLink href="/products/ttl">Lupy TTL</FooterLink>
              <FooterLink href="/products/flipUp">Lupy Flip-Up</FooterLink>
              <FooterLink href="/products/ergo">Lupy Ergo</FooterLink>
              <FooterLink href="/products/led">Oświetlenie LED</FooterLink>
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{ fontWeight: 700, color: colors.text, fontSize: 13 }}
            >
              Kontakt
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                display: "grid",
                gap: 1,
                maxWidth: 360,
              }}
            >
              <Typography
                sx={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {contact.owner}
              </Typography>
              <FooterContactLink href={`mailto:${contact.email}`}>
                {contact.email}
              </FooterContactLink>
              <FooterContactLink
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              >
                {contact.phone}
              </FooterContactLink>
              <FooterContactLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contact.address,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.address}
              </FooterContactLink>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ color: colors.textSoft, fontSize: 12 }}>
            © {new Date().getFullYear()} {contact.brand}
          </Typography>

          <Typography sx={{ color: colors.textSoft, fontSize: 12 }}>
            developed by Artur Werys
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function FooterLink({ href, children, external = false, featured = false }) {
  return (
    <Link
      component={external ? "a" : NextLink}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      underline="none"
      sx={{
        justifySelf: "start",
        display: "inline-flex",
        alignItems: "center",
        gap: featured ? 0.35 : 0,
        color: colors.textSoft,
        fontSize: 13,
        fontWeight: featured ? 600 : 400,
        transition: "color 180ms ease",
        "&:hover": {
          color: colors.accent,
          textDecoration: "underline",
        },
        textDecorationColor: colors.border,
        textUnderlineOffset: 3,
      }}
    >
      {formatDisplayText(children)}
      {featured && <ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />}
    </Link>
  );
}

function FooterContactLink({ children, ...props }) {
  return (
    <Link
      underline="hover"
      sx={{
        color: colors.textSoft,
        fontSize: 13,
        lineHeight: 1.7,
        textDecorationColor: colors.border,
        textUnderlineOffset: 3,
        "&:hover": { color: colors.accent },
      }}
      {...props}
    >
      {formatDisplayText(children)}
    </Link>
  );
}
