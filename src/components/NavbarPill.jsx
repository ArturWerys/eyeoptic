"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, IconButton, Link, Typography } from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Collapse from "@mui/material/Collapse";
import MailRoundedIcon from "@mui/icons-material/MailRounded";

import colors from "@/data/colors";
import content from "@/data/content";
import contact from "@/data/contact_info.json";
import { useState, useEffect, use } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function NavbarPill() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

        pt: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },

        pb: { xs: open ? 3 : 2, md: 1 },
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(15px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          maxWidth: 1440,
          mx: "auto",
        }}
      >
        {/* Brand */}
        <Box
          component={NextLink}
          href="/"
          sx={{
            textDecoration: "none",
            borderRadius: 3,
            px: 2.5,
            py: 1.6,
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            boxShadow: colors.shadow,
          }}
        >
          <Typography sx={{ fontWeight: 900, color: colors.text }}>
            {contact.brand}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            px: 1.2,
            py: 1.1,
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: colors.shadow,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 0.5,
            }}
          >
            {content.nav.map((item) => {
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

          {/* Right controls */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.2, ml: "auto" }}
          >
            <IconButton
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
              aria-label="Otwórz menu"
              onClick={() => setOpen((v) => !v)}
            >
              <MenuRoundedIcon />
            </IconButton>
            <IconButton
              component="a"
              href={`mailto:${contact.email}`}
              sx={{
                borderRadius: 3,
                backgroundColor: colors.pillBg,
                color: colors.text,
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
                borderRadius: 3,
                backgroundColor: colors.pillBg,
                color: colors.text,
                "&:hover": { backgroundColor: colors.pillHover },
              }}
              aria-label="Zadzwoń"
            >
              <PhoneRoundedIcon />
            </IconButton>

            <Button
              component={NextLink}
              href="/contact"
              variant="contained"
              disableElevation
              sx={{
                borderRadius: 3,
                backgroundColor: colors.accent,
                color: colors.white,
                fontWeight: 900,
                px: 3,
                py: 1.25,
                "&:hover": { backgroundColor: colors.accent },
              }}
            >
              Umów dobór
            </Button>
          </Box>
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
          {content.nav.map((item) => {
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
                  py: 1.2,
                  px: 2,
                  borderRadius: 2,
                  fontWeight: 900,
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
