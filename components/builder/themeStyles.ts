import type { ThemeStyle } from "@/components/builder/sections/types";

export const themeStyles: Record<string, ThemeStyle> = {
  modern: {
    radius: "rounded-2xl",
    cardShadow: "shadow-lg",
    buttonRadius: "rounded-full",
    sectionPadding: "px-6 py-14",
    cardPadding: "p-6",
    borderWidth: "border",
  },

  classic: {
    radius: "rounded-md",
    cardShadow: "shadow-sm",
    buttonRadius: "rounded-md",
    sectionPadding: "px-6 py-12",
    cardPadding: "p-5",
    borderWidth: "border",
  },

  luxury: {
    radius: "rounded-3xl",
    cardShadow: "shadow-2xl",
    buttonRadius: "rounded-full",
    sectionPadding: "px-8 py-24",
    cardPadding: "p-8",
    borderWidth: "border",
  },

  industrial: {
    radius: "rounded-none",
    cardShadow: "shadow-none",
    buttonRadius: "rounded-none",
    sectionPadding: "px-6 py-14",
    cardPadding: "p-5",
    borderWidth: "border-2",
  },

  dark: {
    radius: "rounded-2xl",
    cardShadow: "shadow-xl",
    buttonRadius: "rounded-full",
    sectionPadding: "px-6 py-16",
    cardPadding: "p-6",
    borderWidth: "border",
  },

  high_contrast: {
    radius: "rounded-lg",
    cardShadow: "shadow-none",
    buttonRadius: "rounded-lg",
    sectionPadding: "px-6 py-14",
    cardPadding: "p-6",
    borderWidth: "border-2",
  },

  custom: {
    radius: "rounded-2xl",
    cardShadow: "shadow-lg",
    buttonRadius: "rounded-full",
    sectionPadding: "px-6 py-14",
    cardPadding: "p-6",
    borderWidth: "border",
  },
};