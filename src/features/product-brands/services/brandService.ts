import { ProductBrand } from "@/features/brands/types/brand";
import { supabase } from "@/lib/supabase";

const brandsTable = "brands";

// Read Brands
export const readBrandsService = async (): Promise<ProductBrand[]> => {
  const { data, error } = await supabase
    .from(brandsTable)
    .select("*")
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

// Create Brand
export const createBrandService = async (
  brand: Omit<ProductBrand, "id" | "created_at">
) => {
  const { error } = await supabase.from(brandsTable).insert(brand);
  if (error) throw new Error(error.message);
};

// Delete operation
export const deleteBrandService = async (id: string) => {
  const { error } = await supabase.from(brandsTable).delete().eq("id", id);
  if (error) throw new Error(error.message);
};

// Update operation
export const updateBrandService = async (
  id: string,
  updatedFields: Partial<Omit<ProductBrand, "id" | "created_at">>
) => {
  const { error } = await supabase
    .from(brandsTable)
    .update(updatedFields)
    .eq("id", id);
  if (error) throw new Error(error.message);
};
