"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Collapse, Divider, IconButton, Link } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import content from "@/data/content";

export default function NavbarPill() {
  const pathname = usePathname();
  return <NavbarPillContent key={pathname} pathname={pathname} />;
}

function NavbarPillContent({ pathname }) {
  const [open, setOpen] = useState(false);
  const isHomePage = pathname === "/";
  const desktopNavMinWidth = 1160;
  const wideDesktopNavMinWidth = 1380;
  const desktopUtilityMinWidth = 1320;
  const desktopNavItems = content.nav;
  const mobileNavItems =
    isHomePage
      ? content.nav
      : [{ href: "/", label: "Strona główna" }, ...content.nav];
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        pt: { xs: 1, md: 3 },
        px: { xs: 0.5, sm: 1.25, md: 3 },
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
          gap: { xs: 0.45, sm: 1, md: 0.34 },
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          pl: { xs: 0.25, sm: 0.75, md: 0 },
          pr: { xs: 0.45, sm: 1.1, md: 2.05 },
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
            minWidth: 0,
            ml: { md: -0.55 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 124, sm: 182, md: 206 },
              height: { xs: 38, sm: 54, md: 56 },
              "@media (max-width:359.95px)": {
                width: 108,
                height: 34,
              },
            }}
          >
            <Image
              src="/images/eye-optic-logo-smaller.jpeg"
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
            justifyContent: "flex-end",
            gap: { xs: 0.25, sm: 0.42, md: 0.72 },
            pl: { md: 0.3 },
            minWidth: 0,
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "none",
              [`@media (min-width:${desktopNavMinWidth}px)`]: {
                display: "flex",
              },
              mr: "auto",
              flexShrink: 0,
              minWidth: "max-content",
              gap: 0.24,
              [`@media (min-width:${wideDesktopNavMinWidth}px)`]: {
                gap: 0.5,
              },
            }}
          >
            <IconButton
              component={NextLink}
              href="/"
              aria-label="Strona glowna"
              sx={{
                alignSelf: "center",
                borderRadius: 3,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isHomePage ? colors.surfaceAlt : colors.pillBg,
                color: isHomePage ? colors.text : colors.textSoft,
                px: { xs: 1.05, md: 1.45 },
                py: { xs: 0.85, md: 1.25 },
                flexShrink: 0,
                "&:hover": {
                  backgroundColor: colors.surfaceAlt,
                  color: colors.text,
                },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    backgroundColor: colors.dot,
                    flex: "0 0 auto",
                    opacity: isHomePage ? 1 : 0,
                    [`@media (min-width:${wideDesktopNavMinWidth}px)`]: {
                      width: 8,
                      height: 8,
                    },
                  }}
                />
                <HomeRoundedIcon />
              </Box>
            </IconButton>

            {desktopNavItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  underline="none"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: active ? 0.7 : 0,
                    borderRadius: 2.5,
                    px: 2.05,
                    py: 1,
                    fontSize: 13,
                    fontWeight: 800,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    color: active ? colors.text : colors.textSoft,
                    backgroundColor: active ? colors.surfaceAlt : "transparent",
                    [`@media (min-width:${wideDesktopNavMinWidth}px)`]: {
                      px: 3,
                      py: 1.2,
                      fontSize: 14,
                      gap: active ? 0.8 : 0,
                    },
                    "&:hover": {
                      backgroundColor: colors.surfaceAlt,
                      color: colors.text,
                    },
                  }}
                >
                  {active && (
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        backgroundColor: colors.dot,
                        flex: "0 0 auto",
                        [`@media (min-width:${wideDesktopNavMinWidth}px)`]: {
                          width: 8,
                          height: 8,
                        },
                      }}
                    />
                  )}
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Box>
                </Link>
              );
            })}
          </Box>

          <Button
            onClick={() => setOpen((value) => !value)}
            aria-label="Otworz menu produktow"
            aria-expanded={open}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              [`@media (min-width:${desktopNavMinWidth}px)`]: {
                display: "none",
              },
              minWidth: "unset",
              fontWeight: 800,
              fontSize: { xs: 10.2, sm: 13.5, md: 14 },
              lineHeight: 1,
              letterSpacing: { xs: "-0.02em", md: "normal" },
              textTransform: "none",
              borderRadius: 2.5,
              backgroundColor: colors.pillBg,
              color: colors.text,
              px: { xs: 0.8, sm: 1.15, md: 1.25 },
              minHeight: { xs: 32, sm: 36, md: 42 },
              gap: 0.65,
              py: 0,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: colors.pillHover,
                boxShadow: "none",
              },
            }}
          >
            <MenuRoundedIcon
              sx={{
                fontSize: { xs: 18, sm: 20, md: 20 },
                flex: "0 0 auto",
              }}
            />
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                "@media (max-width:359.95px)": {
                  fontSize: 11.5,
                },
              }}
            >
              Produkty
            </Box>
          </Button>

          <IconButton
            component="a"
            href={`mailto:${contact.email}`}
            sx={{
              display: "none",
              [`@media (min-width:${desktopUtilityMinWidth}px)`]: {
                display: "inline-flex",
              },
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
              display: "none",
              [`@media (min-width:${desktopUtilityMinWidth}px)`]: {
                display: "inline-flex",
              },
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
              flexShrink: 0,
              minWidth: "max-content",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: { xs: 2.2, md: 2.6 },
              backgroundColor: colors.accent,
              color: colors.white,
              fontWeight: 800,
              fontSize: { xs: 10.2, sm: 13.5, md: 14 },
              lineHeight: 1,
              minHeight: { xs: 32, sm: 36, md: 42 },
              px: { xs: 0.95, sm: 2.05, md: 2.2 },
              py: 0,
              letterSpacing: { xs: "-0.02em", md: "normal" },
              boxShadow: "0 6px 12px rgba(15,23,42,0.08)",
              whiteSpace: "nowrap",
              [`@media (min-width:${wideDesktopNavMinWidth}px)`]: {
                fontSize: 15,
                minHeight: 44,
                px: 2.7,
              },
              "@media (max-width:359.95px)": {
                fontSize: 9.4,
                minHeight: 30,
                px: 0.8,
              },
              "&:hover": { backgroundColor: colors.accent },
            }}
          >
            Umów konsultację
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
            display: "block",
            [`@media (min-width:${desktopNavMinWidth}px)`]: {
              display: "none",
            },
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

          {mobileNavItems.map((item) => {
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
