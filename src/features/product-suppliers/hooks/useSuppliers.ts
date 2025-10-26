import {
  createSupplierService,
  deleteSupplierService,
  readSuppliersService,
  updateSupplierService,
} from "@/features/product-suppliers/services/supplierService";
import {
  ProductSupplier,
  SupplierDraft,
  SupplierUpdatePayload,
} from "@/features/product-suppliers/types/supplier";
import { useCallback, useEffect, useState } from "react";

const sortSuppliersByName = (items: ProductSupplier[]) =>
  [...items].sort((a, b) => a.name.localeCompare(b.name));

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<ProductSupplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const captureError = useCallback((err: unknown) => {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Ocurrio un error con los proveedores.";
    setError(message);
    return message;
  }, []);

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await readSuppliersService();
      setSuppliers(sortSuppliersByName(data));
    } catch (err) {
      captureError(err);
    } finally {
      setIsLoading(false);
    }
  }, [captureError]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const addSupplier = useCallback(
    async (payload: SupplierDraft) => {
      setError(null);

      try {
        const created = await createSupplierService(payload);
        setSuppliers((prev) => sortSuppliersByName([...prev, created]));
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const updateSupplier = useCallback(
    async (payload: SupplierUpdatePayload) => {
      setError(null);

      try {
        const { id, name, phone, address, city } = payload;
        const updated = await updateSupplierService(id, {
          name,
          phone,
          address,
          city,
        });
        setSuppliers((prev) =>
          sortSuppliersByName(
            prev.map((supplier) =>
              supplier.id === updated.id ? updated : supplier,
            ),
          ),
        );
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const deleteSupplier = useCallback(
    async (id: string) => {
      setError(null);

      try {
        await deleteSupplierService(id);
        setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    suppliers,
    isLoading,
    error,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    refresh: fetchSuppliers,
    clearError,
  };
}
