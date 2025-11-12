const PRODUCT_NAMES_WITHOUT_DOSAGE_TEXT = ["croquettes-chien-poulet"];

export const checkProductWithoutDosageText = (productName: string) => {
  return !PRODUCT_NAMES_WITHOUT_DOSAGE_TEXT.includes(productName);
};
