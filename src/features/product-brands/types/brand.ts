export type ProductBrand = {
  id: string;
  name: string;
  created_at: string;
};

export type BrandDraft = Pick<ProductBrand, "name">;

export type BrandUpdatePayload = Pick<ProductBrand, "id" | "name">;
