import type { DemoContent } from "@/components/builder/types";

export type ThemeStyle = {
  radius: string;
  cardShadow: string;
  buttonRadius: string;
  sectionPadding: string;
  cardPadding: string;
  borderWidth: string;
};

export type SectionProps = {
  content: DemoContent;
  primary: string;
  secondary: string;
  tertiary: string;
  isDark: boolean;
  layoutPreset: string;
  themeStyle: ThemeStyle;
  architecture: {
    heroBadge: string;
    heroCta: string;
    servicesTitle: string;
    trustItems: string[];
  };
};