"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import colors from "@/data/colors";
import content from "@/data/content";
import { manualCarouselTransition } from "@/data/carouselTransitions";
import { getActionIconButtonSx } from "@/data/buttonStyles";
import { formatDisplayText } from "@/lib/text";
import {
  ProductBenefitLine,
  ProductHeroText,
  ProductImageCard,
  ProductSectionEyebrow,
} from "@/components/products/ProductPageShared";
import {
  bodyTextSx,
  ctaButtonSx,
  sectionHeadingSx,
} from "@/components/products/productPageStyles";

const ledFreeImages = [
  {
    src: "/images/led-product/led-free-3.webp",
    alt: "Oświetlenie LED Free zamontowane na lupach",
    label: "Widok główny",
  },
  {
    src: "/images/led-product/led-free-4.webp",
    alt: "LED Free - widok z boku",
    label: "Widok z boku",
  },
  {
    src: "/images/led-product/led-free-5.webp",
    alt: "Zbliżenie na lampę LED Free",
    label: "Detal oświetlenia",
  },
];

const ergoLedImages = [
  {
    src: "/images/led-product/ergo-led-3.webp",
    scale: 1.15,
    alt: "Oświetlenie Ergo LED - widok perspektywiczny",
    label: "Widok główny",
  },
  {
    src: "/images/led-product/ergo-led-2.webp",
    scale: 1.3,
    alt: "Oświetlenie Ergo LED od przodu",
    label: "Widok z przodu",
  },
  {
    src: "/images/led-product/ergo-led-4.webp",
    alt: "Oświetlenie Ergo LED z innej perspektywy",
    label: "Widok alternatywny",
  },
];

const images = {
  configuration: "/images/led-product/led-free-2.webp",
};

const ledProductCardSx = {
  aspectRatio: "7 / 5",
  overflow: "hidden",
};

const ledProductImageSx = {
  objectFit: "contain",
  transform: "scale(1.22)",
  transformOrigin: "center",
};

const ledSectionGridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 3, md: 4 },
  alignItems: "center",
};

const ledGalleryArrowSx = getActionIconButtonSx("neutral", {
  display: { xs: "none", md: "inline-flex" },
  width: 40,
  height: 40,
  flex: "0 0 40px",
  alignItems: "center",
  justifyContent: "center",
  p: 0,
  zIndex: 1,
  color: colors.textMute,
  boxShadow: "none",
  transition:
    "opacity 260ms ease, transform 180ms ease, background-position 260ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease",
  "@media (hover: hover) and (pointer: fine)": {
    opacity: 0,
    pointerEvents: "none",
    ".led-gallery:hover &, .led-gallery:has(:focus-visible) &": {
      opacity: 1,
      pointerEvents: "auto",
    },
  },
  "&:focus-visible": { opacity: 1 },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
});

const ledPage = content.products.led.page;

