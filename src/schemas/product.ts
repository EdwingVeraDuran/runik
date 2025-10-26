import { z } from "zod";

export const productSchema = z.object({
  code: z.string().min(1, "El código es obligatorio"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  buyPrice: z.number().positive("El precio de compra debe ser mayor que 0"),
  sellPrice: z.number().positive("El precio de venta debe ser mayor que 0"),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  category_id: z.uuid("Debes seleccionar una categoría válida"),
  brand_id: z.uuid("Debes seleccionar una marca válida"),
});

export type ProductFormData = z.infer<typeof productSchema>;
