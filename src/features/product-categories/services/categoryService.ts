import {
  CategoryDraft,
  ProductCategory,
} from "@/features/product-categories/types/category";
import { supabase } from "@/lib/supabase";

const categoriesTable = "categories";

export async function readCategoriesService(): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from(categoriesTable)
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createCategoryService(
  category: CategoryDraft,
): Promise<ProductCategory> {
  const { data, error } = await supabase
    .from(categoriesTable)
    .insert(category)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos crear la categoria.");

  return data as ProductCategory;
}

export async function deleteCategoryService(id: string): Promise<void> {
  const { error } = await supabase.from(categoriesTable).delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateCategoryService(
  id: string,
  payload: CategoryDraft,
): Promise<ProductCategory> {
  const { data, error } = await supabase
    .from(categoriesTable)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos actualizar la categoria.");

  return data as ProductCategory;
}
