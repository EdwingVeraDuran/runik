export type ProductCategory = {
  id: string;
  name: string;
  created_at: string;
};

export type CategoryDraft = Pick<ProductCategory, "name">;

export type CategoryUpdatePayload = Pick<ProductCategory, "id" | "name">;
