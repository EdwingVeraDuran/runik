import { z } from "zod";

export const productSupplierSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "El nombre es obligatorio"),
  phone: z
    .string()
    .min(10, "El teléfono es muy corto")
    .max(10, "El teléfono es muy largo")
    .regex(/^[0-9+\-\s()]+$/, "Formato inválido"),
  address: z.string().min(3, "La dirección es obligatoria"),
  city: z.string().min(2, "La ciudad es obligatoria"),
});

export const supplierDraftSchema = productSupplierSchema.omit({ id: true });

export const supplierUpdateSchema = productSupplierSchema.pick({
  id: true,
  name: true,
  phone: true,
  address: true,
  city: true,
});

export type ProductSupplier = z.infer<typeof productSupplierSchema>;
export type SupplierDraft = z.infer<typeof supplierDraftSchema>;
export type SupplierUpdatePayload = z.infer<typeof supplierUpdateSchema>;
