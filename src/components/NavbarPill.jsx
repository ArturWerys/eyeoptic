"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Collapse, IconButton, Link } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import colors from "@/data/colors";
import contact from "@/data/contact_info.json";
import content from "@/data/content";
import MobileBottomContactNav from "@/components/MobileBottomContactNav";
import { getActionButtonSx } from "@/components/ui/buttonStyles";

export default function NavbarPill() {
  const pathname = usePathname();
  return <NavbarPillContent key={pathname} pathname={pathname} />;
}

function NavbarPillContent({ pathname }) {
  const [open, setOpen] = useState(false);
  const mobileMenuButtonRef = useRef(null);
  const normalizedPathname =
    pathname === "/" ? pathname : pathname.replace(/\/$/, "");
  const isHomePage = normalizedPathname === "/";
  const showBottomContactNav = normalizedPathname !== "/contact";
  const desktopNavMinWidth = 1160;
  const wideDesktopNavMinWidth = 1380;
  const desktopNavItems = content.nav;
  const mobileNavItems =
    isHomePage
      ? content.nav
      : [{ href: "/", label: "Strona główna" }, ...content.nav];
  const blurMobileMenuButton = () => {
    window.requestAnimationFrame(() => {
      mobileMenuButtonRef.current?.blur();
    });
  };

  const handleMobileMenuToggle = () => {
    setOpen((value) => {
      const nextOpen = !value;

      if (!nextOpen) {
        blurMobileMenuButton();
      }

      return nextOpen;
    });
  };

  const handleMobileMenuLinkClick = () => {
    setOpen(false);
    blurMobileMenuButton();
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          pt: { xs: 1, md: 3 },
          px: { xs: 0.75, md: 3 },
          pb: { xs: open ? 2 : 1, md: 1 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 0.75, md: 0.6 },
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            pl: { xs: 1.15, md: 1.75 },
            pr: { xs: 0.7, md: 2.35 },
            py: { xs: 0.1, md: 0.15 },
            borderRadius: { xs: 3, md: 999 },
            backgroundColor: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(39,174,171,0.2)",
            boxShadow:
              "0 18px 44px rgba(15,23,42,0.125), 0 10px 36px rgba(39,174,171,0.085), inset 0 1px 0 rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
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
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 180, md: 262 },
                height: { xs: 50, md: 64 },
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/logo.svg"
                alt={contact.brand}
                fill
                sizes="(max-width: 900px) 180px, 262px"
                style={{
                  objectFit: "contain",
                  transform: "scale(0.76)",
                  transformOrigin: "left center",
                }}
                priority
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "none",
              [`@media (min-width:${desktopNavMinWidth}px)`]: {
                display: "flex",
              },
              ml: "auto",
              justifyContent: "flex-end",
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
                borderRadius: colors.buttonRadius,
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
              const active = normalizedPathname === item.href;

              return (
                <Link
                  key={item.href}
                  component={item.external ? "a" : NextLink}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  underline="none"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: active ? 0.7 : 0,
                    borderRadius: colors.buttonRadius,
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
            ref={mobileMenuButtonRef}
            onClick={handleMobileMenuToggle}
            aria-label="Otworz menu produktow"
            aria-expanded={open}
            sx={getActionButtonSx("neutral", {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              [`@media (min-width:${desktopNavMinWidth}px)`]: {
                display: "none",
              },
              minWidth: "unset",
              fontWeight: 800,
              fontSize: { xs: 12, md: 14 },
              px: { xs: 0.75, md: 1.25 },
              minHeight: { xs: 34, md: 42 },
              gap: { xs: 0.45, md: 0.65 },
              py: 0,
              backgroundColor: "transparent",
              backgroundImage: "none",
              borderColor: "transparent",
              boxShadow: "none",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              "@media (hover: hover)": {
                "&:hover": {
                  backgroundColor: "rgba(38,176,173,0.08)",
                  backgroundImage: "none",
                  borderColor: "transparent",
                  boxShadow: "none",
                },
              },
              "@media (hover: none)": {
                "&:hover": {
                  backgroundColor: "transparent",
                  backgroundImage: "none",
                  borderColor: "transparent",
                  boxShadow: "none",
                },
              },
              "&:active": {
                backgroundColor: "rgba(38,176,173,0.12)",
                backgroundImage: "none",
                borderColor: "transparent",
              },
            })}
          >
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Produkty
            </Box>
            <MenuRoundedIcon
              sx={{
                fontSize: { xs: 18, md: 20 },
                flex: "0 0 auto",
              }}
            />
          </Button>

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
            {mobileNavItems.map((item) => {
              const active = normalizedPathname === item.href;

              return (
                <Link
                  key={item.href}
                  component={item.external ? "a" : NextLink}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  underline="none"
                  onClick={handleMobileMenuLinkClick}
                  sx={{
                    position: "relative",
                    display: "block",
                    py: 1,
                    px: 1.8,
                    borderRadius: colors.buttonRadius,
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

      {showBottomContactNav && <MobileBottomContactNav />}
    </>
  );
}
