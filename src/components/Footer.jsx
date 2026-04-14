"use client";

import NextLink from "next/link";
import { Box, Container, Link, Typography } from "@mui/material";
import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import { formatDisplayText } from "@/lib/text";

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
            <Typography
              sx={{
                mt: 1,
                color: colors.textSoft,
                fontSize: 13,
                maxWidth: 360,
                lineHeight: 1.7,
              }}
            >
              {formatDisplayText("Simply see perfectly!")}
            </Typography>
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

function FooterLink({ href, children }) {
  return (
    <Link
      component={NextLink}
      href={href}
      underline="none"
      sx={{
        color: colors.textSoft,
        fontSize: 13,
        "&:hover": { color: colors.text, textDecoration: "underline" },
        textDecorationColor: colors.border,
      }}
    >
      {formatDisplayText(children)}
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
        "&:hover": { color: colors.text },
      }}
      {...props}
    >
      {formatDisplayText(children)}
    </Link>
  );
}
