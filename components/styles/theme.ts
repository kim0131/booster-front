import { mediaQuery } from "@core/config/media-query";

const theme = {
  screen: {
    xs: `@media ${mediaQuery[0]}`,
    sm: `@media ${mediaQuery[1]}`,
    md: `@media ${mediaQuery[2]}`,
    lg: `@media ${mediaQuery[3]}`,
  },
  fontSize: {
    header1: "4rem",
    header2: "3rem",
    header3: "2rem",
    header4: "1.5rem",
    header5: "1.25rem",
    sub1: "2rem",
    sub2: "1.5rem",
    sub3: "1.25rem",
    body1: "1rem",
    body2: "0.875rem",
    body3: "0.75rem",
  },
  lineHeight: {
    header1: "5rem",
    header2: "4rem",
    header3: "2.5rem",
    header4: "1.875rem",
    header5: "1.625rem",
    sub1: "2.5rem",
    sub2: "1.875rem",
    sub3: "1.625rem",
    body1: "1.25rem",
    body2: "1.125rem",
    body3: "1rem",
  },
  color: {
    white: "#ffffff",
    black: "#000000",
    gray: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    green: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
    },
    red: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
  },
};

export default theme;