export default function LedProductClient() {
  return (
    <>
      <Box
        sx={{
          ...ledSectionGridSx,
          mt: { xs: 4, md: 6 },
        }}
      >
        <LedImageGallery images={ledFreeImages} label="Galeria LED Free" priority />

        <ProductHeroText hero={ledPage.hero} />
      </Box>

      <Box
        sx={{
          ...ledSectionGridSx,
          mt: { xs: 7, md: 9 },
        }}
      >
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            px: { md: 1 },
          }}
        >
          <ProductSectionEyebrow>
            {ledPage.benefits.eyebrow}
          </ProductSectionEyebrow>

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

        <Box
          sx={{
            order: { xs: 1, md: 2 },
            minWidth: 0,
          }}
        >
          <LedImageGallery images={ergoLedImages} label="Galeria Ergo LED" />
        </Box>
      </Box>

      <Box
        sx={{
          ...ledSectionGridSx,
          mt: { xs: 7, md: 9 },
        }}
      >
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            width: "100%",
            minWidth: 0,
          }}
        >
          <ProductImageCard
            src={images.configuration}
            alt="Akcesorium do oświetlenia LED Free"
            objectPosition="center"
            sx={ledProductCardSx}
            imageSx={ledProductImageSx}
          />
        </Box>

        <Box
          sx={{
            order: { xs: 2, md: 1 },
            px: { md: 1 },
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

          <Box sx={{ mt: 3.1 }}>
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

function LedImageGallery({ images, label, priority = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const touchStartRef = useRef(null);
  const activeIndexRef = useRef(0);
  const requestedIndexRef = useRef(0);
  const transitionRequestRef = useRef(0);
  const fadeTimerRef = useRef(null);
  const revealTimerRef = useRef(null);
  const decodedImagesRef = useRef(new Map());
  const activeImage = images[activeIndex];
  const imageTransition = `opacity ${
    imageVisible
      ? manualCarouselTransition.fadeInMs
      : manualCarouselTransition.fadeOutMs
  }ms cubic-bezier(0.33, 1, 0.68, 1)`;

  useEffect(() => {
    return () => {
      transitionRequestRef.current += 1;
      window.clearTimeout(fadeTimerRef.current);
      window.clearTimeout(revealTimerRef.current);
    };
  }, []);

  const goToImage = async (nextIndex) => {
    if (nextIndex === requestedIndexRef.current) return;

    requestedIndexRef.current = nextIndex;
    setShowSwipeHint(false);
    const requestId = ++transitionRequestRef.current;
    window.clearTimeout(fadeTimerRef.current);
    window.clearTimeout(revealTimerRef.current);
    setImageVisible(true);

    if (nextIndex === activeIndexRef.current) return;

    // Keep the current photo visible until the next one is ready to display.
    const src = images[nextIndex].src;
    if (!decodedImagesRef.current.has(src)) {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      decodedImagesRef.current.set(src, image.decode().then(
        () => true,
        () => false,
      ));
    }

    const ready = await decodedImagesRef.current.get(src);
    if (requestId !== transitionRequestRef.current) return;

    if (!ready) {
      decodedImagesRef.current.delete(src);
      requestedIndexRef.current = activeIndexRef.current;
      setImageVisible(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      setImageVisible(true);
      return;
    }

    setImageVisible(false);
    fadeTimerRef.current = window.setTimeout(() => {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      revealTimerRef.current = window.setTimeout(() => {
        setImageVisible(true);
      }, manualCarouselTransition.switchPauseMs);
    }, manualCarouselTransition.fadeOutMs);
  };

  const changeImage = (direction) => {
    void goToImage((requestedIndexRef.current + direction + images.length) % images.length);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = event.touches.length === 1
      ? { x: touch.clientX, y: touch.clientY }
      : null;
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) >= 42 && Math.abs(deltaX) > Math.abs(deltaY)) {
      changeImage(deltaX < 0 ? 1 : -1);
    }
  };

  return (
    <Box
      className="led-gallery"
      role="group"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          changeImage(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      sx={{ width: "100%", minWidth: 0 }}
    >
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStartRef.current = null; }}
        sx={{ position: "relative", touchAction: "pan-y pinch-zoom" }}
      >
        <ProductImageCard
          src={activeImage.src}
          alt={activeImage.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          objectPosition={activeImage.position ?? "center"}
          sx={ledProductCardSx}
          imageSx={{
            ...ledProductImageSx,
            transform: `scale(${activeImage.scale ?? 1.4})`,
            opacity: imageVisible ? 1 : 0,
            transition: imageTransition,
            willChange: "opacity",
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 0, md: 1.1 },
        }}
      >
        <Button
          type="button"
          aria-label="Poprzednie zdjęcie"
          onClick={() => changeImage(-1)}
          sx={ledGalleryArrowSx}
        >
          <ChevronLeftRoundedIcon sx={{ fontSize: 20 }} />
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 0.9, md: 1 },
            minWidth: { xs: 62, md: 68 },
          }}
        >
          {images.map((image, index) => {
            const isActive = activeIndex === index;

            return (
              <Box
                key={image.src}
                component="button"
                type="button"
                onClick={() => { void goToImage(index); }}
                aria-label={`Pokaż zdjęcie ${index + 1} z ${images.length}: ${image.label}`}
                aria-current={isActive ? "true" : undefined}
                sx={{
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  minWidth: 24,
                  height: 32,
                  p: 0,
                  border: 0,
                  borderRadius: 999,
                  backgroundColor: "transparent",
                  "&:hover > span": {
                    backgroundColor: isActive
                      ? "rgba(38,176,173,0.92)"
                      : "rgba(15,23,42,0.24)",
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${colors.accent}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: isActive ? 22 : 7,
                    height: 7,
                    borderRadius: 999,
                    backgroundColor: isActive
                      ? "rgba(38,176,173,0.78)"
                      : "rgba(15,23,42,0.16)",
                    transition:
                      "width 260ms ease, background-color 220ms ease, transform 220ms ease",
                    transform: isActive ? "scale(1)" : "scale(0.98)",
                    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Button
          type="button"
          aria-label="Następne zdjęcie"
          onClick={() => changeImage(1)}
          sx={ledGalleryArrowSx}
        >
          <ChevronRightRoundedIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>

      <Typography
        aria-hidden="true"
        sx={{
          display: { xs: "block", md: "none" },
          mt: 0.5,
          textAlign: "center",
          color: "rgba(45,99,101,0.72)",
          fontSize: { xs: 12, sm: 12.4 },
          fontWeight: 600,
          lineHeight: 1.25,
          opacity: showSwipeHint ? 0.52 : 0,
          pointerEvents: "none",
          transition: "opacity 400ms ease",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        Przesuń, aby zobaczyć więcej
      </Typography>
    </Box>
  );
}
