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
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import {
  bodyTextSx,
  ctaButtonSx,
  heroCardSx,
  heroAccentSx,
  sectionHeadingSx,
} from "@/components/products/productPageStyles";

const images = [
  "/images/ttl-product/ttl.webp",
  "/images/ttl-product/ttl-sport.webp",
];

const ttlPage = content.products.ttl.page;
const { magnifications: ttlMagnifications, tableRows: ttlTableRows } =
  content.products.ttl;

export default function TtlProductClient() {
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
          src={images[0]}
          alt="Lupy TTL"
          loading="eager"
          fetchPriority="high"
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
            {ttlPage.hero.title}
          </Typography>

          <Typography
            sx={{
              ...heroAccentSx,
            }}
          >
            {ttlPage.hero.accent}
          </Typography>

          <Typography
            sx={{
              mt: 2.6,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "34ch" },
            }}
          >
            {formatDisplayText(ttlPage.hero.description)}
          </Typography>

          <Box
            sx={{
              mt: 3.2,
              display: "grid",
              gap: 1.2,
            }}
          >
            {ttlPage.hero.uses.map((item) => (
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
        <Box sx={{ px: { md: 1 } }}>
          <ProductSectionEyebrow>
            {ttlPage.benefits.eyebrow}
          </ProductSectionEyebrow>

          <Typography
            sx={{
              ...sectionHeadingSx,
              maxWidth: { xs: "100%", md: "14ch" },
            }}
          >
            {ttlPage.benefits.title}
          </Typography>

          <Typography
            sx={{
              mt: 1.8,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "40ch" },
            }}
          >
            {formatDisplayText(ttlPage.benefits.description)}
          </Typography>

          <Box sx={{ mt: 3.4, display: "grid", gap: 1.8 }}>
            {ttlPage.benefits.items.map((item) => (
              <ProductBenefitLine
                key={item.title}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </Box>
        </Box>

        <ProductImageCard src={images[1]} alt="Korzyści pracy w lupach TTL" />
      </Box>

      <Box sx={{ mt: { xs: 7, md: 9 } }}>
        <Box
          sx={{
            mt: 3.2,
            display: "grid",
            gap: { xs: 2.4, md: 3.2 },
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: { xs: "start", md: "center" },
          }}
        >
          <Box sx={{ px: { md: 1 } }}>
            <ProductSectionEyebrow>
              {ttlPage.configuration.eyebrow}
            </ProductSectionEyebrow>

            <Typography
              sx={{
                ...sectionHeadingSx,
                maxWidth: { xs: "100%", md: "11ch" },
              }}
            >
              {ttlPage.configuration.title}
            </Typography>

            <Typography
              sx={{
                mt: 1.8,
                ...bodyTextSx,
                maxWidth: { xs: "100%", md: "38ch" },
              }}
            >
              {formatDisplayText(ttlPage.configuration.description)}
            </Typography>

            <Box
              sx={{
                mt: 3.1,
                display: { xs: "none", md: "block" },
              }}
            >
              <Button
                component={NextLink}
                href="/contact"
                variant="contained"
                disableElevation
                sx={ctaButtonSx}
              >
                {ttlPage.configuration.ctaLabel}
              </Button>
            </Box>
          </Box>

          <ProductSpecsTable
            magnifications={ttlMagnifications}
            rows={ttlTableRows}
            magnificationLabel={ttlPage.configuration.magnificationLabel}
          />

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              mt: 3.2,
            }}
          >
            <MobileConsultationSection />
          </Box>
        </Box>
      </Box>
    </>
  );
}

function MobileConsultationSection() {
  return (
    <Box
      sx={{
        pt: 2.4,
        borderTop: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      <Typography
        sx={{
          color: colors.text,
          fontSize: 18,
          fontWeight: 800,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          maxWidth: "22ch",
        }}
      >
        {ttlPage.configuration.mobile.title}
      </Typography>

      <Typography
        sx={{
          mt: 0.75,
          color: colors.textSoft,
          fontSize: 14.5,
          lineHeight: 1.65,
          maxWidth: "34ch",
        }}
      >
        {formatDisplayText(ttlPage.configuration.mobile.description)}
      </Typography>

      <Button
        component={NextLink}
        href="/contact"
        variant="contained"
        disableElevation
        sx={{
          ...ctaButtonSx,
          mt: 1.5,
        }}
      >
        {ttlPage.configuration.mobile.buttonLabel}
      </Button>
    </Box>
  );
}
