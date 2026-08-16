"use client";

import { Box, Typography } from "@mui/material";

import colors from "@/data/colors";

export default function ProductSpecsTable({
  magnifications,
  rows,
  magnificationLabel,
  desktopMinWidth,
  mobileLabelInset = false,
}) {
  const mobileDisplaySx = desktopMinWidth
    ? {
        display: "grid",
        [`@media (min-width:${desktopMinWidth}px)`]: {
          display: "none",
        },
      }
    : {
        display: { xs: "grid", md: "none" },
      };

  const desktopDisplaySx = desktopMinWidth
    ? {
        display: "none",
        [`@media (min-width:${desktopMinWidth}px)`]: {
          display: "block",
          alignSelf: "center",
        },
      }
    : {
        display: { xs: "none", md: "block" },
        alignSelf: { md: "center" },
      };

  return (
    <>
      <Box sx={mobileDisplaySx}>
        <MobileSpecsTable
          magnifications={magnifications}
          rows={rows}
          magnificationLabel={magnificationLabel}
          labelInset={mobileLabelInset}
        />
      </Box>

      <DesktopSpecsTable
        magnifications={magnifications}
        rows={rows}
        magnificationLabel={magnificationLabel}
        sx={desktopDisplaySx}
      />
    </>
  );
}

function DesktopSpecsTable({ magnifications, rows, magnificationLabel, sx }) {
  return (
    <Box
      sx={{
        ...sx,
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
            {[magnificationLabel, ...magnifications].map((head, index) => (
              <Box
                key={head}
                component="th"
                sx={{
                  px: index === 0 ? 1.8 : 1.2,
                  py: 1.6,
                  textAlign: index === 0 ? "left" : "center",
                  fontSize: index === 0 ? 15.5 : 18,
                  fontWeight: index === 0 ? 700 : 800,
                  color: index === 0 ? colors.textSoft : colors.accent,
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
            ))}
          </Box>
        </Box>

        <Box component="tbody">
          {rows.map((row, rowIndex) => (
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
                    rowIndex === rows.length - 1
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
                      rowIndex === rows.length - 1
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
  );
}

function MobileSpecsTable({
  magnifications,
  rows,
  magnificationLabel,
  labelInset,
}) {
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
          {magnificationLabel}
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

      <Box sx={{ display: "grid", overflow: "hidden" }}>
        {rows.map((row, rowIndex) => {
          const normalizedLabel = formatMobileSpec(
            row.label,
            row.values[0],
          ).label;
          const normalizedValues = row.values.map(
            (value) => formatMobileSpec(row.label, value).value,
          );
          const label = (
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
              {labelInset ? (
                <Box
                  sx={{
                    px: 1.15,
                    py: 0.55,
                    borderRadius: 0,
                    background: "transparent",
                    border: "none",
                  }}
                >
                  {label}
                </Box>
              ) : (
                label
              )}

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
