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
  interactiveCardHoverSx,
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
            alignItems: "start",
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

          <Box
            sx={{
              borderRadius: { xs: 0, md: 4 },
              p: { xs: 0, md: 2.4 },
              background: {
                xs: "transparent",
                md: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)",
              },
              border: { xs: "none", md: `1px solid ${colors.border}` },
              boxShadow: { xs: "none", md: colors.shadowSm },
              overflow: { xs: "visible", md: "hidden" },
              ...interactiveCardHoverSx,
              "&:hover": {
                transform: { xs: "none", md: "translateY(-2px)" },
                boxShadow: { xs: "none", md: "0 16px 38px rgba(15,23,42,0.07)" },
                borderColor: { xs: "transparent", md: "rgba(15,23,42,0.09)" },
              },
            }}
          >
            <Box
              sx={{
                display: { xs: "grid", md: "none" },
              }}
            >
              <MobileSpecsTable
                magnifications={ttlMagnifications}
                rows={ttlTableRows}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                borderRadius: 3,
                border: "1px solid rgba(15,23,42,0.06)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)",
                backdropFilter: "blur(6px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                overflow: "hidden",
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
                    {[ttlPage.configuration.magnificationLabel, ...ttlMagnifications].map(
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
                  {ttlTableRows.map((row, rowIndex) => (
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
                            rowIndex === ttlTableRows.length - 1
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
                              rowIndex === ttlTableRows.length - 1
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
          {ttlPage.configuration.magnificationLabel}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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

      <Box sx={{ display: "grid", overflow: "hidden" }}>
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

              <Box
                sx={{
                  mt: 1.05,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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

function formatMobileSpec(label, value) {
  let cleanLabel = String(label)
    .replace(/\s*\(mm\)/gi, "")
    .replace(/\s*\(g\)/gi, "")
    .trim();

  if (/głęb[a-ząćęłńóśżź\s]*/i.test(cleanLabel))
    cleanLabel = "Głębia ostrości";
  if (/pole widzenia/i.test(cleanLabel)) cleanLabel = "Pole widzenia";

  let formattedValue = String(value).trim();

  if (
    /ogniskowa/i.test(label) ||
    /głęb[a-ząćęłńóśżź\s]*/i.test(label) ||
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
