"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Collapse, Divider, IconButton, Link } from "@mui/material";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import content from "@/data/content";

export default function NavbarPill() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems =
    pathname === "/"
      ? content.nav
      : [{ href: "/", label: "Strona główna" }, ...content.nav];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        pt: { xs: 1, md: 3 },
        px: { xs: 1.25, md: 3 },
        pb: { xs: open ? 2 : 1, md: 1 },
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(15px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 1, md: 2 },
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 1.1, md: 1.4 },
          py: { xs: 0.58, md: 0.82 },
          borderRadius: 3,
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
        }}
      >
        <Box
          component={NextLink}
          href="/"
          sx={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 182, md: 206 },
              height: { xs: 54, md: 56 },
            }}
          >
            <Image
              src="/images/EyeOpticLogo_Smaller.jpeg"
              alt={contact.brand}
              fill
              sizes="(max-width: 900px) 182px, 206px"
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.42, md: 1.05 },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 0.5,
            }}
          >
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  underline="none"
                  sx={{
                    position: "relative",
                    borderRadius: 2.5,
                    px: 3,
                    py: 1.2,
                    fontSize: 14,
                    fontWeight: 800,
                    color: active ? colors.text : colors.textSoft,
                    backgroundColor: active ? colors.surfaceAlt : "transparent",
                    "&:hover": {
                      backgroundColor: colors.surfaceAlt,
                      color: colors.text,
                    },
                  }}
                >
                  {active && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: colors.dot,
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  <Box component="span" sx={{ pl: active ? 1.6 : 0 }}>
                    {item.label}
                  </Box>
                </Link>
              );
            })}
          </Box>

          <IconButton
            sx={{
              display: { xs: "inline-flex", lg: "none" },
              p: { xs: 0.7, md: 1.05 },
              borderRadius: 2.5,
              backgroundColor: colors.pillBg,
              color: colors.text,
              "&:hover": { backgroundColor: colors.pillHover },
            }}
            aria-label="Otworz menu"
            onClick={() => setOpen((value) => !value)}
          >
            <MenuRoundedIcon />
          </IconButton>

          <IconButton
            component="a"
            href={`mailto:${contact.email}`}
            sx={{
              display: { xs: "none", md: "inline-flex" },
              borderRadius: 3,
              backgroundColor: colors.pillBg,
              color: colors.text,
              p: { xs: 0.85, md: 1.25 },
              "&:hover": { backgroundColor: colors.pillHover },
            }}
            aria-label="Napisz maila"
          >
            <MailRoundedIcon />
          </IconButton>

          <IconButton
            component="a"
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            sx={{
              display: { xs: "none", md: "inline-flex" },
              borderRadius: 3,
              backgroundColor: colors.pillBg,
              color: colors.text,
              p: { xs: 0.85, md: 1.25 },
              "&:hover": { backgroundColor: colors.pillHover },
            }}
            aria-label="Zadzwon"
          >
            <PhoneRoundedIcon />
          </IconButton>

          <Button
            component={NextLink}
            href="/contact"
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 2.6,
              backgroundColor: colors.accent,
              color: colors.white,
              fontWeight: 800,
              fontSize: { xs: 13.5, md: 15 },
              lineHeight: 1,
              minHeight: { xs: 36, md: 44 },
              px: { xs: 1.7, sm: 2.05, md: 2.7 },
              py: 0,
              boxShadow: "0 6px 12px rgba(15,23,42,0.08)",
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: colors.accent },
            }}
          >
            Umów dobór
          </Button>
        </Box>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            maxWidth: 1440,
            mx: "auto",
            mt: 1,
            borderRadius: 3,
            backgroundColor: colors.surface,
            boxShadow: colors.shadow,
            p: 2,
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
            display: { xs: "block", lg: "none" },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 1,
              mb: 1.15,
            }}
          >
            <Link
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                py: 1.1,
                px: 1.2,
                borderRadius: 2,
                fontWeight: 800,
                color: colors.text,
              }}
            >
              <PhoneRoundedIcon sx={{ fontSize: 18 }} />
              {contact.phone}
            </Link>

            <Link
              href={`mailto:${contact.email}`}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                py: 1.1,
                px: 1.2,
                borderRadius: 2,
                fontWeight: 800,
                color: colors.text,
              }}
            >
              <MailRoundedIcon sx={{ fontSize: 18 }} />
              {contact.email}
            </Link>
          </Box>

          <Divider
            sx={{
              borderColor: colors.border,
              mb: 1.1,
            }}
          />

          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                component={NextLink}
                href={item.href}
                underline="none"
                onClick={() => setOpen(false)}
                sx={{
                  position: "relative",
                  display: "block",
                  py: 1,
                  px: 1.8,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 15,
                  color: active ? colors.text : colors.textSoft,
                  backgroundColor: active ? colors.surfaceAlt : "transparent",
                  "&:hover": { backgroundColor: colors.surfaceAlt },
                }}
              >
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: colors.dot,
                      transform: "translateY(-50%)",
                    }}
                  />
                )}

                <Box component="span" sx={{ pl: active ? 1.6 : 0 }}>
                  {item.label}
                </Box>
              </Link>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}
