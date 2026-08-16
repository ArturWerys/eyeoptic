"use client";

import { Box, Typography } from "@mui/material";

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
  heroCardSx,
  heroAccentSx,
  sectionHeadingSx,
} from "@/components/products/productPageStyles";

const images = [
  "/images/ergo-product/ergo-flip-up.webp",
  "/images/ergo-product/ergo-flip-up-2.webp",
];

const ergoDetailsEditorialWrapSx = {
  px: { xs: 0, md: 1 },
  py: { xs: 0.4, md: 1.2 },
};

const ergoDetailsColumnsSx = {
  display: "grid",
  gap: { xs: 2.7, md: 0 },
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
};

const ergoDetailsColumnSx = {
  position: "relative",
  minWidth: 0,
  "&:not(:first-of-type)": {
    pt: { xs: 2.7, md: 0 },
    pl: { xs: 0, md: 5.2 },
    "&::before": {
      content: '""',
      position: "absolute",
      top: { xs: 0, md: "10px" },
      right: { xs: 0, md: "auto" },
      bottom: { xs: "auto", md: "10px" },
      left: 0,
      width: { xs: "100%", md: "1px" },
      height: { xs: "1px", md: "auto" },
      backgroundColor: "rgba(15,23,42,0.045)",
    },
  },
  "&:first-of-type": {
    pr: { md: 5.2 },
  },
};

const ergoDetailsHeadingSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.15,
};

const ergoDetailsAccentSx = {
  width: 7,
  height: 7,
  borderRadius: 999,
  backgroundColor: colors.accent,
  flex: "0 0 auto",
};

const ergoPage = content.products.ergo.page;

export default function ErgoProductClient() {
  return (
    <>
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <ProductImageCard
          src={images[0]}
          alt="Lupy Eye Optic Ergo"
          loading="eager"
          fetchPriority="high"
          sx={{
            width: "100%",
            minWidth: 0,
            mx: "auto",
          }}
        />

        <Box
          sx={{
            ...heroCardSx,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              fontSize: { xs: 36, sm: 42, md: 52 },
              color: colors.text,
            }}
          >
            {ergoPage.hero.title}
          </Typography>

          <Typography
            sx={{
              ...heroAccentSx,
              ml: { xs: -0.5, md: 0 },
            }}
          >
            {ergoPage.hero.accent}
          </Typography>

          <Typography
            sx={{
              mt: 2.6,
              ...bodyTextSx,
              maxWidth: { xs: "100%", md: "34ch" },
            }}
          >
            {formatDisplayText(ergoPage.hero.description)}
          </Typography>

          <Box
            sx={{
              mt: 3.2,
              display: "grid",
              gap: 1.2,
            }}
          >
            {ergoPage.hero.uses.map((item) => (
              <ProductBulletItem key={item}>{item}</ProductBulletItem>
            ))}
          </Box>
        </Box>
      </Box>

      <ErgoBenefitsSection />

      <ErgoDetailsSection />

      <ErgoWhySection />

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

function ErgoBenefitsSection() {
  return (
    <Box
      sx={{
        mt: { xs: 7, md: 9 },
        display: "grid",
        gap: { xs: 3, md: 4 },
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        alignItems: "center",
      }}
    >
      <Box sx={{ px: { md: 1 }, order: { xs: 2, md: 1 } }}>
        <ProductSectionEyebrow>{ergoPage.story.eyebrow}</ProductSectionEyebrow>

        <Typography
          sx={{
            ...sectionHeadingSx,
            maxWidth: { xs: "100%", md: "16ch" },
            whiteSpace: "pre-line",
          }}
        >
          {ergoPage.story.title}
        </Typography>

        <Typography
          sx={{
            mt: 1.8,
            ...bodyTextSx,
            maxWidth: { xs: "100%", md: "42ch" },
          }}
        >
          {formatDisplayText(ergoPage.story.description)}
        </Typography>

        <Box sx={{ mt: 3.4, display: "grid", gap: 1.8 }}>
          {ergoPage.benefits.items.map((item) => (
            <ProductBenefitLine
              key={item.title}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ order: { xs: 1, md: 2 } }}>
        <ProductImageCard
          src={images[1]}
          alt="Korzyści pracy w lupach Ergo"
        />
      </Box>
    </Box>
  );
}

function ErgoWhySection() {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 } }}>
      <ProductSectionEyebrow>{ergoPage.why.eyebrow}</ProductSectionEyebrow>

      <Typography
        sx={{
          ...sectionHeadingSx,
          mt: 0.7,
          maxWidth: { xs: "100%", md: "18ch" },
        }}
      >
        {ergoPage.why.title}
      </Typography>

      <Box
        sx={{
          mt: { xs: 2.3, md: 2.8 },
          display: "grid",
          gap: { xs: 1.15, md: 1.3 },
          maxWidth: { xs: "100%", md: "54ch" },
        }}
      >
        {ergoPage.why.items.map((item) => (
          <ProductBulletItem key={item}>{item}</ProductBulletItem>
        ))}
      </Box>
    </Box>
  );
}

function ErgoDetailsSection() {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 } }}>
      <ProductSectionEyebrow>{ergoPage.details.eyebrow}</ProductSectionEyebrow>

      <Typography
        sx={{
          ...sectionHeadingSx,
          maxWidth: { xs: "100%", md: "16ch" },
        }}
      >
        {ergoPage.details.title}
      </Typography>

      <Typography
        sx={{
          mt: 1.8,
          ...bodyTextSx,
          maxWidth: { xs: "100%", md: "58ch" },
        }}
      >
        {formatDisplayText(ergoPage.details.description)}
      </Typography>

      <Box
        sx={{
          mt: { xs: 3.4, md: 3.8 },
          ...ergoDetailsEditorialWrapSx,
        }}
      >
        <Box sx={ergoDetailsColumnsSx}>
          {ergoPage.details.items.map((item) => (
            <Box key={item.title} sx={ergoDetailsColumnSx}>
              <Box sx={ergoDetailsHeadingSx}>
                <Box aria-hidden="true" sx={ergoDetailsAccentSx} />

                <Typography
                  sx={{
                    color: colors.text,
                    fontSize: { xs: 22, md: 26 },
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    maxWidth: "20ch",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 1.15,
                  ...bodyTextSx,
                  maxWidth: "38ch",
                }}
              >
                {formatDisplayText(item.desc)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function SharedConsultationSection() {
  return (
    <ProductConsultationSection
      title={ergoPage.consultation.title}
      description={ergoPage.consultation.description}
      buttonLabel={ergoPage.consultation.buttonLabel}
    />
  );
}
