"use client";

import NextLink from "next/link";
import { Box, Button, Typography } from "@mui/material";

import colors from "@/data/colors";
import content from "@/data/content";
import { formatDisplayText } from "@/lib/text";
import {
  ProductBenefitLine,
  ProductBulletItem,
  ProductImageCard,
  ProductSectionEyebrow,
} from "@/components/products/ProductPageShared";
import {
  bodyTextSx,
  ctaButtonSx,
  heroCardSx,
  heroAccentSx,
  sectionHeadingSx,
} from "@/components/products/productPageStyles";

const images = {
  hero: "/images/led-product/led-free-2.webp",
  ergo: "/images/led-product/ergo-led.webp",
  free: "/images/led-product/led-free.webp",
};

const ergoImageCenter = "53.7% 48.4%";
const freeImageCenter = "49.5% 49.7%";
const ledProductCardSx = {
  aspectRatio: { xs: "1 / 1", sm: "7 / 5" },
};
const ledProductImageSx = {
  objectFit: "contain",
  transform: { xs: "scale(1)", sm: "scale(1.1)", md: "scale(1.14)" },
  transformOrigin: "center",
};

const ledPage = content.products.led.page;

export default function LedProductClient() {
  return (
    <>
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
        }}
      >
        <ProductImageCard
          src={images.hero}
          alt="Oswietlenie LED do lup"
          loading="eager"
          fetchPriority="high"
          objectPosition={freeImageCenter}
          sx={ledProductCardSx}
          imageSx={ledProductImageSx}
        />

        <Box sx={heroCardSx}>
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              fontSize: { xs: 36, sm: 42, md: 52 },
              color: colors.text,
            }}
          >
            {ledPage.hero.title}
          </Typography>

          <Typography
            sx={{
              ...heroAccentSx,
            }}
          >
            {ledPage.hero.accent}
          </Typography>

          <Typography
            sx={{
              mt: 2.6,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "34ch" },
            }}
          >
            {formatDisplayText(ledPage.hero.description)}
          </Typography>

          <Box
            sx={{
              mt: 3.2,
              display: "grid",
              gap: 1.2,
            }}
          >
            {ledPage.hero.uses.map((item) => (
              <ProductBulletItem key={item}>{item}</ProductBulletItem>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: { xs: 7, md: 9 },
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
        }}
      >
        <Box sx={{ order: { xs: 2, md: 1 }, px: { md: 1 } }}>
          <ProductSectionEyebrow>{ledPage.benefits.eyebrow}</ProductSectionEyebrow>

          <Typography
            sx={{
              ...sectionHeadingSx,
              maxWidth: { xs: "100%", md: "14ch" },
            }}
          >
            {ledPage.benefits.title}
          </Typography>

          <Typography
            sx={{
              mt: 1.8,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "40ch" },
            }}
          >
            {formatDisplayText(ledPage.benefits.description)}
          </Typography>

          <Box sx={{ mt: 3.4, display: "grid", gap: 1.8 }}>
            {ledPage.benefits.items.map((item) => (
              <ProductBenefitLine
                key={item.title}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </Box>
        </Box>

        <ProductImageCard
          src={images.ergo}
          alt="Nowoczesne oswietlenie Ergo Eye Optic"
          objectPosition={ergoImageCenter}
          sx={{ ...ledProductCardSx, order: { xs: 1, md: 2 } }}
          imageSx={ledProductImageSx}
        />
      </Box>

      <Box
        sx={{
          mt: { xs: 7, md: 9 },
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            width: "100%",
            mx: { xs: "auto", md: 0 },
          }}
        >
          <ProductImageCard
            src={images.free}
            alt="Korzysci oswietlenia LED do lup"
            objectPosition={freeImageCenter}
            sx={ledProductCardSx}
            imageSx={ledProductImageSx}
          />
        </Box>

        <Box
          sx={{
            order: { xs: 2, md: 1 },
            maxWidth: { xs: "100%", md: "42ch" },
          }}
        >
          <ProductSectionEyebrow>
            {ledPage.configuration.eyebrow}
          </ProductSectionEyebrow>

          <Typography
            sx={{
              ...sectionHeadingSx,
              maxWidth: { xs: "100%", md: "11ch" },
            }}
          >
            {ledPage.configuration.title}
          </Typography>

          <Typography
            sx={{
              mt: 1.8,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "38ch" },
            }}
          >
            {formatDisplayText(ledPage.configuration.description)}
          </Typography>

          <Box
            sx={{
              mt: 3.1,
            }}
          >
            <Button
              component={NextLink}
              href="/contact"
              variant="contained"
              disableElevation
              sx={ctaButtonSx}
            >
              {ledPage.configuration.ctaLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
