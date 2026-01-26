export type ProductCategory = "complements" | "croquettes" | "friandises";

export type Product = {
  imageMobile: string;
  imageDesktop: string;
  title: string;
  description: string;
  href: string;
  category: ProductCategory;
};

const CDN_BASE_URL = "https://cdn.baltoclub.com/assets";

export const COMPLEMENT_PRODUCTS_FR: Product[] = [
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_CJF.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_CJF.webp`,
    title: "Articulations",
    description: "Une mellieure mobilité",
    href: "/products/complement-articulations",
    category: "complements",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_CSI.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_CSI.webp`,
    title: "Démangeaisons",
    description: "Une peau apaisée",
    href: "/products/complement-demangeaisons",
    category: "complements",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_SDF.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_SDF.webp`,
    title: "Hygiène dentaire",
    description: "Des dents propres",
    href: "/products/complement-hygiene-dentaire",
    category: "complements",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_CSD.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_CSD.webp`,
    title: "Probiotiques",
    description: "Une digestion facilitée",
    href: "/products/complement-probiotiques",
    category: "complements",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_CSR.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_CSR.webp`,
    title: "Relaxation",
    description: "Une vie plus calme",
    href: "/products/complement-relaxation",
    category: "complements",
  },
];

export const CROQUETTES_PRODUCTS_FR: Product[] = [
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-croquettes/balto_collection_QVM_PFR12.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/general-view-croquettes/balto_collection_GV_PFR.webp`,
    title: "Croquettes au poulet frais",
    description: "Sans céréales · 33% protéines",
    href: "/products/croquettes-chien-poulet",
    category: "croquettes",
  },
];

export const FRIANDISES_PRODUCTS_FR: Product[] = [
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-treats/balto_collection_QVM_FEP.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-treats/balto_collection_QV_FEP.webp`,
    title: "Friandises d'éducation au poulet",
    description: "Récompense saine",
    href: "/products/friandises-education-poulet",
    category: "friandises",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-treats/balto_collection_QVM_FGE.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-treats/balto_collection_QV_FGE.webp`,
    title: "Petits poissons sauvages",
    description: "Récompense saine",
    href: "/products/petits-poissons-sauvages",
    category: "friandises",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-treats/balto_collection_QVM_FEB.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-treats/balto_collection_QV_FEB.webp`,
    title: "Friandises d'éducation au bœuf",
    description: "Récompense saine",
    href: "/products/friandises-education-boeuf",
    category: "friandises",
  },
];

export const COMPLEMENT_PRODUCTS_ES = [
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_SJS.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_SJS.webp`,
    title: "Articulaciones",
    description: "Una mejor movilidad",
    href: "/products/complemento-articulaciones",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_SIS.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_SIS.webp`,
    title: "Piel y pelaje",
    description: "Una piel calmada",
    href: "/products/complemento-piel-y-pelaje",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_SDS.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_SDS.webp`,
    title: "Higiene dental",
    description: "Unos dientes limpios",
    href: "/products/complemento-higiene-dental",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_CSD.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_CDS.webp`,
    title: "Probióticos",
    description: "Una mejor digestión",
    href: "/products/complemento-probioticos",
  },
  {
    imageMobile: `${CDN_BASE_URL}/assets/collections-page/product-display/mobile-view-supplements/balto_collection_QVM_CRS.webp`,
    imageDesktop: `${CDN_BASE_URL}/assets/collections-page/product-display/desktop-view-supplements/balto_collection_QVD_CRS.webp`,
    title: "Relajación",
    description: "La tranquilidad diaria",
    href: "/products/complemento-relajacion",
  },
];

export const HELP_LINKS_FR = [
  {
    title: "Questions fréquentes",
    href: "/aide",
  },
  {
    title: "Livraison et retours",
    href: "/aide",
  },
  {
    title: "Contact",
    href: "/aide",
  },
];

export const HELP_LINKS_ES = [
  {
    title: "Preguntas frecuentes",
    href: "/ayuda",
  },
  {
    title: "Entrega y devoluciones",
    href: "/ayuda",
  },
  {
    title: "Contacto",
    href: "/ayuda",
  },
];

export type MobileTab = "products" | "information";

export const MOBILE_TABS_FR: Array<{ key: MobileTab; label: string }> = [
  { key: "products", label: "Nos produits" },
  { key: "information", label: "A propos" },
];

export const DESKTOP_LINKS_FR: Array<{ href: string; label: string }> = [
  { href: "/avis", label: "Avis clients" },
  { href: "/aide", label: "Aide et contact" },
];

export type CategoryTab = "complements" | "croquettes" | "friandises";

export const CATEGORY_TABS_FR: Array<{ key: CategoryTab; label: string }> = [
  { key: "complements", label: "Compléments" },
  { key: "croquettes", label: "Croquettes" },
  { key: "friandises", label: "Friandises" },
];

export const MOBILE_TABS_ES: Array<{ key: MobileTab; label: string }> = [
  { key: "products", label: "Productos" },
  { key: "information", label: "Información" },
];

export const DESKTOP_LINKS_ES: Array<{ href: string; label: string }> = [
  { href: "/resenas", label: "Reseñas" },
  { href: "/ayuda", label: "Ayuda y contacto" },
];
