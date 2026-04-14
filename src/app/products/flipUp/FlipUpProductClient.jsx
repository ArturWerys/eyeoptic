"use client";

import NextLink from "next/link";
import { Box, Button, Typography } from "@mui/material";

import colors from "@/data/colors";
import content from "@/data/content";
import { formatDisplayText } from "@/lib/text";
import {
  ProductBenefitLine,
  ProductBulletItem,
  ProductConsultationSection,
  ProductImageCard,
  ProductSectionEyebrow,
} from "@/components/products/ProductPageShared";
import {
  bodyTextSx,
  ctaButtonSx,
  heroCardSx,
  heroAccentSx,
  interactiveCardHoverSx,
  panelCardSx,
  sectionHeadingSx,
} from "@/components/products/productPageStyles";

const images = [
  "/images/flip-up-product/flip-up-alu.webp",
  "/images/flip-up-product/flip-up-mini.webp",
];

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
          src={images[0]}
          alt="Lupy Flip-Up"
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
            {flipUpPage.hero.title}
          </Typography>

          <Typography
            sx={{
              ...heroAccentSx,
            }}
          >
            {flipUpPage.hero.accent}
          </Typography>

          <Typography
            sx={{
              mt: 2.6,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "34ch" },
            }}
          >
            {formatDisplayText(flipUpPage.hero.description)}
          </Typography>

          <Box
            sx={{
              mt: 3.2,
              display: "grid",
              gap: 1.2,
            }}
          >
            {flipUpPage.hero.uses.map((item) => (
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
          src={images[1]}
          alt="Korzyści pracy w lupach Flip-Up"
        />
      </Box>

      <FlipUpVariantsSection configurations={flipUpConfigurations} />

      <FlipUpTablesSection configurations={flipUpConfigurations} />

      <Box
        sx={{
          mt: { xs: 7, md: 9 },
        }}
      >
        <SharedConsultationSection />
      </Box>
    </>
  );
}

function FlipUpVariantsSection({ configurations }) {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 } }}>
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

      <Box
        sx={{
          mt: 3.2,
          display: "grid",
          gap: { xs: 1.6, md: 2 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {configurations.map((item) => (
          <Box
            key={item.name}
            sx={{
              ...panelCardSx,
              ...interactiveCardHoverSx,
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
                maxWidth: "34ch",
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

            <Box
              sx={{
                borderRadius: 4,
                p: 0,
                background: "transparent",
                border: "none",
                boxShadow: "none",
                overflow: "visible",
                [`@media (min-width:${flipUpDesktopTableMinWidth}px)`]: {
                  p: 2.4,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)",
                  border: `1px solid ${colors.border}`,
                  boxShadow: colors.shadowSm,
                  overflow: "hidden",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  [`@media (min-width:${flipUpDesktopTableMinWidth}px)`]: {
                    display: "none",
                  },
                }}
              >
                <MobileSpecsTable
                  magnifications={configuration.magnifications}
                  rows={configuration.rows}
                />
              </Box>

              <Box
                sx={{
                  display: "none",
                  borderRadius: 3,
                  border: "1px solid rgba(15,23,42,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                  overflow: "hidden",
                  [`@media (min-width:${flipUpDesktopTableMinWidth}px)`]: {
                    display: "block",
                  },
                }}
              >
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    borderCollapse: "collapse",
                    tableLayout: "fixed",
                  }}
                >
                  <Box component="thead">
                    <Box component="tr">
                      {[flipUpPage.tables.magnificationLabel, ...configuration.magnifications].map(
                        (head, index) => (
                          <Box
                            key={head}
                            component="th"
                            sx={{
                              px: index === 0 ? 1.8 : 1.2,
                              py: 1.6,
                              textAlign: index === 0 ? "left" : "center",
                              fontSize: index === 0 ? 15.5 : 18,
                              fontWeight: index === 0 ? 700 : 800,
                              color:
                                index === 0 ? colors.textSoft : colors.accent,
                              letterSpacing: index === 0 ? "0" : "-0.02em",
                              textTransform: "none",
                              lineHeight: 1,
                              borderBottom: "1px solid rgba(15,23,42,0.04)",
                              backgroundColor: "rgba(14,165,164,0.08)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {index === 0 ? head : formatMagnification(head)}
                          </Box>
                        ),
                      )}
                    </Box>
                  </Box>

                  <Box component="tbody">
                    {configuration.rows.map((row, rowIndex) => (
                      <Box key={row.label} component="tr">
                        <Box
                          component="td"
                          sx={{
                            px: 1.8,
                            py: 1.55,
                            fontSize: 13.5,
                            fontWeight: 700,
                            color: colors.textSoft,
                            borderBottom:
                              rowIndex === configuration.rows.length - 1
                                ? "none"
                                : "1px solid rgba(15,23,42,0.04)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.label}
                        </Box>

                        {row.values.map((value, valueIndex) => (
                          <Box
                            key={`${row.label}-${valueIndex}`}
                            component="td"
                            sx={{
                              px: 1.2,
                              py: 1.55,
                              textAlign: "center",
                              fontSize: 16,
                              fontWeight: 700,
                              color: colors.text,
                              borderBottom:
                                rowIndex === configuration.rows.length - 1
                                  ? "none"
                                  : "1px solid rgba(15,23,42,0.04)",
                              borderLeft:
                                valueIndex === 0
                                  ? "none"
                                  : "1px solid rgba(15,23,42,0.04)",
                              whiteSpace: "nowrap",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {value}
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function SharedConsultationSection() {
  return (
    <ProductConsultationSection
      title={flipUpPage.consultation.title}
      description={flipUpPage.consultation.description}
      buttonLabel={flipUpPage.consultation.buttonLabel}
    />
  );
}

function MobileSpecsTable({ magnifications, rows }) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        border: "1px solid rgba(15,23,42,0.07)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 100%)",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2.3,
          pt: 2.35,
          pb: 2.05,
          borderBottom: "1px solid rgba(15,23,42,0.06)",
          background:
            "linear-gradient(180deg, rgba(14,165,164,0.08) 0%, rgba(14,165,164,0.035) 100%)",
        }}
      >
        <Typography
          sx={{
            mb: 0.9,
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.accent,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          {flipUpPage.tables.magnificationLabel}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${magnifications.length}, minmax(0, 1fr))`,
            alignItems: "center",
          }}
        >
          {magnifications.map((magnification, index) => (
            <Box
              key={magnification}
              sx={{
                px: 1.2,
                textAlign: "center",
                borderLeft:
                  index === 0 ? "none" : "1px solid rgba(15,23,42,0.2)",
              }}
            >
              <Typography
                sx={{
                  color: colors.accent,
                  fontSize: 17.5,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textAlign: "center",
                }}
              >
                {formatMagnification(magnification)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          overflow: "hidden",
        }}
      >
        {rows.map((row, rowIndex) => {
          const normalizedLabel = formatMobileSpec(
            row.label,
            row.values[0],
          ).label;
          const normalizedValues = row.values.map(
            (value) => formatMobileSpec(row.label, value).value,
          );

          return (
            <Box
              key={row.label}
              sx={{
                px: 2,
                pt: 1.85,
                pb: 2,
                borderBottom:
                  rowIndex === rows.length - 1
                    ? "none"
                    : "1px solid rgba(15,23,42,0.055)",
              }}
            >
              <Box
                sx={{
                  px: 1.15,
                  py: 0.55,
                  borderRadius: 0,
                  background: "transparent",
                  border: "none",
                }}
              >
                <Typography
                  sx={{
                    color: colors.accent,
                    fontSize: 13,
                    fontWeight: 800,
                    lineHeight: 1.25,
                    letterSpacing: "0.06em",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {normalizedLabel}
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 1.05,
                  display: "grid",
                  gridTemplateColumns: `repeat(${magnifications.length}, minmax(0, 1fr))`,
                  alignItems: "center",
                }}
              >
                {normalizedValues.map((value, index) => (
                  <Box
                    key={`${row.label}-${index}`}
                    sx={{
                      px: 1.15,
                      textAlign: "center",
                      borderLeft:
                        index === 0 ? "none" : "1px solid rgba(15,23,42,0.2)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: 800,
                        lineHeight: 1.35,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function formatMobileSpec(label, value) {
  let cleanLabel = String(label)
    .replace(/\s*\(mm\)/gi, "")
    .replace(/\s*\(g\)/gi, "")
    .trim();

  if (/głębia ostrości/i.test(cleanLabel)) cleanLabel = "Głębia ostrości";
  if (/pole widzenia/i.test(cleanLabel)) cleanLabel = "Pole widzenia";

  let formattedValue = String(value).trim();

  if (
    /ogniskowa/i.test(label) ||
    /głębia ostrości/i.test(label) ||
    /pole widzenia/i.test(label)
  ) {
    if (!/mm$/i.test(formattedValue)) {
      formattedValue = `${formattedValue} mm`;
    }
  }

  if (/waga/i.test(label)) {
    if (!/g$/i.test(formattedValue)) {
      formattedValue = `${formattedValue} g`;
    }
  }

  return {
    label: cleanLabel,
    value: formattedValue,
  };
}

function formatMagnification(value) {
  return String(value).replace(/x/gi, "x");
}
