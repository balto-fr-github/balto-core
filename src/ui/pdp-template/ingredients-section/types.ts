export type Theme = {
  darkColor: string;
  middleColor: string;
  lightColor: string;
};

export type HrefLink = {
  text: string;
  href: string;
};

export type IngredientsType = {
  frontTitle: string;
  frontTitleImage?: string;
  frontDesc: string;
  frontBouche: string;
  frontImage: string;
  backTitle: string;
  backDesc: Array<string>;
  backSubTitle: string;
  hrefLink: Array<HrefLink>;
  isTitleItalic?: boolean;
};
