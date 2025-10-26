export type Product = {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  brandId: string;
  categoryName: string;
  brandName: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
};

export type ProductDraft = {
  code: string;
  name: string;
  categoryId: string;
  brandId: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
};

export type ProductUpdatePayload = ProductDraft & {
  id: string;
};
