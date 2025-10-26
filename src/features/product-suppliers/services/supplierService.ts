import {
  ProductSupplier,
  SupplierDraft,
} from "@/features/product-suppliers/types/supplier";
import { supabase } from "@/lib/supabase";
import {
  productSupplierSchema,
  supplierDraftSchema,
} from "@/schemas/supplier";

const suppliersTable = "suppliers";
const productSupplierListSchema = productSupplierSchema.array();

export async function readSuppliersService(): Promise<ProductSupplier[]> {
  const { data, error } = await supabase
    .from(suppliersTable)
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return productSupplierListSchema.parse(data ?? []);
}

export async function createSupplierService(
  payload: SupplierDraft,
): Promise<ProductSupplier> {
  const validatedPayload = supplierDraftSchema.parse(payload);
  const { data, error } = await supabase
    .from(suppliersTable)
    .insert(validatedPayload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos crear el proveedor.");

  return productSupplierSchema.parse(data);
}

export async function updateSupplierService(
  id: string,
  payload: SupplierDraft,
): Promise<ProductSupplier> {
  const validatedPayload = supplierDraftSchema.parse(payload);
  const { data, error } = await supabase
    .from(suppliersTable)
    .update(validatedPayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No pudimos actualizar el proveedor.");

  return productSupplierSchema.parse(data);
}

export async function deleteSupplierService(id: string): Promise<void> {
  const { error } = await supabase.from(suppliersTable).delete().eq("id", id);

  if (error) throw new Error(error.message);
}
