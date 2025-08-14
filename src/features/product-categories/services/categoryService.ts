import { ProductCategory } from "@/features/product-categories/types/category";
import { supabase } from "@/lib/supabase";

const categoriesTable = "categories";

// Read Operation
export const readCategoriesService = async (): Promise<ProductCategory[]> => {
  const { data, error } = await supabase.from(categoriesTable).select("*").order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

// Create Operation
export const createCategoryService = async (
  category: Omit<ProductCategory, "id" | "created_at">
) => {
  const { error } = await supabase.from(categoriesTable).insert(category);
  if (error) throw new Error(error.message);
};

// Delete Operation
export const deleteCategoryService = async (id: string) => {
  const { error } = await supabase.from(categoriesTable).delete().eq("id", id);
  if (error) throw new Error(error.message);
};

// Update Operation
export const updateCategoryService = async (
  id: string,
  updatedFields: Partial<Omit<ProductCategory, "id" | "created_at">>
) => {
  const { error } = await supabase
    .from(categoriesTable)
    .update(updatedFields)
    .eq("id", id);
  if (error) throw new Error(error.message);
};
