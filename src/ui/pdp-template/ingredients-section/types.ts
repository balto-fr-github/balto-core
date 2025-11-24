import { ReactNode } from "react";

export type Theme = {
  darkColor: string;
  middleColor: string;
  lightColor: string;
};

export type HrefLink = {
  text: string;
  href: string;
};

export type BackDesc = string | ReactNode | Array<string | ReactNode>;

export type IngredientsType = {
  frontTitle: string;
  frontTitleImage?: string;
  frontDesc: string;
  frontBouche: string;
  frontImage: string;
  backTitle: string;
  backDesc: BackDesc;
  backSubTitle: string;
  hrefLink: Array<HrefLink>;
  isTitleItalic?: boolean;
};
