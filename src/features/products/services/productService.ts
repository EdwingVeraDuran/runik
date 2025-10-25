import {
  Product,
  ProductDraft,
  ProductUpdatePayload,
} from "@/features/products/types/product";
import { supabase } from "@/lib/supabase";

const productsTable = "products";

export async function readProductsService(): Promise<Product[]> {
  const { data, error } = await supabase
    .from(productsTable)
    .select(
      `
        id,
        code,
        name,
        buy_price,
        sell_price,
        stock,
        created_at,
        category_id,
        brand_id,
        categories:categories(id, name),
        brands:brands(id, name)
      `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data?.map(mapRowToProduct) ?? [];
}

export async function createProductService(
  payload: ProductDraft,
): Promise<Product> {
  const record = mapDraftToRecord(payload);
  const { data, error } = await supabase
    .from(productsTable)
    .insert(record)
    .select(
      `
        id,
        code,
        name,
        buy_price,
        sell_price,
        stock,
        created_at,
        category_id,
        brand_id,
        categories:categories(id, name),
        brands:brands(id, name)
      `,
    )
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos crear el producto.");

  return mapRowToProduct(data);
}

export async function updateProductService(
  payload: ProductUpdatePayload,
): Promise<Product> {
  const { id, ...changes } = payload;
  const record = mapDraftToRecord(changes);

  const { data, error } = await supabase
    .from(productsTable)
    .update(record)
    .eq("id", id)
    .select(
      `
        id,
        code,
        name,
        buy_price,
        sell_price,
        stock,
        created_at,
        category_id,
        brand_id,
        categories:categories(id, name),
        brands:brands(id, name)
      `,
    )
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos actualizar el producto.");

  return mapRowToProduct(data);
}

export async function deleteProductService(id: string): Promise<void> {
  const { error } = await supabase.from(productsTable).delete().eq("id", id);

  if (error) throw new Error(error.message);
}

type RelationRow = {
  id: string;
  name: string;
};

type ProductRow = {
  id: string;
  code: string;
  name: string;
  buy_price: number;
  sell_price: number;
  stock: number;
  created_at: string;
  category_id: string;
  brand_id: string;
  categories?: RelationRow | RelationRow[] | null;
  brands?: RelationRow | RelationRow[] | null;
  categorie?: RelationRow | RelationRow[] | null;
  brand?: RelationRow | RelationRow[] | null;
};

const mapRowToProduct = (row: ProductRow): Product => ({
  id: row.id,
  code: row.code,
  name: row.name,
  categoryId: row.category_id,
  brandId: row.brand_id,
  categoryName: extractRelationName(row.categories ?? row.categorie),
  brandName: extractRelationName(row.brands ?? row.brand),
  buyPrice: row.buy_price,
  sellPrice: row.sell_price,
  stock: row.stock,
  created_at: row.created_at,
});

const extractRelationName = (
  relation?: RelationRow | RelationRow[] | null,
): string => {
  if (!relation) return "";
  if (Array.isArray(relation)) {
    return relation[0]?.name ?? "";
  }
  return relation.name ?? "";
};

const mapDraftToRecord = (payload: ProductDraft) => ({
  code: payload.code,
  name: payload.name,
  category_id: payload.categoryId,
  brand_id: payload.brandId,
  buy_price: payload.buyPrice,
  sell_price: payload.sellPrice,
  stock: payload.stock,
});
