import {
  BrandDraft,
  ProductBrand,
} from "@/features/product-brands/types/brand";
import { supabase } from "@/lib/supabase";

const brandsTable = "brands";

export async function readBrandsService(): Promise<ProductBrand[]> {
  const { data, error } = await supabase
    .from(brandsTable)
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createBrandService(
  payload: BrandDraft,
): Promise<ProductBrand> {
  const { data, error } = await supabase
    .from(brandsTable)
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos crear la marca.");

  return data as ProductBrand;
}

export async function updateBrandService(
  id: string,
  payload: BrandDraft,
): Promise<ProductBrand> {
  const { data, error } = await supabase
    .from(brandsTable)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos actualizar la marca.");

  return data as ProductBrand;
}

export async function deleteBrandService(id: string): Promise<void> {
  const { error } = await supabase.from(brandsTable).delete().eq("id", id);

  if (error) throw new Error(error.message);
}
