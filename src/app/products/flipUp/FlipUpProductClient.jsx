"use client";

import { Box, Typography } from "@mui/material";

import colors from "@/data/colors";
import content from "@/data/content";
import { formatDisplayText } from "@/lib/text";
import {
  ProductBenefitLine,
  ProductHeroText,
  ProductBulletItem,
  ProductConsultationSection,
  ProductImageCard,
  ProductSectionEyebrow,
} from "@/components/products/ProductPageShared";
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import {
  bodyTextSx,
  sectionHeadingSx,
} from "@/components/products/productPageStyles";

const images = {
  hero: "/images/flip-up-product/flip-up.webp",
  aluFront: "/images/flip-up-product/flip-up-alu-front.webp",
  mini: "/images/flip-up-product/flip-up-mini.webp",
  alu: "/images/flip-up-product/flip-up-alu.webp",
};

const {
  magnifications: miniFlipUpMagnifications,
  tableRows: miniFlipUpTableRows,
} = content.products.miniFlipUp;

const {
  magnifications: aluFlipUpMagnifications,
  tableRows: aluFlipUpTableRows,
} = content.products.aluFlipUp;

const flipUpPage = content.products.flipUp.page;
const flipUpDesktopTableMinWidth = 1280;

const flipUpConfigurations = flipUpPage.variants.items.map((item) => ({
  ...item,
  magnifications:
    item.key === "mini" ? miniFlipUpMagnifications : aluFlipUpMagnifications,
  rows: item.key === "mini" ? miniFlipUpTableRows : aluFlipUpTableRows,
}));

export default function FlipUpProductClient() {
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
          alt="Lupy Flip-Up"
          loading="eager"
          fetchPriority="high"
        />

        <ProductHeroText hero={flipUpPage.hero} />
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
            {flipUpPage.benefits.eyebrow}
          </ProductSectionEyebrow>

          <Typography
            sx={{
              ...sectionHeadingSx,
              maxWidth: { xs: "100%", md: "14ch" },
            }}
          >
            {flipUpPage.benefits.title}
          </Typography>

          <Typography
            sx={{
              mt: 1.8,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "40ch" },
            }}
          >
            {formatDisplayText(flipUpPage.benefits.description)}
          </Typography>

          <Box sx={{ mt: 3.4, display: "grid", gap: 1.8 }}>
            {flipUpPage.benefits.items.map((item) => (
              <ProductBenefitLine
                key={item.title}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </Box>
        </Box>

        <ProductImageCard
          src={images.aluFront}
          alt="Lupy Eye Optic ALU Flip-Up — widok z przodu"
        />
      </Box>

      <FlipUpVariantsSection configurations={flipUpConfigurations} />

      <FlipUpTablesSection configurations={flipUpConfigurations} />

      <Box sx={{ mt: { xs: 7, md: 9 } }}>
        <ProductConsultationSection
          title={flipUpPage.consultation.title}
          description={flipUpPage.consultation.description}
          buttonLabel={flipUpPage.consultation.buttonLabel}
        />
      </Box>
    </>
  );
}

function FlipUpVariantsSection({ configurations }) {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 } }}>
      <Box>
        <ProductSectionEyebrow>
          {flipUpPage.variants.eyebrow}
        </ProductSectionEyebrow>

        <Typography
          sx={{
            ...sectionHeadingSx,
            maxWidth: { xs: "100%", md: "17ch" },
          }}
        >
          {flipUpPage.variants.title}
        </Typography>

        <Typography
          sx={{
            mt: 1.8,
            ...bodyTextSx,
            maxWidth: { xs: "100%", md: "48ch" },
          }}
        >
          {formatDisplayText(flipUpPage.variants.description)}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: { xs: 3.5, md: 4.5 },
          display: "grid",
          gap: { xs: 5, md: 4 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {configurations.map((item) => (
          <Box
            key={item.name}
            sx={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {images[item.key] && (
              <Box
                sx={{
                  mb: { xs: 2, md: 2.5 },
                  width: "100%",
                  position: "relative",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={images[item.key]}
                  alt={`Lupy ${item.name} — widok produktu`}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    transform: item.key === "alu" ? "scale(1.12)" : "none",
                  }}
                />
              </Box>
            )}
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                px: { xs: 1, md: 0 },
                boxSizing: "border-box",
              }}
            >
              <Typography
                sx={{
                  color: colors.text,
                  fontSize: { xs: 24, md: 28 },
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                }}
              >
                {item.name}
              </Typography>

              <Typography
                sx={{
                  mt: 1.15,
                  ...bodyTextSx,
                  minHeight: { md: "3.5em" },
                }}
              >
                {formatDisplayText(item.shortDescription)}
              </Typography>

              <Box
                sx={{
                  mt: 2.2,
                  display: "grid",
                  gap: 0.95,
                }}
              >
                {item.bullets.map((bullet) => (
                  <ProductBulletItem key={bullet}>{bullet}</ProductBulletItem>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function FlipUpTablesSection({ configurations }) {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 } }}>
      <ProductSectionEyebrow>{flipUpPage.tables.eyebrow}</ProductSectionEyebrow>

      <Typography
        sx={{
          ...sectionHeadingSx,
          maxWidth: { xs: "100%", md: "12ch" },
        }}
      >
        {flipUpPage.tables.title}
      </Typography>

      <Typography
        sx={{
          mt: 1.8,
          ...bodyTextSx,
          maxWidth: { xs: "100%", md: "46ch" },
        }}
      >
        {formatDisplayText(flipUpPage.tables.description)}
      </Typography>

      <Box
        sx={{
          mt: 3.2,
          display: "grid",
          gap: { xs: 4, md: 4.5 },
        }}
      >
        {configurations.map((configuration) => (
          <Box
            key={configuration.name}
            sx={{
              display: "grid",
              gap: { xs: 2.2, md: 3.2 },
              gridTemplateColumns: "1fr",
              [`@media (min-width:${flipUpDesktopTableMinWidth}px)`]: {
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
              },
              alignItems: "start",
            }}
          >
            <Box sx={{ px: { md: 1 } }}>
              <Typography
                sx={{
                  color: colors.accent,
                  fontSize: { xs: 13, md: 14 },
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  mb: 1.1,
                }}
              >
                {configuration.name}
              </Typography>

              <Typography
                sx={{
                  color: colors.text,
                  fontSize: { xs: 24, md: 30 },
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  mb: 1.4,
                }}
              >
                {flipUpPage.tables.configurationPrefix} {configuration.name}
              </Typography>

              <Typography
                sx={{
                  ...bodyTextSx,
                  maxWidth: { xs: "100%", md: "42ch" },
                }}
              >
                {formatDisplayText(configuration.shortDescription)}
              </Typography>
            </Box>

            <ProductSpecsTable
              magnifications={configuration.magnifications}
              rows={configuration.rows}
              magnificationLabel={flipUpPage.tables.magnificationLabel}
              desktopMinWidth={flipUpDesktopTableMinWidth}
              mobileLabelInset
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
